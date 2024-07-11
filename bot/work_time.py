import re

import asyncio
from aiogram import Bot, Router, F
from aiogram.filters.command import Command
from aiogram.types import Message, CallbackQuery
from aiogram.fsm.context import FSMContext
from aiogram.utils import markdown as fmt
from apscheduler.schedulers.asyncio import AsyncIOScheduler

from .commands import bot_command_names
from .custom_types import SendMessage
from .messages import make_interval_validation_message, make_interval_editing_instruction, make_interval_editing_error
from .callbacks import IntervalCallback, WeekdayCallback
from .fsm_states import IntervalEditingState
from .intervals import Interval, schedule_is_empty
from .filters import HasChatState, HasMessageUserUsername
from .keyboards import get_schedule_keyboard, get_schedule_options, get_interval_edit_options
from .state import ChatState, save_state, get_user


INTERVAL_PATTERN = r"^\d{1,2}:\d{2}\s*-\s*\d{1,2}:\d{2}$"

# TODO: Consider the case: After changing timezone working interval changed from 22:00 - 00:00 to 23:00 - 01:00 (fix it)
# TODO: Think how to extract duplicating code


def handle_working_hours(
        scheduler: AsyncIOScheduler, send_message: SendMessage, router: Router, bot: Bot
):
    @router.message(Command(bot_command_names.set_working_hours))
    async def show_schedule_options(message: Message):

        layout = get_schedule_options()

        st = "Press 'Default' to set working hours that will be used as default personal working hours by all people."
        end = "Press 'Personal' to set personal working hours."
        text = fmt.text(st, "\n", end, sep="")

        await message.answer(text=text, reply_markup=layout)

    @router.callback_query(F.data.regexp("(default|personal)_schedule"), HasMessageUserUsername(), HasChatState())
    async def show_schedule(cb: CallbackQuery, username: str, chat_state: ChatState):

        await cb.answer()

        mode = cb.data.split("_")[0]

        user = await get_user(chat_state, username)

        if mode == "personal":
            user.temp_schedule = user.schedule
            week_schedule = user.temp_schedule
            tz = user.time_zone
            shift = user.time_zone_shift
        else:
            chat_state.temp_schedule = chat_state.schedule
            week_schedule = chat_state.temp_schedule
            tz = chat_state.time_zone
            shift = chat_state.time_zone_shift

        layout = get_schedule_keyboard(week_schedule, tz, shift)
        schedule_msg = await cb.message.answer(f"@{username}, here is your {mode} schedule", reply_markup=layout)

        # Cache
        user.schedule_mode = mode
        user.schedule_msg = schedule_msg.message_id

        await save_state(chat_state)

    @router.callback_query(IntervalCallback.filter(F.action == "edit"), HasMessageUserUsername(), HasChatState())
    async def show_interval_editing_instruction(
            cb: CallbackQuery,
            state: FSMContext,
            callback_data: IntervalCallback,
            username: str,
            chat_state: ChatState
    ):

        weekday = callback_data.weekday
        interval_str = callback_data.interval

        text = make_interval_editing_instruction()

        await state.set_state(IntervalEditingState.EnterNewInterval)

        await cb.answer()
        edit_message = await cb.message.answer(text=text)

        # Cache
        user = await get_user(chat_state, username)
        user.to_edit_weekday = weekday
        user.to_edit_interval = interval_str
        user.to_delete_msg_ids.add(edit_message.message_id)
        await save_state(chat_state)

    @router.message(
        IntervalEditingState.EnterNewInterval,
        HasMessageUserUsername(),
        HasChatState()
    )
    async def handle_interval_editing(message: Message, state: FSMContext, username: str, chat_state: ChatState):

        parse_pattern = re.compile(INTERVAL_PATTERN)
        parse_match = re.fullmatch(parse_pattern, message.text.strip())

        # Cache
        user = await get_user(chat_state, username)
        user.to_delete_msg_ids.add(message.message_id)

        # Text entered by user is not interval
        error_msg_text = ""
        if not parse_match:
            error_msg_text = f"The interval {message.text.strip()} isn't in the hh:mm - hh:mm format.\n"

        # User entered one "valid" interval
        else:
            mode = user.schedule_mode
            if mode == "personal":
                week_schedule = user.temp_schedule
                tz = user.time_zone
                shift = user.time_zone_shift
            else:
                week_schedule = chat_state.temp_schedule
                tz = chat_state.time_zone
                shift = chat_state.time_zone_shift

            weekday = user.to_edit_weekday
            old_interval = user.to_edit_interval
            new_interval = parse_match[0]
            is_valid, error_msg_text = make_interval_validation_message(interval_str=new_interval, tz=tz)

            # Interval is valid
            if is_valid:
                old_interval_obj = Interval.from_string(old_interval, tz, shift)
                new_interval_obj = Interval.from_string(new_interval, tz, shift)
                week_schedule[weekday].remove_interval(old_interval_obj, ignore_inclusion=True)
                week_schedule[weekday].add_interval(new_interval_obj)

                layout = get_schedule_keyboard(week_schedule, tz, shift)
                await bot.edit_message_reply_markup(
                    chat_id=chat_state.chat_id,
                    message_id=user.schedule_msg,
                    reply_markup=layout
                )

                success_msg = await message.answer(f"OK, the interval was set to {new_interval}.")
                await asyncio.sleep(1)
                await success_msg.delete()
                for msg_id in user.to_delete_msg_ids:
                    await bot.delete_message(chat_id=chat_state.chat_id, message_id=msg_id)

                user.to_delete_msg_ids = set()

                await state.clear()
                await save_state(chat_state)
                return

        error_msg_text = make_interval_editing_error(error_msg=error_msg_text)
        layout = get_interval_edit_options(weekday=user.to_edit_weekday, interval_str=user.to_edit_interval)
        error_msg = await message.answer(text=error_msg_text, reply_markup=layout)

        user.to_delete_msg_ids.add(error_msg.message_id)

        await save_state(chat_state)

    @router.callback_query(F.data == "cancel_interval_edit", HasMessageUserUsername(), HasChatState())
    async def cancel_interval_editing(cb: CallbackQuery, state: FSMContext, username: str, chat_state: ChatState):

        await cb.answer()
        user = await get_user(chat_state, username)

        user.to_edit_weekday = None
        user.to_edit_interval = None

        for msg_id in user.to_delete_msg_ids:
            await bot.delete_message(chat_id=chat_state.chat_id, message_id=msg_id)
        user.to_delete_msg_ids = set()
        await state.clear()
        await save_state(chat_state)

    @router.callback_query(IntervalCallback.filter(F.action == 'add'), HasMessageUserUsername(), HasChatState())
    async def add_interval(cb: CallbackQuery, callback_data: IntervalCallback, username: str, chat_state: ChatState):

        weekday = callback_data.weekday
        interval_str = callback_data.interval

        user = await get_user(chat_state, username)

        mode = user.schedule_mode
        if mode == "personal":
            week_schedule = user.temp_schedule
            tz = user.time_zone
            shift = user.time_zone_shift
        else:
            week_schedule = chat_state.temp_schedule
            tz = chat_state.time_zone
            shift = chat_state.time_zone_shift

        interval = Interval.from_string(interval_str, tz)
        week_schedule[weekday].add_interval(interval)

        layout = get_schedule_keyboard(week_schedule, tz, shift)
        await cb.message.edit_reply_markup(reply_markup=layout)
        await save_state(chat_state)

    @router.callback_query(IntervalCallback.filter(F.action == 'remove'), HasMessageUserUsername(), HasChatState())
    async def remove_interval(cb: CallbackQuery, callback_data: IntervalCallback, username: str, chat_state: ChatState):

        weekday = callback_data.weekday
        interval_str = callback_data.interval

        user = await get_user(chat_state, username)

        mode = user.schedule_mode
        if mode == "personal":
            week_schedule = user.temp_schedule
            tz = user.time_zone
            shift = user.time_zone_shift
        else:
            week_schedule = chat_state.temp_schedule
            tz = chat_state.time_zone
            shift = chat_state.time_zone_shift

        interval = Interval.from_string(interval_str, tz, shift)
        week_schedule[weekday].remove_interval(interval)

        layout = get_schedule_keyboard(week_schedule, tz, shift)
        await cb.message.edit_reply_markup(reply_markup=layout)
        await save_state(chat_state)

    @router.callback_query(WeekdayCallback.filter(F.action == 'toggle'), HasMessageUserUsername(), HasChatState())
    async def toggle_weekday(cb: CallbackQuery, callback_data: WeekdayCallback, username: str, chat_state: ChatState):

        weekday = callback_data.weekday

        user = await get_user(chat_state, username)

        mode = user.schedule_mode
        if mode == "personal":
            week_schedule = user.temp_schedule
            tz = user.time_zone
            shift = user.time_zone_shift
        else:
            week_schedule = chat_state.temp_schedule
            tz = chat_state.time_zone
            shift = chat_state.time_zone_shift

        week_schedule[weekday].toggle_inclusion()

        layout = get_schedule_keyboard(week_schedule, tz, shift)
        await cb.message.edit_reply_markup(reply_markup=layout)
        await save_state(chat_state)

    @router.callback_query(F.data == "cancel_schedule", HasMessageUserUsername(), HasChatState())
    async def cancel_changes(cb: CallbackQuery, state: FSMContext, username: str, chat_state: ChatState):

        await cb.answer()

        user = await get_user(chat_state, username)
        mode = user.schedule_mode
        if mode == "personal":
            user.temp_schedule = None
        else:
            chat_state.temp_schedule = None

        user.schedule_mode = None
        user.schedule_msg = None
        user.to_edit_weekday = None
        user.to_edit_interval = None

        if len(user.to_delete_msg_ids) > 0:
            for msg_id in user.to_delete_msg_ids:
                await bot.delete_message(chat_id=chat_state.chat_id, message_id=msg_id)
            user.to_delete_msg_ids = set()

        await state.clear()
        await cb.message.answer(f"The {mode} schedule was not updated.")
        await save_state(chat_state)

    @router.callback_query(F.data == "save_schedule", HasMessageUserUsername(), HasChatState())
    async def save_changes(cb: CallbackQuery, username: str, chat_state: ChatState):

        await cb.answer()

        user = await get_user(chat_state, username)
        mode = user.schedule_mode
        if mode == "personal":
            norm_schedule = {item[0]: item[1].normalize_intervals() for item in user.temp_schedule.items()}
            user.temp_schedule = norm_schedule
            user.schedule = user.temp_schedule
            user.temp_schedule = None
        else:
            norm_schedule = {item[0]: item[1].normalize_intervals() for item in chat_state.temp_schedule.items()}
            chat_state.temp_schedule = norm_schedule
            chat_state.schedule = chat_state.temp_schedule
            chat_state.temp_schedule = None
            if schedule_is_empty(user.schedule):
                user.schedule = chat_state.schedule

        user.schedule_mode = None
        user.schedule_msg = None
        user.to_edit_weekday = None
        user.to_edit_interval = None

        await cb.message.answer(f"The {mode} schedule was updated.")
        await save_state(chat_state)

    @router.callback_query(F.data == "#")
    async def handle_placeholders(cb: CallbackQuery):
        await cb.answer()

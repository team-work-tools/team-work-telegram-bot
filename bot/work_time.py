import re

import asyncio
from aiogram import Bot, Router, F
from aiogram.filters.command import Command
from aiogram.types import Message, CallbackQuery
from aiogram.fsm.context import FSMContext
from aiogram.utils import markdown as fmt
from aiogram.utils.i18n import gettext as _
from apscheduler.schedulers.asyncio import AsyncIOScheduler

from .commands import bot_command_names
from .custom_types import SendMessage
from .messages import make_interval_validation_message
from .callbacks import IntervalCallback, WeekdayCallback
from .fsm_states import IntervalEditingState
from .intervals import Interval
from .filters import HasChatState, HasMessageUserUsername
from .keyboards import get_schedule_keyboard
from .state import ChatState, save_state, get_user, load_user_pm


INTERVAL_PATTERN = r"\b\d{1,2}[:.]\d{2}\s*-\s*\d{1,2}[:.]\d{2}\b"

# TODO: Apply tz validation in Interval class
# TODO: Handle two scenarios for timezone changing via shift and write logic for intervals for those cases
# TODO: Check code and messages by scenario: https://github.com/team-work-tools/team-work-telegram-bot/pull/106
# TODO: Write logic for setting group schedule: https://t.me/c/2215513034/6/2076, https://t.me/c/2215513034/6/2083


def handle_working_time(
        scheduler: AsyncIOScheduler, send_message: SendMessage, router: Router, bot: Bot
):
    @router.message(Command(bot_command_names.set_personal_working_time), HasMessageUserUsername(), HasChatState())
    async def show_user_schedule(message: Message, username: str, chat_state: ChatState):

        user = await get_user(chat_state, username)
        user_pm = await load_user_pm(username)
        week_schedule = user.schedule
        tz = user_pm.personal_time_zone

        layout = get_schedule_keyboard(week_schedule=week_schedule, tz=tz)
        schedule_msg = await message.answer(f"@{username}, here is your schedule", reply_markup=layout)

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

        instruction_text = "Send me the new interval in the hh:mm - hh:mm format."
        example_text = "Example: "
        text = fmt.text(instruction_text, "\n", example_text, fmt.hcode("19:00 - 22:30"), sep="")

        await state.set_state(IntervalEditingState.EnterNewInterval)

        await cb.answer()
        edit_message = await cb.message.answer(text=fmt.text(text))

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
        parse_match = re.findall(parse_pattern, message.text)

        user = await get_user(chat_state, username)
        user_pm = await load_user_pm(username)
        tz = user_pm.personal_time_zone

        user.to_delete_msg_ids.add(message.message_id)

        # User entered two "valid" intervals
        if len(parse_match) > 1:
            msg = await message.answer("Please, enter only one interval.")
            user.to_delete_msg_ids.add(msg.message_id)

        # User entered one "valid" interval
        if len(parse_match) == 1:
            new_interval = parse_match[0]
            is_valid, status_msg = make_interval_validation_message(interval_str=new_interval, tz=tz)

            # Interval is valid
            if is_valid:
                old_interval_obj = Interval.from_string(user.to_edit_interval, tz)
                new_interval_obj = Interval.from_string(new_interval, tz)
                user.schedule[user.to_edit_weekday].remove_interval(old_interval_obj, ignore_inclusion=True)
                user.schedule[user.to_edit_weekday].add_interval(new_interval_obj)

                layout = get_schedule_keyboard(user.schedule, tz)
                await bot.edit_message_reply_markup(
                    chat_id=chat_state.chat_id,
                    message_id=user.schedule_msg,
                    reply_markup=layout
                )

                success_msg = await message.answer("You successfully edited interval!")
                await asyncio.sleep(1)
                await success_msg.delete()
                for msg_id in user.to_delete_msg_ids:
                    await bot.delete_message(chat_id=chat_state.chat_id, message_id=msg_id)

                user.to_delete_msg_ids = set()

                await state.clear()

            # Interval is not valid
            else:
                msg = await message.answer(status_msg)
                user.to_delete_msg_ids.add(msg.message_id)

        # Text entered by user is not interval
        if len(parse_match) == 0:
            instruction_text = "Please send me the valid interval in the hh:mm - hh:mm format."
            example_text = "Example: "
            text = fmt.text(instruction_text, "\n", example_text, fmt.hcode("19:00 - 22:30"), sep="")

            msg = await message.answer(fmt.text(text))
            user.to_delete_msg_ids.add(msg.message_id)

        await save_state(chat_state)

    @router.callback_query(IntervalCallback.filter(F.action == 'add'), HasMessageUserUsername(), HasChatState())
    async def add_interval(cb: CallbackQuery, callback_data: IntervalCallback, username: str, chat_state: ChatState):

        weekday = callback_data.weekday
        interval_str = callback_data.interval

        user = await get_user(chat_state, username)
        user_pm = await load_user_pm(username)
        week_schedule = user.schedule
        tz = user_pm.personal_time_zone

        interval = Interval.from_string(interval_str, tz)
        week_schedule[weekday].add_interval(interval)

        layout = get_schedule_keyboard(week_schedule, tz)
        await cb.message.edit_reply_markup(reply_markup=layout)
        await save_state(chat_state)

    @router.callback_query(IntervalCallback.filter(F.action == 'remove'), HasMessageUserUsername(), HasChatState())
    async def remove_interval(cb: CallbackQuery, callback_data: IntervalCallback, username: str, chat_state: ChatState):

        weekday = callback_data.weekday
        interval_str = callback_data.interval

        user = await get_user(chat_state, username)
        user_pm = await load_user_pm(username)
        week_schedule = user.schedule
        tz = user_pm.personal_time_zone

        interval = Interval.from_string(interval_str, tz)
        week_schedule[weekday].remove_interval(interval)

        layout = get_schedule_keyboard(week_schedule, tz)
        await cb.message.edit_reply_markup(reply_markup=layout)
        await save_state(chat_state)

    @router.callback_query(WeekdayCallback.filter(F.action == 'toggle'), HasMessageUserUsername(), HasChatState())
    async def toggle_weekday(cb: CallbackQuery, callback_data: WeekdayCallback, username: str, chat_state: ChatState):

        weekday = callback_data.weekday

        user = await get_user(chat_state, username)
        user_pm = await load_user_pm(username)
        week_schedule = user.schedule
        tz = user_pm.personal_time_zone

        week_schedule[weekday].toggle_inclusion()

        layout = get_schedule_keyboard(week_schedule, tz)
        await cb.message.edit_reply_markup(reply_markup=layout)
        await save_state(chat_state)

    @router.callback_query(F.data == "#")
    async def handle_placeholders(cb: CallbackQuery):
        await cb.answer()

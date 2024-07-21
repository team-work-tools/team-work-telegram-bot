from datetime import time, datetime
from enum import Enum
from pytz import timezone 
from pytz.exceptions import UnknownTimeZoneError
from textwrap import dedent
from re import compile, escape

from aiogram import Bot, Router, html
from aiogram.enums import ParseMode
from aiogram.filters.command import Command
from aiogram.types import CallbackQuery, Message, InlineKeyboardMarkup, InlineKeyboardButton, InlineQuery 
from aiogram.utils.i18n import gettext as _
from apscheduler.schedulers.asyncio import AsyncIOScheduler

from .commands import bot_command_names
from .constants import (day_of_week_to_num, day_of_week_pretty, sample_time, sample_time_zone)
from .custom_types import SendMessage
from .filters import HasChatState, HasMessageText, HasMessageUserUsername, IsPromptReply, IsReplyToMeetingMessage, IsCallback
from .meeting import schedule_meeting
from .reminder import update_reminders
from .messages import make_help_message
from .state import ChatState, Prompt, PromptType, Task, get_task_names, save_state, get_user, load_user_pm, create_user_pm, save_user_pm
from .timezones import get_time_zone_hint


def make_router(scheduler: AsyncIOScheduler, send_message: SendMessage, bot: Bot):
    router = Router()

    handle_global_commands(
        scheduler=scheduler, send_message=send_message, router=router, bot=bot
    )

    handle_team_settings_commands(
        scheduler=scheduler, send_message=send_message, router=router, bot=bot
    )

    handle_personal_settings_commands(
        scheduler=scheduler, send_message=send_message, router=router, bot=bot
    )

    handle_info_commands(
        scheduler=scheduler, send_message=send_message, router=router
    )

    handle_user_responses(
        scheduler=scheduler, send_message=send_message, router=router
    )

    handle_task_commands(
        scheduler=scheduler, send_message=send_message, router=router, bot=bot
    )

    handle_inline_queries(router=router)

    return router


def handle_global_commands(
        scheduler: AsyncIOScheduler, send_message: SendMessage, router: Router, bot: Bot
):
    @router.message(Command(bot_command_names.start), HasChatState())
    async def start(message: Message, chat_state: ChatState):
        await get_help(message=message, chat_state=chat_state)

        # Register user if it is personal message
        if message.chat.type == "private":
            username = message.from_user.username if message.from_user else None
            user_cht_id = message.chat.id
            user_pm = await load_user_pm(username=username) if username else None
            if not user_pm and username:
                user_pm = await create_user_pm(username=username, chat_id=user_cht_id)
                await save_user_pm(user_pm=user_pm)
                await message.reply("You successfully registered in the bot!")

            await update_reminders(
                bot=bot,
                username=username,
                scheduler=scheduler,
                send_message=send_message
            )

    @router.message(Command(bot_command_names.help), HasChatState())
    async def get_help(message: Message, chat_state: ChatState):
        await message.reply(make_help_message())


def handle_team_settings_commands(
        scheduler: AsyncIOScheduler, send_message: SendMessage, router: Router, bot: Bot
):
    @router.message(
        Command(bot_command_names.set_meetings_time_zone), HasMessageText(), HasChatState()
    )
    async def set_meetings_time_zone(
            message: Message, message_text: str, chat_state: ChatState
    ):
        command_pattern = compile(
            r'^/{0}\s+([A-Za-z_/]+)$'
            .format(escape(bot_command_names.set_meetings_time_zone))
        )
        if not command_pattern.match(message_text):
            buttons = [
                [
                    InlineKeyboardButton(
                        text="Get hints".format(),
                        switch_inline_query_current_chat=""
                    )
                 ]
            ]
            keyboard = InlineKeyboardMarkup(inline_keyboard=buttons)
            await message.reply(
                dedent(
                    """
                    Please write your time zone.

                    Examples:
                    /{set_meetings_time_zone} {sample_time_zone}
                    
                    You can use button below and pass your local time, date, country or continent to get timezone hints
                    """.format(
                        set_meetings_time_zone=bot_command_names.set_meetings_time_zone,
                        sample_time_zone=sample_time_zone,
                        sample_time=sample_time
                    )
                ),
                reply_markup=keyboard
            )
            return

        time_zone = message_text.split(" ")[1]
        try:
            timezone(time_zone)
            chat_state.default_time_zone = time_zone
            await save_state(chat_state)

            if chat_state.meeting_time_hour and chat_state.meeting_time_minute:
                meeting_time = time(
                    hour=chat_state.meeting_time_hour,
                    minute=chat_state.meeting_time_minute,
                    tzinfo=timezone(chat_state.default_time_zone)
                )

                schedule_meeting(
                    meeting_time=meeting_time,
                    chat_id=chat_state.chat_id,
                    topic_id=chat_state.topic_id,
                    scheduler=scheduler,
                    send_message=send_message,
                )

            await message.reply(
                _("Chat default time zone is successfully set to {time_zone}")
                .format(time_zone=time_zone)
            )
            return
        except UnknownTimeZoneError:
            await message.reply(_("Such time zone does not exist, please chack the spelling")
                                .format())
            time_zone = None


    @router.message(
        Command(bot_command_names.set_meetings_time), HasMessageText(), HasChatState()
    )
    async def set_meetings_time(
            message: Message, message_text: str, chat_state: ChatState
    ):
        try:
            meeting_time_str = message_text.split(" ", 1)[1]
            topic_id = message.message_thread_id

            hour = int(meeting_time_str.split(":")[0])
            minute = int(meeting_time_str.split(":")[1])
        except (ValueError, IndexError):
            await message.reply(
                dedent(
                    _(
                        """
                        Please write the meetings time in the hh:mm format.
                        
                        Example:
                        /{set_meetings_time} {sample_time}
                        """
                    ).format(
                        set_meetings_time=bot_command_names.set_meetings_time,
                        sample_time=sample_time,
                    )
                )
            )
            return

        if chat_state.default_time_zone == None:
            return

        chat_state.meeting_time_hour = hour
        chat_state.meeting_time_minute = minute
        chat_state.topic_id = topic_id
        await save_state(chat_state=chat_state)
        meeting_time = time(
            hour=hour, minute=minute,
            tzinfo=timezone(chat_state.default_time_zone)
        )

        schedule_meeting(
            meeting_time=meeting_time,
            chat_id=chat_state.chat_id,
            topic_id=chat_state.topic_id,
            scheduler=scheduler,
            send_message=send_message,
        )

        for user in chat_state.users.values():
            if not user.time_zone:
                continue

            meeting_time = meeting_time.replace(tzinfo=timezone(user.time_zone))
            schedule_meeting(
                meeting_time=meeting_time,
                chat_id=chat_state.chat_id,
                topic_id=chat_state.topic_id,
                scheduler=scheduler,
                send_message=send_message,
                time_zone=user.time_zone
            )

        username = message.from_user.username if message.from_user else None

        await update_reminders(
            bot=bot,
            username=username,
            scheduler=scheduler,
            send_message=send_message
        )

        await message.reply(
            _(
                "OK, we'll meet at {meeting_time} on {week_days} starting not earlier than on {start_date}!"
            ).format(
                meeting_time=html.bold(meeting_time.strftime("%H:%M")),
                week_days=html.bold(day_of_week_pretty),
                start_date=html.bold(datetime.now().strftime("%Y-%m-%d")),
            )
        )


def handle_personal_settings_commands(
        scheduler: AsyncIOScheduler, send_message: SendMessage, router: Router, bot: Bot
):
    @router.message(
        Command(bot_command_names.set_personal_time_zone), HasMessageText(), HasChatState(),
        HasMessageUserUsername()
    )
    async def set_personal_time_zone(
        message: Message, message_text: str, chat_state: ChatState, username: str
    ):
        command_pattern = compile(
            r'^/{0}\s+([A-Za-z_/]+)$'
            .format(escape(bot_command_names.set_personal_time_zone))
        )
        if not command_pattern.match(message_text):
            buttons = [
                [
                    InlineKeyboardButton(
                        text="Get hints".format(),
                        switch_inline_query_current_chat="personal "
                    )
                 ]
            ]
            keyboard = InlineKeyboardMarkup(inline_keyboard=buttons)
            await message.reply(
                dedent(
                    """
                    Please write your time zone.

                    Examples:
                    /{set_personal_time_zone} {sample_time_zone}
                    
                    You can use button below and pass your local time, date, country or continent to get timezone hints
                    """.format(
                        set_personal_time_zone=bot_command_names.set_personal_time_zone,
                        sample_time_zone=sample_time_zone,
                        sample_time=sample_time
                    )
                ),
                reply_markup=keyboard
            )
            return

        time_zone = message_text.split(" ")[1]
        try:
            timezone(time_zone)
            await get_user(chat_state=chat_state, username=username)
            chat_state.users[username].time_zone = time_zone
            await save_state(chat_state)

            if chat_state.meeting_time_hour and chat_state.meeting_time_minute:
                meeting_time = time(
                    hour=chat_state.meeting_time_hour,
                    minute=chat_state.meeting_time_minute,
                    tzinfo=timezone(time_zone)
                )

                schedule_meeting(
                    meeting_time=meeting_time,
                    chat_id=chat_state.chat_id,
                    topic_id=chat_state.topic_id,
                    scheduler=scheduler,
                    send_message=send_message,
                    time_zone=time_zone
                )

            await message.reply(
                "Your personal time zone is successfully set to {time_zone}"
                .format(time_zone=time_zone)
            )
            return
        except UnknownTimeZoneError:
            await message.reply("Such time zone does not exist, please chack the spelling"
                                .format())


    @router.message(
        Command(bot_command_names.join), HasMessageUserUsername(), HasChatState()
    )
    async def subscribe(message: Message, username: str, chat_state: ChatState):
        user = await get_user(chat_state, username)
        if user.is_joined:
            await message.reply(
                _("You've already joined, @{username}!").format(username=username)
            )
        else:
            user.is_joined = True
            await save_state(chat_state=chat_state)

            await message.reply(
                dedent(
                    _(
                        """
                        You've just joined, @{username}!
                        
                        You can skip meetings via the /{command_skip} command.
                        """
                    ).format(
                        username=username, command_skip=bot_command_names.skip
                    )
                )
            )

    @router.message(
        Command(bot_command_names.skip), HasMessageUserUsername(), HasChatState()
    )
    async def unsubscribe(message: Message, username: str, chat_state: ChatState):        
        user = await get_user(chat_state, username)
        if user.is_joined:
            user.is_joined = False
            await save_state(chat_state=chat_state)
            await message.reply(
                dedent(
                    _(
                        """
                        See you later, @{username}!
                        
                        You can join via the /{command_join} command.
                        """
                    )
                ).format(username=username, command_join=bot_command_names.join)
            )
        else:
            await message.reply(
                dedent(
                    _("You've not yet joined, @{username}!").format(
                        username=username
                    )
                )
            )

    @router.message(
        Command(bot_command_names.set_personal_meetings_days), HasMessageUserUsername(), HasMessageText(), HasChatState()
    )
    async def set_personal_meetings_days(
            message: Message, username: str, message_text: str, chat_state: ChatState
    ):
        try:
            msg_spt = message_text.split()
            if len(msg_spt) == 1:
                raise Exception

            meeting_days_str = " ".join(msg_spt[1:])
            day_tokens = meeting_days_str.replace(",", " ").lower().split()

            days_num: set[int] = set()

            for token in day_tokens:
                if not token:
                    continue

                if "-" in token:
                    start_day, end_day = token.split("-")
                    start_num = day_of_week_to_num[start_day]
                    end_num = day_of_week_to_num[end_day]
                    days_num.update(range(start_num, end_num + 1))
                else:
                    days_num.add(day_of_week_to_num[token])

            user = await get_user(chat_state, username)
            user.meeting_days = days_num
            await save_state(chat_state)

            await message.reply(
                _(
                    "OK, from now you will only receive messages on {meeting_days}."
                ).format(
                    meeting_days=html.bold(", ".join(day_tokens))
                )
            )
        except Exception as e:
            await message.reply(
                dedent(
                    _(
                        """
                        Please indicate your personal working days.

                        You should use "," or " " as a separator.

                        Example:

                        /{set_personal_meetings_days} Monday-Wednesday, Friday 
                        """
                    ).format(
                        set_personal_meetings_days=bot_command_names.set_personal_meetings_days
                    )
                )
            )

    @router.message(
        Command(bot_command_names.set_reminder_period), HasMessageUserUsername(), HasMessageText(), HasChatState()
    )
    async def set_reminder_period(
        message: Message, username: str, message_text: str, chat_state: ChatState
    ):
        try:
            period_minutes = int(message_text.split(" ", 1)[1])
            if period_minutes <= 0:
                raise ValueError

            user = await get_user(chat_state, username)
            user.reminder_period = period_minutes
            await save_state(chat_state)

            await message.reply(
                _(
                    "Reminder period set to {period} minutes"
                ).format(
                    period=period_minutes
                )
            )

            # Schedule reminders
            user_pm = await load_user_pm(username)

            await update_reminders(
                bot=bot,
                username=username,
                scheduler=scheduler,
                send_message=send_message
            )

            if not user.is_joined:
                await message.reply(
                    "You have to join daily meetings first!\nUse the /join command."
                )

            if not user_pm:
                bot_info = await bot.get_me()

                await message.reply(
                    _(
                        "@{username} I don't have access to your personal messages.\n"
                        "Please write to @{bot_username} and type /start."
                    ).format(
                        username=username,
                        bot_username=bot_info.username
                    )
                )

        except (IndexError, ValueError):
            await message.reply(
                dedent(
                    _(
                        """
                        Please indicate the reminder period in minutes.

                        Example:

                        /{set_reminder_period} 30
                        """
                    ).format(
                        set_reminder_period=bot_command_names.set_reminder_period
                    )
                )
            )


def handle_info_commands(
        scheduler: AsyncIOScheduler, send_message: SendMessage, router: Router
):
    @router.message(Command(bot_command_names.get_chat_state), HasChatState())
    async def get_chat_state(message: Message, chat_state: ChatState):
        chat_state_json = chat_state.model_dump_json(indent=2)
        await message.reply(
            dedent(
                f"""<pre><code class="language-json">{chat_state_json}</code></pre>"""
            ),
            parse_mode=ParseMode.HTML,
        )


def handle_user_responses(
    scheduler: AsyncIOScheduler, send_message: SendMessage, router: Router
):
    @router.message(
        HasMessageUserUsername(), HasChatState(), IsReplyToMeetingMessage()
    )
    async def set_meetings_time(
            message: Message, username: str, chat_state: ChatState, replied_meeting_msg_num: int
    ):

        if message.from_user and message.from_user.username:
            if message.from_user.username in chat_state.users:
                user = await get_user(chat_state, username)

                non_replied_msgs = user.non_replied_daily_msgs

                if replied_meeting_msg_num in non_replied_msgs:
                    non_replied_msgs.remove(replied_meeting_msg_num)
                    await save_state(chat_state)


def handle_inline_queries(router: Router):
    @router.inline_query()
    async def guess_time_zone(query: InlineQuery):
        words = query.query.split()

        if len(words) == 1:
            results = get_time_zone_hint(query.query)
        elif words[0] == "personal":
            results = get_time_zone_hint(words[1], personal=True)
        else:
            results = []
        await query.answer(results, cache_time=10)


def handle_task_commands(scheduler: AsyncIOScheduler, send_message: SendMessage,
                         router: Router, bot: Bot):

    class CommandCodes(Enum):
        ADD_TASK = "01"
        DELETE_TASK = "02"
        EDIT_TASK = "03"
        EDIT_TASK_TEXT = "04"
        EDIT_TASK_ASSIGNEES = "05"
        EDIT_TASK_DEADLINE = "06"
        TASK_MENU = "07"
        CANCEL_PROMPT = "08"
        TASK_DONE = "09"

    def make_task_menu_message(chat_state: ChatState):
        res = "All chat tasks:\n"
        buttons = []
        for i in range(1, len(chat_state.tasks) + 1):
            task = chat_state.tasks[i - 1]
            res += dedent(
            f"""
            {i}) {task.text}
            Assignees: {', '.join(task.assignees) if task.assignees else None}
            Deadline: {task.deadline}
            Done: {task.done}
            """
            )
            buttons.append([
                InlineKeyboardButton(
                    text=_("Edit Task #{0}".format(i)),
                    callback_data=f"{CommandCodes.EDIT_TASK.value} {i - 1}"
                )
            ])
        buttons.append([InlineKeyboardButton(
            text=_("Add new task"),
            callback_data=f"{CommandCodes.ADD_TASK.value}"
        )])
        return {
            "text": _("{0}".format(res)),
            "reply_markup": InlineKeyboardMarkup(inline_keyboard=buttons)
        }


    @router.message(Command(bot_command_names.get_tasks), HasChatState())
    async def get_tasks(message: Message, chat_state: ChatState):
        await message.reply(
            **make_task_menu_message(chat_state)
        )

    @router.callback_query(IsCallback(CommandCodes.TASK_MENU.value))
    async def get_tasks_callback(callback: CallbackQuery, chat_state: ChatState, message: Message):
        updated = make_task_menu_message(chat_state)
        await message.edit_text(updated["text"])
        await message.edit_reply_markup(reply_markup=updated["reply_markup"])

    @router.callback_query(IsCallback(CommandCodes.ADD_TASK.value))
    async def add_task_callback(callback: CallbackQuery, argument: str, chat_state: ChatState, message: Message):
        task = Task()
        chat_state.tasks.append(task)
        await save_state(chat_state)
        updated = make_task_menu_message(chat_state)
        await message.edit_text(updated["text"])
        await message.edit_reply_markup(reply_markup=updated["reply_markup"])

    @router.callback_query(IsCallback(CommandCodes.EDIT_TASK.value))
    async def edit_task_callback(callback: CallbackQuery, argument: str, chat_state: ChatState, message: Message):
        task = chat_state.tasks[int(argument)]
        text = f"""
                Task #{int(argument) + 1}
                Text: {task.text}
                Assignees: {task.assignees}
                Deadline: {task.deadline}
                Done: {task.done}

                """
        text = _(dedent(text))
        buttons = [
            [InlineKeyboardButton(
                text=_("Change Text"),
                callback_data=f"{CommandCodes.EDIT_TASK_TEXT.value} {argument}"
            )],
            [InlineKeyboardButton(
                text=_("Change Assignees"),
                callback_data=f"{CommandCodes.EDIT_TASK_ASSIGNEES.value} {argument}"
            )],
            [InlineKeyboardButton(
                text=_("Change Deadline"),
                callback_data=f"{CommandCodes.EDIT_TASK_DEADLINE.value} {argument}"
            )],
            [
                InlineKeyboardButton(
                    text=_("Mark undone" if task.done else "Mark done"),
                    callback_data=f"{CommandCodes.TASK_DONE.value} {argument}"
                ),
                InlineKeyboardButton(
                    text=_("Delete"),
                    callback_data=f"{CommandCodes.DELETE_TASK.value} {argument}"
                ),
            ],
            [InlineKeyboardButton(
                text=_("Back"),
                callback_data=f"{CommandCodes.TASK_MENU.value} {argument}"
            )],
        ]
        await message.edit_text(text=text)
        await message.edit_reply_markup(reply_markup=InlineKeyboardMarkup(inline_keyboard=buttons))

    @router.callback_query(IsCallback(CommandCodes.TASK_DONE.value))
    async def mark_task_done(
        callback: CallbackQuery, argument: str, chat_state: ChatState, message: Message
        ):
        chat_state.tasks[int(argument)].done = not chat_state.tasks[int(argument)].done
        await save_state(chat_state)
        await edit_task_callback(callback, argument, chat_state, message)
        

    @router.callback_query(IsCallback(CommandCodes.EDIT_TASK_ASSIGNEES.value))
    async def edit_task_assignees_callback(
        callback: CallbackQuery, argument: str, chat_state: ChatState, message: Message
        ):
        chat_state.prompts[message.message_id] = Prompt(
            prompt_type=PromptType.TASK_ASSIGNEES,
            prompt_data={"task_id": int(argument)}
        )
        await save_state(chat_state)
        await message.edit_text(
            text=_("You are going to change task #{0} assignees.\nSend new assignees (in this format \"@tag1 @tag2 @tag3\") in reply to this message.".format(argument))
        )
        await message.edit_reply_markup(
            reply_markup=InlineKeyboardMarkup(
                inline_keyboard=[[
                    InlineKeyboardButton(
                        text=_("Cancel"),
                        callback_data=f"{CommandCodes.CANCEL_PROMPT.value} {argument}"
                    )
                ]]
            )
        )

    @router.callback_query(IsCallback(CommandCodes.EDIT_TASK_DEADLINE.value))
    async def edit_task_deadline_callback(
        callback: CallbackQuery, argument: str, chat_state: ChatState, message: Message
        ):
        chat_state.prompts[message.message_id] = Prompt(
            prompt_type=PromptType.TASK_DEADLINE,
            prompt_data={"task_id": int(argument)}
        )
        await save_state(chat_state)
        await message.edit_text(
            text=_("You are going to change task #{0} deadline.\nSend new deadline (in this format \"dd.mm.yyyy HH:MM\") in reply to this message.".format(argument))
        )
        await message.edit_reply_markup(
            reply_markup=InlineKeyboardMarkup(
                inline_keyboard=[[
                    InlineKeyboardButton(
                        text=_("Cancel"),
                        callback_data=f"{CommandCodes.CANCEL_PROMPT.value} {argument}"
                    )
                ]]
            )
        )

    @router.callback_query(IsCallback(CommandCodes.EDIT_TASK_TEXT.value))
    async def edit_task_text_callback(
        callback: CallbackQuery, argument: str, chat_state: ChatState, message: Message
        ):
        chat_state.prompts[message.message_id] = Prompt(
            prompt_type=PromptType.TASK_TEXT,
            prompt_data={"task_id": int(argument)}
        )
        await save_state(chat_state)
        await message.edit_text(
            text=_("You are going to change task #{0} text.\nSend new text in reply to this message.".format(argument))
        )
        await message.edit_reply_markup(
            reply_markup=InlineKeyboardMarkup(
                inline_keyboard=[[
                    InlineKeyboardButton(
                        text=_("Cancel"),
                        callback_data=f"{CommandCodes.CANCEL_PROMPT.value} {argument}"
                    )
                ]]
            )
        )

    @router.callback_query(IsCallback(CommandCodes.CANCEL_PROMPT.value))
    async def cancel_prompt_callback(
        callback: CallbackQuery, argument: str, chat_state: ChatState, message: Message
        ):
        del chat_state.prompts[message.message_id]
        await save_state(chat_state)
        await edit_task_callback(callback, argument, chat_state, message)

    @router.callback_query(IsCallback(CommandCodes.DELETE_TASK.value))
    async def delete_task_callback(
        callback: CallbackQuery, argument: str, chat_state: ChatState, message: Message
        ):
        del chat_state.tasks[int(argument)]
        await save_state(chat_state)
        updated = make_task_menu_message(chat_state)
        await message.edit_text(updated["text"])
        await message.edit_reply_markup(reply_markup=updated["reply_markup"])

    @router.message(HasChatState(), IsPromptReply(PromptType.TASK_TEXT), HasMessageText())
    async def set_task_text(message: Message, chat_state: ChatState,
                                 message_text: str, prompt_id: int):
        task_id = chat_state.prompts[prompt_id].prompt_data["task_id"]
        chat_state.tasks[task_id].text = message_text
        del chat_state.prompts[prompt_id]
        await save_state(chat_state)

        await bot.delete_message(chat_id=chat_state.chat_id, message_id=prompt_id)

        menu_message = make_task_menu_message(chat_state)
        await bot.send_message(chat_id=chat_state.chat_id, text=menu_message["text"], reply_markup=menu_message["reply_markup"])


    @router.message(HasChatState(), IsPromptReply(PromptType.TASK_DEADLINE), HasMessageText())
    async def set_task_deadline(message: Message, chat_state: ChatState,
                                 message_text: str, prompt_id: int):
        task_id = chat_state.prompts[prompt_id].prompt_data["task_id"]
        deadline = datetime.strptime(message_text, "%d.%m.%Y %H:%M")
        if chat_state.default_time_zone == None:
            await message.reply("You should set the chat default time zone first")
            return
        deadline = deadline.replace(tzinfo=timezone(chat_state.default_time_zone))
        chat_state.tasks[task_id].deadline = deadline
        del chat_state.prompts[prompt_id]
        await save_state(chat_state)

        await bot.delete_message(chat_id=chat_state.chat_id, message_id=prompt_id)

        menu_message = make_task_menu_message(chat_state)
        await bot.send_message(chat_id=chat_state.chat_id, text=menu_message["text"], reply_markup=menu_message["reply_markup"])

    @router.message(HasChatState(), IsPromptReply(PromptType.TASK_ASSIGNEES), HasMessageText())
    async def set_task_assignees(message: Message, chat_state: ChatState,
                                 message_text: str, prompt_id: int):
        task_id = chat_state.prompts[prompt_id].prompt_data["task_id"]
        assignees = message_text.split()
        for assignee in assignees:
            await get_user(chat_state, assignee)
        chat_state.tasks[task_id].assignees = assignees
        del chat_state.prompts[prompt_id]
        await save_state(chat_state)

        await bot.delete_message(chat_id=chat_state.chat_id, message_id=prompt_id)

        menu_message = make_task_menu_message(chat_state)
        await bot.send_message(chat_id=chat_state.chat_id, text=menu_message["text"], reply_markup=menu_message["reply_markup"])

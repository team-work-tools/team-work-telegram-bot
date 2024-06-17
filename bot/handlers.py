import json
import logging
from datetime import datetime
from textwrap import dedent

from aiogram import Bot, Router, html
from aiogram.enums import ParseMode
from aiogram.filters.command import Command
from aiogram.types import Message
from aiogram.utils.i18n import gettext as _
from apscheduler.schedulers.asyncio import AsyncIOScheduler

from .commands import bot_command_names
from .constants import (day_of_week_to_num, day_of_week_pretty, iso8601,
                        sample_time, time_url)
from .custom_types import LoadState, SaveState, SendMessage
from .filters import HasChatState, HasMessageText, HasMessageUserUsername
from .meeting import schedule_meeting
from .messages import make_help_message
from .state import User, load_user, save_user
from .state import ChatState, save_state


def make_router(scheduler: AsyncIOScheduler, send_message: SendMessage):
    router = Router()

    handle_global_commands(
        scheduler=scheduler, send_message=send_message, router=router
    )

    handle_team_settings_commands(
        scheduler=scheduler, send_message=send_message, router=router
    )

    handle_personal_settings_commands(
        scheduler=scheduler, send_message=send_message, router=router
    )

    handle_info_commands(scheduler=scheduler, send_message=send_message, router=router)

    return router


def handle_global_commands(
        scheduler: AsyncIOScheduler, send_message: SendMessage, router: Router
):
    @router.message(Command(bot_command_names.start), HasChatState())
    async def start(message: Message, chat_state: ChatState):
        await get_help(message=message, chat_state=chat_state)

    @router.message(Command(bot_command_names.help), HasChatState())
    async def get_help(message: Message, chat_state: ChatState):
        await message.reply(make_help_message())


def handle_team_settings_commands(
        scheduler: AsyncIOScheduler, send_message: SendMessage, router: Router
):
    @router.message(
        Command(bot_command_names.set_meetings_time), HasMessageText(), HasChatState()
    )
    async def set_meetings_time(
            message: Message, message_text: str, chat_state: ChatState
    ):
        meeting_time_str = message_text.split(" ", 1)

        try:
            meeting_time = datetime.fromisoformat(meeting_time_str[1])
            chat_state.meeting_time = meeting_time
            await save_state(chat_state=chat_state)

            schedule_meeting(
                meeting_time=meeting_time,
                chat_id=chat_state.chat_id,
                scheduler=scheduler,
                send_message=send_message,
            )

            await message.reply(
                _(
                    "OK, we'll meet at {meeting_time} on {week_days} starting than on {start_date}!"
                ).format(
                    meeting_time=html.bold(meeting_time.strftime("%H:%M")),
                    week_days=html.bold(day_of_week_pretty),
                    start_date=html.bold(meeting_time.strftime("%Y-%m-%d")),
                )
            )
        except Exception as e:
            await message.reply(
                dedent(
                    _(
                        """
                        Please write the meetings time in the {iso8601} format with an offset relative to the UTC time zone.
                        
                        You can calculate the time on the site {time_url}.
                        
                        Example:
                        
                        /{set_meetings_time} {sample_time}
                        """
                    ).format(
                        iso8601=iso8601,
                        time_url=time_url,
                        set_meetings_time=bot_command_names.set_meetings_time,
                        sample_time=sample_time,
                    )
                )
            )


def handle_personal_settings_commands(
        scheduler: AsyncIOScheduler, send_message: SendMessage, router: Router
):
    @router.message(
        Command(bot_command_names.join), HasMessageUserUsername(), HasChatState()
    )
    async def subscribe(message: Message, username: str, chat_state: ChatState):
        if username in chat_state.joined_users:
            await message.reply(
                _("You've already joined, @{username}!").format(username=username)
            )
        else:
            chat_state.joined_users.add(username)
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
        if username in chat_state.joined_users:
            chat_state.joined_users.remove(username)
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

            days_num = set()

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

            user = await load_user(username=username)
            user.meeting_days = days_num
            await save_user(user=user)

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
            
            user = await load_user(username=username)
            user.reminder_period = period_minutes
            await save_user(user=user)

            await message.reply(
                _(
                    "Reminder period set to {period} minutes"
                ).format(
                    period=period_minutes
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

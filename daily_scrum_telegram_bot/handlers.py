from datetime import datetime
from aiogram import Router, html, Bot
from aiogram.filters.command import Command
from aiogram.types import Message
from .state import ChatState, save_state
from .filters import HasMessageText, HasMessageUserUsername, HasChatState
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from .meeting import schedule_meeting
from .custom_types import SendMessage, SaveState, LoadState
from .constants import (
    day_of_week_pretty,
    datetime_time_format,
    time_format_link,
)
from .commands import bot_command_names
from .messages import make_help_message
from textwrap import dedent
import logging


def make_router(scheduler: AsyncIOScheduler, send_message: SendMessage):
    router = Router()

    @router.message(Command(bot_command_names.help), HasChatState())
    async def get_help(message: Message, chat_state: ChatState):
        await message.reply(make_help_message(language=chat_state.language))

    @router.message(Command(bot_command_names.start), HasChatState())
    async def start(message: Message, chat_state: ChatState):
        await get_help(message=message, chat_state=chat_state)

    @router.message(
        Command(bot_command_names.subscribe), HasMessageUserUsername(), HasChatState()
    )
    async def subscribe(message: Message, username: str, chat_state: ChatState):
        if username in chat_state.subscribed_users:
            await message.reply(f"You're already subscribed, @{username}!")
        else:
            chat_state.subscribed_users.add(username)
            await save_state(chat_state=chat_state)
            await message.reply(f"You've been subscribed, @{username}!")

    @router.message(Command(bot_command_names.get_subscribers), HasChatState())
    async def get_subscribers(message: Message, chat_state: ChatState):
        if chat_state.subscribed_users:
            await message.reply(
                ", ".join([f"@{x}" for x in chat_state.subscribed_users])
            )
        else:
            await message.reply(
                dedent(
                    f"""
                    Nobody has subscribed yet :(
                    You can subscribe via the /{bot_command_names.subscribe} command!
                    """
                )
            )

    @router.message(
        Command(bot_command_names.unsubscribe), HasMessageUserUsername(), HasChatState()
    )
    async def unsubscribe(message: Message, username: str, chat_state: ChatState):
        if username in chat_state.subscribed_users:
            chat_state.subscribed_users.remove(username)
            await save_state(chat_state=chat_state)
            await message.reply(f"You've been unsubscribed, @{username}!")
        else:
            await message.reply(f"You're not subscribed anyway, @{username}!")

    @router.message(
        Command(bot_command_names.set_meeting_time), HasMessageText(), HasChatState()
    )
    async def set_meeting_time(
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
                dedent(
                    f"""
                OK, we'll meet at {html.bold(meeting_time.strftime('%H:%M'))} on {html.bold(day_of_week_pretty)} starting not earlier than on {html.bold(meeting_time.strftime('%Y-%m-%d'))}!
                """
                )
            )
        except Exception as e:
            await message.reply(
                f"Please provide the time in the {time_format_link} format."
            )

    return router

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
    BotCommands,
    day_of_week_pretty,
    datetime_time_format,
    time_format_link,
)
from .messages import bot_message
from textwrap import dedent
import logging


def make_router(scheduler: AsyncIOScheduler, send_message: SendMessage):
    router = Router()

    @router.message(Command(BotCommands.help_), HasChatState())
    async def get_help(message: Message, chat_state: ChatState):
        await message.reply(bot_message)

    @router.message(Command(BotCommands.start), HasChatState())
    async def start(message: Message, chat_state: ChatState):
        await get_help(message=message, chat_state=chat_state)

    @router.message(
        Command(BotCommands.subscribe), HasMessageUserUsername(), HasChatState()
    )
    async def subscribe(message: Message, username: str, chat_state: ChatState):
        if username in chat_state.subscribed_users:
            await message.reply(f"You're already subscribed, @{username}!")
        else:
            chat_state.subscribed_users.add(username)
            await save_state(chat_state=chat_state)
            await message.reply(f"You've been subscribed, @{username}!")
            
    @router.message(
        
    )

    @router.message(
        Command(BotCommands.unsubscribe), HasMessageUserUsername(), HasChatState()
    )
    async def unsubscribe(message: Message, username: str, chat_state: ChatState):
        if username in chat_state.subscribed_users:
            chat_state.subscribed_users.remove(username)
        await save_state(chat_state=chat_state)
        await message.reply(f"You've been unsubscribed, @{username}!")

    @router.message(
        Command(BotCommands.set_meeting_time), HasMessageText(), HasChatState()
    )
    async def set_meeting_time(
        message: Message, message_text: str, chat_state: ChatState
    ):
        meeting_time_str = message_text.split(" ", 1)

        try:
            meeting_time = datetime.fromisoformat(meeting_time_str[1])
            chat_state.meeting_time = meeting_time
            await save_state(chat_state=chat_state)

            if 0 <= meeting_time.weekday() <= 4:
                schedule_meeting(
                    meeting_time=meeting_time,
                    chat_id=chat_state.chat_id,
                    scheduler=scheduler,
                    send_message=send_message,
                )

                await message.reply(
                    dedent(
                        f"""
                    OK, I've scheduled the first meeting for {html.bold(meeting_time.strftime(datetime_time_format))}!
                    I'll schedule subsequent meetings also at this time.
                    """
                    )
                )
            else:
                await message.reply(
                    dedent(
                        f"""
                    The date should be a working day!
                    Working days are {day_of_week_pretty}.
                    """
                    )
                )
        except Exception as e:
            await message.reply(
                f"Please provide the time in the {time_format_link} format."
            )

    return router

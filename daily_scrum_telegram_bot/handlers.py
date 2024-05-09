from datetime import datetime
from aiogram import Router, html
from aiogram.filters.command import Command
from aiogram.types import Message
from .state import State, save_state
from .filters import HasMessageText, HasMessageUserUsername
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from .meeting import schedule_meeting
from .custom_types import SendMessage, SaveState, LoadState
from .constants import (
    BotCommands,
    user_time_format_pretty,
    day_of_week_pretty,
    datetime_time_format,
    utc_time_link,
)
from .messages import bot_message
from .middlewares import MessageMiddleware


def make_router(scheduler: AsyncIOScheduler, send_message: SendMessage):
    router = Router()
    router.message.middleware(MessageMiddleware(scheduler=scheduler))

    @router.message(Command(BotCommands.help_))
    async def get_help(message: Message, state: State):
        await save_state(state=state)
        await message.reply(bot_message)

    @router.message(Command(BotCommands.start))
    async def start(message: Message, state: State):
        await get_help(message=message, state=state)

    @router.message(Command(BotCommands.subscribe), HasMessageUserUsername())
    async def subscribe(message: Message, username: str, state: State):
        if username in state.subscribed_users:
            await message.reply(f"You're already subscribed, @{username}!")
        else:
            state.subscribed_users.add(username)
            await save_state(state)
            await message.reply(f"You've been subscribed, @{username}!")

    @router.message(Command(BotCommands.unsubscribe), HasMessageUserUsername())
    async def unsubscribe(message: Message, username: str, state: State):
        if username in state.subscribed_users:
            state.subscribed_users.remove(username)
        await save_state(state)
        await message.reply(f"You've been unsubscribed, @{username}!")

    @router.message(Command(BotCommands.set_meeting_time), HasMessageText())
    async def set_meeting_time(
        message: Message, message_text: str, scheduler: AsyncIOScheduler, state: State
    ):
        meeting_time_str = message_text.split(" ", 1)

        try:
            meeting_time = datetime.strptime(meeting_time_str[1], datetime_time_format)
            state.meeting_time = meeting_time
            await save_state(state=state)

            if 0 <= meeting_time.weekday() <= 4:
                schedule_meeting(
                    meeting_time=meeting_time,
                    chat_id=state.chat_id,
                    scheduler=scheduler,
                    send_message=send_message,
                )

                await message.reply(
                    f"""
                    OK, I've scheduled the first meeting for {html.bold(meeting_time.strftime(datetime_time_format))}!
                    """
                )
            else:
                await message.reply(
                    f"""
                    The date should be a working day!
                    Working days are {day_of_week_pretty}.
                    """
                )
        except Exception as e:
            print(e)
            await message.reply(
                f"Please provide the {utc_time_link} in the format {user_time_format_pretty}."
            )

    return router

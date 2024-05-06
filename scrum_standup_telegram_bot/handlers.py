from datetime import datetime
from aiogram import Router
from aiogram.filters.command import Command
from aiogram.types import Message
from .state import State
from .filters import HasMessageText, HasMessageUserUsername
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from .standup import schedule_standup
from .types import SendMessage, SaveState, LoadState
from .constants import command_names, time_format
from textwrap import dedent

router = Router()

bot_message = dedent(
    f"""
I can help you conduct daily SCRUM stand-up meetings.

You can control me by sending these commands:

/{command_names.start} - enable me
/{command_names.help_} - get this help message
/{command_names.set_standup_meeting_time} - set meeting time in the format HH:MM
/{command_names.subscribe} - allow mentioning you during meetings
/{command_names.unsubscribe} - disallow mentioning you during meetings

Meetings will be conducted at the set time on Monday-Friday.
I'll send three messages that mention subscribed persons.

Please reply to all messages that mention you
so that your teammates can learn about your progress and plans
and can help you resolve problems.
"""
)


@router.message(Command(command_names.help_))
async def get_help(message: Message, state: State, save_state: SaveState):
    state.chat_id = message.chat.id
    save_state(state)
    await message.reply(bot_message)


@router.message(Command(command_names.start))
async def start(message: Message, state: State, save_state: SaveState):
    await get_help(message=message, state=state, save_state=save_state)


@router.message(Command(command_names.subscribe), HasMessageUserUsername())
async def subscribe(
    message: Message, username: str, state: State, save_state: SaveState
):
    if username in state.subscribed_users:
        await message.reply(f"You're already subscribed, @{username}!")
    else:
        state.subscribed_users.add(username)
        save_state(state)
        await message.reply(f"You've been subscribed, @{username}!")


@router.message(Command(command_names.unsubscribe), HasMessageUserUsername())
async def unsubscribe(
    message: Message, username: str, state: State, save_state: SaveState
):
    state.subscribed_users.remove(username)
    save_state(state)
    await message.reply(f"You've been unsubscribed, @{username}!")


@router.message(Command(command_names.set_standup_meeting_time), HasMessageText())
async def set_standup_time(
    message: Message,
    message_text: str,
    scheduler: AsyncIOScheduler,
    load_state: LoadState,
    save_state: SaveState,
    send_message: SendMessage,
):
    standup_time = message_text.split(" ", 1)

    try:
        standup_time_parsed = datetime.strptime(standup_time[1], "%H:%M")

        schedule_standup(
            standup_time=standup_time_parsed,
            scheduler=scheduler,
            load_state=load_state,
            save_state=save_state,
            send_message=send_message,
        )
        await message.reply(
            f"I've just set stand-up meeting time to {standup_time_parsed.hour:02d}:{standup_time_parsed.minute:02d} for Monday - Friday!"
        )
    except Exception:
        await message.reply(f"Please provide the time in the {time_format} format.")

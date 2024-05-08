from datetime import datetime
from aiogram import Router
from aiogram.filters.command import Command
from aiogram.types import Message
from .state import State
from .filters import HasMessageText, HasMessageUserUsername
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from .standup import schedule_standup
from .custom_types import SendMessage, SaveState, LoadState
from .constants import command_names, time_format, day_of_week_pretty, bot_message

router = Router()


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


@router.message(Command(command_names.set_meeting_time), HasMessageText())
async def set_meeting_time(
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
            f"I've scheduled meetings for {standup_time_parsed.hour:02d}:{standup_time_parsed.minute:02d} on {day_of_week_pretty}!"
        )
    except Exception:
        await message.reply(f"Please provide the time in the {time_format} format.")

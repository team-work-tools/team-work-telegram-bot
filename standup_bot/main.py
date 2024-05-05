import asyncio
import logging
import sys
import json
from os import getenv

from aiogram import Bot, Dispatcher, Router, html
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart
from aiogram.types import Message, User

from typing import TypeVar, Optional, Callable, Awaitable
from dataclasses import dataclass
from dataclass_wizard import JSONWizard
import aioschedule

from aiogram import F
import handlers

TOKEN = getenv("BOT_TOKEN")
STATE_FILE = getenv("STATE_FILE")

dp = Dispatcher()


# TODO pass state to functions
# https://stackoverflow.com/a/66886779


# Handle the standup messages
async def send_standup_messages():
    for username in subscribed_users:
        await bot.send_message(chat_id, f"@{username}, what did you do yesterday?")
        await bot.send_message(chat_id, f"@{username}, what will you do today?")
        await bot.send_message(
            chat_id, f"@{username}, what (if anything) is blocking your progress?"
        )


async def scheduler():
    while True:
        await aioschedule.run_pending()
        await asyncio.sleep(1)


async def on_startup():
    asyncio.create_task(scheduler())



async def main() -> None:
    if TOKEN is None:
        raise ValueError("TOKEN environment variable is not set")
    if STATE_FILE is None:
        raise ValueError("STATE_FILE environment variable is not set")

    # def save_state(state: State):
    #     save_state(state, STATE_FILE)

    bot = Bot(token=TOKEN, default=DefaultBotProperties(parse_mode=ParseMode.HTML))
    dp.include_router(handlers.router)
    dp.startup.register(on_startup)

    await bot.delete_webhook(drop_pending_updates=True)
    await dp.start_polling(bot)


if __name__ == "__main__":
    # https://ru.stackoverflow.com/a/1190848
    # executor.start_polling(dp, skip_updates=False, on_startup=on_startup)
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(main())

import asyncio
import logging
import sys
from os import getenv
from pathlib import Path
from aiogram import Bot, Dispatcher, Router
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from . import handlers
from .state import State, save_state
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from .state import load_state
from .middlewares import HasScheduler, HasSendMessage, HasState
from .meeting import schedule_meeting
from .custom_types import SendMessage
from .constants import EnvVariables, BotCommands, AppCommands, BotDataFiles


BOT_TOKEN = getenv(EnvVariables.BOT_TOKEN)
BOT_DATA_DIRECTORY = getenv(EnvVariables.BOT_DATA_DIRECTORY)

dp = Dispatcher()


def get_variable_name(expr: str) -> str:
    return expr.split("=")[0]


def init_state(state_file: Path) -> State:
    if not state_file.exists():
        state = State()
        save_state(state, state_file)
        return state
    return load_state(state_file)


def add_middlewares(
    router: Router,
    state_file: Path,
    scheduler: AsyncIOScheduler,
    send_message: SendMessage,
) -> None:
    router.message.middleware(
        HasState(
            load_state=lambda: load_state(state_file=state_file),
            save_state=lambda state: save_state(state=state, state_file=state_file),
        )
    )

    router.message.middleware(HasScheduler(scheduler=scheduler))

    router.message.middleware(HasSendMessage(send_message=send_message))


async def run_main() -> None:
    if BOT_TOKEN is None:
        raise ValueError(
            f"The '{EnvVariables.BOT_TOKEN}' environment variable is not set"
        )
    if BOT_DATA_DIRECTORY is None:
        raise ValueError(
            f"The '{EnvVariables.BOT_DATA_DIRECTORY}' environment variable is not set"
        )

    state_file = Path(BOT_DATA_DIRECTORY) / BotDataFiles.state_file
    state_file.parent.mkdir(parents=True, exist_ok=True)
    state = init_state(state_file=state_file)

    scheduler = AsyncIOScheduler()
    scheduler.start()

    bot = Bot(token=BOT_TOKEN, default=DefaultBotProperties(parse_mode=ParseMode.HTML))

    async def send_message(message: str, state: State):
        # Should send a message to the most recent chat_id
        match state.chat_id:
            # TODO handle missing chat_id somehow
            case None:
                print(
                    f"Could not retrive a chat id. Please add the bot to a chat and run /{BotCommands.start}"
                )
            case _:
                return await bot.send_message(chat_id=state.chat_id, text=message)

    if state.meeting_time and state.chat_id:
        schedule_meeting(
            meeting_time=state.meeting_time,
            scheduler=scheduler,
            load_state=lambda: load_state(state_file=state_file),
            save_state=lambda state: save_state(state=state, state_file=state_file),
            send_message=send_message,
        )

    add_middlewares(
        router=handlers.router,
        state_file=state_file,
        scheduler=scheduler,
        send_message=send_message,
    )

    dp.include_router(handlers.router)

    # drop all incoming messages
    await bot.delete_webhook(drop_pending_updates=True)

    # start bot
    await dp.start_polling(bot)


def main():
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(run_main())


if __name__ == "__main__":
    main()

from pathlib import Path
from aiogram import Bot, Dispatcher, Router
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from . import handlers
from .state import State, save_state
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from .state import load_state
from .middlewares import MessageMiddleware
from .meeting import schedule_meeting
from .custom_types import SendMessage, ChatId
from .settings import Settings
from . import db
from apscheduler.jobstores.mongodb import MongoDBJobStore

dp = Dispatcher()


def init_scheduler(settings: Settings) -> AsyncIOScheduler:

    jobstores = {
        "mongo": MongoDBJobStore(host=settings.mongo_host, port=settings.mongo_port)
    }

    # TODO set timezone UTC
    scheduler = AsyncIOScheduler(jobstores=jobstores)
    scheduler.start()
    return scheduler


async def restore_scheduled_jobs(
    scheduler: AsyncIOScheduler, send_message: SendMessage
):
    states = await State.find_all().to_list()

    for state in states:
        if state.meeting_time:
            schedule_meeting(
                meeting_time=state.meeting_time,
                chat_id=state.chat_id,
                scheduler=scheduler,
                send_message=send_message,
            )


async def main(settings: Settings) -> None:
    await db.main(settings=settings)

    bot = Bot(
        token=settings.bot_token,
        default=DefaultBotProperties(parse_mode=ParseMode.HTML),
    )

    async def send_message(chat_id: ChatId, message: str):
        return await bot.send_message(chat_id=chat_id, text=message)

    scheduler = init_scheduler(settings=settings)
    await restore_scheduled_jobs(scheduler=scheduler, send_message=send_message)

    router = handlers.make_router(scheduler=scheduler, send_message=send_message)

    dp.include_router(router)

    await bot.delete_webhook(drop_pending_updates=True)

    await dp.start_polling(bot)

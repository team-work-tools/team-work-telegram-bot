from datetime import datetime
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from .custom_types import SendMessage, ChatId
from .constants import day_of_week
from .messages import make_meeting_messages
from .state import load_state, State
import logging


async def send_meeting_messages(chat_id: ChatId, send_message: SendMessage):
    state = await load_state(chat_id=chat_id)
    for username in state.subscribed_users:
        for message in make_meeting_messages(username=username):
            await send_message(chat_id=chat_id, message=message)


def make_job_id(some_id: int):
    return str(some_id)


def schedule_meeting(
    meeting_time: datetime,
    chat_id: ChatId,
    scheduler: AsyncIOScheduler,
    send_message: SendMessage,
):
    scheduler.add_job(
        func=send_meeting_messages,
        id=make_job_id(chat_id),
        replace_existing=True,
        kwargs={
            "chat_id": chat_id,
            "send_message": send_message,
        },
        trigger="cron",
        hour=meeting_time.hour,
        minute=meeting_time.minute,
        day_of_week=day_of_week,
    )

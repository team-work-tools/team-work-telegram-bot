import logging
from datetime import datetime

from aiogram.utils.i18n import gettext as _
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.interval import IntervalTrigger

from .constants import day_of_week, jobstore
from .custom_types import ChatId, SendMessage
from .messages import make_daily_messages
from .state import load_state, save_state, get_user


async def send_reminder_messages(
        meeting_chat_id: ChatId, username: str, user_chat_id: ChatId, send_message: SendMessage
):
    # TODO: send links to those messages, not just inform user

    chat_state = await load_state(chat_id=meeting_chat_id)
    user = await get_user(chat_state=chat_state, username=username)

    replies = [user.has_replied_to_msg_1, user.has_replied_to_msg_2, user.has_replied_to_msg_3]

    reminder_msg = "You forgot to answer meeting question"
    reply_msg_counter = 0
    for reply in replies:
        reply_msg_counter += 1
        if not reply:
            reminder_msg += f" {reply_msg_counter}"
    reminder_msg += "!"

    await send_message(user_chat_id, message=reminder_msg)


def make_job_id(some_id: int):
    return str(some_id)


def schedule_reminder(
        period_minutes: int,
        username: str,
        user_chad_id: ChatId,
        meeting_time: datetime,
        meeting_chat_id: ChatId,
        scheduler: AsyncIOScheduler,
        send_message: SendMessage,
):
    scheduler.add_job(
        jobstore=jobstore,
        func=send_reminder_messages,
        id=make_job_id(user_chad_id),
        replace_existing=True,
        kwargs={
            "meeting_chat_id": meeting_chat_id,
            "username": username,
            "user_chat_id": user_chad_id,
            "send_message": send_message
        },
        trigger=IntervalTrigger(minutes=period_minutes, start_date=meeting_time),
        # day_of_week=day_of_week, # TODO: make it work only on user's working days
        timezone=meeting_time.tzinfo,
        misfire_grace_time=42,
    )

    logging.info(scheduler.get_job(make_job_id(user_chad_id)))

import logging
from datetime import datetime
from typing import Optional

from apscheduler.schedulers.asyncio import AsyncIOScheduler

from .constants import days_array, jobstore
from .custom_types import ChatId, SendMessage
from .i18n import _
from .intervals import schedule_is_empty
from .messages import make_daily_messages
from .state import get_joined_users, load_state, save_state


async def send_meeting_messages(
    chat_id: ChatId,
    is_topic: Optional[bool],
    topic_id: Optional[int],
    send_message: SendMessage
):
    chat_state = await load_state(chat_id=chat_id, is_topic=is_topic, topic_id=topic_id)
    current_day_int = datetime.now().weekday()
    current_day = days_array[current_day_int]
    await send_message(
        chat_id=chat_id, message=_("Meeting time!"), message_thread_id=topic_id
    )

    joined_users = await get_joined_users(chat_state)
    today_workers = []
    for user in joined_users:
        if schedule_is_empty(user.schedule):
            schedule = chat_state.schedule
        else:
            schedule = user.schedule
        if schedule[current_day].included:
            today_workers.append(user)

    if not today_workers:
        await send_message(
            chat_id=chat_id,
            message=_("Nobody has joined the meeting!"),
            message_thread_id=topic_id,
        )
    else:

        # Creating list of joined to meeting users
        today_usernames = [f"@{user.username}" for user in today_workers]

        # Getting daily messages
        daily_messages = make_daily_messages(usernames=" ".join(today_usernames))

        # Sending daily messages
        chat_state.meeting_msg_ids = []
        for message in daily_messages:
            new_msg = await send_message(
                chat_id=chat_id, message=message, message_thread_id=topic_id
            )

            chat_state.meeting_msg_ids.append(new_msg.message_id)

        # Reset info about replies to meeting messages after assigning new meeting
        for user in today_workers:
            user.non_replied_daily_msgs = set(range(0, 3))
            user.responses = {idx: "" for idx in range(0, 3)}

        await save_state(chat_state=chat_state)


def make_job_id(chat_id: int, topic_id: Optional[int]):
    if topic_id:
        return f"{chat_id}_{topic_id}_meeting"
    else:
        return f"{chat_id}_meeting"


def schedule_meeting(
    meeting_time: datetime,
    chat_id: ChatId,
    is_topic: Optional[bool],
    topic_id: Optional[int],
    scheduler: AsyncIOScheduler,
    send_message: SendMessage,
):
    scheduler.add_job(
        jobstore=jobstore,
        func=send_meeting_messages,
        id=make_job_id(chat_id, topic_id),
        replace_existing=True,
        kwargs={"chat_id": chat_id, "is_topic": is_topic, "topic_id": topic_id, "send_message": send_message},
        trigger="cron",
        start_date=meeting_time,
        hour=meeting_time.hour,
        minute=meeting_time.minute,
        timezone=meeting_time.tzinfo,
        misfire_grace_time=42,
    )

    logging.info(scheduler.get_job(make_job_id(chat_id, topic_id)))

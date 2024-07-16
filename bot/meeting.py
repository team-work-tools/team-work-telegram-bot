import logging
from datetime import datetime, time, tzinfo
from pytz import timezone
from typing import Optional

from .i18n import _
from apscheduler.schedulers.asyncio import AsyncIOScheduler

from .constants import day_of_week, jobstore
from .custom_types import ChatId, SendMessage
from .messages import make_daily_messages
from .state import load_state, save_state, get_joined_users


async def send_meeting_messages(
        chat_id: ChatId, topic_id: Optional[int], send_message: SendMessage,
        time_zone: str | None = None
    ):
    chat_state = await load_state(chat_id=chat_id, topic_id=topic_id)
    current_day = datetime.now().weekday()
    await send_message(
        chat_id=chat_id, message=_("Meeting time!"), message_thread_id=topic_id
    )

    joined_users = await get_joined_users(chat_state)
    today_workers = [user for user in joined_users if current_day in user.meeting_days]

    if not time_zone:
        if not chat_state.default_time_zone:
            return
        time_zone = chat_state.default_time_zone

    utcoffset = timezone(time_zone).utcoffset(datetime.now())
    for user in chat_state.users.values():
        if not user.time_zone:
            continue
        personal_utcoffset = timezone(user.time_zone).utcoffset(datetime.now())
        if utcoffset != personal_utcoffset:
            today_workers.remove(user)

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

        await save_state(chat_state=chat_state)


def make_job_id(chat_id: int, topic_id: Optional[int], time_zone: Optional[tzinfo]):
    res = str(chat_id)
    if topic_id:
        res += f"_{topic_id}"
    if time_zone:
        utcoffset = time_zone.utcoffset(datetime.now())
        res += f"_{utcoffset}"
    res += "_meeting"

    return res


def schedule_meeting(
    meeting_time: time,
    chat_id: ChatId,
    topic_id: Optional[int],
    scheduler: AsyncIOScheduler,
    send_message: SendMessage,
    time_zone: str | None = None
):
    if time_zone == None:
        meeting_time_zone = meeting_time.tzinfo
    else:
        meeting_time_zone = timezone(time_zone)

    scheduler.add_job(
        jobstore=jobstore,
        func=send_meeting_messages,
        id=make_job_id(chat_id, topic_id, meeting_time_zone),
        replace_existing=True,
        kwargs={
            "chat_id": chat_id, "topic_id": topic_id,
            "send_message": send_message, "time_zone": time_zone
        },
        trigger="cron",
        start_date=datetime.now(),
        hour=meeting_time.hour,
        minute=meeting_time.minute,
        day_of_week=day_of_week,  # TODO: make it same as day of the week of any joined users or something else
        timezone=meeting_time_zone,
        misfire_grace_time=42,
    )

    logging.info(scheduler.get_job(make_job_id(chat_id, topic_id, meeting_time_zone)))

import logging
from datetime import datetime

from aiogram.utils.i18n import gettext as _
from apscheduler.schedulers.asyncio import AsyncIOScheduler

from .constants import day_of_week, jobstore
from .custom_types import ChatId, SendMessage
from .messages import make_daily_messages
from .state import load_state, save_state, get_joined_users


async def send_meeting_messages(chat_id: ChatId, send_message: SendMessage):
    chat_state = await load_state(chat_id=chat_id)
    topic_id = chat_state.topic_id
    current_day = datetime.now().weekday()
    await send_message(chat_id=chat_id, message=_("Meeting time!"), message_thread_id=topic_id)
     
    joined_users = await get_joined_users(chat_state)
    today_workers = [user for user in joined_users if current_day in user.meeting_days]
    if not today_workers:
        await send_message(chat_id=chat_id, message=_("Nobody has joined the meeting!"), message_thread_id=topic_id)
    else:

        # Creating list of joined to meeting users
        today_usernames = []
        for user in today_workers:
            today_usernames.append(f"@{user.username}")

        # Getting daily messages
        daily_messages = make_daily_messages(usernames=" ".join(today_usernames))

        # Sending daily messages
        msg_counter = 0
        for message in daily_messages:
            msg_counter += 1
            msg_key = f"meeting_msg_id_{msg_counter}"

            new_msg = await send_message(chat_id=chat_id, message=message, message_thread_id=topic_id)

            setattr(chat_state, msg_key, new_msg.message_id)

        # Reset info about replies to meeting messages after assigning new meeting
        for user in today_workers:
            for msg_counter in range(1, len(daily_messages) + 1):
                reply_msg_key = f"has_replied_to_msg_{msg_counter}"
                setattr(user, reply_msg_key, False)

        await save_state(chat_state=chat_state)


def make_job_id(some_id: int):
    return str(some_id)


def schedule_meeting(
    meeting_time: datetime,
    chat_id: ChatId,
    scheduler: AsyncIOScheduler,
    send_message: SendMessage,
):
    scheduler.add_job(
        jobstore=jobstore,
        func=send_meeting_messages,
        id=make_job_id(chat_id),
        replace_existing=True,
        kwargs={"chat_id": chat_id, "send_message": send_message},
        trigger="cron",
        start_date=meeting_time,
        hour=meeting_time.hour,
        minute=meeting_time.minute,
        day_of_week=day_of_week,  # TODO: make it same as day of the week of any joined users or something else
        timezone=meeting_time.tzinfo,
        misfire_grace_time=42,
    )

    logging.info(scheduler.get_job(make_job_id(chat_id)))

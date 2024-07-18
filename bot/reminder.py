import logging
from datetime import datetime, timedelta
from typing import Optional

from aiogram import Bot
from aiogram.exceptions import TelegramBadRequest, TelegramForbiddenError
from aiogram.utils.i18n import gettext as _
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.interval import IntervalTrigger

from .constants import days_array, jobstore
from .custom_types import ChatId, SendMessage
from .i18n import _
from .intervals import schedule_is_empty
from .messages import make_daily_messages
from .state import ChatState, get_user, load_state, load_user_pm, save_state


async def send_reminder_messages(
    meeting_chat_id: ChatId,
    is_topic: Optional[bool],
    meeting_topic_id: Optional[int],
    username: str,
    user_chat_id: ChatId,
    send_message: SendMessage,
    bot: Bot
):
    chat = await bot.get_chat(meeting_chat_id)
    chat_state = await load_state(chat_id=meeting_chat_id, is_topic=is_topic, topic_id=meeting_topic_id)
    user = await get_user(chat_state=chat_state, username=username)

    current_day = datetime.now().weekday()
    current_day = days_array[current_day]
    if schedule_is_empty(user.schedule) and schedule_is_empty(chat_state.schedule):
        pass
    else:
        if schedule_is_empty(user.schedule):
            schedule = chat_state.schedule
        else:
            schedule = user.schedule
        if not schedule[current_day].included:
            return

    have_to_reply = list(user.non_replied_daily_msgs)
    messages = make_daily_messages("")
    reminder_message = _("Please reply to these daily meeting questions:")
    chat_type = chat.type

    if len(have_to_reply) == 0:
        return

    msgs_are_deleted = await messages_are_deleted(bot, meeting_chat_id, chat_state.meeting_msg_ids)
    for i, deleted in enumerate(msgs_are_deleted):
        if deleted:
            have_to_reply.remove(i)
    user.non_replied_daily_msgs = set(have_to_reply)

    try:
        for reply in have_to_reply:

            if len(chat_state.meeting_msg_ids) == 3:  # messages to be replied exist
                message_id = chat_state.meeting_msg_ids[reply]

                msg_link = get_message_link(
                    chat_id=meeting_chat_id,
                    message_id=message_id,
                    thread_id=chat_state.topic_id,
                    chat_type=chat_type,
                )
                if msg_link:  # supergroup
                    reminder_message += "\n" + messages[reply] + msg_link

                else:  # group chanel or private
                    reminder_message = messages[reply]
                    if (
                        chat_type == "private"
                    ):  # message to be replied is in the same chat as user's PM
                        await bot.send_message(
                            chat_id=user_chat_id,
                            text=reminder_message,
                            reply_to_message_id=message_id,
                        )
                    else:  # message to be replied is in the group, so you can't use user's PM to reply, use the group
                        await bot.send_message(
                            chat_id=meeting_chat_id,
                            text=reminder_message,
                            reply_to_message_id=message_id,
                        )

        if chat_type == "supergroup" and len(chat_state.meeting_msg_ids) == 3 and len(have_to_reply) > 0:
            await send_message(chat_id=user_chat_id, message=reminder_message)

    except TelegramForbiddenError:
        bot_info = await bot.get_me()
        bot_username = bot_info.username

        if chat_type != "private":
            banned_msg = _(
                            "@{username}, please unblock @{bot_username} (it's me) in our private chat "
                            "so that I can send you reminders about missed daily meeting questions."
            ).format(username=username, bot_username=bot_username)

            await send_message(chat_id=meeting_chat_id, message=banned_msg)

    await save_state(chat_state=chat_state)


async def update_reminders(
    bot: Bot,
    username: Optional[str],
    scheduler: AsyncIOScheduler,
    send_message: SendMessage,
) -> None:

    chats = await ChatState.find_all().to_list()

    if not username:
        return

    for chat in chats:
        user = chat.users.get(username)
        user_pm = await load_user_pm(username)

        if not (user and user_pm):
            continue

        if chat.meeting_time and user.reminder_period:
            is_topic = chat.topic_id is not None
            schedule_reminder(
                bot=bot,
                period_minutes=user.reminder_period,
                username=username,
                user_chad_id=user_pm.chat_id,
                meeting_time=chat.meeting_time + timedelta(minutes=1),
                is_topic=is_topic,
                meeting_chat_id=chat.chat_id,
                meeting_topic_id=chat.topic_id,
                scheduler=scheduler,
                send_message=send_message,
            )


def make_job_id(user_chat_id: int, meeting_chat_id: int, meeting_topic_id: Optional[int]):
    if meeting_topic_id:
        return f"{user_chat_id}_reminder_for_{meeting_chat_id}_{meeting_topic_id}"
    else:
        return f"{user_chat_id}_reminder_for_{meeting_chat_id}"


def schedule_reminder(
    bot: Bot,
    period_minutes: int,
    username: str,
    user_chad_id: ChatId,
    meeting_time: datetime,
    meeting_chat_id: ChatId,
    is_topic: Optional[bool],
    meeting_topic_id: Optional[int],
    scheduler: AsyncIOScheduler,
    send_message: SendMessage,
):
    scheduler.add_job(
        jobstore=jobstore,
        func=send_reminder_messages,
        id=make_job_id(user_chad_id, meeting_chat_id, meeting_topic_id),
        replace_existing=True,
        kwargs={
            "meeting_chat_id": meeting_chat_id,
            "is_topic": is_topic,
            "meeting_topic_id": meeting_topic_id,
            "username": username,
            "user_chat_id": user_chad_id,
            "send_message": send_message,
            "bot": bot,
        },
        trigger=IntervalTrigger(minutes=period_minutes, start_date=meeting_time),
        timezone=meeting_time.tzinfo,
        misfire_grace_time=42,
    )

    logging.info(
        scheduler.get_job(make_job_id(user_chad_id, meeting_chat_id, meeting_topic_id))
    )


def get_message_link(
    chat_id: ChatId, message_id: ChatId, thread_id: Optional[int], chat_type: str
):
    match chat_type:
        case "supergroup":
            chat_id_normalized = str(chat_id)[4:]
            if thread_id:
                return f"https://t.me/c/{chat_id_normalized}/{thread_id}/{message_id}"
            else:
                return f"https://t.me/c/{chat_id_normalized}/{message_id}"
        case "private", "group", "channel":
            return None


async def messages_are_deleted(bot: Bot, chat_id: ChatId, msg_ids: list[int]) -> list[bool]:
    result: list[bool] = []

    for msg_id in msg_ids:
        try:
            msg = await bot.forward_message(chat_id=chat_id, from_chat_id=chat_id, message_id=msg_id)
            await bot.delete_message(chat_id=chat_id, message_id=msg.message_id)
            result.append(False)
        except TelegramBadRequest:
            result.append(True)

    return result

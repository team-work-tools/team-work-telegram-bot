import logging

from typing import Optional, Dict, Annotated

import pymongo
from aiogram import Router, Bot
from aiogram.fsm.context import FSMContext
from aiogram.types import Message
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from aiogram.utils.i18n import gettext as _
from apscheduler.triggers.date import DateTrigger
from beanie import Indexed
from cron_descriptor import get_description

from .chat import ChatId
from .constants import jobstore, title_max_length
from croniter import croniter
from datetime import datetime, timezone, timedelta

from bot.custom_types import SendMessage
from bot.fsm_states import RecurringAddingState
from .data_types import RecurringData
from .filters import HasChatState
from .schedulerUtils import make_recurring_job_id
from .state import ChatState, save_state
from aiogram.utils import markdown as fmt


async def update_recurring_message(
    bot: Bot,
    scheduler: AsyncIOScheduler,
    send_message: SendMessage,
) -> None:
    chats = await ChatState.find_all().to_list()

    for chat in chats:
        if chat:
            for title, message in chat.recurring_messages.items():
                if message:
                    schedule_recurring(
                        bot=bot,
                        title=title,
                        interval_start=message.interval_start,
                        interval_end=message.interval_end,
                        expression=message.expression,
                        text=message.text,
                        meeting_chat_id=chat.chat_id,
                        meeting_topic_id=chat.topic_id,
                        scheduler=scheduler,
                        send_message=send_message,
                        shift=chat.time_zone_shift,
                    )


def schedule_recurring(
    bot: Bot,
    title: str,
    interval_start: datetime,
    interval_end: datetime,
    expression: str,
    text: str,
    meeting_chat_id: ChatId,
    meeting_topic_id: Optional[int],
    scheduler: AsyncIOScheduler,
    send_message: SendMessage,
    shift: int,
):
    scheduler.add_job(
        jobstore=jobstore,
        func=send_recurring_messages,
        id=make_recurring_job_id(title, meeting_chat_id, meeting_topic_id),
        replace_existing=True,
        kwargs={
            "scheduler": scheduler,
            "meeting_chat_id": meeting_chat_id,
            "meeting_topic_id": meeting_topic_id,
            "title": title,
            "expression": expression,
            "text": text,
            "interval_start": interval_start,
            "interval_end": interval_end,
            "send_message": send_message,
            "bot": bot,
            "shift": shift,
        },
        trigger=DateTrigger(
            run_date=croniter(
                expression,
                max(
                    interval_start.replace(tzinfo=timezone(timedelta(hours=3 - shift))),
                    datetime.now(tz=timezone(timedelta(hours=3 - shift))),
                ),
            ).get_next(datetime)
        ),
        timezone=timezone(timedelta(hours=3 - shift)),
        misfire_grace_time=42,
    )

    logging.info(
        scheduler.get_job(
            make_recurring_job_id(title, meeting_chat_id, meeting_topic_id)
        )
    )


async def send_recurring_messages(
    scheduler: AsyncIOScheduler,
    meeting_chat_id: ChatId,
    meeting_topic_id: Optional[int],
    title: str,
    expression: str,
    text: str,
    interval_start: datetime,
    interval_end: datetime,
    send_message: SendMessage,
    bot: Bot,
    shift: int,
):
    if datetime.now() <= interval_end:
        if meeting_topic_id:
            await send_message(chat_id=meeting_topic_id, message=text)
        else:
            await send_message(chat_id=meeting_chat_id, message=text)
        scheduler.add_job(
            jobstore=jobstore,
            func=send_recurring_messages,
            id=make_recurring_job_id(title, meeting_chat_id, meeting_topic_id),
            replace_existing=True,
            kwargs={
                "scheduler": scheduler,
                "meeting_chat_id": meeting_chat_id,
                "meeting_topic_id": meeting_topic_id,
                "title": title,
                "expression": expression,
                "text": text,
                "interval_start": interval_start,
                "interval_end": interval_end,
                "send_message": send_message,
                "bot": bot,
                "shift": shift,
            },
            trigger=DateTrigger(
                run_date=croniter(
                    expression, datetime.now(tz=timezone(timedelta(hours=3 - shift)))
                ).get_next(datetime)
            ),
            timezone=timezone(timedelta(hours=3 - shift)),
            misfire_grace_time=42,
        )


def handle_recurring_message(
    scheduler: AsyncIOScheduler, send_message: SendMessage, router: Router, bot: Bot
):
    @router.message(RecurringAddingState.EnterRecurringTitle, HasChatState())
    async def handle_title(message: Message, state: FSMContext, chat_state: ChatState):
        match text := message.text:
            case str():
                if len(text) > title_max_length:
                    await message.answer(
                        _(
                            "Too long title. Send me the message title so that I can use it as the message identifier. Length limit - {N} symbols."
                        ).format(N=title_max_length)
                    )
                    return
                if message.text in chat_state.recurring_messages:
                    await message.answer(
                        _(
                            "A message cannot be created with an existing title. Send me the message title so that I can use it as the message identifier. Length limit - {N} symbols."
                        ).format(N=title_max_length)
                    )
                    return
                await state.update_data(title=message.html_text)

                await message.answer(
                    _(
                        "OK. Send me the interval so that I know when should I start and end sending the message.\n\nEnter the interval in DD.MM.YYYY - DD.MM.YYYY format. Example: "
                        + fmt.hcode("04.04.2024 - 05.05.2025")
                    )
                )

                await state.set_state(RecurringAddingState.EnterRecurringPeriod)

    @router.message(RecurringAddingState.EnterRecurringPeriod)
    async def handle_period(message: Message, state: FSMContext):
        text = message.html_text.split(" - ")
        if len(text) != 2:
            await message.answer(
                _(
                    "Wrong format.\n\nEnter the interval in DD.MM.YYYY - DD.MM.YYYY format. Example:"
                    + fmt.hcode("04.04.2024 - 05.05.2025")
                )
            )
            return
        try:
            start = datetime.strptime(text[0].strip(), "%d.%m.%Y")
            end = datetime.strptime(text[1].strip(), "%d.%m.%Y")
        except ValueError:
            await message.answer(
                _(
                    "Wrong date format.\n\nEnter the interval in DD.MM.YYYY - DD.MM.YYYY format. "
                    "Example:" + fmt.hcode("04.04.2024 - 05.05.2025")
                )
            )
            return
        if start > end:
            await message.answer(
                _(
                    "Start date should be before the end date.\n\nEnter the interval in DD.MM.YYYY - DD.MM.YYYY format. "
                    "Example:" + fmt.hcode("04.04.2024 - 05.05.2025")
                )
            )
        else:
            await state.update_data(interval_start=start, interval_end=end)

            await message.answer(
                _(
                    "ОК\\. Send me a cron expression so that I know when should I send the message\\.\n\nExample\\: `4 5 \\* \\* \\*`\\. Click [here]({}) if you need help\\."
                ).format("https://crontab.guru/"),
                parse_mode="MarkdownV2",
                disable_web_page_preview=True,
            )

            await state.set_state(RecurringAddingState.EnterRecurringExpression)

    @router.message(RecurringAddingState.EnterRecurringExpression)
    async def handle_expression(message: Message, state: FSMContext):
        try:
            temp = get_description(message.text)
        except Exception as e:
            await message.answer(
                _(
                    "Wrong format\\. Send me a cron expression so that I know when should I send the message\\.\n\nExample\\: `4 5 \\* \\* \\*`\\. Click [here]({}) if you need help\\."
                ).format("https://crontab.guru/"),
                parse_mode="MarkdownV2",
                disable_web_page_preview=True,
            )

            return
        await state.update_data(expression=message.html_text)

        await message.answer(_("ОК. Send me the message text"))

        await state.set_state(RecurringAddingState.EnterRecurringMessage)

    @router.message(RecurringAddingState.EnterRecurringMessage, HasChatState())
    async def handle_message(
        message: Message, state: FSMContext, chat_state: ChatState
    ):
        await state.update_data(text=message.html_text)

        data = await state.get_data()
        await message.answer(
            _(
                "Your message {title} will be sent in between {interval_start} and {interval_end} {expression}.\n\n"
                "Send /edit_recurring_messages to edit this and other recurring messages"
            ).format(
                title=data["title"],
                interval_start=data["interval_start"],
                interval_end=data["interval_end"],
                expression=get_description(data["expression"]).lower(),
            )
        )
        chat_state.recurring_messages[data["title"]] = RecurringData(
            title=data["title"],
            interval_start=data["interval_start"],
            interval_end=data["interval_end"],
            expression=data["expression"],
            text=data["text"],
        )
        await save_state(chat_state)

        await update_recurring_message(
            bot=bot, scheduler=scheduler, send_message=send_message
        )
        await state.clear()

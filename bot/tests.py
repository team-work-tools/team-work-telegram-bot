import pytest
from unittest.mock import AsyncMock, Mock

from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton
from aiogram import html
from datetime import datetime

from .commands import bot_command_names
from .constants import sample_time, sample_time_zone, day_of_week_pretty
from .handlers import set_time_zone, set_meetings_time
from .settings import Settings
from . import db

from textwrap import dedent


@pytest.mark.asyncio
async def test_set_timezone_blank():
    message_text = f"/{bot_command_names.set_meetings_time_zone}"
    message_mock = AsyncMock(text=message_text)
    chat_state_mock = AsyncMock(default_time_zone=None)
    await set_time_zone(message_mock, message_text, chat_state_mock, Mock(), AsyncMock())
    message_mock.reply.assert_called_with(
        dedent(
            """
            Please write your time zone.

            Examples:
            /{set_meetings_time_zone} {sample_time_zone}

            You can use button below and pass your local time, date, country or continent to get timezone hints
            """.format(
                set_meetings_time_zone=bot_command_names.set_meetings_time_zone,
                sample_time_zone=sample_time_zone,
                sample_time=sample_time
            )
        ),
        reply_markup=InlineKeyboardMarkup(inline_keyboard=[
                [InlineKeyboardButton(
                    text='Get hints',switch_inline_query_current_chat=''
                )]
            ]
        )
    )
    assert chat_state_mock.default_time_zone == None

@pytest.mark.asyncio
async def test_set_timezone_invalid():
    message_text = f"/{bot_command_names.set_meetings_time_zone} wrong"
    message_mock = AsyncMock(text=message_text)
    chat_state_mock = AsyncMock(default_time_zone=None)
    await set_time_zone(message_mock, message_text, chat_state_mock, Mock(), AsyncMock())
    message_mock.reply.assert_called_with(f"Such time zone does not exist, please chack the spelling")
    assert chat_state_mock.default_time_zone == None

@pytest.mark.asyncio
async def test_set_timezone_valid():
    message_text = f"/{bot_command_names.set_meetings_time_zone} Europe/Moscow"
    message_mock = AsyncMock(text=message_text)
    chat_state_mock = AsyncMock(default_time_zone=None)
    await set_time_zone(message_mock, message_text, chat_state_mock, Mock(), AsyncMock())
    message_mock.reply.assert_called_with(f"Chat default time zone is successfully set to Europe/Moscow")
    assert chat_state_mock.default_time_zone == "Europe/Moscow"


@pytest.mark.asyncio
async def test_set_meetings_time_blank():
    message_text = f"/{bot_command_names.set_meetings_time}"
    message_mock = AsyncMock(text=message_text)
    chat_state_mock = AsyncMock(default_time_zone="Europe/Moscow", meeting_time_hour=None, meeting_time_minute=None)
    await set_meetings_time(message_mock, message_text, chat_state_mock, Mock(), AsyncMock(), AsyncMock())
    message_mock.reply.assert_called_with(
        dedent(
            """
            Please write the meetings time in the hh:mm format.
            
            Example:
            /{set_meetings_time} {sample_time}
            """
        ).format(
            set_meetings_time=bot_command_names.set_meetings_time,
            sample_time=sample_time,
        )
    )
    assert chat_state_mock.meeting_time_hour == None
    assert chat_state_mock.meeting_time_minute == None


@pytest.mark.asyncio
async def test_set_meetings_time_valid():
    await db.main(Settings())
    message_text = f"/{bot_command_names.set_meetings_time} 08:00"
    message_mock = AsyncMock(text=message_text)
    chat_state_mock = AsyncMock(default_time_zone="Europe/Moscow", meeting_time_hour=None, meeting_time_minute=None, users={"@username": AsyncMock(time_zone=None)})
    await set_meetings_time(message_mock, message_text, chat_state_mock, Mock(), AsyncMock(), AsyncMock())
    message_mock.reply.assert_called_with(
        "OK, we'll meet at {meeting_time} on {week_days} starting not earlier than on {start_date}!"
        .format(
            start_date=html.bold(datetime.now().strftime("%Y-%m-%d")),
            meeting_time=html.bold("08:00"),
            week_days=html.bold(day_of_week_pretty)
        )
    )
    assert chat_state_mock.meeting_time_hour == 8
    assert chat_state_mock.meeting_time_minute == 0


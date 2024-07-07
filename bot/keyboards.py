from typing import Dict

from aiogram.utils.keyboard import InlineKeyboardBuilder, InlineKeyboardMarkup, InlineKeyboardButton

from .callbacks import IntervalCallback, WeekdayCallback
from .intervals import Interval, DaySchedule, DEFAULT_INTERVAL
from .constants import days_array

INCLUDED_1 = "✅"
INCLUDED_2 = "🗹"
INCLUDED_3 = "🟩"
NOT_INCLUDED_1 = "❎"
NOT_INCLUDED_2 = "☐"
NOT_INCLUDED_3 = "🟥"
ADD = "➕"
REMOVE = "✖️"


def get_interval_keyboard(interval: Interval, weekday: str, tz: str, shift: int) -> InlineKeyboardBuilder:
    builder = InlineKeyboardBuilder()
    interval_str = interval.to_string(tz=tz, shift=shift)
    default_interval_str = DEFAULT_INTERVAL.to_string(tz=tz, shift=shift)

    builder.button(
        text=interval_str,
        callback_data=IntervalCallback(weekday=weekday, interval=interval_str, action='edit')
    )
    builder.button(
        text=REMOVE,
        callback_data=IntervalCallback(weekday=weekday, interval=interval_str, action='remove')
    )
    builder.button(
        text=ADD,
        callback_data=IntervalCallback(weekday=weekday, interval=default_interval_str, action='add')
    )
    builder.adjust(3)

    return builder


def get_weekday_keyboard(weekday: DaySchedule, tz: str, shift: int) -> InlineKeyboardBuilder:
    builder = InlineKeyboardBuilder()
    included_text = INCLUDED_3 if weekday.included else NOT_INCLUDED_3

    day = InlineKeyboardButton(text=f"{weekday.name}", callback_data="#")
    status = InlineKeyboardButton(
        text=included_text,
        callback_data=WeekdayCallback(weekday=weekday.name, action="toggle").pack()
    )

    builder.row(day, status)

    if weekday.included:
        for interval in weekday.intervals:
            interval_builder = get_interval_keyboard(interval, weekday.name, tz, shift)
            builder.attach(interval_builder)

    return builder


def get_schedule_keyboard(week_schedule: Dict[str, DaySchedule], tz: str, shift: int) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()

    for weekday in days_array:
        weekday_builder = get_weekday_keyboard(week_schedule[weekday], tz, shift)
        builder.attach(weekday_builder)

    return builder.as_markup()

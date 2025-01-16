from typing import Dict
from uuid import UUID

from aiogram.utils.keyboard import (
    InlineKeyboardBuilder,
    InlineKeyboardButton,
    InlineKeyboardMarkup,
)

from .callbacks import IntervalCallback, WeekdayCallback
from .constants import days_array
from .i18n import _, day_to_day_i18n
from .intervals import DaySchedule, Interval


class ScheduleEmoji:
    included = "🟩"
    excluded = "🟥"
    add = "➕"
    remove = "✖️"


def get_interval_keyboard(
    interval: Interval, weekday: str, tz: str, shift: int
) -> InlineKeyboardBuilder:
    builder = InlineKeyboardBuilder()
    interval_str = interval.to_string(tz=tz, shift=shift)
    interval_uid = interval.id

    builder.button(
        text=interval_str,
        callback_data=IntervalCallback(
            weekday=weekday, interval=interval_uid, action="edit"
        ),
    )
    builder.button(
        text=ScheduleEmoji.remove,
        callback_data=IntervalCallback(
            weekday=weekday, interval=interval_uid, action="remove"
        ),
    )
    builder.button(
        text=ScheduleEmoji.add,
        callback_data=IntervalCallback(
            weekday=weekday, interval=interval_uid, action="add"
        ),
    )
    builder.adjust(3)

    return builder


def get_weekday_keyboard(
    weekday: DaySchedule, tz: str, shift: int
) -> InlineKeyboardBuilder:
    builder = InlineKeyboardBuilder()
    included_text = (
        ScheduleEmoji.included if weekday.included else ScheduleEmoji.excluded
    )

    day = InlineKeyboardButton(text=day_to_day_i18n()[weekday.name], callback_data="#")
    status = InlineKeyboardButton(
        text=included_text,
        callback_data=WeekdayCallback(weekday=weekday.name, action="toggle").pack(),
    )

    builder.row(day, status)

    if weekday.included:
        for interval in weekday.intervals:
            interval_builder = get_interval_keyboard(interval, weekday.name, tz, shift)
            builder.attach(interval_builder)

    return builder


def get_schedule_keyboard(
    week_schedule: Dict[str, DaySchedule], tz: str, shift: int
) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()

    for weekday in days_array:
        weekday_builder = get_weekday_keyboard(week_schedule[weekday], tz, shift)
        builder.attach(weekday_builder)

    cancel = InlineKeyboardButton(text=_("Cancel"), callback_data="cancel_schedule")
    save = InlineKeyboardButton(text=_("Save"), callback_data="save_schedule")
    builder.row(cancel, save)

    return builder.as_markup()


def get_schedule_options() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()

    builder.button(text=_("Default"), callback_data="default_schedule")
    builder.button(text=_("Personal"), callback_data="personal_schedule")
    builder.adjust(2)

    return builder.as_markup()


def get_interval_edit_options(weekday: str, interval_uid: UUID) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()

    builder.button(
        text=_("Enter again"),
        callback_data=IntervalCallback(
            weekday=weekday, interval=interval_uid, action="edit"
        ),
    )
    builder.button(text=_("Cancel"), callback_data="cancel_interval_edit")
    builder.adjust(2)

    return builder.as_markup()

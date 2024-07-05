from aiogram.filters.callback_data import CallbackData


class IntervalCallback(CallbackData, prefix="interval", sep="|"):
    weekday: str
    interval: str
    action: str  # add, remove, edit


class WeekdayCallback(CallbackData, prefix="weekday"):
    weekday: str
    action: str  # toggle

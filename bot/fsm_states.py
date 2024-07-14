from aiogram.filters.state import StatesGroup, State


class IntervalEditingState(StatesGroup):
    EnterNewInterval = State()

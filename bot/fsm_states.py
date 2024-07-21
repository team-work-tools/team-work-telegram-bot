from aiogram.filters.state import State, StatesGroup


class IntervalEditingState(StatesGroup):
    EnterNewInterval = State()

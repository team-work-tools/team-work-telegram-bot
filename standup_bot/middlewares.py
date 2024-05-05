from typing import Callable, Dict, Any, Awaitable
from aiogram import BaseMiddleware
from aiogram.types import TelegramObject


def load_state(state_file: str) -> State:
    try:
        with open(state_file, "r") as file:
            data = json.load(file)
            return State.from_dict(data)
    except FileNotFoundError:
        raise ValueError("No state file found")


def save_state(state: State, state_file: str):
    try:
        with open(state_file, "w") as file:
            json.dump(state.to_dict(), file)
    except FileNotFoundError:
        raise ValueError("No state file found")


class SomeMiddleware(BaseMiddleware):
    def __init__(self, state_file: str):
        self.state_file = state_file

    async def __call__(
        self,
        handler: Callable[[TelegramObject, Dict[str, Any]], Awaitable[Any]],
        event: TelegramObject,
        data: Dict[str, Any],
    ) -> Any:
        state: State = load_state(self.state_file)
        data["state"] = state
        data["save_state"] = lambda state: save_state(
            state=state, state_file=self.state_file
        )
        result = await handler(event, data)
        return result

from typing import Awaitable, Protocol
from aiogram.types import Message
from .state import State


class SendMessage(Protocol):
    def __call__(self, message: str, state: State) -> Awaitable[Message]: ...


class SaveState(Protocol):
    def __call__(self, state: State) -> None: ...


class LoadState(Protocol):
    def __call__(self) -> State: ...

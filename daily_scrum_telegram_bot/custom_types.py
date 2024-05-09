from typing import Protocol
from aiogram.types import Message
from .state import State
from . import state
from .chat import ChatId


class SendMessage(Protocol):
    async def __call__(self, chat_id: ChatId, message: str) -> Message: ...


class SaveState(Protocol):
    async def __call__(self, state: State) -> None: ...


class LoadState(Protocol):
    async def __call__(self, chat_id: ChatId) -> State: ...


class CreateState(Protocol):
    async def __call__(self, chat_id: ChatId) -> None: ...

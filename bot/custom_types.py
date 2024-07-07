from typing import Protocol, Optional

from aiogram.types import Message

from .chat import ChatId
from .state import ChatState


class SendMessage(Protocol):
    async def __call__(self, chat_id: ChatId, message: str, message_thread_id: Optional[int] = None) -> Message: ...


class SaveState(Protocol):
    async def __call__(self, chat_state: ChatState) -> None: ...


class LoadState(Protocol):
    async def __call__(self, chat_id: ChatId) -> ChatState: ...


class CreateState(Protocol):
    async def __call__(self, chat_id: ChatId) -> None: ...

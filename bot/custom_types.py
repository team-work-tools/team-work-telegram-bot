from typing import Protocol

from aiogram import Bot
from aiogram.types import Message

from . import state
from .chat import ChatId
from .state import ChatState


class SendMessage(Protocol):
    async def __call__(self, chat_id: ChatId, message: str) -> Message: ...


class SaveState(Protocol):
    async def __call__(self, chat_state: ChatState) -> None: ...


class LoadState(Protocol):
    async def __call__(self, chat_id: ChatId) -> ChatState: ...


class CreateState(Protocol):
    async def __call__(self, chat_id: ChatId) -> None: ...

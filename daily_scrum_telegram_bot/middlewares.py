from typing import Callable, Dict, Any, Awaitable
from aiogram import BaseMiddleware
from aiogram.types import TelegramObject
from .state import State
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from .custom_types import LoadState, SaveState, SendMessage


class HasState(BaseMiddleware):
    def __init__(self, load_state: LoadState, save_state: SaveState):
        self.load_state = load_state
        self.save_state = save_state

    async def __call__(
        self,
        handler: Callable[[TelegramObject, Dict[str, Any]], Awaitable[Any]],
        event: TelegramObject,
        data: Dict[str, Any],
    ) -> Any:
        state: State = self.load_state()
        data["state"] = state
        data["save_state"] = self.save_state
        data["load_state"] = self.load_state
        result = await handler(event, data)
        return result


class HasScheduler(BaseMiddleware):
    def __init__(self, scheduler: AsyncIOScheduler):
        self.scheduler = scheduler

    async def __call__(
        self,
        handler: Callable[[TelegramObject, Dict[str, Any]], Awaitable[Any]],
        event: TelegramObject,
        data: Dict[str, Any],
    ) -> Any:
        data["scheduler"] = self.scheduler
        result = await handler(event, data)
        return result


class HasSendMessage(BaseMiddleware):
    def __init__(self, send_message: SendMessage):
        self.send_message = send_message

    async def __call__(
        self,
        handler: Callable[[TelegramObject, Dict[str, Any]], Awaitable[Any]],
        event: TelegramObject,
        data: Dict[str, Any],
    ) -> Any:
        data["send_message"] = self.send_message
        result = await handler(event, data)
        return result

from typing import Callable, Dict, Any, Awaitable
from aiogram import BaseMiddleware
from aiogram.types import TelegramObject, Message
from .state import load_state
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from .custom_types import ChatId


class MessageMiddleware(BaseMiddleware):
    def __init__(self, scheduler: AsyncIOScheduler):
        self.scheduler = scheduler

    async def __call__(
        self,
        handler: Callable[[TelegramObject, Dict[str, Any]], Awaitable[Any]],
        event: TelegramObject,
        data: Dict[str, Any],
    ) -> Any:
        data["scheduler"] = self.scheduler

        match event:
            case Message():
                message: Message = event

                state = await load_state(message.chat.id)
                data["state"] = state

                result = await handler(event, data)
                return result

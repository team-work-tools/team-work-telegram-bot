from typing import Any, Awaitable, Callable, Dict

from aiogram import BaseMiddleware
from aiogram.types import TelegramObject, Update
from aiogram.enums.chat_type import ChatType

class GroupCommandFilterMiddleware(BaseMiddleware):
    async def __call__(
        self,
        handler: Callable[[TelegramObject, Dict[str, Any]], Awaitable[Any]],
        event: TelegramObject,
        data: Dict[str, Any],
    ) -> Any:
        if isinstance(event, Update) and event.message:
            chat = event.message.chat
            text = event.message.text

            if text and chat.type == ChatType.GROUP and not text.startswith("/start"):
                return

        return await handler(event, data)

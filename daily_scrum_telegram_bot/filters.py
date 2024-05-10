from aiogram.filters import BaseFilter
from aiogram.types import Message, User
from .state import load_state


class HasMessageText(BaseFilter):
    def __init__(self):
        pass

    async def __call__(self, message: Message):
        match text := message.text:
            case str():
                return {"message_text": text}
        return False


class HasMessageUserUsername(BaseFilter):
    def __init__(self):
        pass

    async def __call__(self, message: Message):
        match user := message.from_user:
            case User():
                match user.username:
                    case str():
                        return {"username": user.username}
        return False


class HasChatState(BaseFilter):
    def __init__(self):
        pass

    async def __call__(self, message: Message):
        state = await load_state(message.chat.id)
        return {"chat_state": state}

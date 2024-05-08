from aiogram.filters import BaseFilter
from aiogram.types import Message, User


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

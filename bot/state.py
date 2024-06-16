from datetime import datetime
from typing import Annotated, Optional
from zoneinfo import ZoneInfo

import pymongo
from beanie import Document, Link, Indexed

from .chat import ChatId
from .language import Language


class User(Document):
    username: Annotated[str, Indexed(unique=True)]
    work_days: set[int] = set()

    def __hash__(self):
        return hash(self.id)
    
    def __eq__(self, other):
        if isinstance(other, User):
            return self.id == other.id
        return False


async def create_user(username: str) -> User:
    return await User(username=username).create()


async def load_user(username: str) -> User:
    match user := await User.find_one(User.username == username):
        case User():
            return user
        case _:
            return await create_user(username=username)
        

async def save_user(user: User) -> None:
    await user.save()


class ChatState(Document):
    language: Language = Language.default
    meeting_time: Optional[datetime] = None
    chat_id: Annotated[ChatId, Indexed(index_type=pymongo.ASCENDING)]
    joined_users: set[Link[User]] = set()


async def create_state(chat_id: ChatId) -> ChatState:
    return await ChatState(chat_id=chat_id).create()


async def load_state(chat_id: ChatId) -> ChatState:
    match chat_state := await ChatState.find_one(ChatState.chat_id == chat_id):
        case ChatState():
            return chat_state
        case _:
            return await create_state(chat_id=chat_id)


async def save_state(chat_state: ChatState) -> None:
    await chat_state.save()

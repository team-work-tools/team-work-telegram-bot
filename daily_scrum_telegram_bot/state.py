from typing import Optional, Annotated
from datetime import datetime
from beanie import Document, Indexed
import pymongo
from zoneinfo import ZoneInfo
from .chat import ChatId

class State(Document):
    meeting_time: Optional[datetime] = None
    chat_id: Annotated[ChatId, Indexed(index_type=pymongo.ASCENDING)]
    subscribed_users: set[str] = set()


async def create_state(chat_id: ChatId) -> State:
    return await State(chat_id=chat_id).create()


async def load_state(chat_id: ChatId) -> State:
    match state := await State.find_one(State.chat_id == chat_id):
        case State():
            return state
        case _:
            return await create_state(chat_id=chat_id)


async def save_state(state: State) -> None:
    await state.save()

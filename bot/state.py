from datetime import datetime
from typing import Annotated, Optional, Dict, List
from zoneinfo import ZoneInfo

import pymongo
from beanie import Document, Indexed
from pydantic import BaseModel

from .chat import ChatId
from .language import Language
from .intervals import DaySchedule, Interval
from .constants import default_time_zone, default_user_schedule


class ChatUser(BaseModel):
    username: str = "" 
    is_joined: bool = False
    schedule: List[DaySchedule] = default_user_schedule
    personal_default_working_time: Optional[Interval] = None
    time_zone_shift: int = 0
    meeting_days: set[int] = set(range(0, 5))  # default value - [0 - 4] = Monday - Friday
    reminder_period: Optional[int] = None
    non_replied_daily_msgs: set[int] = set(range(0, 3))

    def __hash__(self):
        return hash(self.username)

    def __eq__(self, other):
        if isinstance(other, ChatUser):
            return self.username == other.username
        return False


async def create_user(username: str) -> ChatUser:
    """Create a new user with the given username.
    
    Args:
        username (str): The username of the user to create.
    
    Returns:
        ChatUser: The newly created user instance.
    """
    user = ChatUser()
    user.username = username
    return user


class ChatState(Document):
    language: Language = Language.default
    time_zone: str = default_time_zone
    default_working_time: Optional[Interval] = None
    meeting_time: Optional[datetime] = None
    meeting_msg_ids: list[int] = []
    topic_id: Optional[int] = None
    chat_id: Annotated[ChatId, Indexed(index_type=pymongo.ASCENDING)]
    users: Dict[str, ChatUser] = dict()


async def get_user(chat_state: ChatState, username: str) -> ChatUser:
    """Load a user from the ChatState by username or create a new one if not found.
    
    Args:
        chat_state (ChatState): ChatState object of the current chat
        username (str): The username of the user to load or create.
    
    Returns:
        ChatUser: The ChatUser instance found or created.
    """
    if username in chat_state.users:
        return chat_state.users[username]
    
    user = await create_user(username)
    chat_state.users[username] = user
    return user


async def get_joined_users(chat_state: ChatState) -> List[ChatUser]:
    """Creates a list of joined users. (not related with user's working days)

    Args:
        chat_state (ChatState): ChatState object of the current chat

    Returns:
        List[ChatState]: A list of joined users.
    """
    return [user for user in chat_state.users.values() if user.is_joined]


async def create_state(chat_id: ChatId) -> ChatState:
    """Create a new chat state with the given chat ID.
    
    Args:
        chat_id (ChatId): The ID of the chat for which to create a state.
    
    Returns:
        ChatState: The newly created chat state instance.
    """

    return await ChatState(chat_id=chat_id).create()


async def load_state(chat_id: ChatId) -> ChatState:
    """Load a chat state by chat ID or create a new one if not found.
    
    Args:
        chat_id (ChatId): The ID of the chat to load the state for.
    
    Returns:
        ChatState: The chat state instance found or created.
    """

    match chat_state := await ChatState.find_one(ChatState.chat_id == chat_id):
        case ChatState():
            return chat_state
        case _:
            return await create_state(chat_id=chat_id)


async def save_state(chat_state: ChatState) -> None:
    """Save the given chat state to the database.
    
    Args:
        chat_state (ChatState): The chat state instance to save.
    """
    
    await chat_state.save()


class UserPM(Document):
    username: str
    chat_id: Annotated[ChatId, Indexed(index_type=pymongo.ASCENDING)]
    personal_time_zone: str = default_time_zone


async def create_user_pm(username: str, chat_id: ChatId) -> UserPM:
    return await UserPM(username=username, chat_id=chat_id).create()


async def load_user_pm(username: str) -> Optional[UserPM]:
    return await UserPM.find_one(UserPM.username == username)


async def save_user_pm(user_pm: UserPM) -> None:
    await user_pm.save()

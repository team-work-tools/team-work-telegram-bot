from datetime import datetime
from typing import Annotated, Optional, Dict, List
from zoneinfo import ZoneInfo

import pymongo
from beanie import Document, Indexed
from pydantic import BaseModel

from .chat import ChatId
from .language import Language


class ChatUser(BaseModel):
    username: str = "" 
    is_joined: bool = False
    #default value - [0 - 4] = Monday - Friday
    meeting_days: set[int] = set(range(0, 5))
    reminder_period: Optional[int] = None

    def __hash__(self):
        return hash(self.username)

    def __eq__(self, other):
        if isinstance(other, User):
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
    meeting_time: Optional[datetime] = None
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

from datetime import datetime
from typing import Annotated, Optional
from zoneinfo import ZoneInfo

import pymongo
from beanie import Document, Indexed

from .chat import ChatId
from .language import Language


class User(Document):
    username: Annotated[str, Indexed(unique=True)]
    meeting_days: set[int] = set()

    def __hash__(self):
        return hash(self.id)

    def __eq__(self, other):
        if isinstance(other, User):
            return self.id == other.id
        return False


async def create_user(username: str) -> User:
    """Create a new user with the given username.
    
    Args:
        username (str): The username of the user to create.
    
    Returns:
        User: The newly created user instance.
    """

    return await User(username=username).create()


async def load_user(username: str) -> User:
    """Load a user by username or create a new one if not found.
    
    Args:
        username (str): The username of the user to load or create.
    
    Returns:
        User: The user instance found or created.
    """

    match user := await User.find_one(User.username == username):
        case User():
            return user
        case _:
            return await create_user(username=username)


async def save_user(user: User) -> None:
    """Save the given user to the database.
    
    Args:
        user (User): The user instance to save.
    """

    await user.save()


class ChatState(Document):
    language: Language = Language.default
    meeting_time: Optional[datetime] = None
    chat_id: Annotated[ChatId, Indexed(index_type=pymongo.ASCENDING)]
    joined_users: set[str] = set()


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

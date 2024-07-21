from textwrap import dedent
from typing import Annotated, Optional, Dict, List
from enum import Enum
from datetime import datetime

import pymongo
from beanie import Document, Indexed
from pydantic import BaseModel

from .chat import ChatId
from .language import Language


class ChatUser(BaseModel):
    username: str = "" 
    is_joined: bool = False
    meeting_days: set[int] = set(range(0, 5))  # default value - [0 - 4] = Monday - Friday
    time_zone: Optional[str] = None
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


class PromptType(Enum):
    TASK_ID = 1
    TASK_TEXT = 2
    TASK_DEADLINE = 3
    TASK_ASSIGNEES = 4

class Prompt(BaseModel):
    prompt_type: PromptType
    prompt_data: Dict = dict()


class Task(BaseModel):
    text: str = "Blank task"
    assignees: list[str] = []
    deadline: Optional[datetime] = None
    done: bool = False
    
    def __str__(self):
        return dedent(
            """
            {text}
                assignees: {assignees}
                deadline: {deadline}
            """
            .format(
                text=self.text,
                assignees=", ".join(self.assignees) if self.assignees else None,
                deadline= self.deadline.strftime("%d.%m.%y %H:%M") if self.deadline else None
            )
        )


class ChatState(Document):
    language: Language = Language.default
    meeting_time_hour: Optional[int] = None
    meeting_time_minute: Optional[int] = None
    meeting_msg_ids: list[int] = []
    topic_id: Optional[int] = None
    default_time_zone: Optional[str] = "Europe/Moscow"
    chat_id: Annotated[ChatId, Indexed(index_type=pymongo.ASCENDING)]
    users: Dict[str, ChatUser] = dict()
    tasks: list[Task] = []
    prompts: Dict[int, Prompt] = dict()


def get_task_names(chat_state: ChatState) -> str:
    res = ""
    for i in range(1, len(chat_state.tasks) + 1):
        res += f"{i}) {chat_state.tasks[i - 1].text}\n"
    return res


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


async def create_state(chat_id: ChatId, topic_id: Optional[int]) -> ChatState:
    """Create a new chat state with the given chat ID.
    
    Args:
        chat_id (ChatId): The ID of the chat for which to create a state.
        topic_id (int): The ID of the topic associated with the chat state.
    
    Returns:
        ChatState: The newly created chat state instance.
    """

    return await ChatState(chat_id=chat_id, topic_id=topic_id).create()


async def load_state(chat_id: ChatId, topic_id: Optional[int]) -> ChatState:
    """Load a chat state by chat ID or create a new one if not found.
    
    Args:
        chat_id (ChatId): The ID of the chat to load the state for.
        topic_id (int): The ID of the topic associated with the chat state.
    
    Returns:
        ChatState: The chat state instance found or created.
    """

    match chat_state := await ChatState.find_one(
        {"chat_id": chat_id, "topic_id": topic_id}
    ):
        case ChatState():
            return chat_state
        case _:
            return await create_state(chat_id=chat_id, topic_id=topic_id)


async def save_state(chat_state: ChatState) -> None:
    """Save the given chat state to the database.
    
    Args:
        chat_state (ChatState): The chat state instance to save.
    """

    await chat_state.save()


class UserPM(Document):
    username: str
    chat_id: Annotated[ChatId, Indexed(index_type=pymongo.ASCENDING)]


async def create_user_pm(username: str, chat_id: ChatId) -> UserPM:
    return await UserPM(username=username, chat_id=chat_id).create()


async def load_user_pm(username: str) -> Optional[UserPM]:
    return await UserPM.find_one(UserPM.username == username)


async def save_user_pm(user_pm: UserPM) -> None:
    await user_pm.save()

from aiogram.filters import Filter
from aiogram.types import Message, User

from .state import load_state


class HasMessageText(Filter):
    async def __call__(self, message: Message):
        match text := message.text:
            case str():
                return {"message_text": text}
        return False


class HasMessageUserUsername(Filter):
    async def __call__(self, message: Message):
        match user := message.from_user:
            case User():
                match user.username:
                    case str():
                        return {"username": user.username}
        return False


class HasChatState(Filter):
    async def __call__(self, message: Message):
        chat_state = await load_state(message.chat.id)
        return {"chat_state": chat_state}


class IsReplyToMeetingMessage(Filter):
    async def __call__(self, message: Message):
        chat_state = await load_state(message.chat.id)

        if message.reply_to_message:
            replied_msg_id = message.reply_to_message.message_id

            match replied_msg_id:
                case chat_state.meeting_msg_id_1:
                    return {"replied_meeting_msg_num": 1}
                case chat_state.meeting_msg_id_2:
                    return {"replied_meeting_msg_num": 2}
                case chat_state.meeting_msg_id_3:
                    return {"replied_meeting_msg_num": 3}

        return False

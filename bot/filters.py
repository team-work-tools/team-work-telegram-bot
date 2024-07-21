from aiogram.filters import Filter
from aiogram.types import CallbackQuery, Message, User

from .state import load_state


class HasMessageText(Filter):
    async def __call__(self, message: Message):
        match text := message.text:
            case str():
                return {"message_text": text}
        return False


class HasMessageUserUsername(Filter):
    async def __call__(self, obj: Message | CallbackQuery):
        match user := obj.from_user:
            case User():
                match user.username:
                    case str():
                        return {"username": user.username}
        return False


class HasChatState(Filter):
    async def __call__(self, obj: Message | CallbackQuery):
        match obj:
            case Message():
                chat_state = await load_state(
                    chat_id=obj.chat.id,
                    is_topic=obj.is_topic_message,
                    topic_id=obj.message_thread_id,
                )
                return {"chat_state": chat_state}

            case CallbackQuery():
                match message := obj.message:
                    case Message():
                        chat_state = await load_state(
                            chat_id=message.chat.id,
                            is_topic=message.is_topic_message,
                            topic_id=message.message_thread_id,
                        )
                        return {"chat_state": chat_state}


class IsReplyToMeetingMessage(Filter):
    async def __call__(self, message: Message):
        chat_state = await load_state(
            chat_id=message.chat.id,
            is_topic=message.is_topic_message,
            topic_id=message.message_thread_id,
        )

        if message.reply_to_message and message.reply_to_message.text:
            replied_msg_id = message.reply_to_message.message_id
            message_ids = chat_state.meeting_msg_ids

            if len(message_ids) == 3:
                for i, message_id in enumerate(message_ids):
                    if replied_msg_id == message_id:
                        return {"replied_meeting_msg_num": i}

        return False

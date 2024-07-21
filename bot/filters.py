from aiogram.filters import Filter
from aiogram.types import Message, User, CallbackQuery

from .state import load_state, PromptType


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
        chat_state = await load_state(message.chat.id, message.message_thread_id)
        return {"chat_state": chat_state}


class IsReplyToMeetingMessage(Filter):
    async def __call__(self, message: Message):
        chat_state = await load_state(message.chat.id, message.message_thread_id)

        if message.reply_to_message:
            replied_msg_id = message.reply_to_message.message_id
            message_ids = chat_state.meeting_msg_ids

            for i in range(0, 3):
                try:
                    if replied_msg_id == message_ids[i]:
                        return {"replied_meeting_msg_num": i}
                except:
                    return False

        return False


class IsPromptReply(Filter):
    prompt_type: PromptType

    def __init__(self, prompt_type: PromptType):
        self.prompt_type = prompt_type

    async def __call__(self, message: Message):
        chat_state = await load_state(message.chat.id, message.message_thread_id)

        if message.reply_to_message:
            replied_msg_id = message.reply_to_message.message_id
            if replied_msg_id in chat_state.prompts.keys():
                if chat_state.prompts[replied_msg_id].prompt_type == self.prompt_type:
                    return {"prompt_id": replied_msg_id}

        return False

class IsCallback(Filter):
    command: str

    def __init__(self, command: str):
        self.command = command

    async def __call__(self, callback: CallbackQuery):
        if callback.data == None or type(callback.message) != Message:
            return False
        try:
            splitted = callback.data.split(maxsplit=1)
            command = splitted[0]
            argument = splitted[1]
        except IndexError:
            command = callback.data
            argument = ""
        if command != self.command:
            return False
        
        chat_state = await load_state(
            callback.message.chat.id,
            callback.message.message_thread_id
        )
        return {
            "argument": argument,
            "message": callback.message,
            "chat_state": chat_state
        }

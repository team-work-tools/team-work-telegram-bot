from aiogram.types import Message, TelegramObject, Update
from aiogram.utils.i18n import I18nMiddleware

from .language import Language
from .state import load_state


class MyI18nMiddleware(I18nMiddleware):
    async def get_locale(self, event: TelegramObject, data: dict) -> str:
        match event:
            case Update():
                match message := event.message:
                    case Message():
                        chat_state = await load_state(
                            message.chat.id, message.is_topic_message, message.message_thread_id
                        )
                        return str(chat_state.language)
        return str(Language.default)

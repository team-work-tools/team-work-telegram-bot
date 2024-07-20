from aiogram.types import Message, TelegramObject, Update, CallbackQuery
from aiogram.utils.i18n import I18nMiddleware

from .language import Language
from .state import load_state


class MyI18nMiddleware(I18nMiddleware):
    async def get_locale(self, event: TelegramObject, data: dict) -> str:
        match event:
            case Update():
                match event.message:
                    case Message():
                        event_message = event.message
                match callback_query := event.callback_query:
                    case CallbackQuery():
                        match callback_query.message:
                            case Message():
                                event_message = callback_query.message
        match message := event_message:
            case Message():
                chat_state = await load_state(
                    message.chat.id,
                    message.is_topic_message,
                    message.message_thread_id,
                )
                return str(chat_state.language)
        return str(Language.default)

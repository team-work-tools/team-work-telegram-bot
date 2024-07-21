from typing import List
from enum import Enum


class LanguageBase(Enum):
    def __str__(self):
        return self.value


class Language(LanguageBase):
    ru: str = "ru"
    en: str = "en"
    default: str = "en"


class InlineKeyboardButtonName(LanguageBase):
    en: str = "🇬🇧 English"
    ru: str = "🇷🇺 Русский"


class CallbackData(LanguageBase):
    en: str = "lang_en"
    ru: str = "lang_ru"


all_languages: List[Language] = [Language.en, Language.ru]

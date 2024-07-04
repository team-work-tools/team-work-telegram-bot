from dataclasses import dataclass
from enum import Enum

from pydantic import BaseModel


class LanguageBase(Enum):
    def __str__(self):
        return self.value


class Language(LanguageBase):
    ru: str = "ru"
    en: str = "en"
    default: str = "en"

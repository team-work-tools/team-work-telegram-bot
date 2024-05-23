from dataclasses import dataclass
from pydantic import BaseModel

class Language(BaseModel, frozen=True):
    language: str


language_ru = Language(language="ru")
language_en = Language(language="en")

language_default = language_en
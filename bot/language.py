from dataclasses import dataclass
from pydantic import BaseModel
from enum import Enum


class Language(Enum):
    ru = "ru"
    en = "en"
    default = "en"

    def __str__(self):
        return self.value

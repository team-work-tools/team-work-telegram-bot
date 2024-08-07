from datetime import datetime

from pydantic import BaseModel


class RecurringData(BaseModel):
    title: str
    interval_start: datetime
    interval_end: datetime
    expression: str
    text: str

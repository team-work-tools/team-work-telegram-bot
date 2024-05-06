from typing import Optional
from dataclasses import dataclass, field
from dataclass_wizard import JSONWizard
import json
from os import PathLike
from .constants import ENCODING
from datetime import datetime


@dataclass
class State(JSONWizard):
    standup_time: Optional[datetime] = None
    chat_id: Optional[int] = None
    subscribed_users: set[str] = field(default_factory=set)


def load_state(state_file: PathLike) -> State:
    try:
        with open(state_file, "r", encoding=ENCODING) as file:
            data = json.load(file)
            return State.from_dict(data)
    except FileNotFoundError:
        raise FileNotFoundError(f"No state file '{state_file}' found")


def save_state(state: State, state_file: PathLike):
    try:
        with open(state_file, "w", encoding=ENCODING) as file:
            json.dump(state.to_dict(), file)
    except FileNotFoundError:
        raise FileNotFoundError(f"No state file '{state_file}' found")

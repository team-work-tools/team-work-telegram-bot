from pydantic import BaseModel
from .language import Language, language_en, language_ru
from aiogram.utils.i18n import gettext as _


class BotCommands(BaseModel):
    start: str
    help: str
    set_meeting_time: str
    subscribe: str
    unsubscribe: str
    get_subscribers: str


class BotCommandNames(BotCommands):
    pass


bot_command_names = BotCommandNames(
    start="start",
    help="help",
    set_meeting_time="set_meeting_time",
    subscribe="subscribe",
    unsubscribe="unsubscribe",
    get_subscribers="get_subscribers",
)


class BotCommandDescriptions(BotCommands):
    pass


def bot_command_descriptions() -> BotCommandDescriptions:
    return BotCommandDescriptions(
        start=_("enable me"),
        help=_("get this help message"),
        set_meeting_time=_("set the meeting start time and date"),
        subscribe=_("subscribe so that I send you messages"),
        unsubscribe=_("unsubscribe so that I don't send you messages"),
        get_subscribers=_("get a list of subscribed users"),
    )

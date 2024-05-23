from .language import Language, language_en, language_ru
from .commands import bot_command_names, bot_command_descriptions
from textwrap import dedent
from .constants import time_format_link, day_of_week_pretty
from aiogram import html
from datetime import datetime
from . import commands
from dataclasses import dataclass
from aiogram.utils.i18n import gettext as _


def bot_intro():
    return _(
        """
        I can help you conduct Daily meetings.

        You can control me by sending these commands:
        """
    ).strip()


def make_help_message() -> str:
    command_names = commands.bot_command_names
    command_descriptions = commands.bot_command_descriptions()

    return dedent(
        f"""
        {bot_intro()}

        /{command_names.start} - {command_descriptions.start}
        /{command_names.help} - {command_descriptions.help}
        /{command_names.set_meeting_time} - {command_descriptions.set_meeting_time}
        /{command_names.subscribe} - {command_descriptions.subscribe}
        /{command_names.unsubscribe} - {command_descriptions.unsubscribe}
        /{command_names.get_subscribers} - {command_descriptions.get_subscribers}
        """
    ).strip()


def make_daily_messages(username: str) -> [str]:
    return [
        _("@{username}, what did you do last working day?").format(username=username),
        _("@{username}, what will you do today?").format(username=username),
        _("@{username}, what (if anything) is blocking your progress?").format(
            username=username
        ),
    ]

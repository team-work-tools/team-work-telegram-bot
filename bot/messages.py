from dataclasses import dataclass
from datetime import datetime
from textwrap import dedent

from aiogram import html
from aiogram.utils.i18n import gettext as _

from .commands import bot_command_descriptions, bot_command_names
from .constants import day_of_week_pretty
from .language import Language


def bot_intro():
    return _(
        """
        I can help you conduct daily (or at least regular) meetings.

        You can control me by sending these commands:
        """
    ).strip()


def make_help_message() -> str:
    command_names = bot_command_names
    command_descriptions = bot_command_descriptions()

    return dedent(
        f"""
        {bot_intro()}
        
        {html.bold(_("Global commands"))}
        /{command_names.start} - {command_descriptions.start}
        /{command_names.help} - {command_descriptions.help}
        
        {html.bold(_("Team settings commands"))}
        /{command_names.set_meetings_time} - {command_descriptions.set_meetings_time}
        
        {html.bold(_("Personal settings commands"))}
        /{command_names.join} - {command_descriptions.join}
        /{command_names.skip} - {command_descriptions.skip}
        
        {html.bold(_("Chat information commands"))}
        /{command_names.get_chat_state} - {command_descriptions.get_chat_state}
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

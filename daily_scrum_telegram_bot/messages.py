from .language import Language, language_en
from .commands import bot_command_names, bot_command_descriptions
from textwrap import dedent
from .constants import time_format_link, day_of_week_pretty
from aiogram import html
from datetime import datetime
from . import commands
from dataclasses import dataclass

bot_intro: dict[Language, str] = {
    language_en: """
        I can help you conduct Daily Scrum.

        You can control me by sending these commands:
    """,
}


@dataclass(frozen=True)
class DailyQuestions:
    yesterday: str
    today: str
    blockers: str


daily_questions: dict[Language, [str]] = {
    language_en: DailyQuestions(
        yesterday="what did you do yesterday",
        today="what will you do today",
        blockers="what (if anything) is blocking your progress",
    ),
}


def make_help_message(language: Language) -> str:
    command_names = commands.bot_command_names
    command_descriptions = commands.bot_command_descriptions[language]
    intro = bot_intro[language]

    return dedent(
        f"""
        {intro}

        /{command_names.start} - {command_descriptions.start}
        /{command_names.help} - {command_descriptions.help}
        /{command_names.set_meeting_time} - {command_descriptions.set_meeting_time}
        /{command_names.subscribe} - {command_descriptions.subscribe}
        /{command_names.unsubscribe} - {command_descriptions.unsubscribe}
        /{command_names.get_subscribers} - {command_descriptions.get_subscribers}
        """
    ).strip()


def make_daily_messages(username: str, language: Language) -> [str]:
    daily_questions = daily_questions[language]
    return [
        f"@{username}, {daily_questions.yesterday}?",
        f"@{username}, {daily_questions.today}?",
        f"@{username}, {daily_questions.progress}?",
    ]

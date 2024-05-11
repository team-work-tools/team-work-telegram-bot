from .constants import BotCommandNames, BotCommandDescriptions, day_of_week_pretty
from textwrap import dedent
from .constants import time_format_link
from aiogram import html
from datetime import datetime

bot_message = dedent(
    f"""
I can help you conduct Daily Scrum.

You can control me by sending these commands:

/{BotCommandNames.start} - {BotCommandDescriptions.start}
/{BotCommandNames.help} - {BotCommandDescriptions.help}
/{BotCommandNames.set_meeting_time} - {BotCommandDescriptions.set_meeting_time}
/{BotCommandNames.subscribe} - {BotCommandDescriptions.subscribe}
/{BotCommandNames.unsubscribe} - {BotCommandDescriptions.unsubscribe}
/{BotCommandNames.get_subscribers} - {BotCommandDescriptions.get_subscribers}

During a meeting, I'll send in this group three messages for each subscribed person.

Please reply to all messages that mention you so that your teammates can learn about your progress and plans and can help you resolve problems.
""".strip()
)


def make_meeting_messages(username: str):
    return [
        f"@{username}, what did you do yesterday?",
        f"@{username}, what will you do today?",
        f"@{username}, what (if anything) is blocking your progress?",
    ]

from .constants import BotCommands, day_of_week_pretty
from textwrap import dedent
from .constants import time_format_link
from aiogram import html

bot_message = dedent(
    f"""
I can help you conduct Daily Scrum meetings.

You can control me by sending these commands:

/{BotCommands.start} - Enable me.
/{BotCommands.help_} - Get this help message.
/{BotCommands.set_meeting_time} - Set the time and the date for the first meeting in the {time_format_link} format. I'll schedule this meeting and subsequent meetings at that time for {day_of_week_pretty}.
/{BotCommands.subscribe} - Allow mentioning you during meetings.
/{BotCommands.unsubscribe} - Disallow mentioning you during meetings.

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

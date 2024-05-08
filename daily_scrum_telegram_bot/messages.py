from .constants import command_names, day_of_week_pretty
from textwrap import dedent

bot_message = dedent(
    f"""
I can help you conduct Daily Scrum meetings.

You can control me by sending these commands:

/{command_names.start} - enable me
/{command_names.help_} - get this help message
/{command_names.set_meeting_time} - set meeting time in the format HH:MM
/{command_names.subscribe} - allow mentioning you during meetings
/{command_names.unsubscribe} - disallow mentioning you during meetings

Meetings are scheduled for the set time on {day_of_week_pretty}.
During a meeting, I'll send in this group three messages for each subscribed person.

Please reply to all messages that mention you
so that your teammates can learn about your progress and plans
and can help you resolve problems.
"""
)


def make_meeting_messages(username: str):
    return [
        f"@{username}, what did you do yesterday?",
        f"@{username}, what will you do today?",
        f"@{username}, what (if anything) is blocking your progress?",
    ]

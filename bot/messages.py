from textwrap import dedent
from typing import List, Tuple

from aiogram import html
from aiogram.utils import markdown as fmt
from aiogram.utils.i18n import gettext as _

from .commands import bot_command_descriptions, bot_command_names
from .intervals import Interval, InvalidTimeFormatException, InvalidIntervalException


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
        /{command_names.set_personal_meetings_days} - {command_descriptions.set_personal_meetings_days}
        /{command_names.set_reminder_period} - {command_descriptions.set_reminder_period}
        /{command_names.set_working_hours} - {command_descriptions.set_working_hours}
        /{command_names.join} - {command_descriptions.join}
        /{command_names.skip} - {command_descriptions.skip}
        
        {html.bold(_("Chat information commands"))}
        /{command_names.get_chat_state} - {command_descriptions.get_chat_state}
        """
    ).strip()


def make_daily_messages(usernames: str) -> List[str]:
    return [
        _("What did you do last working day? {usernames}").format(usernames=usernames),
        _("What will you do today? {usernames}").format(usernames=usernames),
        _("What (if anything) is blocking your progress? {usernames}").format(
            usernames=usernames
        ),
    ]


def make_interval_validation_message(interval_str: str, tz: str) -> Tuple[bool, str]:
    try:
        interval = Interval.from_string(interval_str=interval_str, tz=tz)
        msg = _("Successfully parsed interval: {interval}").format(interval=interval)
        return True, msg
    except InvalidTimeFormatException as e:
        msg = _("Invalid time format for '{time}'. {msg}\n").format(time=e.time_str, msg=e.message)
        return False, msg
    except InvalidIntervalException as e:
        msg = _("{msg} (start: {start}, end: {end}).\n").format(
            msg=e.message,
            start=e.start_time,
            end=e.end_time
        )
        return False, msg
    except Exception as e:
        msg = _("An unexpected error occurred. {error}").format(error=str(e))
        return False, msg


def make_interval_editing_instruction() -> str:
    instruction_text = "Send me the new interval in the hh:mm - hh:mm format."
    example_text = "Example: "
    note = "Notes:\nThe example provides an interval copyable by clicking or tapping it."

    text = fmt.text(instruction_text, "\n", example_text, fmt.hcode("19:00 - 22:30"), "\n", note, sep="")
    return text


def make_interval_editing_error(error_msg: str) -> str:
    again_text = "Press 'Enter again' to enter the interval again."
    cancel_text = "Press 'Cancel' to cancel editing this interval."

    text = fmt.text(error_msg, "\n", again_text, "\n", cancel_text, sep="")
    return text

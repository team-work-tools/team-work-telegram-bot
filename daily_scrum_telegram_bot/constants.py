from aiogram import html

ENCODING = "utf-8"


class BotCommands:
    start = "start"
    help_ = "help"
    subscribe = "subscribe"
    unsubscribe = "unsubscribe"
    set_meeting_time = "set_meeting_time"


class AppCommands:
    print_bot_message = "print-bot-message"
    print_meeting_messages = "print-meeting-messages"
    start = "start"


class BotDataFiles:
    state_file = "state.json"


utc_time_converter_url = "https://dateful.com/convert/utc"

utc_time_link = html.link("UTC time", utc_time_converter_url)

user_time_format = f"HH:MM yyyy-mm-dd"

user_time_format_pretty = html.bold(user_time_format)

datetime_time_format = "%H:%M %Y-%m-%d"

day_of_week = "0-4"

day_of_week_pretty = "Monday - Friday"

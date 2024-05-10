from aiogram import html

ENCODING = "utf-8"


class BotCommands:
    start = "start"
    help_ = "help"
    subscribe = "subscribe"
    unsubscribe = "unsubscribe"
    get_subscribers = "get_subscribers"
    set_meeting_time = "set_meeting_time"


class AppCommands:
    print_bot_message = "print-bot-message"
    print_meeting_messages = "print-meeting-messages"
    start = "start"


jobstore = "bot_jobs"

time_url = "https://time.lol"

time_format_link = html.link("ISO 8601", time_url)

datetime_time_format = "%H:%M %Y-%m-%d"

day_of_week = "0-4"

day_of_week_pretty = "Monday - Friday"

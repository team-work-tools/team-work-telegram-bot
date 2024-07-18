from datetime import date

from .intervals import DaySchedule

ENCODING = "utf-8"


class AppCommands:
    print_bot_message = "print-bot-message"
    print_meeting_messages = "print-meeting-messages"
    start = "start"


jobstore = "bot_jobs"

time_url = "https://time.lol"

iso8601 = "ISO 8601"

interval_format = "HH:MM or HH.MM"

sample_interval = "9:00 - 17:00"

datetime_time_format = "%H:%M %Y-%m-%d"

day_of_week = "0-6"

day_of_week_pretty = "Monday - Sunday"

sample_time = date.today().strftime("%Y-%m-%d") + "T10:00:00+03:00"

default_time_zone = "Europe/Moscow"

days_array = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

empty_schedule = {day: DaySchedule(name=day) for day in days_array}

default_schedule = empty_schedule

ENCODING = "utf-8"


class CommandNames:
    start = "start"
    help_ = "help"
    subscribe = "subscribe"
    unsubscribe = "unsubscribe"
    set_meeting_time = "set_meeting_time"


command_names = CommandNames()


class EnvVariables:
    BOT_TOKEN = "BOT_TOKEN"
    BOT_STATE_FILE = "BOT_STATE_FILE"


env_variables = EnvVariables()

time_format = "HH:MM"

day_of_week = "0-4"
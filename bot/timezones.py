from datetime import datetime 
from aiogram.types import InputTextMessageContent, InlineQueryResultArticle
from uuid import uuid4
from pytz import timezone, country_timezones, country_names
from .commands import bot_command_names

hint_options = []
for countrycode in country_timezones:
    timezones = country_timezones[countrycode]
    for time_zone in timezones:
        hint_options.append(
            {
                "option": datetime.now(timezone(time_zone))
                    .strftime(f"{time_zone} {countrycode} {country_names[countrycode]} %H:%M"),
                "time_zone": time_zone
            }
        )


def get_time_zone_hint(prompt: str, personal: bool = False) -> list:
    res = []
    if personal:
        command = bot_command_names.set_personal_time_zone
    else:
        command = bot_command_names.set_meetings_time_zone
    for option in hint_options:
        if prompt in option["option"].lower():
            res.append(
                InlineQueryResultArticle(
                    id=str(uuid4()),
                    title=option["option"],
                    input_message_content=InputTextMessageContent(
                        message_text=f"/{command} {option['time_zone']}"
                    )
                )
            )

    if len(res) > 50:
        return res[:50]

    return res

from datetime import datetime, timedelta, UTC
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, InlineQueryResultArticle,\
                          InputTextMessageContent
from uuid import uuid4
from pytz import all_timezones, timezone, country_timezones, country_names
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


def guess_time_zone(hour: int, minute: int) -> list[str]:
    utcnow = datetime.now(UTC)
    local = datetime.now(UTC)
    local = local.replace(hour=hour, minute=minute)
    offset = timedelta(days = 0, seconds=(local - utcnow).seconds).total_seconds() // 60

    res_timezones = []
    for time_zone in all_timezones:
        timezone_offset = timezone(time_zone).utcoffset(datetime.now()).total_seconds() // 60
        if timezone_offset == offset:
            res_timezones.append(time_zone)

    return res_timezones


def make_timezones_inline_keybard(timezones: list[str]) -> InlineKeyboardMarkup:
    buttons = []
    counter = 0
    for time_zone in timezones:
        if counter % 3 == 0:
            buttons.append([])
        buttons[counter // 3].append(InlineKeyboardButton(
            text=time_zone,
            callback_data=f"default_time_zone {time_zone}")
        )
        counter += 1
    return InlineKeyboardMarkup(inline_keyboard=buttons)


def get_time_zone_hint(prompt: str) -> list:
    res = []
    for option in hint_options:
        if prompt in option["option"].lower():
            res.append(
                InlineQueryResultArticle(
                    id=str(uuid4()),
                    title=option["option"],
                    input_message_content=InputTextMessageContent(
                        message_text=f"/{bot_command_names.set_meetings_time_zone} {option['time_zone']}"
                    )
                )
            )

    if len(res) > 50:
        return []

    return res

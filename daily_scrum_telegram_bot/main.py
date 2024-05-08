import asyncio
import logging
import sys
from os import getenv
from .constants import EnvVariables, AppCommands
import argparse
from .messages import bot_message, make_meeting_messages
from . import bot


def main():
    bot_token = getenv(EnvVariables.BOT_TOKEN)
    bot_data_directory = getenv(EnvVariables.BOT_DATA_DIRECTORY)

    parser = argparse.ArgumentParser()
    subparsers = parser.add_subparsers(
        title="subcommands", description="bot commands", dest="command"
    )

    subparsers.add_parser(
        AppCommands.print_bot_message, help="print the bot help message"
    )

    subparsers.add_parser(
        AppCommands.print_meeting_messages,
        help="print sample meeting messages",
    )
    subparsers.add_parser(AppCommands.start, help="run the bot")

    args = parser.parse_args()

    match args.command:
        case AppCommands.print_bot_message:
            print(bot_message)
        case AppCommands.print_meeting_messages:
            for message in make_meeting_messages("username"):
                print(f"{message}")
        case AppCommands.start:
            logging.basicConfig(level=logging.INFO, stream=sys.stdout)
            asyncio.run(
                bot.main(bot_token=bot_token, bot_data_directory=bot_data_directory)
            )


if __name__ == "__main__":
    main()

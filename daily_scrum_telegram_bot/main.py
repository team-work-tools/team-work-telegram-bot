import asyncio
import logging
import sys
from os import getenv
from .constants import EnvVariables
from . import bot

BOT_TOKEN = getenv(EnvVariables.BOT_TOKEN)
BOT_DATA_DIRECTORY = getenv(EnvVariables.BOT_DATA_DIRECTORY)

def main():
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(run_main())


if __name__ == "__main__":
    main()

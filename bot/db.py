from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from .settings import Settings
from .state import ChatState, UserPM


async def main(settings: Settings):
    # Create Motor client
    client = AsyncIOMotorClient(
        f"{settings.mongo_host}://{settings.mongo_username}:{settings.mongo_password}@{settings.mongo_host}:{settings.mongo_port}"
    )

    db = client["bot_states"]

    await init_beanie(database=db, document_models=[ChatState, UserPM])

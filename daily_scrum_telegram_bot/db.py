from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from .settings import Settings
from .state import State


async def main(settings: Settings):
    # Create Motor client
    client = AsyncIOMotorClient(
        # TODO enable user and password
        # f"mongodb://{settings.mongo_username}:{settings.mongo_password}@{settings.mongo_host}:{settings.mongo_port}"
        f"mongodb://{settings.mongo_host}:{settings.mongo_port}"
    )

    # Initialize beanie with the Sample document class and a database
    await init_beanie(database=client.db_name, document_models=[State])

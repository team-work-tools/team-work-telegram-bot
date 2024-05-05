import asyncio
import logging
import sys
import json
from os import getenv

from aiogram import Bot, Dispatcher, Router, html
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart
from aiogram.types import Message, User

from typing import TypeVar, Optional, Callable, Awaitable
from dataclasses import dataclass
from dataclass_wizard import JSONWizard
import aioschedule

router = Router()


@router.message(commands=["subscribe"])
async def subscribe(
    message: Message, state: State, save_state: Callable[[State], None]
):
    match user := message.from_user:
        case User():
            match user.username:
                case str():
                    state.subscribed_users.add(user.username)
                    save_state(state)
                    await message.reply(f"You have been subscribed, {user.username}!")


@router.message(commands=["unsubscribe"])
async def unsubscribe(
    message: Message, state: State, save_state: Callable[[State], None]
):
    match user := message.from_user:
        case User():
            match user.username:
                case str():
                    state.subscribed_users.remove(user.username)
                    save_state(state)
                    await message.reply(f"You have been unsubscribed, {user.username}!")


@router.message(commands=["unsubscribe_today"])
async def unsubscribe_today(
    message: Message, state: State, save_state: Callable[[State], None]
):
    match user := message.from_user:
        case User():
            match user.username:
                case str():
                    state.subscribed_users.remove(user.username)
                    save_state(state)
                    await message.reply(
                        f"You have been unsubscribed for today, {user.username}!"
                    )


@router.message(commands=["set_standup_time"])
async def set_standup_time(message: Message):
    match text := message.text:
        case str():
            # TODO validate time
            # Extract the desired standup time from the message text
            standup_time = text.split(" ", 1)[1]
            # Schedule the standup messages
            aioschedule.every().day.at(standup_time).do(send_standup_messages)
            await message.reply(f"Standup time set to {standup_time}!")


@router.message(commands=["set_reminder_period"])
async def set_reminder_period(message: Message):
    match text := message.text:
        case str():
            # Extract the desired reminder period from the message text
            reminder_period = text.split(" ", 1)[1]
            await message.reply(f"Reminder period set to {reminder_period}!")

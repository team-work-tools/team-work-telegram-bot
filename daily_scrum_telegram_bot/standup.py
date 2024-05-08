from apscheduler.schedulers.asyncio import AsyncIOScheduler
from .custom_types import SendMessage, SaveState, LoadState
from datetime import datetime
from .constants import day_of_week
from .messages import make_meeting_messages


async def send_standup_messages(load_state: LoadState, send_message: SendMessage):
    state = load_state()
    for username in state.subscribed_users:
        for message in make_meeting_messages(username=username):
            await send_message(message=message, state=state)


def schedule_standup(
    standup_time: datetime,
    scheduler: AsyncIOScheduler,
    load_state: LoadState,
    save_state: SaveState,
    send_message: SendMessage,
):
    scheduler.remove_all_jobs()

    state = load_state()
    state.standup_time = standup_time
    save_state(state)

    scheduler.add_job(
        func=send_standup_messages,
        kwargs={"load_state": load_state, "send_message": send_message},
        trigger="cron",
        hour=standup_time.hour,
        minute=standup_time.minute,
        day_of_week=day_of_week,
    )

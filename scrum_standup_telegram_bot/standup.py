from apscheduler.schedulers.asyncio import AsyncIOScheduler
from .types import SendMessage, SaveState, LoadState
from datetime import datetime
from .constants import day_of_week


async def send_standup_messages(load_state: LoadState, send_message: SendMessage):
    state = load_state()
    for username in state.subscribed_users:
        await send_message(
            message=f"@{username}, what did you do yesterday?", state=state
        )
        await send_message(message=f"@{username}, what will you do today?", state=state)
        await send_message(
            message=f"@{username}, what (if anything) is blocking your progress?",
            state=state,
        )


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

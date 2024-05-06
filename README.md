# scrum-standup-telegram-bot

A Telegram bot that helps conduct daily SCRUM stand-up meetings.

## Bot commands

- `/help` - get the bot description and a list of commands
- `/start` - the same as `/help`
- `/subscribe` - subscribe a person that sent the command
  - when a person is subscribed, the bot knows the person Telegram username
- `/unsubscribe` - unsubscribe a person that sent the command
- `/set_standup_time` - set time for sending standup messages
  - example: `/set_standup_time 10:00`

## Bot messages

- The bot sends messages at the set time
- The bot sends three messages for each subscribed person with `@username`:

  - `@username, what did you do yesterday?`
  - `@username, what will you do today?`
  - `@username, what (if anything) is blocking your progress?`

## Usage

### Environment variables

The bot requires these environment variables.

```console
BOT_TOKEN=<bot token received from @BotFather>
BOT_STATE_FILE=data/state.json
```

### Run with `dotenv`

Write the environment variables to a `.env` file.

Next, install dependencies and run.

```console
poetry install
dotenv -f .env run poetry run bot
```

## Possible extensions

### Commands

- `/set_reminder_period` - set the period between reminders (`reminder_period`) to reply to bot messages
  - example: `/set_reminder_period 2` - 2 hours
- `/unsubscribe_today` - unsubscribe a person that sent the command just for today

### User replies

- A person with `@username` should reply to each message
- When a user replies to all three messages, the bot sends a message
  - `@username, I wish you a productive day!`
- If a user with `@username` doesn't reply within the reminder period, the bot sends a reminder

    ```text
    @username,
    - If you plan to work today, please reply to my messages <message_1_id>, <message_2_id>, <message_3_id>
    - If you don't, send /unsubscribe_today
    ```

    Here, <message_1_id> is the ID of today's message that mentioned `@username` and received no reply

### External info

- Collect activity statistics for each person and mention in bot messages (see [Bot messages](#bot-messages)) that someone didn't do anything yesterday.
  - activity in GitHub Organization issues
  - commits
  - messages in the joint chat
- Generate personal activity reports for a week/month

# standup-bot

A Telegram bot that helps conduct daily SCRUM standups.

## Bot commands

- `/subscribe` - subscribes a person that sent the command
  - when a person is subscribed, the bot knows the person Telegram username
- `/unsubscribe` - unsubscribes a person that sent the command
- `/unsubscribe_today` - unsubscribes a person that sent the command just for today
- `/set_standup_time` - set time for sending standup messages
  - example: `/time 10:00 MSK`
- `/set_reminder_period` - set the period between reminders (`reminder_period`) to reply to bot messages
  - example: `/set_reminder_period 2H` - 2 hours

## Bot messages

- The bot sends messages at the set time
- The bot sends three messages for each subscribed person with `@username`:

  - `@username, what did you do yesterday?`
  - `@username, what will you do today?`
  - `@username, what (if anything) is blocking your progress?`

## User replies

- A user with `@username` should reply to each message
- When a user replies to all three messages, the bot sends a message
  - `@username, I wish you a productive day!`
- If a user with `@username` doesn't reply within the reminder period, the bot sends a reminder

    ```text
    @username,
    - If you plan to work today, please reply to my messages <message_1_id>, <message_2_id>, <message_3_id>
    - If you don't, send /unsubscribe_today
    ```

    Here, <message_1_id> is the ID of today's message that mentioned `@username` and received no reply

## Extensions

- Collect activity statistics for each person and mention in bot messages (see [Bot messages](#bot-messages)) that someone didn't do anything yesterday
  - activity in GitHub Organization issues
  - commits
  - messages in the joint chat
- Generate personal activity reports for a week/month

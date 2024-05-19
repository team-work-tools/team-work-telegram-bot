# Easy Daily Telegram Bot

A Telegram bot that helps you conduct [daily meetings](https://www.agilealliance.org/glossary/daily-meeting/), also known as "daily stand-up," "daily scrum," etc.

## Motivation

- I have participated in too many projects that delivered less than they could have due to a lack of regular work from myself and my teammates.
- I want a bot to remind me that I actually have to work on workdays.
- I want everyone on my team to know each other's workdays.
- In the morning, I don't care enough to ask my teammates about their progress, plans, and problems, so I want a bot to do that for me.
- When I do care later, I can read through my teammates' messages and help them resolve their problems.

## Bot help message

<!-- `$ poetry run bot print-bot-message` as console -->

```console
I can help you conduct Daily Scrum.

You can control me by sending these commands:

/start - Enable me.
/help - Get this help message.
/set_meeting_time 2024-05-10T09:42:00+03:00 - Set the start time and date in the <a href="https://time.lol">ISO 8601</a> format. I'll schedule meetings for this time for Monday - Friday starting not earlier than on this date.
/subscribe - Allow mentioning you during meetings.
/unsubscribe - Disallow mentioning you during meetings.
/get_subscribers - Get a list of subscribed users.

During a meeting, I'll send in this group three messages for each subscribed person.

Please reply to all messages that mention you so that your teammates can learn about your progress and plans and can help you resolve problems.
```

## Meeting messages

- The bot sends messages at the set time.

<!-- `> echo '- The bot sends three messages for each subscribed person with *@username*:'; poetry run bot print-meeting-messages | xargs -I {} printf "  - <code>%s</code>\n" {}` -->

<!-- BEGIN mdsh -->
- The bot sends three messages for each subscribed person with *@username*:
  - <code>@username, what did you do yesterday?</code>
  - <code>@username, what will you do today?</code>
  - <code>@username, what (if anything) is blocking your progress?</code>
<!-- END mdsh -->

## Usage

### My bot

Add [@daily_scrum_robot](http://t.me/daily_scrum_robot) to a group or open a chat with this bot and send `/start`.

### Your bot

1. Create a bot via [@BotFather](https://t.me/botfather).

1. Write the environment variables to a `.env` file.

    ```console
    BOT_TOKEN=<bot token received from @BotFather>
    MONGO_HOST=mongodb
    MONGO_PORT=27017
    ```

1. Run via `docker`.

    ```console
    docker compose up
    ```

1. Add your bot to a group or open a chat with your bot and send `/start`.

## Develop

### Requirements

See [Requirements](./docs/requirements.md).

### Nix flake

Run `nix develop` and see available commands and tools.

## I18N

[aiogram docs](https://docs.aiogram.dev/en/latest/utils/i18n.html)

Run:

```sh
chmod +x ./scripts/locales.sh
./scripts/locales.sh
```

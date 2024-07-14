# Daily Meeting Telegram Bot

## Project Description

The bot was created to facilitate teamwork, it happens that a person participates in too many projects that bring less results than they could, due to the lack of regular work on his part and his teammates.
The bot should remind you that in fact the user should work on working days, and the ability to set a period has been added. Thanks to our project, everyone in the team can find out about each other's working days, they can not ask their teammates about their successes, plans and problems, because the bot does it for the user. This way, each team member can read the messages of their teammates and help them solve their problems. Also, thanks to our development, a person can schedule meetings and set the time for them

## Feature list

#### Global commands
```
/start - Enable me.
/help - Get a help message.
/stop - Disable me.
/set_language - Set my interface language.
```

#### Team settings commands
```
/set_meetings_time - Set meetings time.
```

#### Personal settings commands
```
/set_personal_meetings_days - Set the days when you can join meetings.
/set_reminder_period - Set how often you'll be reminded about unanswered questions.
/join - Join meetings.
/skip - Skip meetings.
```

#### Chat information commands
```
/get_chat_state - Get the chat state that I store.
/reset - Reset the chat state.
/get_report - Get the report.
```

## Demo
[Demo video link](https://drive.google.com/file/d/1cZLy_JK4ymAlgTBbxkK157Uv55CiFxO_/view?usp=drive_link)

## Link to the up-to-date deployed version of your product

https://t.me/meeting_daily_bot

## Usage instructions

### Personal use:
Send [@meeting_daily_bot](https://t.me/meeting_daily_bot) a private message with the /start command.

### Teamwork:
Add [@meeting_daily_bot](https://t.me/meeting_daily_bot) to the public group. To gain access to all the functionality of the bot, send the /start command to the bot in private messages.

## Frameworks or technologies used

#### Programming language:
+ Python
#### Libraries:
+ aiogram - for the bot
+ Babel - for i18n
#### Database:
+ MongoDB
#### Deployment
+ docker-compose
#### Dev environment
+ Nix package manager
+ poetry package manager

## Languages

+ Ru
+ En

## Roadmap issue

[Link to the roadmaop issue](https://github.com/team-work-tools/team-work-telegram-bot/issues/79)

## Launch your bot
1. Create a bot via @BotFather.

2. Write the environment variables to a `.env` file.
```
BOT_TOKEN=<bot token received from @BotFather>
MONGO_HOST=mongodb
MONGO_PORT=27017
MONGO_USERNAME=some_unusual_username
MONGO_PASSWORD=even_more_unusual_password
```

### Run via docker
```
chmod +x scripts/up.sh
./scripts/up.sh
```
### Run via Nix
1. Install Nix - [link](https://github.com/DeterminateSystems/nix-installer#usage)
2. Run the bot.
```
   nix run .#bot
   ```

## Contributing
+ Suggest a new feature [here](https://github.com/team-work-tools/team-work-telegram-bot/issues/new?assignees=&labels=Architecture%2CProject+Documentation%2CUI%2FUX%2C%5BScenario%5D&projects=&template=scenario.yml&title=Scenario%3A+%7B%7Bscenario_description%7D%7D)
+ Improve existing functionality/fix a bug/improve the UI, etc. [here](https://github.com/team-work-tools/team-work-telegram-bot/issues/new?assignees=&labels=%5BTask%5D&projects=&template=task.yml&title=%7B%7Btask_description%7D%7D)
## Develop 
### Requirements
See [requirements](https://github.com/team-work-tools/team-work-telegram-bot/blob/119-update-readme/docs/requirements.md)
### Setting up the development environment using VS Code
The project describes scenarios using [statelyai.stately-vscode](https://marketplace.visualstudio.com/items?itemName=statelyai.stately-vscode) extension for VS Code.
### I18N
[aiogram docs](https://docs.aiogram.dev/en/latest/utils/i18n.html)
Run:
```
chmod +x ./scripts/locales.sh
./scripts/locales.sh
```
### New translations
```
bash ./scripts/locales.sh
```
### Nix flake
Run `nix develop` and see available commands and tools.

## License

Distributed under the MIT License. See [LICENSE.txt](https://github.com/team-work-tools/team-work-telegram-bot/blob/119-update-readme/LICENSE) for more information.

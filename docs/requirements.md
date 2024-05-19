
## Glossary

The words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC2119 [^RFC2119] and RFC8174 [^RFC8174] when, and only when, they appear in all capitals, as shown here.

- **Regular meetings** - meetings that occur every week.

## Nonfuncional requirements

As per [ISO/IEC 25010](https://iso25000.com/index.php/en/iso-25000-standards/iso-25010).

- Performance Efficiency
  - Time Behavior
    - The bot MUST respond to messages in under 0.5 seconds.
- Functional Suitability
  - Functional correctness
    - The bot MUST have no states where it gets stuck and can't respond.
  - Functional Completeness
    - The bot MUST support all commands specified in the [Commands](#commands) section.


## Functional requirements

### Stack

- Programming language:
  - `Python`
- Libraries:
  - `aiogram` - for the bot
  - `Babel` - for i18n
- Database:
  - `MongoDB`
- Deployment
  - `docker-compose`
- Dev environment
  - `Nix` package manager
  - `poetry` package manager

### i18n

- Languages:
  - `Ru`
  - `En`
- Support extending this list via message catalogs ([link](https://babel.pocoo.org/en/latest/cmdline.html)).

### Commands

#### Types

- Interactive command - The bot MUST reply to the sent command and prompt the command sender to perform some actions.
- Non-interactive command - The bot MUST NOT prompt the sender to do some actions. The bot MAY reply to the sent command.


#### Global commands

[Telegram docs](https://core.telegram.org/bots/features#global-commands)

- `/start` - (interactive) Start the bot.
- `/help` - (non-interactive) Get a help message.
- `/stop` - (non-interactive) Stop the bot.
- `/cancel` - (non-interactive) Cancel the current operation.

#### Team settings

- `/set_up_meeting` - (interactive) Set up regular meeting time zone, time, workdays.
- `/set_time_zone` - (interactive) Set the team's time zone.
- `/set_meeting_time` - (interactive) Set the regular meeting time.
- `/set_team_workdays` - (interactive) Set the team's workdays.

#### Personal settings

- `/join` - (non-interactive) Order the bot to mention the command sender during regular meetings.
- `/leave` - (non-interactive) Order the bot to not mention the command sender during regular meetings.
- `/set_my_workdays` - (interactive) Order the bot to mention the command sender during regular meetings only on the specific days.
- `/join_today` - (non-interactive) Order the bot to mention the command sender during today's regular meeting or immediately if the meeting is over.
- `/leave_today` - (non-interactive) Order the bot to not mention the command sender during today's regular meeting.
- `/set_vacation` - (interactive) Order the bot to not mention the command sender during a specific period.
- `/unset_vacation` - (interactive) Order the bot to remove the info about the vacation of the command sender.

##### Notes

- There can be at most one vacation for a person at each moment.


Why these questions - [link](https://geekbot.com/blog/daily-standup-questions/).

From [here](https://www.agilealliance.org/glossary/three-qs/):

- `@username, what did you do last working day?`
- `@username, what will you do today?`
- `@username, what (if anything) is blocking your progress?`

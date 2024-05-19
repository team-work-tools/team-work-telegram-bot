
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

### Commands

#### Global

[link](https://core.telegram.org/bots/features#global-commands)

- `/start` - start bot
- `/help` - get a help message
- `/stop` - stop bot

#### Team settings

- `/set_current_time` - set your current time so that I know your time zone.
- `/set_meeting_time` - set meeting time in `HH:MM` format.
  - Requires current time to be set.
- `/set_team_working_days` - set team working days
  - 1,2,...,7

#### Personal settings

- `/join` - join meetings
- `/leave` - leave meetings
- `/set_personal_working_days` - set personal working days
  - 1,2,...,7

### Meeting questions

Why these questions - [link](https://geekbot.com/blog/daily-standup-questions/).

From [here](https://www.agilealliance.org/glossary/three-qs/):

- `@username, what did you do last working day?`
- `@username, what will you do today?`
- `@username, what (if anything) is blocking your progress?`

# Requirements

## Nonfuncional

- Performance
  - Bot should respond to messages in under 0.5 second
- Functional correctness
  - Bot shouldn't have states where it gets stuck and can't respond

## Functional

### Stack

- Programming language:
  - `Python`
- Libraries:
  - `aiogram` - for bot
  - `Babel` - for i18n
- Database:
  - `MongoDB`
- Deployment
  - `docker-compose`
- Dev environment
  - `Nix`

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

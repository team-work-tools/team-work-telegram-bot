# Roles and Responsibilities

This document describes [roles](#roles), how [responsibilities](#responsibilities) should be distributed, and what's the current [responsibility distribution](#responsibility-distribution) in our project.

## Roles

### Team 12

Leader: ... GitHub username with a link to the GitHub profile ...

Members: ... GitHub usernames with links to GitHub profiles ...

### Team 34

Leader: [@belyakova-anna](https://github.com/belyakova-anna)

Members:

- [@belyakova-anna](https://github.com/belyakova-anna)
- [@Dayanaoak](https://github.com/Dayanaoak)
- [@examplefirstaccount](https://github.com/examplefirstaccount)
- [@Fullerite](https://github.com/Fullerite)
- [@ghshark63](https://github.com/ghshark63)

### Team 56

Leader: ...

Members: ...

## Responsibilities

### Overview

Responsibilities are areas of the project that should be worked on.
Each area has an issue label starting with a capital letter (see all [labels](https://github.com/team-work-tools/team-work-telegram-bot/labels)).

### How to

#### Distribute responsibilities initially

1. Start a team meeting.
1. Discuss your backlog.
1. Discuss responsibilities to cover your backlog.
1. Update the [Responsibility Distribution](#responsibility-distribution) section:
    1. Create missing subsections.
    1. Update/remove outdated subsections.
    1. Update [Task activity](#task-activity) subsections.
1. Fill `Responsible People` sections.
1. Commit and make a Pull Request.
1. Ask people responsible for [Team Management](#team-management) to review and merge your pull request.

#### Update your responsibilities

1. Choose new responsibilities you'd like to take.
1. Choose old responsibilities you'd like to drop.
1. Check whether there are (understaffed) tasks for your new responsibility.
1. Check whether there are (understaffed without you) tasks for your old responsibility.
    1. If yes, consider not dropping your old responsibilities.
1. Discuss with your leader whether it's safe to change your responsibilities from the point of view of your team and the project.
1. Edit your responsibilities in this file and make a pull request.
1. Ask people responsible for [Team Management](#team-management) to review and merge your pull request.

#### Read the [Responsibility Distribution](#responsibility-distribution) section

- A label name with a hyperlink to the corresponding label like [Architecture](https://github.com/team-work-tools/team-work-telegram-bot/labels/Architecture) introduces a label.
  - <a id="task-activity"></a> The `Task activity` section provides hints on when an issue should be assigned this label.
  - <a id="responsible-people"></a> The `Responsible people` section lists GitHub usernames with hyperlinks to GitHub profiles of people responsible for either:
    - Closing issues with this label.
    - Reviewing PRs for issues with this label.

## Responsibility Distribution

#### [Architecture](https://github.com/team-work-tools/team-work-telegram-bot/labels/Architecture)

##### Task activity

- <a id="asrs"></a> Compose a Utility Tree with Architecturally Significant Requirement Scenarios (ASRS) (see Table 19.1 in [^soap])
- Model interaction between project components
- Write bot scenarios
- Choose frameworks

##### Responsible people
- [@deemp](https://github.com/deemp/)
- [@belyakova-anna](https://github.com/belyakova-anna)
- [@Dayanaoak](https://github.com/Dayanaoak)

#### [Quality Assurance](https://github.com/team-work-tools/team-work-telegram-bot/labels/Quality%20Assurance)

##### Task activity

- Design and/or implement tests
  - for [ASRS](#asrs)
  - for the bot
  - for the Mini App

##### Responsible people
- [@deemp](https://github.com/deemp/)
- [@ghshark63](https://github.com/ghshark63)

#### [Requirements](https://github.com/team-work-tools/team-work-telegram-bot/labels/Requirements)

##### Task activity

- Define the requirements format.
- Document existing customer requirements.
- Analyze requirements:
  - Connect requirements.
  - Identify missing, irrelevant requirements.
- Clarify requirements with the customer.

##### Responsible people
- [@deemp](https://github.com/deemp/)
- [@belyakova-anna](https://github.com/belyakova-anna)

#### [Team Management](https://github.com/team-work-tools/team-work-telegram-bot/labels/Team%20Management)

##### Task activity

- Document and set up policies, processes, and procedures ([link](./policies-processes-procedures.md)).
- Organize team meetings

##### Responsible people
- [@deemp](https://github.com/deemp/)
- [@belyakova-anna](https://github.com/belyakova-anna)

#### [Bot](https://github.com/team-work-tools/team-work-telegram-bot/labels/Bot)

##### Task activity

- Handle the commands
- Translate messages into different languages
- Interact with the database

##### Responsible people

- [@examplefirstaccount](https://github.com/examplefirstaccount)
- [@Fullerite](https://github.com/Fullerite)
- [@belyakova-anna](https://github.com/belyakova-anna)


#### [Database Administration](https://github.com/team-work-tools/team-work-telegram-bot/labels/Database%20Administration)

##### Task activity

- Design the database
- Write functions to interact with the database

##### Responsible people

- [@ghshark63](https://github.com/ghshark63)

#### [Development](https://github.com/team-work-tools/team-work-telegram-bot/labels/Development)

##### Task activity

- Develop bot (Python)
- Develop MiniApp
- Write automated tests

##### Responsible people

- [@ghshark63](https://github.com/ghshark63)
- [@examplefirstaccount](https://github.com/examplefirstaccount)
- [@Fullerite](https://github.com/Fullerite)
- [@belyakova-anna](https://github.com/belyakova-anna)

#### [DevOps](https://github.com/team-work-tools/team-work-telegram-bot/labels/DevOps)

##### Task activity

- Do CI/CD
- Monitor and log
- Manage containers

##### Responsible people

- [@examplefirstaccount](https://github.com/examplefirstaccount)
- [@Fullerite](https://github.com/Fullerite)

#### [GitHub Issues Management](https://github.com/team-work-tools/team-work-telegram-bot/labels/GitHub%20Issues%20Management)

##### Task activity

- Сreate issues
- Assign labels to it
- Appoint responsible people

##### Responsible people

[@belyakova-anna](https://github.com/belyakova-anna)

#### [Internationalization](https://github.com/team-work-tools/team-work-telegram-bot/labels/Internationalization)

##### Task activity

Support multi-language chat

##### Responsible people

- [@belyakova-anna](https://github.com/belyakova-anna)

#### [LLMs](https://github.com/team-work-tools/team-work-telegram-bot/labels/LLMs)

##### Task activity

- Read user replies (can be many for a single message)
    - (Optional) If replies contain links to issues, read these issues
- Generate a summary of how person plans matched what a person did during the week
- Make recommendations

##### Responsible people

- [@examplefirstaccount](https://github.com/examplefirstaccount)
- [@Fullerite](https://github.com/Fullerite)

#### [Mini App](https://github.com/team-work-tools/team-work-telegram-bot/labels/Mini%20App)

##### Task activity

- Make frontend
- Make backend
- Make integration with Telegram API

##### Responsible people

- [@ghshark63](https://github.com/ghshark63)
- [@belyakova-anna](https://github.com/belyakova-anna)

#### [Nix](https://github.com/team-work-tools/team-work-telegram-bot/labels/Nix)

##### Task activity

- Write Nix script for testing the bot
- Write Nix script for generating documentation

##### Responsible people

- [@ghshark63](https://github.com/ghshark63)

#### [Project Documentation](https://github.com/team-work-tools/team-work-telegram-bot/labels/Project%20Documentation)

##### Task activity

- Version the documentation in the project repository (files/issues).
- Use appropriate documentation tools.
- Make a website for documentation and set up auto-deployment (for example, GitHub Pages + mdBook + GitHub Actions).

##### Responsible people

- [@Dayanaoak](https://github.com/Dayanaoak)

#### [Research](https://github.com/team-work-tools/team-work-telegram-bot/labels/Research)

##### Task activity

- Study the goals and objectives of the bot
- Identify the target audience
- Analyze alternative products
- Suggest functional ideas

##### Responsible people

- [@Dayanaoak](https://github.com/Dayanaoak)

#### [Security](https://github.com/team-work-tools/team-work-telegram-bot/labels/Security)

##### Task activity

- Use a password and a user name in the database
- Use NixOS
- Use sops
- Reproduce this or a similar attack
- Add a script to test the found attack automatically

##### Responsible people

- [@examplefirstaccount](https://github.com/examplefirstaccount)
- [@Fullerite](https://github.com/Fullerite)

#### [Task Management](https://github.com/team-work-tools/team-work-telegram-bot/labels/Task%20Management)

##### Task activity

- Maintain a backlog
- Assign people to tasks

##### Responsible people

- [@deemp](https://github.com/deemp/)
- [@belyakova-anna](https://github.com/belyakova-anna)

#### [UI/UX](https://github.com/team-work-tools/team-work-telegram-bot/labels/UI%2FUX)

##### Task activity

- Analyze user experience
- Make a prototype
- Test user experience

##### Responsible people

- [@Dayanaoak](https://github.com/Dayanaoak)

[^soap]: [Software Architecture in Practice, 4th ed](https://libstc.cc/#/stc/nid:dy6kmolzlnucrcnq9ud92ev92)

# Glossary

>[!NOTE]
> The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED",  "MAY", and "OPTIONAL" in this document and in this repository are to be interpreted as described in [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119) and [RFC 8174](https://www.rfc-editor.org/rfc/rfc8174).

## Actor

A [Bot](#bot) or a [User](#user).

## Assignee

A person who is responsible for completing an [issue](https://github.com/team-work-tools/team-work-telegram-bot/issues).

## Bot

An instance of the bot developed in this repository.

## Customer

The customer in the project.

## Forum

A [Supergroup](#supergroup) with [Topics](#topic) enabled.

## Group

A Telegram group where:

- It's not possible to get links to messages.

## Policy

Explained [here](https://www.oracle.com/ce-help/playbook/display-content/ar02-policy-process-or-procedure#the_policy).

## Private chat

A private chat (not a group) of a [User](#user) and a [Bot](#bot).

## Procedure

Explained [here](https://www.oracle.com/ce-help/playbook/display-content/ar02-policy-process-or-procedure#the_procedure).

## Process

Explained [here](https://www.oracle.com/ce-help/playbook/display-content/ar02-policy-process-or-procedure#the_process).

## Project

The [team-work-telegram-bot](https://github.com/team-work-tools/team-work-telegram-bot) project.

## PR

A [pull request](https://github.com/team-work-tools/team-work-telegram-bot/pulls).

## Repository

[Project](#repository) repository ([link](https://github.com/team-work-tools/team-work-telegram-bot)).

## Responsibility

[Responsibility](configuration/roles-and-responsibilities.md#def-responsibility).

## Responsibility labels

[Responsibility labels](configuration/roles-and-responsibilities.md#def-responsibility-labels).

## Responsibility Distribution

[Responsibility Distribution](configuration/roles-and-responsibilities.md#responsibility-distribution).

## Reviewer

A person who is responsible for reviewing a [PR](#pr).

## Roadmap issue

An [issue](https://github.com/team-work-tools/team-work-telegram-bot/issues/79) that stores the [Project](#project) roadmap.

## Sprint

See [Sprint](./configuration/sprint.md)

## Supergroup

A Telegram group where:

- It's possible to get links to messages.
- New members see the message history.

## Task Management, Architecture, UI/UX, etc

People that have these [Responsibilities](#responsibility) according to the [Responsibility distribution](#responsibility-distribution).

## Team

A team working on this project.

## Teams

All [teams](#team) that work on this project.

## Topic

A chat within a [Supergroup](#supergroup).

## User

A user of the [Bot](#bot).

## Variable

- Words in curly brackets are variables. Example: {variable}.
- Variables MAY be highlighted as inline code.
  - Format:

    ~~~md
    `{variable}`
    ~~~

  - Example: `{variable}`.
- A variable in curly brackets is replaced with its value.
  
  - Example:
    - The value of {variable} is 4.
    - Then,

      ~~~md
      - {{variable}} equals 42.
      - `{{variable}}` equals `42`.
      - ``{{variable}}`` equals ``42``.
      ~~~

- The `{X}`, `{Y}`, `{Z}` variables are numbers that:
  - correspond to team numbers;
  - can take values `12`, `34`, `56`;
  - are pairwise different.

- The `{S}` variable is a number that denotes the index of the current sprint.
  
  [Sprint](#sprint) indices are given in the [Roadmap issue](#roadmap-issue).

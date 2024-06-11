# Roles and Responsibilities

This document describes [roles](#roles), how [responsibilities](#responsibilities) should be distributed, and what's the current [responsibility distribution](#responsibility-distribution) in our project.

## Roles

### Team 12

Leader: ... GitHub username with a link to the GitHub profile ...

Members: ... GitHub usernames with links to GitHub profiles ...

### Team 34

Leader: ...

Members: ...

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
    1. Update [Task characteristics](#def-task-characteristics) subsections.
1. Fill `Responsible People` sections.
1. Commit and make a Pull Request.
1. Ask people responsible for [Team Management](https://github.com/team-work-tools/team-work-telegram-bot/labels/Team%20Management) to review and merge your pull request.

#### Update your responsibilities

1. Choose new responsibilities you'd like to take.
1. Choose old responsibilities you'd like to drop.
1. Check whether there are (understaffed) tasks for your new responsibility.
1. Check whether there are (understaffed without you) tasks for your old responsibility.
    1. If yes, consider not dropping your old responsibilities.
1. Discuss with your leader whether it's safe to change your responsibilities from the point of view of your team and the project.
1. Edit your responsibilities in this file and make a pull request.
1. Ask people responsible for [Team Management](https://github.com/team-work-tools/team-work-telegram-bot/labels/Team%20Management) to review and merge your pull request.

#### Read the [Responsibility Distribution](#responsibility-distribution) section

- A label name with a hyperlink to the corresponding label like [Architecture](https://github.com/team-work-tools/team-work-telegram-bot/labels/Architecture) introduces a label.
  - <a href="def-task-characteristics"></a> The `Task characteristics` section provides hints on when an issue should be assigned this label.
  - <a href="def-responsible-people"></a> The `Responsible people` section lists GitHub usernames with hyperlinks to GitHub profiles of people responsible for either:
    - Closing issues with this label.
    - Reviewing PRs for issues with this label.

## Responsibility Distribution

TODO:

- document other responsibilities
- assign people

#### [Architecture](https://github.com/team-work-tools/team-work-telegram-bot/labels/Architecture)

##### Task characteristics

- Related to developing the project architecture:
  - <a href="def-asrs"></a> Compose a Utility Tree (see Table 19.1 in [^soap])
  - Model interaction between project components
  - Write bot scenarios
  - Choose frameworks

##### Responsible people

[@deemp](https://github.com/deemp/), ... GitHub usernames ...

#### [Quality Assurance](https://github.com/team-work-tools/team-work-telegram-bot/labels/Quality%20Assurance)

##### Task characteristics

- Related to defining and ensuring the product quality:
  - Implement:
    - Tests for [Architecturally Significant Requirement Scenarios](#def-asrs)
    - Unit tests

##### Responsible people

- [@deemp](https://github.com/deemp/), ...

#### [Requirements](https://github.com/team-work-tools/team-work-telegram-bot/labels/Requirements)

##### Task characteristics

- Related to requirements engineering:
  - Define the requirements format.
  - Document existing customer requirements.
  - Analyze requirements:
    - Connect requirements
    - Identify:
      - missing
      - irrelevant

      requirements

  - Clarify requirements with the customer.

##### Responsible people

[@deemp](https://github.com/deemp/), ...

#### [Team Management](https://github.com/team-work-tools/team-work-telegram-bot/labels/Team%20Management)

##### Task characteristics

- Set up team work tools
- Document and set up policies, processes, and procedures ([link](https://www.oracle.com/ce-help/playbook/display-content/ar02-policy-process-or-procedure)).
- Organize team meetings

##### Responsible people

[@deemp](https://github.com/deemp/), ...

[^soap]: [Software Architecture in Practice, 4th ed](https://libstc.cc/#/stc/nid:dy6kmolzlnucrcnq9ud92ev92)

# Sprint

## Glossary

- `X`, `Y`, `Z`, `T` are numbers.
  - They correspond to team numbers.
  - They can take values `12`, `34`, `56`.
- `{X}` means "write here the value of `X`" like in Python f-strings.
- `Team {X}`, `Team {Y}`, `Team {Z}` are different teams.
- `UPPERCASE` words that have a specified meaning in [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119) and [RFC 8174](https://www.rfc-editor.org/rfc/rfc8174) have that meaning in this document.

## Policies

### Sprint Schedule

#### Sprint Start

- Sprint 1: Thursday
- Otherwise: Monday

#### Sprint End

- Sprint 1: Sunday
- Otherwise: Saturday

### Retrospective

#### Day

- Sprint 1: no retrospective
- Otherwise: Sunday

#### Agenda

- Customer and teams MUST conduct a retrospective on documented policies, procedures, processes.

### Sprint Planning

- Sprint plans MUST be tracked and versioned in a GitHub issue.

### Milestones

- There MUST be separate milestones for each sprint for customer and each team.
- Milestone deadline MUST be the last day of the corresponding sprint.
- Finalized milestones MUST be stored in the repository.

### Git workflow process

- Teams MUST follow the established [Git workflow process](./git-workflow-process.md).

## Process

### Notes

- The [Process](#process) section is a simplified version of the [Procedure](#procedure) section.

### Sprint {S} activities

- Customer suggests scenarios for a sprint for each team in the [Roadmap issue](https://github.com/team-work-tools/team-work-telegram-bot/issues/79).
- Customer and Team {X} negotiate scenarios for:
  - Sprint {S} of Team {X};
  - Future sprints of Team {X};
- Team {X} creates a [milestone](https://github.com/team-work-tools/team-work-telegram-bot/milestones) in the repository.
- Team {X} sets the milestone deadline according to [Milestone policies](#milestones).
- For each scenario name in the Sprint {S}, Team {X} does the following:
  - Create an issue for the Scenario (Scenario issue).
  - Add a link to the Scenario issue as specified in the [Roadmap issue](https://github.com/team-work-tools/team-work-telegram-bot/issues/79) policies.  
  - Create a branch `{scenario_branch}` from the `main` branch for the Scenario issue via the `Create a branch` button on the issue page.
  - Textually and visually explain the scenario in that branch.
  - Make a PR from the `{scenario_branch}` to the `main` branch.
    - You'll periodically merge the `{scenario_branch}` to the `main` branch and the `main` branch to the `{scenario_branch}` while you work on the scenario.
  - Write subtasks in a single-level checkbox list in the Scenario issue description.
  - Replace subtasks with links to issues. Either:
    - Find an existing issue for that subtask and replace the subtask with a link to that issue.
    - Convert the subtask to an issue (via the ⦿ button to the right).
  - Assign labels to issues related to the Scenario issue:
    - priority - 1 to 5
    - size - `XS`, `S`, `M`, `L`, `XL`
    - `team {X}`
    - Assignees - based on the [Responsibility distribution](./roles-and-responsibilities.md#responsibilities-distribution).
  - For each issue that is related to the Scenario issue and that has subtasks that aren't links to other issues:
    - Create a branch `{issue_branch}` from the `main` branch via the `Create a branch` button on the issue page.
    - Work on this issue on the `{issue_branch}`.
    - Periodically merge the `{main}` branch into the `{issue_branch}` to synchronize with the overall project progress.
    - Create a PR from the `{issue_branch}` to the `main` branch.
    - Run tests and ensure everything works locally.
    - Set as PR Reviewers [teams](https://github.com/orgs/team-work-tools/teams) that correspond to the issue labels (e.g., [Development](https://github.com/orgs/team-work-tools/teams/development)).
    - Revise the PR after comments.
    - Merge the PR when the PR:
      - is approved;
      - has no conflicts with the `main` branch.
- If a member of Team {X} makes significant contributions to PRs not related to Team {X} Scenario issues, the member can add the `team {X}` label to issues closed by these PRs. Significant contributions:
  - Comments on code sections
  - Code suggestions
  - Commits

## Procedure

### Примечания

- Роли:

  - Customer - заказчик

  - [Task Management](https://github.com/team-work-tools/team-work-telegram-bot/labels/Task%20Management)

  - Assignee (термин на GitHub) - ответственный за решение задачи

  - Reviewer (термин на GitHub) - ответственный за проверку решения

- Заголовок раздела обозначает начало блока задач, за которые отвечает человек с указанной в заголовке ролью.

- Team X, Team Y, Team Z - обозначения различных команд.

  - X, Y, Z - номера команд

- Sprint S - обозначение текущего спринта

  - S - номер спринта

### Customer

- Для каждой команды Team T:

  - Предложить сценарии в раздел Team T в текущем Sprint S в [Roadmap](https://docs.google.com/document/d/1Mtfs2oFYUY_Dofk3oEgv0d873R1QLok4PjIVFd_C_QI/edit#bookmark=kix.nu93mfnfx9l9).

  - Отправить ссылку на раздел Team T в топик команды.

  - Пингануть всех членов команды.

### Team X и Customer

- Обсудить сценарии в разделе Team X в подразделе Sprint S в [Roadmap](https://docs.google.com/document/d/1Mtfs2oFYUY_Dofk3oEgv0d873R1QLok4PjIVFd_C_QI/edit#bookmark=kix.nu93mfnfx9l9) в топике Team X.

- По результатам обсуждения изменить или оставить сценарии.

### Customer

- Сообщить в топике команды, что она может приступать.

### Task Management из Team X

- Для своего (в блоке Team X в [Roadmap](https://docs.google.com/document/d/1Mtfs2oFYUY_Dofk3oEgv0d873R1QLok4PjIVFd_C_QI/edit#bookmark=kix.nu93mfnfx9l9)) текущего спринта:

  - Создать Milestone в репозитории (см. [Repository](https://docs.google.com/document/d/1Mtfs2oFYUY_Dofk3oEgv0d873R1QLok4PjIVFd_C_QI/edit#bookmark=id.lurcicfzrc65)), если там еще нет нужного Milestone.

    - Назвать его “Sprint <номер текущего спринта>”.

    - Задать Due date - последний день Sprint S.

- Для каждого сценария в своем (в блоке Team X в [Roadmap](https://docs.google.com/document/d/1Mtfs2oFYUY_Dofk3oEgv0d873R1QLok4PjIVFd_C_QI/edit#bookmark=kix.nu93mfnfx9l9)) майлстоуне:

  - Сделать issue (Scenario Proposal issue).

    - Указать название issue: “Scenario Proposal: <название сценария на английском>”

    - В описании дать детали, которые понадобятся для проработки сценария.

  - Повесить на issue лейблы:

    - Scenario Proposal

    - Architecture

    - UI/UX

    - priority \<priority level>

    - team \<team id> - лейбл команды, занимающейся этим сценарием

  - Назначить Assignee из своей команды.

    - Как минимум:

      - 1 Architecture

      - 1 UI/UX

- Сообщить об этом в топике своей команды

  - Прислать ссылку на issue

  - Пингануть Assignee(s)

### Assignee из Team X

- Для своей (где человек является Assignee) Scenario Proposal issue:

  - Создать ветку в репозитории.

    - Нужно использовать **Create a branch** for this issue or link a pull request.

  - В ветке:

    - Подробно описать сценарий в файле **doc/configuration/scenarios/scenario-\<id>.md**

      - \<id> - left-zero-padded число от 0 до 100

        - Примеры: 000, 132

      - Числа должны быть уникальными для файлов в директории **scenarios**

    - Формат файла:

      - “

        <ссылка на scenario issue>

        \## Description

        <описание сценария>

        “

        - В описании сценария может быть:

        - Текст

        - Ссылка на .ts файл с кодом stately

          - Код надо писать в VS Code при помощи [расширения](https://marketplace.visualstudio.com/items?itemName=statelyai.stately-vscode)

        - Ссылка на проект на

          - [stately.ai](http://stately.ai)

          - [Figma](https://www.figma.com/)

        - mermaid диаграмма ([inline](https://github.blog/2022-02-14-include-diagrams-markdown-files-mermaid/) диаграмма, [UML](https://mermaid.js.org/syntax/zenuml.html))

          - Диаграмму можно сгенерировать из .ts файла с кодом stately при помощи [mdsh](https://github.com/zimbatm/mdsh#commented-out-commands).

        - Ссылка на PlantUML диаграмму ([link](https://plantuml.com/))

        - Картинки

        - Локально переключиться на ветку.

        - Добавить коммиты.

        - Запушить изменения в репозиторий.

        - Сделать PR в main из этой ветки.

        - Название: <название Scenario Proposal issue>

        - Описание PR: “- closes #\<Scenario Proposal issue id>“

        - Лейблы:

          - team X

        - Сообщить об этом в топике своей команды

        - Прислать ссылку на PR

        - Пингануть Task Management

### Task Management из Team X

- Для готового своего (с лейблом “team X”) PR по своей (с лейблом “team X”) Scenario Proposal issue:

  - Назначить 2 Reviewer:

    - Не из команды, реализующей PR.

    - Их responsibilities должны соответствовать лейблам issue.

  - Назначить ревьюером @deemp.

- Для каждой Scenario Proposal issue создать Scenario Implementation issue.

- Для каждой issue (обозначим ее как \<issue>), которая является Scenario Implementation issue или subtask issue:

  - Написать название

    - Если Scenario Implementation issue:

      - “Scenario Implementation: <название сценария на английском>”

    - Иначе:

      - Краткое описание подзадачи.

  - Сделать описание со следующими разделами:

    - Если Scenario Implementation issue:

      - “

        \## Implements

        \- <ссылка на Scenario Proposal issue>

        ”

        - (Опционально):

        - “

        \## Description

        <описание задачи>

        ”

        - “

        \##  Subtasks

        <подзадачи>

        ”,

        где <подзадачи> - одноуровневый список подзадач.

        - Элемент списка - это:

        - “- <ссылка на другую subtask issue>”

        - \#<номер другой subtask issue>

        - “- \[ ] <описание подзадачи>”

        - Нужно предусмотреть подзадачи для:

        - Решения задачи, сформулированной в \<issue>

        - Тестирования решения

        - (Опционально) Автоматизации тестирования в CI

        - Для каждой подзадачи в разделе “## Subtasks

        - Если подзадача большая и сама требует подзадач:

          - Проверить в [issues](https://github.com/team-work-tools/team-work-telegram-bot/issues), есть ли уже такая subtask issue для этой подзадачи.

          - Если нет, создать новую subtask issue.

          - Можно навести курсор на подзадачу и нажать “Convert to issue”.

          - Заменить <описание подзадачи> в списке подзадач на ссылку на соответствующую subtask issue.

        - Иначе оставить подзадачу как есть.

        - Повесить лейблы:

        - Если это Scenario Implementation issue:

          - Лейбл Scenario Implementation.

        - Иначе:

          - Лейблы в зависимости от Task activities, описанных в [Responsibilities](https://github.com/team-work-tools/team-work-telegram-bot/blob/main/docs/configuration/roles-and-responsibilities.md#responsibilities).

        - priority \<priority level>

        - team \<id своей команды>

        - (опционально) Размер (S, M, L, …)

        - Назначить Assignee(s) из своей команды в зависимости от [Responsibilities](https://github.com/team-work-tools/team-work-telegram-bot/blob/main/docs/configuration/roles-and-responsibilities.md#responsibilities) и лейблов.

        - Сообщить об этом в топике своей команды

        - “\<Telegram юзернейм(ы) Assignee> следи(те) за <ссылка на issue>”

### Assignee из Team X

Для своей (где человек является Assignee) Scenario Implementation issue или subtask issue:

- Создать ветку в репозитории.

  - Нужно использовать **Create a branch** for this issue or link a pull request.

- Локально переключиться на ветку.

- Добавить коммиты.

- Запушить изменения в репозиторий.

- Если PR менял код бота:

  - Поднять бота.

  - Протестировать.

- Сделать PR из текущей ветки:

  - Если своя issue - Scenario Implementation issue, то

    - в main

  - Иначе в ветку для Scenario Implementation issue, из-за которой была создана своя subtask issue.

    - чтобы в конце концов в PR для Scenario Implementation собрать изменения со всех веток, созданных для подзадач Scenario Implementation.

- Формат PR:

  - Название: Название issue

  - Описание PR: “- closes #\<issue id>“

- Сообщить об этом в топике своей команды

  - Прислать туда ссылку на PR

  - Пингануть Task Management

- Поработать над PR еще.

  - Если еще кто-то работает, периодически пуллить изменения.

- Если есть GitHub Actions:

  - Убедиться, что все checks зеленые.

### Task Management из Team X

Для своего (с лейблом “team X”) PR:

- Назначить 2 Reviewer.

  - Их responsibilities должны соответствовать лейблам issue.

  - Если PR для Scenario Implementation issue:

    - Не из команды, реализующей PR.

  - Иначе:

    - Из своей (Team X) команды.

### Reviewer

Для своего (где человек является Reviewer) PR:

- Проверить PR. Что можно сделать:

  - Просмотреть

  - Запустить бота локально и проверить

  - Оставить комментарии

  - Предложить правки

- Одобрить PR, если все ОК

### Assignee из Team X

Для своего (где человек является соавтором) PR (обозначим его как \<pr>):

- Для каждого Reviewer этого \<pr>:

  - Если Reviewer не проверяет дольше дня:

    - Пингануть в топике команды, в которой  состоит Reviewer

- Получить одобрения от всех Reviewers

- Вмержить PR

- Сообщить об этом в топике своей команды

  - Прислать туда ссылку на PR

  - Пингануть Task Management

### Task Management из Team X

- Для каждой своей (с лейблом “team X”) issue, над которой работала Team X и в которой есть значительный вклад Reviewers:

  - Добавить в эту issue лейбл команд(ы) Reviewers (team \<id команд(ы) Reviewers>).

### Team X и Customer

- В конце спринта провести ретроспективу по [Procedure](https://docs.google.com/document/d/1Mtfs2oFYUY_Dofk3oEgv0d873R1QLok4PjIVFd_C_QI/edit#bookmark=id.zbdqzkxopjoy).

Team X

- После спринта провести ретроспективу по внутренним процессам.

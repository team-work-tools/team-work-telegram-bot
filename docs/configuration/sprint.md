# Sprint

## Policy

- Начало спринта:

  - Понедельник

  - Или суббота (по желанию)

  - На неделе № 3: четверг

- Конец спринта:

  - Пятница

  - На неделе № 3: воскресенье

  - На неделе № 8: ???

- Ретроспектива:

  - В последний день спринта.

- Планирование спринта:

  - В первый день спринта.

- Цели отдельной команды на спринт:

  - Реализовать один или несколько сценариев.

- Цель команд  на спринт:

  - Бот работает в группе проекта.

  - Бот поддерживает существовавшие до спринта и новые сценарии, реализованные командами в этом спринте.

- Команды формируют и обсуждают майлстоуны [тут](https://docs.google.com/document/d/1Mtfs2oFYUY_Dofk3oEgv0d873R1QLok4PjIVFd_C_QI/edit#bookmark=kix.wgiqz868tte9).

- Майлстоуны фиксируются в [репозитории](https://github.com/team-work-tools/team-work-telegram-bot/).

- Дата майлстоуна - последний день спринта.

####

## Process

Примечания:

- Шаги в этом разделе - сильно упрощенная версия [Procedure](https://docs.google.com/document/d/1Mtfs2oFYUY_Dofk3oEgv0d873R1QLok4PjIVFd_C_QI/edit#bookmark=id.zbdqzkxopjoy).

- Team X, Team Y, Team Z - обозначения различных команд.

### Задачи Team X

- Обсудить с заказчиком записанные в [Roadmap](https://docs.google.com/document/d/1Mtfs2oFYUY_Dofk3oEgv0d873R1QLok4PjIVFd_C_QI/edit#bookmark=kix.nu93mfnfx9l9):

  - спринты.

  - сценарии на текущий спринт.

- Создать Milestone в репозитории (см. [Repository](https://docs.google.com/document/d/1Mtfs2oFYUY_Dofk3oEgv0d873R1QLok4PjIVFd_C_QI/edit#bookmark=id.lurcicfzrc65)), если там еще нет нужного Milestone.

- Для каждого сценария в milestone:

  - Создать issue для Scenario Proposal.

  - Создать PR для Scenario Proposal, который понятно и наглядно объяснит сценарий.

  - Создать issue для Scenario Implementation и упомянуть в ее описании Scenario Proposal.

  - Создать PR для Scenario Implementation из ветки <название ветки для scenario implementation> в main.

  - Создать subtask issues для подзадач Scenario Implementation.

  - Для каждой subtask issue

    - Создать PR из ветки <название ветки для subtask issue> в ветку <название ветки для scenario implementation>.

  - Назначить ответственных за реализацию Scenario Implementation и subtask issues из своей команды.

  - Указать зависимости между issues в описании этих issues.

  - Учитывая зависимости, установить:

    - очередность выполнения задач

    - приоритеты

  - Разработать по задачам:

    - Функционал

    - Тесты для сценариев

    - (По возможности) GitHub Actions для автоматизации тестов в CI

  - Прогнать тесты и убедиться, что все работает локально.

  - Сделать PR.

  - Попросить людей из Team Y и/или Team Z с подходящими responsibilities отревьюить.

  - Поправить PR после комментов.

  - Вмержить PR.

  - Добавить лейблы команд(ы) ревьюеров на закрытые ишью, где был значительный вклад ревьюеров.

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

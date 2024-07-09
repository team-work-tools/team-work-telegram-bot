---
name: Task issue
about: A template for Task issues
title: ''
labels: ''
assignees: ''

---

## Details

Explain the task here.

<details> <summary>Instructions</summary>

You MUST keep the "Details" section and these Instructions.

You MUST write above these Instructions.

In this section, you MUST explain the task.

You SHOULD include acceptance criteria for this task.

You MAY include links to related issues, PRs, artifacts, files, etc.

</details>

## Subtasks

- [ ] List subtasks here.

<details> <summary>Instructions</summary>

You MUST keep the "Subtasks" section and these Instructions.

You MUST write above these Instructions.

In the Subtasks section, you MUST list subtasks in a single-level checkbox list (`Subtask list`) with at least one item.

A list item MUST be one of these:

- A link to an issue.
  - Example:

    ```text
    - [ ] https://github.com/team-work-tools/team-work-telegram-bot/issues/42
    ```

- An identifier of an issue.
  - Example:

    ```text
    - [ ] #42
    ```

- A textual description of a subtask (`Text subtask`).
  - Rules:
    - The description MUST NOT include checkboxes.
    - The description MUST NOT end with a list item.

  - Example:
  
    ```text
    - [ ] Do Foo
    ```

If a Text subtask seems to require its own subtasks, you MUST:

1. Create a new Task issue for this subtask.
1. Replace the Text subtask with a link to the issue.

When a subtask is completed, you MUST tick the subtask checkbox in the Subtask list.

When a Text subtask is completed, whenever possible, you MUST provide evidence that the subtask was completed.

- You MUST apply one of these evidence rules:
  - If the subtask was completed in a PR, you MUST provide a link to the PR.
  - If the subtask required making a decision, you MUST provide (a link to) the decision, reasoning behind the decision, and GitHub usernames of the decision-makers.
  - If the subtask was about producing or updating an artifact, you MUST provide a (perma)link to that (updated) artifact.
  - If the subtask was completed for some other reason, provide that reason.
- You MUST write evidence in one of these formats:
  - In parentheses after the Text subtask.
  - In a sublist under the Text subtask.

Example of a Subtask list:

```text
- [x] Do 42 (https://github.com/team-work-tools/team-work-telegram-bot/pull/43)
- [x] #42
- [x] https://github.com/team-work-tools/team-work-telegram-bot/issues/42
- [x] Decide with developers whether to use Foo or Bar.
  - @dev1, @dev2 decided to not use Foo.
- [x] Do Baz.
  - @dev1 decided to not do Baz due to lack of time.
- [ ] Not yet completed
```

You MUST close the issue when all subtasks are completed.

</details>

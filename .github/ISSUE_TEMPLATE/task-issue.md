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
    - The description MUST NOT:
      - include checkboxes;
      - end with a list item.

  - Example:
  
    ```text
    - [ ] Do Foo
    ```

If a Text subtask seems to require its own subtasks, you MUST:

1. Create a new Task issue for this subtask.
1. Replace the Text subtask with a link to the issue.

For each Text subtask that was worked on, there MUST be evidence of the work.

- You MUST apply one of these rules that best matches your case:
  - If the subtask was worked on in a (merged) PR, you MUST provide a link to the PR.
  - If the subtask requires making a decision, you MUST provide GitHub usernames of decision-makers, (a link to) the decision, and reasoning behind the decision.
  - If the subtask is about producing or updating an artifact, you MUST provide a (perma)link to that (updated) artifact.
  - If the subtask was completed for some reason, you MUST provide that reason.
- You MUST write evidence in one of these formats:
  - In parentheses after the Text subtask.
  - In a sublist under the Text subtask.

When a subtask is completed, you MUST tick the subtask checkbox in the Subtask list.

Example of a Subtask list:

```text
- [x] Do 42 ({{link to a PR that completed this subtask}})
- [x] #42
- [x] {{link to the issue #42}}
- [x] Decide with developers whether to use Foo or Bar.
  - @dev1, @dev2 decided to use Foo because Bar can't do blah-blah.
- [x] Do Baz.
  - @dev1 decided to not do Baz due to lack of time.
- [ ] Not yet completed
```

You MUST close this issue when all its subtasks are completed.

</details>

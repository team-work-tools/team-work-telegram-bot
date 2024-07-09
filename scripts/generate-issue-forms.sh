# shellcheck disable=SC2148

ISSUE_TEMPLATE_DIR='.github/ISSUE_TEMPLATE'
ISSUE_TEMPLATE_TEMPLATES_DIR='.github/ISSUE_TEMPLATE/templates'

TEMPLATE_TMP=$(mktemp)

jinja2 "$ISSUE_TEMPLATE_TEMPLATES_DIR"/template.yml > "$TEMPLATE_TMP"

jinja2 \
    -D form_name='Scenario' \
    -D type='scenario' \
    -D form_description='Propose a scenario' \
    -D form_title='Scenario: {{scenario_description}}' \
    -D intro='Thanks for proposing a new scenario!
    
        Write a descriptive `{scenario_description}` in the format `{actor} {verb} {something}`.
    
        Take the names of existing [Scenario issue](https://github.com/team-work-tools/team-work-telegram-bot/issues?q=is%3Aopen+is%3Aissue+label%3AScenario) as examples.' \
    -D when_completed='This issue MUST be closed only when the Customer agrees the scenario is completed!' \
    -D assignees='deemp' \
    -D labels='"Architecture", "Project Documentation", "Scenario", "UI/UX"' \
    -o "$ISSUE_TEMPLATE_DIR"/scenario.yml \
    "$TEMPLATE_TMP"

jinja2 \
    -D form_name='Task' \
    -D type='task' \
    -D form_description='Create a task' \
    -D form_title='{{task_description}}' \
    -D when_completed='This issue MUST be closed when all its subtasks are completed.'\
    -o "$ISSUE_TEMPLATE_DIR"/task.yml \
    "$TEMPLATE_TMP"
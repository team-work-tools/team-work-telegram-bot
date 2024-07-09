# shellcheck disable=SC2148

ISSUE_TEMPLATE_DIR='.github/ISSUE_TEMPLATE'
ISSUE_TEMPLATE_TEMPLATES_DIR='.github/ISSUE_TEMPLATE/templates'

TEMPLATE_TMP=$(mktemp)

jinja2 "$ISSUE_TEMPLATE_TEMPLATES_DIR"/template.yml > "$TEMPLATE_TMP"

jinja2 \
    -D type='scenario' \
    -D thanks='Thanks for proposing a new scenario!' \
    -D when_completed='This issue MUST be closed only when the Customer agrees the scenario is completed!'\
    -o "$ISSUE_TEMPLATE_DIR"/scenario.yml \
    "$TEMPLATE_TMP"

jinja2 \
    -D type='task' \
    -D when_completed='This issue MUST be closed when all its subtasks are completed.'\
    -o "$ISSUE_TEMPLATE_DIR"/task.yml \
    "$TEMPLATE_TMP"
# Changelog

## MVP v3

### 🚀 Features

#### Bot
- Add CLI
- Add 'get_subscribers' command
- Schedule since the specified date
- Add ru messages
- Add meeting questions
- Add dialog scenarios
- Add references
- Add top-level section name
- Add a script to start a bot

#### Flake
- Add flake
- Add direnv config
- Package the bot
- Use treefmt-nix
- Scripts
- Add Babel as a dev dependency

#### Docker
- Add dockerfile
- Add compose file
- Copy locales

### 🐛 Bug Fixes

#### Bot
- Make it work
- Remove unused imports
- Bot description
- Help message
- Improve wording in the description
- Move files
- Strip spaces
- Switch to ISO 8601 time, rename'state' -> 'chat_state'
- Improve messages for the 'unsubscribe' command
- Schedule meetings no earlier than on the set date and time
- Wording
- Don't run a job after the job has expired long ago
- Move files
- Handle missing users
- Add blank lines in messages
- Wording

#### Flake
- Add more 'follows'
- Remove poetry2nix

#### Docker
- Use mongo, add basic time handling

### 🚜 Refactor

#### Bot
- Use a constant for week days
- Move bot message to constants
- Move messages to a separate module
- Change'standup' to'meeting' in more places
- Use a class for constants directly
- Move bot code to a separate module
- Simplify filters
- Use classes for command names and descriptions
- Construct messages using constants, organize code to support basic i18n

### ⚙️ Miscellaneous Tasks

#### Locales
- Update

#### Issues
- Generate issue forms

## MVP v2

### 🚀 Features

#### Readme
- Provide an example for '/set_meeting_time'
- Add i18n section
- Add motivation
- Add glossary
- Update project name, description, messages
- Instructions for running

#### Requirements
- Init
- Add glossary
- Define command types
- Add dialog scenarios
- Add references
- Update non-functional requirements
- Section name
- I18n
- Commands

#### Configuration
- Draft a roles and responsibilities doc

#### Policies-processes-procedures
- Init
- Add processes diagram

#### Nodejs
- Add package.json and package-lock.json

#### Gitignore
- Ignore direnv and mypy directories
- Ignore nodejs directory

#### Vscode
- Add recommended extensions
- Add settings
- Add Live Share to recommended extensions

### 🐛 Bug Fixes

#### Readme
- Bot description
- Update project name, description, messages

#### Requirements
- Update command names

#### Configuration
- Wording
- Anchors
- Links

#### Roles-and-responsibilities
- Sort members in the lexicographic order
- Remove todo
- Use lists in Responsible people sections
- Update Task activity sections
- Remove the GitHub Issues Management responsibility
- Combine the Mini App responsibility with Backend and Frontend responsibilities
- Format the file
- Replace "Task characteristics" with "Task activity"
- Improve wording in "Task activity" sections

#### Scenarios
- Rename "Person" -> "User"
- Wording
- Improve wording
- Move the definition of uppercase words to glossary
- Update scenario template
- Wording

#### Snippets
- Simplify wording
- Rename "Person" -> "User"
- Use more precise terminology

### 🚜 Refactor

#### Readme
- Add Develop section

#### Typing
- Adjust topic_id type hint

## MVP v1

### 🚀 Features

#### Snippets
- Init snippet for receiving reminders
- Add handle reminder period change state

#### Scenarios
- Init a scenario
- Add a link to glossary
- Init a scenario template

#### Sprint
- Add a link to policy, process, procedure explanation
- Add an Issues policy

#### Topics
- Store separate chat states for supergroup topics
- Implement per-topic meeting messages
- Send reminders w.r.t topics

#### Docs
- Add glossary

#### Issues
- Specify when a task is completed
- Add a scenario issue form
- Disable blank issues
- Add script to generate issue forms
- Add templates

#### Poetry
- Add Babel as a dev dependency
- Remove unused dependencies
- Remove old package from dependencies

#### Locales
- Add ru and en
- Update bot directory

#### Gen_changelog
- Fix instruction
- Update

### 🐛 Bug Fixes

#### Issues
- Update the template
- Rename the template
- Rewrite a list
- Update the template
- Remove an unnecessary template
- Improve wording
- Improve grammar
- Improve wording
- Rewrite using passive voice
- Sentence order
- Formatting
- Improve term
- Default title
- Remove templates
- Template values
- Use a space for the form title
- Use variables in form titles
- Add an assignee for scenario issues
- Add default labels for scenario issues
- Change quote pairs
- Remove full stops
- Don't please

#### Gen_changelog
- Fix instruction
- Update

#### Reminder
- Make message babel-friendly

#### Configs
- Revert accidental change in settings configuration file

#### Sprint
- Use the main glossary

#### Glossary
- Explain the UPPERCASE words more prominently
- Move to the docs directory
- Use sections for definitions

#### Issues
- Improve wording in scenario issue forms
- Explain the rules for the Task issue title
- Wording
- Update default labels

### Init

#### All
- Start development

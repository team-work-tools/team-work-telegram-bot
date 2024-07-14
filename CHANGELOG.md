# Changelog

All notable changes to this project will be documented in this file.

## [unreleased]

### 🚀 Features

- _(flake)_ Add flake
- _(flake)_ Add direnv config
- _(gitignore)_ Ignore direnv and mypy directories
- _(flake)_ Package the bot
- _(docker)_ Add dockerfile
- _(docker)_ Add compose file
- _(bot)_ Add cli
- _(bot)_ Add the 'get_subscribers' command
- _(bot)_ Schedule since the specified date
- _(flake)_ Use treefmt-nix
- _(flake)_ Scripts
- _(bot, readme)_ Provide an example for '/set_meeting_time'
- _(license)_ Add mit license
- _(bot)_ Add ru messages
- _(requirements)_ Init
- _(requirements)_ Add meeting questions
- _(readme)_ Add i18n section
- _(scripts)_ Add a script to generate locales files
- _(locales)_ Add ru and en
- _(dockerfile)_ Copy locales
- _(readme)_ Motivation
- _(requirements)_ Add glossary
- _(requirements)_ Define command types
- _(requirements)_ Add dialog scenarios
- _(scripts)_ Add script to start a bot
- _(requirements)_ Add references
- _(requirements)_ Add top-level section name
- _(poetry)_ Add Babel as a dev dependency
- _(configuration)_ Draft a roles and responsibilities doc
- _(policies-processes-procedures)_ Init
- _(policies-processes-procedures)_ Add processes diagram
- _(nodejs)_ Add package.json and package-lock.json
- _(gitignore)_ Ignore nodejs directory
- _(sprint-docs)_ Init in Russian
- _(git-workflow-process)_ Init
- _(vscode)_ Add recommended extensions
- _(vscode)_ Add settings
- _(vscode)_ Add Live Share to recommended extensions
- _(snippets)_ Init snippet for receiving reminders
- _(scenarios)_ Init a scenario
- _(snippets)_ Add handle reminder period change state
- _(glossary)_ Init
- _(scenarios)_ Add a link to glossary
- _(scenarios)_ Add a link to glossary
- _(scenarios)_ Init a scenario template
- _(git-workflow-process)_ Init
- _(vscode)_ Add recommended extensions
- _(vscode)_ Add settings
- _(vscode)_ Add Live Share to recommended extensions
- _(snippets)_ Init snippet for receiving reminders
- _(scenarios)_ Init a scenario
- _(snippets)_ Add handle reminder period change state
- _(glossary)_ Init
- _(scenarios)_ Add a link to glossary
- _(scenarios)_ Add a link to glossary
- _(sprint)_ Add a link to policy, process, procedure explanation
- _(sprint)_ Add an Issues policy
- _(scenarios)_ Add set_personal_meetings_time scenario
- _(scenarios)_ Add the definition of a "period"

### 🐛 Bug Fixes

- _(bot)_ Make it work
- _(bot)_ Remove unused imports
- _(bot, readme)_ Bot description
- _(bot)_ Help message
- _(bot)_ Improve wording in the description
- _(description)_ Use 'Daily Scrum' instead of 'scrum stand-up' in descriptions
- _(bot)_ Move files
- _(poetry)_ Remove unused dependencies
- _(bot)_ Rename a module because python doesn't like types.py
- _(flake)_ Add more 'follows'
- _(poetry)_ Remove old package from dependencies
- _(bot, readme)_ Use a data directory
- _(bot)_ Strip spaces
- _(bot, docker)_ Use mongo, add basic time handling
- _(bot)_ Switch to ISO 8601 time, rename 'state' -> 'chat_state'
- _(bot)_ Improve messages for the 'unsubscribe' command
- _(bot)_ Schedule meetings no earlier than on the set date and time
- _(flake)_ Remove poetry2nix
- _(bot)_ Wording
- _(bot)_ Don't run a job after the job has expired long ago
- _(poetry)_ Add babel
- _(scripts)_ Run command via poetry
- _(readme)_ Bot description
- _(requirements)_ Update non-functional requirements
- _(requirements)_ Section name
- _(requirements)_ I18n
- _(requirements)_ Commands
- _(readme)_ Add motivation point
- _(requirements)_ Wording
- _(bot)_ Move files
- _(docker)_ Update bot directory
- _(locales)_ Update bot directory
- _(poetry)_ Update bot directory
- _(flake)_ Update script
- _(requirements)_ Update command names
- _(readme)_ Bot link
- _(bot)_ Sample time
- _(bot)_ Handle missing users
- _(readme)_ Update project name, description, messages
- _(readme)_ Instructions for running
- _(bot)_ Wording
- _(readme)_ Wording
- _(bot)_ Add blank lines in messages
- _(bot)_ Wording
- _(configuration)_ Wording
- _(configuration)_ Anchors
- _(configuration)_ Links
- _(roles-and-responsibilities)_ Sort members in the lexicographic order
- _(roles-and-responsibilities)_ Remove todo
- _(roles-and-responsibilities)_ Use lists in Reponsible people sections
- _(roles-and-responsibilities)_ Update Task activity sections
- _(roles-and-responsibilities)_ Remove the `GitHub Issues Management` responsibility
- _(roles-and-responsibilities)_ Combine the Mini App responsibility with Backend and Frontend responsibilities
- _(roles-and-responsibilities)_ Format the file
- _(roles-and-responsibilities)_ Replace "Task characteristics" with "Task activity"
- _(roles-and-responsibilities)_ Improve wording in "Task activity" sections
- _(scenarios)_ Rename "Person" -> "User"
- _(scenarios)_ Wording
- _(scenarios)_ Wording
- _(snippets)_ Simplify wording
- _(snippets)_ Simplify wording
- _(snippets)_ Rename "Person" -> "User"
- _(snippets)_ Use more precise terminology
- _(snippets)_ Use more precise terminology
- _(scenarios)_ Improve wording
- _(scenarios)_ Improve wording
- _(scenarios)_ Move the definition of uppercase words to glossary
- _(scenarios)_ Update scenario template
- _(scenarios)_ Rename "Person" -> "User"
- _(scenarios)_ Wording
- _(scenarios)_ Wording
- _(snippets)_ Simplify wording
- _(snippets)_ Simplify wording
- _(snippets)_ Rename "Person" -> "User"
- _(snippets)_ Use more precise terminology
- _(snippets)_ Use more precise terminology
- _(scenarios)_ Improve wording
- _(scenarios)_ Improve wording
- _(scenarios)_ Term formatting
- _(configuration)_ Remove old file
- _(reminder)_ Make message babel-friendly
- _(scenarios)_ Optimize set_personal_meetings_time tapping + and changing timeslot
- _(scenarios)_ Change command name
- _(scenarios)_ Describe bot buttons in the message about wrong format of an interval
- _(scenarios)_ Remove a redundant quote
- _(scenarios)_ Replace "period" with "interval"
- Fix conflicts with main branch for pull
- Reworking naming and scenarios

### 🚜 Refactor

- _(bot)_ Use a constant for week days
- _(bot)_ Move bot message to constants
- _(bot)_ Move messages to a separate module
- _(bot)_ Change 'standup' to 'meeting' in more places
- _(bot)_ Use a class for constants directly
- _(bot)_ Move bot code to a separate module
- _(bot)_ Simplify filters
- _(bot)_ Use classes for command names and descriptions
- _(bot)_ Construct messages using constants, organize code to support basic i18n
- _(readme)_ Add Develop section

### ⚙️ Miscellaneous Tasks

- _(locales)_ Update

### Init

- _(all)_ Start development

<!-- generated by git-cliff -->

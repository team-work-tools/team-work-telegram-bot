import { createMachine } from "xstate";

export const machine = createMachine({
  context: {},
  id: "/set_personal_daily_reminder_period",
  initial: "Environment",
  states: {
    Environment: {
      on: {
        "User opens the Сhat": {
          target: "#/set_personal_daily_reminder_period.User.Idle",
        },
      },
      description:
        '- Definition: "Chat" is a Telegram group without topics or a topic\n- User and Bot are members of a Chat\n- The Bot may read messages and respond in the Chat\n- The Bot username is &lt;bot&gt;',
    },
    User: {
      initial: "Idle",
      states: {
        Idle: {
          on: {
            "after 500 ms": {
              target: "#/set_personal_daily_reminder_period.Chat.3983414",
            },
          },
        },
      },
    },
    Bot: {
      states: {
        "Handle the command": {
          states: {
            "Set TimeZone": {
              on: {
                "after 500 ms": {
                  target: "#/set_personal_daily_reminder_period.Chat.2983742",
                },
              },
              after: {
                "500": {
                  target: "#/set_personal_daily_reminder_period.Chat.3212267",
                },
              },
              description:
                "- Set timezone for this User and save in the bot.\n- Update scheduled reminders for daily meetings if the User participates in them",
            },
          },
        },
      },
    },
    Chat: {
      initial: "Previous messages",
      states: {
        "2983742": {
          after: {
            "500": {
              target: "#/set_personal_daily_reminder_period.User.Idle",
            },
          },
          description:
            "Reply to 3983414:\n\nTime zone is successfully set to &lt;Europe/Moscow&gt;",
        },
        "3212267": {
          on: {
            "after 500 ms": {
              target: "#/set_personal_daily_reminder_period.User.Idle",
            },
          },
          description:
            "Reply to 3983414:\n\n <inline button #1> Europe/Moscow \n\n <inline button #n> Brazilia/Brazilia",
        },
        "3983414": {
          after: {
            "500": {
              target:
                "#/set_personal_daily_reminder_period.Bot.Handle the command",
            },
          },
          description:
            "/set_meetings_timezone &lt;time or timezone&gt; - - the user's current time, rely on this time bot will suggest your timezone.",
        },
        "5556667": {
          on: {
            "after 500 ms": {
              target:
                "#/set_personal_daily_reminder_period.Bot.Handle the command",
            },
          },
          description: "callback data from 3212267 message",
        },
        "Previous messages": {},
      },
    },
  },
}).withConfig({});
import { createMachine } from "xstate";

export const machine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QHpZgC4H0AOYBOsA9gHYCGANphKQJbkCemeYAtjcRPjvjYRAHQBRYgDcaeEizDF0AYgCqaPAAJCuYrGXoAFmGWBCEG2l0AbQAMAXUShshWDXS9i1kAA9EAFgCMATn5eANgBmLy8ggFYPAHYADnCfDw8AGhB6RCCfcP4fKPDwrzMAnLMQxIBfMpTUDG4CEgoqWgYmVnZOPFreAUV8fgBJCHIwWVIAM3R8ZXCzM2UWWHMrJBBbe0cSF3cETKjsvLMonwCAJgiosx8UtIRjvP9jjyCAj3Djnzj3iqq0LFw6sko1DojGYbA4XD+XX4ACFCOh+AAJUgcIZaXTKADGhBYLGRAgAyhhlAAVGhSABaJGGYwmKmms3mixcqwcTk2iF8Zi8-EOj3CAVC+S8HgCV0Qr12BzMeSihwyhSiXxA1V++CIAMawJaYPanT4MLhiLxqJ0eixOLx-EJ6BJZLAlOIw1csHQxjA-Bp+AAFPSAJSyFW1dUNIHNUFtCE8fWw+FIlF6U2Y7G4jhWomkilUpnLFnrZzLLa+ULZc7SoIPGJmU5ihBRDzHfjHKICwLxLnhOJKwN-YOApog1rgjqQ-UAYSM8LeMSCdeOsmdromHvG3r9AZ+Qfqfa14aHeoE4+MjfeM-r2ZsdlZGwLiBi9f4L0iUWOTebOxr4Si3Ol09bTxePhdhuPZbpqYaDrqI4HhO-Dll4L4BFEIwrnSMxzAsljMpeebsggMSIfwRRcrK9YnLE4Q1l+ASEYcZjeG8XjxD4XhATUIEaqGA46pGeBQoe8IZNO3gePOLpusutI+jM-rdmqoGcdqEbDlG0FHoJQTCeeKzYWyN4IJyWQxEcxEXGYlYdjWxzPA+QRmTEX4+HZ5wBKxqr-CG-aKXuUH8Px-B5PyASIaJi7up6eBSWYMnAXJHGebukEqb5MEBUFiFabmumgIWzHcsUZYVlWQQ1kERnZHRBRVscVX4RUlQgMQfBwC4snudu4HccpvF8FhaxZW4iDVTEhGJKVoTCXW0Q1gAtN4hGVuZeQafZMzhK5m5xTuEE8VCwhiBIxBSDIvVXvm2WDfyI2PDE43CpNUQ1i8I3HKERnhKVwnHOt7EeVtnX7vwPR4CdOF6e9fhhB4VZmQEn6MQ9qSeAEw2IREMweDdQSlYq9Wtb2YFcUpANA-0gxgCD-VbB2uyQ9D+Fw5+H53D4RwzocRk3fB32xb9HVEz5MYU9e503GZ3IrfZUTlkJJWBLBGNcs8+HBNK3NtQTXmJd1Agxka8ZomayZ4kLZ0DTc8F+BLsrSxpj0lDRFzI7DcSBF9uMxerCkJTt0aGnGZMG0mFqptatqZo6Ju4S9sr8FbUvHDLiMIB4jnZD4H0CkF7z2Wr+Ne9tXV8ROkd6aETz8CUdNxFDX4xI9fgPFDL53rZwRre7bE8+1hPeUlflTqexwlyLwo3bBoRSxkk8p-XZix1jcPTh2RS5-J8UFwDflwQhUTD2bjHTjyFbPtMryVscNZpYR7wdhchws14OPfJ3nvr-9Plbyewl74WRYPs+gQNLp0OO9Sytl5pSxIgkFmwQgir02nzXu2tkpHlSkFXeOYdLC33nkaiwoIhGSssvUUScZxBAfDEaqpwij8niFLeBvMe5ayLkeAACswMQhAACumgpCwFgKQGA8BMF9Wwb-O8FdbJDWrgcLwdck5hGooFdOKsfzIzqmUIAA */
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
              after: {
                "500": {
                  target: "#/set_personal_daily_reminder_period.Chat.3212267",
                },
              },

              description:
                "- Set timezone for this User and save in the bot.\n- Update scheduled reminders for daily meetings if the User participates in them",

              on: {
                "after 500 ms": {
                  target: "#/set_personal_daily_reminder_period.Chat.2983742",
                }
              }
            },
          },

          initial: "Set TimeZone"
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
          description: "callback data from 3212267 message",
          after: {
            "500": {
              target:
                "#/set_personal_daily_reminder_period.Bot.Handle the command",
            }
          },
        },
        "Previous messages": {},
      },
    },
  },
}).withConfig({});
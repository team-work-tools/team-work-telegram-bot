import { createMachine } from "xstate";

export const machine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGUwBcAEEwDMCGArgDaZoCWAtmBgF4D2AdtWQxnhgMIAWeaAdAFEGANzIAnRlQZoAxAFVYYMRjoAHMA1gY0XaoEIQHmgDaABgC6iUKrqwy5RpZAAPRABYAjAE4+7gGwBmd3d-AFZXAHYADhDPV1cAGhAAT0R-TxC+T3CQkPcTXyyTQLiAXxLE1ExsfGJSSmp6JgwWNk5DPgUlPgBJCCIwGTwcNCUMEJMTDApYUwskEGtbewZHFwR08Myck3DPXwAmUPCTT0SUhH2cn33Xf19XEP3PaOeyivQsXEISbXraRmYrHY3F4fAAQnR+AAJPAMPrUHTUADGdAoFFhED4lQwABV6gAtAGDYajcaTaazRyLOxkBzzNZeEzuPi7W4hXxBXLuVy+M6IR6bHYmHLhXZpfLhN4gbHVb51Kj-JotYHtCHQjH9bS6DAotEYrEfPFUQlMGROWBoXhgPhDEZiAAUZIAlDIZV9ar8FY1Aa0Qfw1XwYXDNYidaj0XCDZgjWATWBKfNqctVogvEFMsdhf4bpETIc+Qhwq59nx9uEOX4YkyQtEpW6aj9yF6Ac0gW1QX7S89-EX9maLVabSSHc7XR9ZR6mw0W8r2-xO09Ij3iwmrDYaXTQGtIsW+A8wuF9mXyxsCyFwszhUvK3cHp46+P3Y2-t7W772p3s+4j75wsS7WMExTDM5hUuuyb0ogkS-nwBRMqKxYHFEIQFheviwbsJgeE87gxJ47gPlUT7ytOSptp2n7dh4rj9paIxDnajoTC69Zyp6pE+iqHbtGkS7UauCzgbSKyQQgjIZJEezwScJi5jWBb7Pce7+LJkQXp4qnHL4hGfA2JGKpxc58J2OTsr4v60YOtpKExJgsY+ensQZb5cfO7SmeZv4CUmwkpmJ+HMoUWY5nm-gFv4kmZFheR5vssXQWU5QgAwdDYPA8ysZOL4zuRhhgUsvmiXFkSwXEEVBNRRYRAWAC0Hiwbmck5P4rhqRMIQ6ROz7NmR76gkIogSAwUhoPlG4iVuiCXOh9y3JEFXclV4QFg8pX7EEkkhBF1H7J1xFOa+s6dp0YhjRBk0IFt3jBK4eayb4564ctyRuL4JW-qEEytcEEWSklmXdRxLlGSdPTwmdhUXTWmw3Xd0GPeeZ5XJ4ew9rsknzd+e2OVOzlHaqkIQ5uzhTbJzJtWp4TZnx4V+HwLW5n4rXmSpHX-Q5bG44duWggGQbwlqyLhhiRMTSTFzft4FOitTLUrUUGEnG9D3RH4u3s0ROPZb1rngpCgYagi2q6hGmLYjGcai3562inw0tU-sNMvQgrgaZknjbRy5nPGp2Oc9rhkUXliZCcTDLBOhRRw9Et0XpEK3eDct1HjuKkBGz7ya-7PWBx+7SLsu+xW6J3LzfTQRU2kleuwnJh2-4RzuEuNYFH7WU58DQegl+P7hMXF24UuLI5oe4yPLm+wFp5sHPDWJy7Cj7h-ZnunZ0D+Pcd3VHcv34tBPhe6Hn4LUe7sW0KSpDVUwhsQowE-ht4DeM825oIeeZfchwVYepjk6HcqESSikW68mdj2fwe5IhxUOAUdkMQqaP30tzPqr9+AAAUxBgFEHQAgWgqCwFgHgGA6U1zfzFuHHcfAo7FRjjsJuBYI58DMh7AI7VoKRESiUIAA */
  context: {},
  id: "Set default time zone in a Chat",
  initial: "Environment",
  states: {
    Environment: {
      on: {
        "User opens the Сhat": {
          target: "#Set default time zone in a Chat.User.Idle",
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
              target: "#Set default time zone in a Chat.Chat.3983414",
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
                  target: "#Set default time zone in a Chat.Chat.3212267",
                },
              },

              description:
                "- Set timezone for this User and save in the bot.\n- Update scheduled reminders for daily meetings if the User participates in them",

              on: {
                "after 500 ms": {
                  target: "#Set default time zone in a Chat.Chat.2983742",
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
              target: "#Set default time zone in a Chat.User.Idle",
            },
          },
          description:
            "Reply to 3983414:\n\nTime zone is successfully set to &lt;Europe/Moscow&gt;",
        },
        "3212267": {
          on: {
            "after 500 ms": {
              target: "#Set default time zone in a Chat.User.Idle",
            },
          },
          description:
            "Reply to 3983414:\n\n <inline button #1> Europe/Moscow \n\n <inline button #n> Brazilia/Brazilia",
        },
        "3983414": {
          after: {
            "500": {
              target:
                "#Set default time zone in a Chat.Bot.Handle the command",
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
                "#Set default time zone in a Chat.Bot.Handle the command",
            }
          },
        },
        "Previous messages": {},
      },
    },
  },
}).withConfig({});
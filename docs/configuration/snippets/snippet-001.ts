import { createMachine } from "xstate";

export const machine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QCUwGMwEsBuYAEATmALaYB2EYBseAhgEYD2ArgC56wDWmADj5Hgi1MAGwCeeYmDCtyUPAEdmcWYzKwAdAAUqsNRoCSEEWADEAFQAW+NMwJEy7WVLyZYCPAB4AIgEEDADIAmgD6ALIAohHmBgByAOIhMZEAfADaAAwAuoigPIywmKpkuSAAHogATNUaABwAzJW1GfUAbAAsAIwZzQCcADQgYogAtJUA7LUaAKyTGdO1rdPT7bWVra0AvpuDqBg4+ESkFLp0TGwc3HwCQqISUjJyisqwxZo61PpatASyaLy0VhwVxkPCsayCYTiSTSWRkKCmVA8ESYYGsRh4NTQtT4JQqTBqTI5JAgfKFYqlCoITq9VoaTqdca9DKVTrTXqMzqtQbDBCtNkadbjdr1DKtdYMrY7EB7LC4QgkciUahnFjsLi8fgQSF3GGPeHPfFqd66fTeRjAvRScFyUwGVgAchoznwADNGAQ6ArjsqiaUyUUCSUSVSRo1KjN2k1pvV2l0Mr1ar12jzEL16vUNL12eL1u1Wr1s51trt0HLDoqTiqGGrLpqblD7rCnnjXkGTZ8yNofn8AUCaOQwRDbtCHnD5LQoMIyKYPnpQbAwBRYH6SQGKSHEOME4LWvVxtV6rVZrUaamELVxuMNLHT+nOhNs-uSzKywdvUrTjWLhrrtqR02+ryK2bwaAAQowrAaN4jZ6uOGgABK0BQJgflWeDup6c76L4ZC0OIABeTzYaCRCwPk6hwKYq55AUgZqJSVTVBGBbTEsCbChMnT1OeDIMoKqyis01SXvU0wvrK75HJ+1bnOqVxajqo7NgaIHtuBkHQbBY5yIhyHGBWPpUBhHp4CRGgAMpLtqtBocq1HZP6dEbqAVKdFG0waCKqynhk7QJu0bG8fMnQ3iKbQ9Nxca9BJb7ytJVY0N+8n1v+2kqcBLygRBUEwbqOnwnpKGGTJJlYaaXZWRQXoJfZaSdMStHkkGjHUgW17tMm9S9AeiZHmK560qF3GsusvQiZesX7PFlbKklcl1n+SmAeOhptsaGm5elQFFQZdnGZhZkVbtqE5a4ND0CIjBoJwkCmGUryAmAGi0K6QIEAAFNMGQZAAlIicUlYlqo-gpDb5Rla3ZZpeXKTtSHFftnqHeZCN7Wdbh4Jd123RANGks5LWbtSCztJGMadSs0zcdyQyIA0dKtGKDSVLGwqilKpbTUDc0gylS0AXBLZZepOVaRDO0AMJqBAzBoE4w7beOphnYuy74+uROuYg7lLDMrSXu0V6LGyaznkmMzMg+1MtPyp6VFN5ZI-Nta-opgsFZlRrqJt4tw-Bewetqj2sMwNCMK6y0wrAsCTsCKMVR4yGwAA7lQkAAPTMHh6hp0QED3SHz2ve9X0-f9kkzUZsmu2DaUS6takbWLsMrbpgcEMHrCAmHmKRx7cCxzANAJ52Se5+nEBZznqeTxrhMMcTIl0tx33MX1zS07yD6dFM8yVIWywieMYmO1Js1fgtbvg-7wve5oERkNgmAEGoUiOLOFWYvw6hDvgkuWEBPPZqi9tYIBGAsLM+YD4rAPD9SoXRzxMzqMyE+cZqjZj3MeM+VcZIu1BqlKOnsobqQAYCek40GhtAsNYUEJEODWRXI5NcC9gxgO3HSRo3QuQZCZCycavEGRkw4fmfc4xpisnEtKSuPNL610IQPICJCNpkKghMJobNP6dgVLQCAzoIRSBjnHYB9E2HlFGJUPyWZZjjULP5bchYkFMhmGsVktROqJnGLvHBsia4EIFkrO+60faqLqKzYUrRxgOUagTEBZiqTrCzPUbiV5Yw0kqBI7igiuSCm6PuLo3VWaNB8c7Pmi13aBNUiLFRgCoLjSPB5Qu3cgQvTelQMuf0Abc1KclcpN825VPvhoUJ9T3EZJMS5cx1I2h0nEVGK8EwGi7x4nTBA1NGbiMWGKfMkw2glNqnI-xFSG5BNAqE1uQsDSGKHlRehRBdE0GuXHJhMTNagKmckiMYorx8NmMsA255qihW6pEo21MT78nGPsi+fj+bHNvoM4JmhzmVPkE84eWZWak0qDQpcWNIIMPVswpqpjWrdGzJbSxB8EzuR6LxCRgpLwcgZOsPyDJoXV3wXC-plyvZIuGbUv2Ay0WD2eZio8nFcWgiYOqRhEytZTPJZ5dkliDxsWpo0c8jRrxeLWAbS8u8fKc1fN0g5sK+n1wRXy0CJEnR4B4AQHAT08BoFqXgFORRLB4DFqJdx4jolOTia1WMGQNDiNFPMSYBsOErO3uEjQflVjMlJosB20jAY9KvnXIhkMm4+1tTQB1TqgQurdR68E3rNK+rBdRBqgbSXEz4gJbilCI00xTKs7iNI6iRMvH5WxSwoUvjIIwSg8ASQyMzfIgJJzEVvHrZM0MCxrz7nSW408p4O28hGHGTh4TuFMgLLwjleCynX0tcK5R+aKoLoVaGDJoa+0sg2GKXesxKiArYtYg2PVFhXhFAgk9wNennpzUovNHZ5yGAMre95oZ3KCgzOImBHRmb5i1XGQUTJahrGXQmU8QHeYgezYoxu1Tr2dm7L8TA-weBPQHKCcE+BSNyFg-Epinl-KJoNhI7qjIP2rKjHSFYrIozzMseNQjhzuUXt5VeyDZoLQ0CtDISwrGWFBuJmMFkdRtzPqZnbd954jbCLYiKHMXieppq5k7M1XKLVgbI0M8y3xqO0foyCP+jmniTmnGxsljIw00vmOmI2TNGTnnGB0FBCCmYxj3FyWoUnzWgZY3O0WkF-ONuWJmTqIorMbwGqskYwp6QxmPAeQpgUjzJfs6l1F8nfYXM9llsBPDQp5e6r1Bom9eKZi5ByCYqwMhKoTLVs9JGGsQaa6ik6viypHU7K1xVHReheS6gVnrRXeQZjW6ycaLQoshZjON4jCipvkc0C3WbaNUJmoW+ZXC+ExBEQNHcuAFFFzjpJYunWixMxLA5D1A8cCHzGcSSJ3efrD4slO1m87s7rUZa2ojubSMHvHSqjZJGy23KGy8v5b6fQjw0yQd239NIJGTB4cayddmJsI6tY167qPbvzdHlBtnlb2CY2xjdSAuO-s4cZVyRkyYHF0tWZea8P1aQbAPKsNVcPp3wsvdNlnVrhkyzlgrZjqLBfUhPiuqLOZSZxncsFUNnUodNGTR0bB6bTUwrq5NxHzOYazY7l3Hu4d+7pSMcPDHY86AT3ztPZOecBcaYbW11b638vdf6lvHWGTPIIIaD0FkTQT5SJs+fTlDOZ1M+m4-Z+r8yDv1YAbiB3UbyWaBTh3eFvitiTWz9XhGT8wtDEklx3tnneF9V3J6bqiDfimE2KJm+Y2ItHQ8V3ea2Fg23cskhptOM307O0XtXl2BXkPSVQ1oY-mheRaCN5dHIcMCe3j9OkCDurMxse5XvefcHAfh9v4fu-QnqIaEbA3wOXknIUYIWIoOGkW3aCCTI3EPQUYp8fe+ep6W+Q+xCI+gqaw+SkSY+4i8eD4vUI2rIye1IlOjK7I4iyYU+swyuRyPKqB3+gqoyHkx+UwXQnWd4rMjiqyZBYS4YGY1MPUbI1BMm3m6WNS5CWgRAz8LAjyoqw82BZM30L60+TMsYRBIw3QEY6wrMXeEmB8gGCBb+RGH+KBua9B5CzWkM6KcABu3CEY765Wlmme0w54O6oaFMB47kD4GwXQywQhDmaWSOYhKOTOVhmg9S2KNhYobhaqEqNIThxmsyV+e4HMR6wofh9WbuaB5hDWoR4qhslQkRyC9hsRzIzQzhqy1Qyq0u3U6YWe7I6RruxeZhwRl6uRB8DSgUR+0ev21IURMwMRBqpR8wxmViEqhBOWUW3QueJq-eBeyBtBphzmFUdqRa2AzqrqgI7qnq3OBuwo14zQ3QRsbQgURxvEXQOqjIDMiY30YoDRjOO+SxnYKxjqaxJaGx7A5aXqPqJ8fq0whRUwiwg2HBYyQUnapMMw1Miwx4EwJ83iBhviLu9xX+jx84zxxaNgZa2xYsEhYAUhvcoRuxFKBxfkEKJxJ89K8wCahO9S2Y+Y3E2w2wQAA */
  context: {},
  id: "Receive reminders about skipped daily meeting questions",
  initial: "Environment",
  states: {
    Person: {
      initial: "Idle",
      states: {
        Idle: {
          on: {
            "The current time is: <DAILY_MEETING_TIME>": {
              target: "#Receive reminders about skipped daily meeting questions.Bot.Daily meeting.Conduct the daily meeting",
              reenter: true,
            }
          }
        },

        "Participates in the daily meeting": {
          on: {
            "Replies to only one question": {
              target: "#Receive reminders about skipped daily meeting questions.Chat.9238425",
              reenter: true
            }
          }
        },

        "Does something": {
          on: {
            "It's time for a reminder": {
              target: "#Receive reminders about skipped daily meeting questions.Bot.Daily meeting.Handle reminder for Person",
              description: "- The current time is: <DAILY_MEETING_TIME> + <PERSONAL_REMINDER_PERIOD> * N\n\n- N is a natural number > 0",
              reenter: true
            }
          }
        },

        "Participates in the daily meeting again": {
          on: {
            "Person sends": {
              target: "#Receive reminders about skipped daily meeting questions.Chat.1928336",
              reenter: true
            }
          }
        }
      },
    },

    Bot: {
      initial: "Daily meeting",
      states: {
        "Daily meeting": {
          initial: "Conduct the daily meeting",
          states: {
            "Handle reminder for Person": {
              states: {
                "Analyzing Person responses": {
                  on: {
                    "": {
                      target: "Send a reminder",
                      reenter: true
                    }
                  }
                },

                "Send a reminder": {
                  always: [{
                    target: "#Receive reminders about skipped daily meeting questions.Person's private chat with Bot.8738475",
                    reenter: true,
                    guard: "Bot not blocked"
                  }, {
                    target: "Handle Bot is blocked",
                    reenter: true
                  }]
                },

                "Handle Bot is blocked": {
                  after: {
                    "500": {
                      target: "#Receive reminders about skipped daily meeting questions.Chat.2728347",
                      reenter: true
                    }
                  }
                }
              },

              initial: "Analyzing Person responses"
            },

            "Conduct the daily meeting": {
              on: {
                "Bot sends": {
                  target: "#Receive reminders about skipped daily meeting questions.Chat.Daily meeting messages",
                  reenter: true
                }
              }
            },

            "Record status of daily messages for Person: answered/unanswered": {
              after: {
                "500": {
                  target: "#Receive reminders about skipped daily meeting questions.Person.Does something",
                  reenter: true
                }
              }
            }
          },
        }
      },
    },

    Environment: {
      description: "- Definition: \"Chat\" is a Telegram group or a topic in a Telegram group\n- Definition: \"Private chat\" is a Telegram chat (not a group) of two Telegram users\n- Today is Person's working day\n- The Person has already joined meetings\n- Person and Bot are members of a Telegram group that is or has a Chat\n- The Bot may read messages and write in Chat\n- Person's username is <person>\n- Bot's username is <bot>\n- Person has a private chat with Bot\n- Person's reminder period in the Chat is <PERSONAL_REMINDER_PERIOD>\n- Today's daily meeting is at <DAILY_MEETING_TIME>",

      on: {
        "Person opens the Chat": {
          target: "Person.Idle",
          reenter: true
        }
      }
    },

    Chat: {
      states: {
        "Previous messages": {},

        "Daily meeting messages": {
          states: {
            "9235842": {
              description: "Message: \"<Daily question 1>\"",

              on: {
                "Then bot sends": {
                  target: "9238742",
                  reenter: true
                }
              }
            },

            "9238742": {
              description: "Message: \"<Daily question 2>\"",

              on: {
                "Then bot sends": {
                  target: "29384456",
                  reenter: true
                }
              }
            },

            "29384456": {
              description: "Message: \"<Daily question 3>\""
            }
          },

          initial: "9235842",

          on: {
            "Person reads messages": {
              target: "#Receive reminders about skipped daily meeting questions.Person.Participates in the daily meeting",
              reenter: true
            }
          }
        },

        "9238425": {
          description: "Reply to 9235842: \"<some text>\"",

          after: {
            "500": {
              target: "#Receive reminders about skipped daily meeting questions.Bot.Daily meeting.Record status of daily messages for Person: answered/unanswered",
              reenter: true
            }
          }
        },

        "1928336": {
          description: "Reply to 9238742: \"<some text>\"",

          on: {
            "Then Person sends": {
              target: "8237467",
              reenter: true
            }
          }
        },

        "8237467": {
          description: "Reply to 29384456: \"<some text>\"",

          always: {
            target: "#Receive reminders about skipped daily meeting questions.Person.Idle",
            reenter: true
          }
        },

        "2728347": {
          description: "Reply to 3983414: \n\n\"<user>, please unblock <bot> (it's me) in our private chat so that I can send you reminders about missed daily meeting questions.\"",

          on: {
            "Person reads the message": {
              target: "#Receive reminders about skipped daily meeting questions.Person.Does something",
              reenter: true
            }
          }
        }
      },

      initial: "Previous messages"
    },

    "Person's private chat with Bot": {
      states: {
        "Previous messages": {},

        "8738475": {
          description: "Message: \n\n\"Please reply to these daily meeting questions:\n\n<link to 9238742>\n\n<link to 29384456>\"",

          always: [{
            target: "#Receive reminders about skipped daily meeting questions.Person.Does something",
            reenter: true,
            guard: "Person ignores the reminder"
          }, {
            target: "#Receive reminders about skipped daily meeting questions.Person.Participates in the daily meeting again",
            reenter: true
          }]
        }
      },

      initial: "Previous messages"
    }
  },
});

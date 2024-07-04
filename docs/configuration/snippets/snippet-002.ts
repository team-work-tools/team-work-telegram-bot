import { createMachine } from "xstate";

export const machine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGUwBcAEB3A9gJwGsBLAOygwAscBXPWAOgFVYw96BJCAGzAGJVMuQqXJVasANoAGALqJQABxywiaIjhLyQAD0QBaAKwAOI-QBMRgMxHjAdgAsBgGwGDZgDQgAnvqMBGentbA1sATiC-Zyk-KXsAXzjPAWx8YjJKGjp6ACEcNHoACQBDEm4wDDQKcoBjHABbOpKIegBhKuqCDFIAMxwMIoAjGkxK8uZWXmk5JBAlFTUNLV0ESydQg3pbKVinIylQvz2bTx8EE02jF2cDs1szP0OEpPQU4XSxLNz84tKeCqqMLUGk1Wu1Oj0+oNhv8xiw8JM-NNFMpVOpNDNlvYpJYNkZ7GZYqszE4wn4nCdEOFAm5Dg9bH4LFtbE8QMkhGlRJkGF9Ck0-qNAfVGqUmHDKEVYBgAFY4UiQDB1MDoESwXjaWBoIpoMD0IrdbV4AAUBm2AEp+C92SIMuIcnleb9ygKgcLmuM8OLJTK5RAFUq1GRJLItHNUYsMYgYrF6JZQlYXIcpMFQh5vIgCfZ6E4nNZ7JZ9pYwgSzCy2alrR9ufafmUYYLgSL3Z6Kn1vSQ-crAxhukQ6Gg1RqtTq9QbjWaLYJy+8uXbvnynQCXSCmxQJS3pbL24rO1BJT2+1MQyiFujQMsHk5M347gW9pZrLYKQh7E56FITPmTNEjLczGYDKWlpTpyto8gAskUHJ1sAEBFF4cQYCQeT9K8UGwV4vBfBg1AKLB2qSgKsDVFUEDUDwh4zKGJ5LJSBJZms9h+KEDixm49hPi+oRZrGxLMXmcaPIkrJAW8IGfPaABKYB1DgABu1oCsApAGrJRRcHEmHITheFwHWREkWRYAUci8xojRZx7PQNj+NZuycY+aYIGEph4jEVh7DmP6hIBk6iTa4n5C0eBgFq1oQGA3RFGRmDKawqlcN2+AYDBcEaVhRQQBABEAuFkXRV0JAqWp-SlBgAzUGgaAaHuSWqNhpSsBgeRVB6sV4PFNUeop6FxMZszHmZEZnE4ZjcQYOL3O5thrE+MSWJmI1sfY4QhP+3lCWWfmVrO9AQVB3WpShVrpOhmmYNpQ7ZeU+mQIZfVUYNZ6ICYAShPeViWGSoQjdNs2RK9lx4lYJqTSWG0iVB20AKIkPJeAaIqhW8E2OAKGAJBXYCq5oPdA3hk9CB6AyThSJsBiOB5l7jYWs04uY80WJehyXCaRg+ahFYzm0Woxg4xjzQOmrarq+qsGOUjmptkNc9jvMU-NuOmfjOj6CEASXg42wOLc6zko5rhZliWLGG9TH2Ix7PHWJDDc-ksZWIx9iC0OIujiaEsThz062rbMZxvNfj2IrYanirCAMsS9G5iTZjMVYT56Nm9DfUWgd-lYSaW8B-k27LWK3NYfjI2KCjBbALCSiUBVFVwwfUUN9g2PQZtSLHwQxO77GOQ8y2BCTRihFI5MHI4YPPL50s+3nre2IXxeNaXcAVxggBo5IA8H+ISFHpKYVcVqQhODdChKXwXXj1hyYuIxPSOzvvsDmnLPthWXcoSD7YeLOCEWdbTLPP57Pfw88PSL3LrpQAqeSbyKNvNq8UD5HyKMlHqZ9lbLCMB-Zug8cTvRTMSSwT5whcVjEET6VgvrzR-pPLIvsAFzybKA5eAooDBXRslcqlUNAIRIFvY+yDgyUTxqHNBeJea5jzMYaIZInzZlfJEZacYDC4NWPEcGE9OZT3-jPOhJcy6MIBMFX0wB2FVRIFwnhiCT69X4SZEO5kvzN3dtsT600KazX2FxdYTJdgMhsONSh6jqF53-IWPwlhJjWP6krIR6ZA6ZiTC+F8l58QMyfH+Eayd7zvXekEfx3tAn-2CfSMJEhERHiieZYkdFrDbApu+EID90yVIyZkj6eI1hOFydbUEBTsx3CcMAjADDdIAHIWglGqGALgwyUHRIQBYCwMYSS3A-LPAwqSohvhCLGbEg9G4OE6Tnbp+R8S9OJOEpEkTbFDTMObSwfcR6KKkC4J5etTj-hNFZVy2YIjjXWuPL2XTfYplzCmc5ZSrkEy4ubZZxDsRyL-E+fMARPzoPGm3XxHTVEAsOUCswIKzAIguQ9VB+hbjPzTq4Eaa0Sb4MckimM75UWWHRZSg521fZYSwHgVQukBSwOKqQbCYptTaBiiQBQFVuxEEmRAAZpAJVoAQBgAAPEMNAAA+FVahFTVz3lwdVMzzLAqsj4n5TFKWpOWqNAezKQb7BGjmNlf98gAHUiionSL0LqAJqDCqIIqWAXBkLERKDAP05cigwAGSGsgvKwCipKr6FgpRMYBtgJGoyETiWzOvAyTZ9wqarHGkEVJoTRoEn+jeNp2YnUaMCquMgCkASagUGjX0-KuBnSxqG3lRRW3yg7f0aotQ8AQAUn0X1rBhmSjTRmxNGBwo8HwhgXg+JxpFMNUNdYGxXCz3uAcFmXc3mxjudNchBgmLMsvLW-JgVxmTO7Y29IHau2LvQLpVdxIllOBXYxEajFbCboJgXLiVwtYhBJDEI9kYTBcUJG-BMJgwg3tzjzKSaA8BeEfVAa0L6sJvuXZ+05P7V1khudeIDYc8XrHMLEOMeZ7yNxxKk3Yz97z-jvDYbYfgUNHPoMAK2AB9Ssgm0BeDRghIgkoBPAWE1yQTaM6AaH3mCgR5Shp6BueSws31IhbJ-P+Di6SCTbCcU8t+eLmRYqtji2WMnRJyfEKJ8TYBJPSaEyJ3KUUuBoA0pR5YRM8yfKQ7+bxFgjBPlcHc2Izh7zGGWfcXjvt7Mckc3QZzEmuiSlyj6VTNj64EwwQSGwOIRrhH8CSaRQXGWODelsZiawEhCSQuFeAMwpYBLa-l8+AXYl3IOE88mA9wvMccnoZlz96nRELOg-8YQALWezttd04KCthyJtsLiew3DvXcu82aP5FlYIprFnJi3f62ndBwMoq2ev6F01ZIeeLrB7dcCx0DBxwhkoZNghb-ybPbS+LdklKxFFwfJvcLYA8cx+ATjc0m-4sQjwHmSM7-2lszh5DWfki4hRNGB7M5Rz8tg7D2AeupCdIijVNl9Ji19A6YvRxdgKDpazOjxyKNoYAOgFV6P0IYkqBQrbUxCsOM3SaXHWEbYwhxyYJxcFmd8n5Yj0gZFZpnVCqxzkdHWJcjYxSri9JueU24Ay7gJ+ZVYb9m5bHxPiQO15LyzTjMnVuu7d34hYrxrH85dcc7dAbtcVUNyCtNyqKVfYLdDVjCSLM-hDgf1q0kljr4TQ8UiCrwslhvf2j2k28oljELIUQTZ9CUeCZFtGnmaan17wx2OHS9BVkBt4juFBm5Of8hSRkvJdIikO1xHL2LjWmz7dQ++p9J89Jqd8zNsSHYjPhJqLyVr1owVQonQit5sVNdErbx6kP5YRbSZYgYhPoe1gCHvmbpUtYDJQle-O5rnaee+8AkLyX7OZeRdraP88qyTgsu14P4wQsQf02wMYkQziGsKYs8vGMMcMCM6MaAh++goSNGA2LgjcKYH4ayY2f4dyZO9wIM6C2I6uS+2K7K2MqBhMhYGwHGLgRYb0SYzgcO9wWY9SZWf4iiwQ2eT+nWfGhY8s9gNBHGMYiiy0gBfEniCcGwMeSYuyb0JIb0KiGuAhvs9sAcIhP+d2hM6cGSscDw0Q6wBYtKpwicXEYQDMP4jgy0745BHWK+fGtC-gohQQyceKOyzM4WlWjknkb4xsAcrcdkqhFBAOzqgQhSoSohDImYb8yOH8lwtgH8qS+wGw30FMvEzK-sSWQSxGbhs89A5MjEZC-4g2qSzKo0DwhYcKsc1gzEuRPMwKeIKYohzgb430A8SY2IP4JgB2pgBIrEMi40HcfyYRGOda9AAACsFPJDQDOkvBml1pcr-qSpHCEIootP9KEJTvNDGPNHiE8jciaHmI0fkJytysunyrvO1AKu2JOl1PGmKgqlKjKjQXbs3FiEPMxNsMDK8umG4C5AnttqEpEGMY4YCrLG6h6uQF6nWA8RUP6nAEGpgDGmGrOjADQT9sTo8ocO8rHP8XMlakUeTC4HsPMpEA4RDOobLNzE+uQAKC2m2rqrcVwKIXRm+LsMPIoiMSEJatEM3BNm-ImEPIvhCbZjzGMiQBMglGibhjcfFKIS9IKVTMkdXtfCxr3A7vbjEDmGsHwWoU4b7OhphthvKTXG4UxEUcxCEi8mEA0nMv3EUfSCYHikEAcC4Gcfxh5vJmJpllJslD6U5oprAMpupDQeNrcOYMYIwSmMwcEISTHgysEBDs4tTF6SliIGlrABlq5lloGbJp5lvtFIPjocrFVAoIgMtJmB-IPHCrEB5E8p4DwPqPoHcG+C9nNhYObLVp4GqlVHUIgBDhcHWZ9A2U2SANylABQCgc+M-LpteJ7npuTLDiAFgEQBAJUJGASJ4FUEQNObOY3J4AFu2T0T+KtHiObIohxFSLWU4lBo2WKdSUaXZkGeln6XmQGTltwhABGTcnclAUxKQTcD4tIkmCaiuf7PMu+E1nEEAA */
  context: {},
  id: "Set working hours",
  initial: "Environment",
  states: {
    User: {
      initial: "Idle",
      states: {
        Idle: {
          on: {
            "Set working hours": {
              target:
                "#Set working hours.Chat.3983414",

              reenter: true,
            }
          }
        }
      },
    },

    Bot: {
      states: {
        "Handle the command": {
          states: {
            "Check info about the User": {
              always: [{
                target: "User has joined meetings",
                reenter: true,
                guard: "User has joined meetings"
              }, {
                target: "User has to join meetings first",
                reenter: true
              }]
            },

            "User has joined meetings": {
              after: {
                "500": {
                  target: "#Set working hours.Chat.9238492",
                  reenter: true
                }
              }
            },

            "User has to join meetings first": {
              after: {
                "500": {
                  target: "#Set working hours.Chat.3745834",
                  reenter: true
                }
              }
            },
          },

          initial: "Check info about the User"
        },

        "Making the {day} not a working day": {
          description: "- Update {{chat_settings_type}} Chat settings:\n    - Remove all intervals for the {day}.\n    - Mark the {day} as not a working day.",

          on: {
            "Bot updates the schedule": {
              target: "#Set working hours.Chat.4027381",
              reenter: true,
              description: "- The {button} becomes red\n- Working hours for {day} disappear."
            }
          }
        },

        "Removing the {interval}": {
          description: "- Update {{chat_settings_type}} Chat settings:\n    - Remove the {interval} for the {day}.\n    - If it was the last interval for the {day}, mark the {day} as not a working day.",
          on: {
            "Bot updates the schedule": {
              target: "#Set working hours.Chat.4027381",
              reenter: true,
              description: "- Bot re-renders intervals using the settings.\n- If the day isn't a working day, Bot makes the button near the {day} red."
            }
          }
        },

        "Creating default interval for {day}": {
          description: "- Update {{chat_settings_type}} Chat settings:\n    - Add the `{default_interval}` for the {day}.",

          on: {
            "Bot adds the default interval and buttons for it under other intervals for the {day}": {
                  target: "#Set working hours.Chat.4027381",
                  reenter: true
                }
          }
        },

        "Making the {day} a working day": {
          on: {
            "Bot updates the schedule": {
              target: "#Set working hours.Chat.4027381",
              reenter: true,
              description: "- The {button} becomes green\n- Bot re-renders intervals using the settings."
            }
          },
          description: "- Update {{chat_settings_type}} Chat settings:\n    - Add the {default_interval} for the {day}."
        }
      }
    },
    
    Environment: {
      description: "- Definition: \"Chat\" is a private chat or Telegram group without topics or a topic.\n- Definition: \"Interval\" is a block of time.\n- User and Bot are members of a Chat\n- The Bot may read messages and respond in the Chat\n- The Bot username is <bot>\n- `{working_hours_type}` is `{working_hours_default}` or `{working_hours_personal}`\n- `{working_hours_default}` is `Default`\n- `{working_hours_default}` is `Personal`\n- `{default_interval}` is `23:59 - 23:59`\n- `{chat_settings_type}` is 'default' if `{working_hours_type}` is `{working_hours_default}` else 'personal'",

      on: {
        "User opens the chat": {
          target: "User.Idle",
          reenter: true
        }
      }
    },

    "Chat": {

      states: {
        "Previous messages": {},

        "4027381": {
              description: "Message:\n\n\"Here's {'the default' if {working_hours_type} is {working_hours_default} else 'your'} working hours schedule for a week.\n\nThe red button to the right of a day of the week means there are no working hours this day. Press the red button to make this day a working day. The button will become green.\n\nPress the green button to remove all working hours for this day and make this day a day off.\n\nFor working days, there's at least one working hours interval in the `hh:mm - hh:mm` format.\n\nPress an interval to edit it.\n\nPress ✖️ to remove an interval.\n\nPress ➕ to add an interval.\"",
              on: {
                "User presses an interval": {
                  target: "#Set working hours.Chat.Bot writes the interval in user text input field",
                  reenter: true
                },

                "User presses ✖️ near {interval} of a {day}": {
                  target: "#Set working hours.Bot.Removing the {interval}",
                  reenter: true
                },

                "User presses ➕ near {interval} of a {day}": {
                  target: "#Set working hours.Bot.Creating default interval for {day}",
                  reenter: true
                },

                "User presses the green {button} near a {day}": {
                  target: "#Set working hours.Bot.Making the {day} not a working day",
                  reenter: true
                },

                "User presses the red {button} near a {day}": {
                  target: "#Set working hours.Bot.Making the {day} a working day",
                  reenter: true
                }
              }
            },

        "Bot writes the interval in user text input field": {
          on: {
            "User input: <bot> <time interval>": {
              target: "#Set working hours.Chat.Waiting for the user timeslot change message",
              reenter: true,
            },
          }
        },

        "Waiting for the user timeslot change message": {
          on: {
            "User changes text and sends the message": {
              target: "#Set working hours.Chat.4253713",
              reenter: true,
            }
          }
        },

        "4253713": {
          description: "Expected message in '<bot> hh:mm-hh:mm' format, \n\n\ may be incorrect format",
          always: [{
            target: "Changing the tapped interval",
            reenter: true,
            guard: "User's message is in the correct format"
          }, "4266726"]
        },

        "Changing the tapped interval": {
          on: {
            "Bot changes tapped interval according to user's message and deletes #4253713": {
              target: "4027381",
              reenter: true,
            }
          }
        },

        "4266726": {
          description: "Reply to 4162417: \n\n\"The interval <interval from the message> is not in the format 'hh:mm-hh:mm'.\n\nPress 'Enter again' to enter the interval again.\n\nPress 'Cancel' to cancel editing this interval.\" \n\nThe message contains two buttons: 'Enter again' and 'Cancel'.",

          on: {
            "User presses 'Cancel'": {
              target: "#Set working hours.Chat.Cancel changing interval",
              reenter: true
            }
          },

          always: {
            target: "#Set working hours.Chat.Retry changing interval",
            reenter: true,
            guard: "User presses 'Enter again'"
          }
        },

        "Cancel changing interval": {
          on: {
            "Bot deletes #4266726 #4162417": {
              target: "#Set working hours.Chat.4027381",
              reenter: true
            }
          }
        },

        "Retry changing interval": {
          on: {
            "Bot deletes #4266726 #4162417": {
              target: "#Set working hours.Chat.Bot writes the interval in user text input field",
              reenter: true
            }
          }
        },

        "3983414": {
          description: "\"/set_working_hours",

          after: {
            "500": {
              target: "#Set working hours.Bot.Handle the command",
              reenter: true
            }
          }
        },

        "3745834": {
          description: "Reply to 3983414: \n\n\"You have to join daily meetings first!\n\nUse the /join command.\"",

          after: {
            "500": {
              target: "#Set working hours.User.Idle",
              reenter: true
            }
          }
        },

        "9238492": {
          description: "Reply to 3983414:\n\n\"Press 'Default' to set working hours that will be used as default personal working hours by all people.\n\nPress 'Personal' to set personal working hours.\"\n\nInline buttons:\n\n[Default] [Personal]",

          always: [{
            target: "{working_hours_type} is {working_hours_default}",
            guard: "User presses 'Default'",
            reenter: true
          }, {
            target: "{working_hours_type} is {working_hours_personal}",
            reenter: true,
            guard: "User presses 'Personal'"
          }]
        },

        "{working_hours_type} is {working_hours_personal}": {
          always: {
            target: "{working_hours_type} is defined",
            reenter: true
          }
        },

        "{working_hours_type} is {working_hours_default}": {
          always: {
            target: "{working_hours_type} is defined",
            reenter: true
          }
        },

        "{working_hours_type} is defined": {
          always: {
            target: "4027381",
            reenter: true
          }
        }
      },

      initial: "Previous messages",
      
    },
    
  },
});
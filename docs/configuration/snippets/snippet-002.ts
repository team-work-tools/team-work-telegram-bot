import { createMachine } from "xstate";

export const machine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGUwBcAEB3A9gJwGsBLAOygwAscBXPWAOgFVYw96BJCAGzAGJVMuQqXJVasANoAGALqJQABxywiaIjhLyQAD0QBaAKwAOI-QBMRgMxHjAdgAsBgGwGDZgDQgAnvqMBGentbA1sATiC-Zyk-KXsAXzjPAWx8YjJKGjp6ACEcNHoACQBDEm4wDDQKcoBjHABbOpKIegBhKuqCDFIAMxwMIoAjGkxK8uZWXmk5JBAlFTUNLV0EP1snU3tLWyMpI3WzKUtQzx8EW3pLM3snUJ3-MzCnMz8EpPQU4XSxLNz84tKeBUqhhag0mq12p0en1BsMgWMWHhJn5poplKp1JoZstnrt6CFQtZ7M9bFIzB5vIg-GZ6KFQodyZYjkZHAYpAZXiBkkI0qJMgxfoUmoDRiD6o1SkxEZQirAMAArHCkSAYOpgdAiWC8bSwNBFNBgehFboGvAACjZUgAlPx3jyRBlxDk8kKAeVRaCJc1xngZXLFcqIKr1WoyJJZFo5hjFtiqVJYhdbpYXH4dsFQhTTgd7PQnE4iZYpISwgczJzuakHd8BS7-mV4WKwZKfX6Kn0AyRgxqwxhukQ6Ghtbr9YbjaaLfGbRXPnynYK6yLgZ7wS2KLK2wqlZ21d2oHK+wOppH0QssaBln4-E4c6sDoSdkyjLYTohrvRdlYP9EjA9yRzElydqVl8-LOvkACyRS8g2wAQEUXhxBgJB5P0HzQXBXi8L8GDUAocEGnKoqwNUVQQNQPBHjMUanksiAZlIuY3PYfihA4RxuPYL4INcoS5kcZg3GxtypuWQEzo6PwugASmAdQ4AAbg6orAKQpryUUXBxFhKG4fhcANsRpHkWAlFovMmK0QgJgMTY-i2esPHPpSZy3PQLIxFYOz5j+oSiYIwGzpJ+QtHgYD6g6EBgN0RTkZgqmsOpXC9vgGDALB8EJNpmBFBAECEcCkXRbFXQkGpGn9KUGADNQaBoBo+4paoOGlKwGB5FUvrxXgiUNb6ykYXEpmzCeFmxlZ+bvjxrGXrETjbFxdIMbYV6bMWTjUixfloVWoGCpB0FpQNiFFNt6QYVlOF4SO+XlIZkDGUN1GjeeiAmAEhLWEyV6hE8axcZeBjvXsLJWGyzw-lt9ogXOLqMFdobkMpXWJXE9AAApFHQDoAORpdQiIAPrIxpCTY5MEZUSNMYvSs2w5pYLHUgzYSxI4-3XKYeyhDEjgRKSliQwFEk1vkcP4UpwIqaVCUk+jmMqOkuPAPjrBE9L3Uk3EZMSCix7mdTOhUteARrNYLLrTcP7-ctGz2PGVzc8E2z-m8-nidWYFMPDEvlFLZWaV74vpEReoGhdoUKFwRBwI9VNnobCDhDSthXOyezspE9hGP9RiuRnG3hPGhyC+7u0usgRTybdJH3YCJElDAWrYaFclV3KsD1OUaqwLARSN7H+vx8sexOLmJi56s9ibMbXEkjZUh5tzxhXFeLuAW70Ee4KIVhQaFSyUoeCY14qXAPXaAEywtWagTaBeAoYAJBgbT6hgV8I1qOqh6OJqsBO1q2g3jtGGwVQojn3nUQ+x9T7n0vugD+t976P0Qi-TA79NQD2jEPRARxR5mG5t+EwBg6R+E2FxVktIrDLW5j9ZiV4S6b1AgAURIIpPAGg1SlV4C2HAD8SA3RBGuNAmCaJjT0NSJwS0DCOC8teAwTInKnD8JYAw5hLDEj2MxEwLhdgMOAVkVB5gzDWDYhdOYKgBhcBPrpa6MFiaaREc9BOudVGxHUbg36Kds7OUiHiSIVh8Ep25iYMsAFpyMKdIYiwWxiSWG4dKFgpQ5QnW7r3GAjiDbLHEesNyFsiwPF2HbBe-0mQMRiN+Qs8jSRuD0dDAxQiLgOGMOooc38jS-3NJaKcYkIn1P1I0mR6iMnYIQIYZauYghFIcA8UIzguKuAmbENOhIWJTxeGEnp+iGCGOZOo0hrSRztPHF0wBp1ArbIabs5i9hhmWWpAJRiRJJGBKsFxPQeZaRzQzKQ8kn5bC1PORCfpdsHjWD8PE1qChQo930oANHJADwf0hMKvo-Yy00m1boqF0oIVuWNIhbkYjLVmrsIsijEC2C2G5IJ9I6bOBCAC4WQL8ggopf4CFvooVwBYHKQAqeRIsxqlexiEcCYpOtiwaFMzJYMsk+UwLFDjyOsBmASlgFr2F4kcIIDMrDfXUQyj2hiWVgvZRgTlMKBFQFCmATswBqq1Q0IhEgyKsUDVxTTEw9NWVTxUTsS8TguJ5lHpnOkNhlXJniBsoBdSLnArJKy8FLYzXcobKFIMtqap1RII651YrXWSuGoPGVOx6C+KLszOR3ilFFl4rM0kax7g2Hkfq0Chq43GsTdC5NJRBXqxRslFFebUQFulWNUFtJ2S7GeBYKQpJ-U+KLKoo4M7VgpjcP8yNZzGWttBWyjtXL9LYwrlXbGbqE5hEsPQNY+YXDqtzv4TiPjWLnFNgDckhJjBOGbZEhpRrd3SiTQeloJRqhgC4Ce-NT1MmIFcBelwMzZkzUcHOrMuwAiFh+hS9VKiiwCw3VDQFhqBJzQEuTIdkGRnknOD+Ty08s5XBZP9NwNJUxuGmpI5wkQv19OZURlOThkRkbjpZcRxjcz+J4pIvY6iDDW3WrmVwuczDSInesLjMb8gZiJBmUjesR002fbEO4xiYgCUVbPZwFwnxVJ+vseleGhYGoaZplk2mdaCcLWIh4nMdjyJYioh2qxzOjxMdZvMP47Ou03Y5-pdIiTGIOQaI5f8TnhK2Uy2k95YmnuHheu2qZ9jkmvMcHxudeLyLmk8Da1glNqfS8AfDBNqyIIfohIgcp6sBUa-yAmD86AaBJjpymHmaZ6Ho1S4hWwiNzUvA+04zFzhebzPgqeDI16pejXVhrTW74ta6O1rb3XCoxS4GgLS2X9CkNUU8ByLJkwxFWGShAbI5VXHwZV245JQmRfw1uhpHWZxdfEM1x+e2MCFUDINqVoiaYMyWrsJ4hXJlFlmzglOgQ0xkg5jsLOa3NkbcMc3WSCl9KpL7vpWENUMCQAxOkbt9jmpqCSr+vwGAzTITiiQaoXBqAQBEDaFsYC8rndGZcXiFhSFUL2FcbYyG4zqLcgzeRSmngflw99hzLaGmE9biTrlZPklDEp+g9IP3qzhzAJHaO4Z3N6YTtknMbJjBT25sSRwM7Z4WFUeqilHlHBLzV+vKLmv+lPmqynXgGksDwWt7p6HduNqXomyEQssRWK3FnhQ8I1mdWpiMAkACyFIrwBmOt85senFZNIZsWkMQb2KZMCot5dteKHCfNzBmt6iy1Z9OXqDozym8R88Ys21XXA5xpMmekXziE4dId3xEHAyi95GXoH6AQh+Pk8kpmTzkBK8RuKsh4y1jHyNx1GwFvxl93LpSWhD0yleSNlyL54l7Ijcx0dEp8tX5zCndEucUTQV+Y0t4DEmw2w8OP4hwxWpwo28uRwhYzENwC8P0Z+QeICro9YHoABkobQYAHQJUvQ-QhuIwwIPeQ2tuF4NgsGC8b0hmiBbypC5wM60QYWzs0iAk3+tYv+DYy4zY0oa4-oW4KoO4H8QBNMD270M6awWcrM7uPiqwgQdslsKcxCtk666upc6BC4f+NQ2B3o-B64dUm4pAXYH8vY-YuoYhCc2YoBLGFg08LEbgOcrixIC8AkFK+CxgnBEEUEPsqUA0SEKEJ0P2GEVhF4FKqiIQjwyiK8NBAa7I46YQOwtaPm6yGhvSIs9AMkrcfhqKGsmkYRVIHhRigMxI1IVBla5KcmrEyYDwzESu2w3hrQYCCMYOUUx2HO-s-ap8R0hRtMKi+Itg2wDgi8U8WcC0IQJaSmWwy0tergEa6RaWe0vh6Qh0GUx0m6oR5Bce4RAxURT41wTEU8lRKwEu+IzEhINw14+Yvk9mmhQUgc4UwcksQqfRqwyYFwjMxmLMU8O+Si+Ccq3MAkC6WwzMTRYsTxiMLxvassGMWMiseMhMQqWsbxYQZWsy4QhYS61wfxVI1gkRpCyiIQLgoeeedxGRnsEJrRSMMJAcVJfhw4Bobx7kgQRWbhsQ+CkQjGrkhx34E2KcFKTRR61cRkdca4ZAcAbx60F6jhk80xwJT+LE4yqYM65IPM+Y0QTRO84CBokC+A0CaUsCxue4wOT8qCb88CmoqJcmxCl2c0eyWcJxmwQM+YxIwSxIDwtWLCbCHC1qaAfR4i7ENeC80i9eoMbyjIbk+SviFg-M6hgepuwe-p2xFe+gEQihVCqejgKcmY+gDwo8UuIQP4eyxCX2CZGu36-SjIBxlgAZKpVKHqeYQQkmipmwF6LIuwrESmK6ZItWUSVCsSzJwW1w6qMQNRawuZpxVgFwrusy0Q7h9C5JaWOyTSVg9gfRyuuYzwbghmkB6wbybInxDgK0TMR+syfZlySY1yAZxiDEc0H4xGbeP4k54ipCr+zZUQLIbIgpS5+OP6ba-gG5b4LGC86i2wdIrEJxE2JajMGGRwKcjgF5wKvGAkG5FgFwBwiq4aa0ip60OYkBX0X0TZCx5Z9x6mVKYeZgQFpgDMVw6ixiK8Aps8Rwg+sQteyYpI2ZSFGmxiLmVFKZfeSm9MxgLudIjgLFqqPi1eFgAkfmZI2GKc3FGWcWtZAlFG6FHpxCE5C8dM-09I70hI06dsbIXFv5BGDSaMoUikNAcopOjcN5lKYQRSVesybej24iuc+I8FhwHp0Q8Zpev2-S-2vIgOdAppoOwVIgoVsAPWrAHcJAJMAZ7i+INwR+q8pJj2lwF6URbE-gawSpn6ZlgV+QkVZA0V4VbWqUB2QOR2sUcQAZFKl69a0QYBFK6iTp6quSV6IQWi1wqwSlpVUA5VO2IOlV4OTqEAN5U8bk3Mk8vV92j2zgNIucdsP4PE6ctxixf5-S2uxOtleujcRBcI1OrRdOtJDORATOAFLObOKEpAXOPOfOdZ01t56qCmk20us8y6l68F2w-g1ILBSlu1bcwYPc+uR1RulpJuFZdAAZsSGZWwWZIQ5Is8qwDEyBxluceYC8+ecQQAA */
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
          description: "- Update temporary {{chat_settings_type}} Chat settings:\n    - Remove all intervals for the {day}.\n    - Mark the {day} as not a working day.",

          on: {
            "Bot updates the schedule": {
              target: "#Set working hours.Chat.4027381",
              reenter: true,
              description: "- The {button} becomes red\n- Working hours for {day} disappear."
            }
          }
        },

        "Removing the {interval}": {
          description: "- Update temporary {{chat_settings_type}} Chat settings:\n    - Remove the {{interval}} from the {{day}} intervals.\n    - If it was the last interval for the {{day}}, mark the {{day}} as not a working day.",
          on: {
            "Bot updates the schedule": {
              target: "#Set working hours.Chat.4027381",
              reenter: true,
              description: "- Bot re-renders intervals using the settings.\n- If the day isn't a working day, Bot makes the button near the {day} red."
            }
          }
        },

        "Creating default interval for {{day}}": {
          description: "- Update temporary {{chat_settings_type}} Chat settings:\n    - Add {{default_interval}} to the {{day}} intervals.",

          on: {
            "Bot adds the default interval and buttons for it under other intervals for the {day}": {
                  target: "#Set working hours.Chat.4027381",
                  reenter: true
                }
          }
        },

        "Making {{day}} a working day": {
          on: {
            "Bot updates the schedule": {
              target: "#Set working hours.Chat.4027381",
              reenter: true,
              description: "- The {button} becomes green\n- Bot re-renders intervals using the settings."
            }
          },
          description: "- Update temporary {{chat_settings_type}} Chat settings:\n    - Add {{default_interval}} to the {{day}} intervals."
        },

        "Updating the {interval}": {
          states: {
            "Parsing '{{user_interval}}'": {
              always: [{
                target: "Updating the state",
                guard: "the format is correct"
              }, {
                target: "#Set working hours.Chat.4266726",
                reenter: true
              }]
            },

            "Updating the state": {
              on: {
                "Bot replies": {
                  target: "#Set working hours.Chat.9938423",
                  reenter: true
                }
              }
            }
          },

          initial: "Parsing '{{user_interval}}'"
        },

        "Save schedule changes": {
          on: {
            "Bot removes some messages": {
              target: "#Set working hours.Chat.Bot removes messages about setting working hours",
              reenter: true,
              description: "`{schedule_was_updated}` = `True`"
            }
          },
          description: "- Replace existing {{chat_settings_type}} Chat settings with updated temporary {{chat_settings_type}} Chat settings."
        },

        "Create temporary {{chat_settings_type}} Chat settings": {
          description: "- Make temporary settings from a copy of existing Chat settings.",

          after: {
            "500": {
              target: "#Set working hours.Chat.4027381",
              reenter: true
            }
          }
        }
      }
    },
    
    Environment: {
      description: "- Definition: \"Chat\" is a private chat or Telegram group without topics or a topic.\n- Definition: \"Interval\" is a block of time.\n- User and Bot are members of a Chat\n- The Bot may read messages and respond in the Chat\n- The Bot username is <bot>\n- `{working_hours_type}` is `{working_hours_default}` or `{working_hours_personal}`\n- `{working_hours_default}` is `Default`\n- `{working_hours_default}` is `Personal`\n- `{default_interval}` is `23:59 - 23:59`\n- `{chat_settings_type}` is 'default' if `{working_hours_type}` is `{working_hours_default}` else 'personal'\n- `{schedule_was_updated}` can be `True` or `False`.",

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
              description: "Message:\n\n\"Here's {'the default' if {working_hours_type} is {working_hours_default} else 'your'} working hours schedule for a week.\n\nThe red button to the right of a day of the week means there are no working hours this day. Press the red button to make this day a working day. The button will become green.\n\nPress the green button to remove all working hours for this day and make this day a day off.\n\nFor working days, there's at least one working hours interval in the `hh:mm - hh:mm` format.\n\nPress an interval to edit it.\n\nPress ✖️ to remove an interval.\n\nPress ➕ to add an interval.\"\n\nInline buttons:\n- Schedule table\n- [Save] - Save changes\n- [Cancel] - Don't save changes",
              on: {
                "User presses ✖️ near {interval} of a {day}": {
                  target: "#Set working hours.Bot.Removing the {interval}",
                  reenter: true
                },

                "User presses ➕ near {interval} of a {day}": {
                  target: "#Set working hours.Bot.Creating default interval for {{day}}",
                  reenter: true
                },

                "User presses the green {button} near a {day}": {
                  target: "#Set working hours.Bot.Making the {day} not a working day",
                  reenter: true
                },

                "User presses the red {button} near a {day}": {
                  target: "#Set working hours.Bot.Making {{day}} a working day",
                  reenter: true
                },

                "User presses an {interval} for {day}": {
                  target: "2837423",
                  reenter: true
                },

                "User presses 'Save'": {
                  target: "#Set working hours.Bot.Save schedule changes",
                  reenter: true
                },

                "User presses 'Cancel'": {
                  target: "Bot removes messages about setting working hours",
                  reenter: true,
                  description: "`{schedule_was_updated}` = `False`"
                }
              }
            },

        "4266726": {
          description: "Reply to 2238743: \n\n\"The interval {{user_interval}} isn't in the `hh:mm - hh:mm` format.\n\nPress 'Enter again' to enter the interval again.\n\nPress 'Cancel' to cancel editing this interval.\" \n\nInline buttons:\n- 'Enter again'\n- 'Cancel'",

          always: [{
            target: "2837423",
            reenter: true,
            guard: "User presses 'Enter again'"
          }, {
            target: "Bot removes messages about editing an interval until 4027381 (not including)",
            reenter: true,
            guard: "User presses 'Cancel'"
          }]
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
            target: "#Set working hours.Bot.Create temporary {{chat_settings_type}} Chat settings",
            reenter: true
          }
        },

        "2837423": {
          description: "Message:\n\n\"Send the new interval in the `hh:mm - hh:mm` format.\n\nExample: `{{default_interval}}`\"\n\nNotes:\n- The example provides an interval copyable by clicking or tapping it.",

          on: {
            "User sends a message": {
              target: "2238743",
              reenter: true
            }
          }
        },

        "2238743": {
          description: "Message: \"{{user_interval}}\"",

          on: {
            "Bot possibly updates the {interval}": {
              target: "#Set working hours.Bot.Updating the {interval}",
              reenter: true
            }
          }
        },

        "Bot removes messages about editing an interval until 4027381 (not including)": {
          on: {
            "User reads": {
              target: "4027381",
              reenter: true
            }
          }
        },

        "9938423": {
          description: "Reply to 2238743: \n\n\"OK, the interval was set to `{{user_interval}}`.",

          after: {
            "500": {
              target: "Bot removes messages about editing an interval until 4027381 (not including)",
              reenter: true
            }
          }
        },

        "Bot removes messages about setting working hours": {
          on: {
            "Bot replies": "8738272"
          },
          description: "- Until 3983414 (not including)"
        },

        "8738272": {
          description: "Reply to 3983414:\n\n\"The {{chat_settings_type}} schedule was {'' if {{schedule_was_updated}} else 'not '}updated.\"",

          on: {
            always: {
              target: "#Set working hours.User.Idle",
              reenter: true
            }
          }
        }
      },

      initial: "Previous messages",
      
    },
    
  },
});
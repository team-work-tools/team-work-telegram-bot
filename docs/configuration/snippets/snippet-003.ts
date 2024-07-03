import { createMachine } from "xstate";

export const machine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGUwBcAEBDDEwDMsBXAG0wHsAnbDABzEtnIDssSM0BLAWzAwC8WfTsxoBhABZY0AOgCizAG6dKLXszQBiAKqwGGcvWawOEvoEIQKWgDaABgC6iULXKxOXFk5AAPRAGYADgAmGQA2IIBWABYAdliggE4AqIiAiIAaEABPRCDQiJkY2wjbcNCiqL8IvwBfGszUTBw8QlIKahx6RhY2Dh4+QWZhURxJaRldBhkASQgSMB09alg0LEo0Ez00LmYoGi5eASE7RyQQFzcPZi9fBBiYgLCHvyCYv1sA0IBGUIDMnIQeQKRRKZQqVVq9RAjRoLWIZAMHToDCYrHYBwGQgwInEVhkACFyLIAOJEOAmDFHIYmfCqbimPi8WCwLAwGSSMAAYwA1gyMEyWTAMPgqNxpJoTl4Lu5OJ4zrdIl8CpUglFVbZAqEPv9cgkQnlbKUohrbA8ggEYnUGuhYQR4e0aF1Ub1KYNhrjxoSSWTmX1Dm6aXS+QLWWB2WYecHyaHhaLxdYvqdnK4ZXLQArYqEZAFinEEglUik-tlEA8s8avp8IhEEqEqgkolboTbmna2ojHSieuj+lT3aM8V6ZKTyX7MdThUG0GZ+dG2QAZcjkbkiPYi6hitCciSrsd92AShxSlNXG65VKPC2BD4RV4xUIJHUIL62Sthd5RL5fWt+Wv3pswq2rQIlQnbdGie5utiIwYGMshDiOvqukIgbkPS06MnOYaLsuu7rvy0jbruyHUhKibHpcsrXPKuTfLY2Z6qUEQPFEtZ5E+X62FEMh+A+tgJKUAR+IEBYAS2uBtiBSJOt2kFYjiA6ekSw4+hSvYBpOaFRsyoYTEs0G0EQmC0GsegQIeSbnCeVFnoCdaPFEoTfPeiSfF8URPlEAQJDIQRfDE-kJP5NYJP+UKARJwEOp0XYQSR-awYOykABJYMwcx8BhGBDAA7nJQwWRRqbUem-gan4vnea8TkRF8LwZCWCB6uWD5CcaTl1ikYlNJF9odjF4Euup8kwXBBLKWI8xpRgRC0LOOkwAeXoYJQcAuOlFLkHykyUJKZzSqeNEIO8QT0XEdEagEXyqvcHFqj5aSnRqDyVrekLWj1cLtqBA3Oj2-ojR6shjYkgSsUEiz6HoG00CGQqslgIh7cmlFpj4iD5j5eShCkUQpP5xTFgCPzRDIRbRN5BZBUq3W2lF-XIoN-3jglY0g0kfgqpD1C0KtzJwDQABGRloCwGA5e4Eh8qwhzABiAD6bo1MjVmoyV6PPsxl5aq9eqnX4PwccJMSFOqsReZ+ySWuF4lfVJYF-flrN4mNnNVLeESaMtUCqQL8UABSwAAlCrB02UddX5DIQWBN+vHvBqT5aibX45lxJQxEEvG00BfU-YzjvxdBQPhuMv5te5XtEitYC0CQnBwKH1lo7cdWhdHPyteaoW1aET6RNxiRxHkn7GhqSQ57133SbFQ0A0MxeKcDeK1hqzFRNzGDQxAJg4HDfAI0jR77c36ut+59FXTWFp+Qkv7lE+nz0S+QSqjmkfD5PdvRQXslFwpiVxhjQCMkeOjlN7b13vNQUYAm5q1snVUmMRbx1lvMg0KaonzVgqgbVepQbqRGth9OmecZ5MydovQBy9xj8SzmqGIhUT7wIjpWLGqoLbeRePxL4d1eIyB+EUbGSprwBDqFCZg5A8DwDOBFb+DMZJxWGgvABcEiqHVKs+Y0lVWKfgCsJZIvwnwAFphI+VCk5Z6lZEiViIc2T6kkf4KLnizShY0FDKFUMwdQaA1Hhw0ZWR45odH+TqmDQxjUjGRBCPkXicRrpCW-BEL+Dj5Gz2Zn2VxeIdq+JbogaoPk6rGlOlWAKzFPK-CeJzLyv4ObeWSfTfOTj0lQRUVkpYMwMo5LPnki0-DOa2GKfkUpMQsHVmjj+e4SQkhfiCPU0hDs-5KOdkpHxTDiq2SzkkaO7CDa1U+GqBqAIUg8W8sxLi+ZcEWjmdPBZij57LPgspRCal7moXQjOfeXSNl4yzHqPGuzKw40iEbEIAVIiGg+HqPW707EkJub9RZ9zMkrJUqOeKbztIwPDFyXkWV96xkoJuL5R1VQNm2f8pUgKDn91OjINe91yjNUctc+2CK7kuNaSi55TsMV4qwjIHCK5dgEoIluHcwr0XEo0ZET4YRQqE0qA2B4hy8mpEKJTIpUzvJfBZY4tJFDOWPO9GipZvKPn8p2gZIydBTKQClRrPIrxo7Vlxtdb8V4nycx8sbAsrxogxAbI2G29iGlkMLks5FRqZCpXSvMaWYA8rxXtQqYIyp3L3mYrWdqRNEAPhCMUSo7xjZvF-Lq1J5D-6jSSsDKaohZrQNDNIlG6ySVBRNt5e8sQPiRGiE+Dm75zRCT1LxAZojg1wtZb-dlGTDWl1Wc29RGsCxfF8k5XG+MQQ5oQKxXyeNiimlfikXioQy2NP1ZWku7MwZ6mTYgJUepsxcUclrO+McOLRG4oaTG5tDS-BPeO3O8Kp3OJnVWoBeJXJuyCLezWD6cw-Jfb+OqHE17Zk5q8O+ONx5JIA1PSdTSDVgeobIN21ZIgwc4ibUlzEvzx1SH4UZ9ENTVSVMg8FQbiGAfw+eiNs7XYc1HhRl83FOKOVVHVfijkaWgotPxU0tYhLMVsbIlJZ6K28aI3O6OWoqhxAozWE2mGXwCWPa8IIT4Aorvqv8gZ35HIwpU6G25IGWmaeAaAzqoR9PtyM3J0zIzGqcwKOaPyAyMPu2YqesNiKOVubxAABVWsocgRATD7ybarFt-jKyfpOh8NIxoApbsjjICITlMMJ1SL8KLznmmAyXlp2h6GYjeZCF6gK95Pj3z7o1dyX5Ci3mXTWVypoxE1CAA */
  context: {},
  id: "Set a default or a personal time zone in a Chat",
  initial: "Environment",
  states: {
    Environment: {
      on: {
        "User opens the Сhat": {
          target: "#Set a default or a personal time zone in a Chat.User.Idle",
        },
      },
      description:
        '- Definition: "Chat" is a Supergroup without topics or a Topic\n- User and Bot are members of a Chat\n- The Bot may read messages and respond in the Chat\n- The Bot username is {bot}\n\n- {date} is the current date in the UTC time zone in the `DD.MM.YYYY` format\n\n- {time} is the current time in the UTC time zone in the `hh:mm` format\n\n- `{{date}} {{time}}` is formatted as code so that `{{date}} {{time}}` can be copied\n- `{time_zone_command}` can be `{time_zone_default_command}` or `{time_zone_personal_command}`.\n- `{time_zone_default_command}` is `/set_time_zone`.\n`{time_zone_personal_command}` is `/set_personal_time_zone`.',
    },
    User: {
      initial: "Idle",
      states: {
        Idle: {
          on: {
            "User starts setting a time zone": {
              target: "#Set a default or a personal time zone in a Chat.Chat.3983414",
            }
          },
        },
      },
    },
    Bot: {
      states: {
        "Guess time zones from the message": {
          states: {
            "Check the message format": {
              always: [{
                target: "User input parsed",
                reenter: true,
                guard: "Correct"
              }, {
                target: "#Set a default or a personal time zone in a Chat.Chat.9603574",
                reenter: true
              }]
            },

            "Looking for matching time zones": {
              always: [{
                target: "#Set a default or a personal time zone in a Chat.Chat.2983432",
                guard: "Time zones found",
                reenter: true
              }, {
                target: "#Set a default or a personal time zone in a Chat.Chat.2938492",
                reenter: true
              }]
            },

            "User input parsed": {
              description: "- {user_date} - parsed date\n- {user_time} - parsed time",

              always: {
                target: "Looking for matching time zones",
                reenter: true
              }
            }
          },

          initial: "Check the message format"
        },

        "Handle the new time zone": {
          description: "- If the `{time_zone_command}` was `{time_zone_default_command}`:\n  - Set to `{time_zone}` the default time zone for the Chat.\n  - For each User {U} who didn't set a personal time zone:\n    - Update User {U} scheduled reminders for the Chat.\n- Else:\n  - Set to `{time_zone}` the User's time zone for the Chat.\n  - Update User's scheduled reminders for the Chat.",
          initial: "Update time zone",

          always: {
            target: "Clean up messages",
            reenter: true
          }
        },

        "Clean up messages": {
          description: "Bot removes all messages except:\n- The last correctly formatted 3435525 message\n- The 0923427 message",

          on: {
            "Bot responds to the User": {
              target: "#Set a default or a personal time zone in a Chat.Chat.0923427",
              reenter: true
            }
          }
        }
      },
    },
    Chat: {
      initial: "Previous messages",
      states: {
        "3983414": {
          description:
            "Message: \"{{time_zone_command}}\"\n\n",
          on: {
            "Bot replies": {
              target:
                "88436346",

              reenter: true
            }
          },
        },

        "Previous messages": {},

        "88436346": {
          description: "Reply to 3983414:\n\n\"Send the current date and time in your time zone in the `DD.MM.YYYY hh:mm` format. I'll suggest several time zones where it's currently this date and time. I use time zones from the [tz databaze](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).\n\nExample: `{{date}} {{time}}`\"",

          on: {
            "User sends a message": {
              target: "3435525",
              reenter: true
            }
          }
        },

        "3435525": {
          description: "Message: \"<message_text>\"",

          on: {
            "Bot guesses time zone(s)": {
              target: "#Set a default or a personal time zone in a Chat.Bot.Guess time zones from the message",
              reenter: true
            }
          }
        },

        "2983432": {
          description: "Message:\n\n\"It's currently `{{date}} {{time}}` in all time zones below. Press one of the buttons to choose a time zone.\"\n\nInline buttons:\n\n- Buttons are in a table.\n\n- The table has two columns.\n\n- The button in the last row may span two columns if there's an odd number of found time zones.\n\n- Each button corresponds to a found time zone.\n\n- Button names are sorted in the ascending order in the left-to-right, top-to-bottom direction.",

          on: {
            "User presses a button with the name {time_zone}": {
              target: "#Set a default or a personal time zone in a Chat.Bot.Handle the new time zone",
              reenter: true
            }
          }
        },

        "0923427": {
          description: "Message: \"OK. I set the time zone to `{{time_zone}}`.\"",

          always: {
            target: "#Set a default or a personal time zone in a Chat.User.Idle",
            reenter: true,
          }
        },

        "9603574": {
          description: "Reply to 3435525:\n\n\"The message is in the wrong format.\n\nSend again the current date and time in your time zone in the `DD.MM.YYYY hh:mm` format.\n\nExample: `{{date}} {{time}}`\n\nOr, press 'Cancel' to cancel setting the time zone.\"\n\nInline buttons: \"Cancel\"\n\n",

          on: {
            "User sends a message again": {
              target: "3435525",
              reenter: true
            }
          }
        },

        "2938492": {
          description: "Message: \n\n\"I found no time zones with matching date and time.\n\nSend again the current date and time in your time zone in the `DD.MM.YYYY hh:mm` format.\n\nExample: `{{date}} {{time}}`\n\nOr, press 'Cancel' to cancel setting the time zone.\"\n\n\n\nInline buttons: \"Cancel\"",

          on: {
            "User sends a message again": {
              target: "3435525",
              reenter: true
            }
          }
        }
      },
    },
  },
});
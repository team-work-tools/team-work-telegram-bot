import { createMachine } from "xstate";

export const machine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGUwBcAEB3A9gJwGsBLAOygwAscBXPWAOgFVYw96BJCAGzAGJVMuQqXJVasANoAGALqJQABxywiaIjhLyQAD0QBaAKwAOI-QBMRgMxHjAdgAsBgGwGDZgDQgAnvqMBGentbA1sATiC-Zyk-KXsAXzjPAWx8YjJKGjp6ACEcNHoACQBDEm4wDDQKcoBjHABbOpKIegBhKuqCDFIAMxwMIoAjGkxK8uZWXmk5JBAlFTUNLV0ESydQg3pbKVinIylQvz2bTx8EE02jF2cDs1szP0OEpPQU4XSxLNz84tKeCqqMLUGk1Wu1Oj0+oNhv8xiw8JM-NNFMpVOpNDNlvYpJYNkZ7GZYqszE4wn4nCdEOFAm5Dg9bH4LFtbE8QMkhGlRJkGF9Ck0-qNAfVGqUmHDKEVYBgAFY4UiQDB1MDoESwXjaWBoIpoMD0IrdbV4AAUBm2AEp+C92SIMuIcnleb9ygKgcLmuM8OLJTK5RAFUq1GRJLItHNUYsMYgYrF6JZQlYXIcpMFQh5vIgCfZ6E4nNZ7JZ9pYwgSzCy2alrR9ufafmUYYLgSL3Z6Kn1vSQ-crAxhukQ6Gg1RqtTq9QbjWaLYJy+8uXbvnynQCXSCmxQJS3pbL24rO1BJT2+1MQyiFujQMsHk5M347gW9pZrLYKQh7E56FITPmTNEjLczGYDKWlpTpyto8gAskUHJ1sAEBFF4cQYCQeT9K8UGwV4vBfBg1AKLB2qSgKsDVFUEDUDwh4zKGJ5LJSBJZms9h+KEDixm49hPi+oRZrGxLMXmcaPIkrJAW8IGfPaABKYB1DgABu1oCsApAGrJRRcHEmHITheFwHWREkWRYAUci8xojRZx7PQNj+NZuycY+aYIGEph4jEVh7DmP6hIBk6iTa4n5C0eBgFq1oQGA3RFGRmDKawqlcN2+AYMAMFwQkmmYEUEAQARALhZF0VdCQKlqf0pQYAM1BoGgGh7klqjYaUrAYHkVQerFeDxXVHqKehcTGbMx5mRGZxOGY3EGDi9zubYaxPjEliZmNbH2OEIT-t5Qlln5lazvQEFQSlfUIUUqFhXBGXYbhQ65eU+mQIZA1UcNZ6ICYAShPeViWGSoRjbN82RB9lx4lYJrTSWW0iVBu08ow10BuQikdfFcT0AACkUdDWgA5Cl1BwgA+ijakJDjkzBpRQ3hq9KxrFxfj2P4AlYn4hYGPNjFcZcoS81ctgmCmPlndOoH2vDeEKQCSnFXFpMY1jKjpHjwAE6wxOy51pNxOTEiIkepk0zoiDWDmMYhD9BIGI4KYc4514xG+lx3LcKarUmwtWqLAVMAjUvlDLJXqb7kvpIRmrapdwUKFwRBwE91OnsbKxuLY5hWAyFhOPssRGPNn2Zts2drIzTIvp7wH+QwACiJDyXgGiKsVvBNjgChgCQt2AquaAJ4bSfLHoDLZ5s1vGFI2aOPeDmnGzGxmItWeMSYLjvhXO0zm0WrmAvRgsZdcwqAMXBeFdOld4HcvqX3YYD29BxZnGqdhFI-6WPNBjXpsYT4mSsaZ04deMNN493ToWfElgW5ihYKUSUp1FSwFgEUGAN9qIjSHiSegDJVj3mcJET+155rszfPcNwsQyTZgAlDXywDbRb3yOA4wi0BwR2HPqVgY4pDmm2rQrI9CYwOCYfYVBL1k6GHpFmIIWIkz4jCM4J8rhJGxCkMYT6TF7CMSARWEB29YxWEYvYFhQ5dTsKNCaLhE4RZiQYPwvRi1GYiKNueP8r5sy5mzmYZiVgnx6GzPQP6RZGZ-isB7ahViq6gm3liW41g-BQOagoYKiDdKADRyQA8H+IRCh6S+Wt1ItW6ChVK8FHF3wsriGI9Idjvn2DPRAthCxWTuLzJMeJnAhC0d7GxoDon1P8PEj0iS4AsElIAVPJMlY2SiTPJOACmnSKf1SmJlb7mT3qYJi2JJrWBTMSd+jlwhcVjEEH6Gc1iLQ6dYyJ+QemxP6RgQZySu5QGCh3ZKlVqoaAQiQLJhS+olJWXiARuY8zjwvE+bMr5IirSfts1Y8Qwlewufw65fSmz3OGXWYKvpgBvJqiQT53y5m-MWYNfu-ypBYPMdsH6s1HB53tvsLi6wmS7AZDYSa5yIlItfr0uJqKknopKJMzWqNErZKJUiElyyRoxMCCSW4Gj3wphTIDBkb5mJxipTibEzJ4WV12ki4kcqnAUwlc9Jx6ZPH0GcDmbOMiHiFl2bPZwacYhuMcAvGklgOX6u6Yau4xq9amsTuZIe9xGkC3pP+SIgjyT2w8la2wLtmmLXBd6nR+QUy5hTCag2UraZcQ0bcKw4RsSQr-E+fMARPx70mp4gWrhAG6o3nQ0Bma8TZsDbmtBtM9C3BdfiBtf4DB-WxBW6IMZ3w1ssHWtljbng0O0S27evNcwLyMdqExo5zHcOhouvhrbPp4gXn8kaNgsF6P4j9T6AtQj5w0dSPYvMmZ5ggWmpd+RgAIsJpWQmaAvDtwQkQSUn7gLfq5ITdudANCkxzVTUl6CzBBHPWEJw+DelDo4mNcw2wcP5npgvHV87wk+u3iB0SYHxC-v-WAQDwGv0-vylFLgaANInp7YzSwVkTB71-CyiwdLTiuE47EZwuCfwC3uG+-dpH6Pgb-QBrokp8o+lg0s7tycBbYZsDiMa4R-AkjBXmJ2rTr01LWAkISSFwrwBmDwvdNm1OiMHozIzBwJ7WyMCmD8dtTh6GnWnEIDFQgTweO+M5TbeEMHdF2pz+gozcxUQvaw7l-w+cjD+GMuxE0qMTS+ShUmotwg4GUGL5qEB6D+gEPYbgvopdcE+Xij91F9uwZNKhRGEURK+KV0pOJeZvmtvcLYnmcx+B8Yh8l-5f4vhNE+vEBW9o1n5IuIUTQevmVhWnLYOxH2JmOI5Iebh-E-SZq-LE704Udb1TOHkS2Fw1FWyKNoYAOhFV6P0IYVU6zRbg3m5OhZLI82tiJmy1sfEuCzGF6pEQGSEeEguzpi35x1iXI2MUq4vSbnlNuRGDnJXqeWKsfr15YiIfuIxGl+dTDBdS8EEIsi8wLdu8j50j23To7XDVDcpAOy4+7L2DU62RqxkwSyw4AsbaXnYo5Q1VrsQpkiLEep9Smf2gOv7ZKfVELIVOp19CQvaarCO3mWaP17weP26cB8Vk3N4juDEfEl34fEZu5JaSckNc5NRgb-7l404qN-sNv6P0nyRv8YI5r2c8uq8CsFUK6RGOFSmaK5K8y4g+8J6vQIE99k5hUdYJ8wW1nEl4gyNmLEY-7UgtaI6aUTrhP179gnJss9YiC3nyaAnIwMqtfiH8nngg4iMJXiW8ekbSymenpvsW6afywUzJi-hWbs3mohhm2zPqrD9wcEffsw4T+FfLTG2Nlb4yJpPnWGeTb0kzAO78OG2brCIasK1iu+2zWHbcXfodx8B0nyHMfPSVhK-FYMPFwG8EwRDYdMkD+V+QIIIaIbYUhYIYfCLezegWueuRuDuNAEAoeVifxV1DzLzMGcbBeKyfYUhV+PebVBbehPA4hf8S4EIJVfMYIWNXzBeD6RiRDGwYLcxbMOg0BP8B8PMPA68Bmc7LYQ9K9O4TmTTWaEQl8UuSGK7ZtaTfICwcBBeEA+4AIbMbYO4H8a2Mkd8VfcgnjdVdYPEbOOHOzRHWxQRfRXQ4wc2XPJiBwJlHxDYEXJMYLVaVYMIcLNQyLS5GMOMexewPA4JY7TxULJiWbe8cHLiIIvvKA92PeIQqJblWJXQpDTNeXQ4fvZ2MFawN8LESaRiV+OyJ3ewxFX1bMf1XQ-MAbGwHOBwFxere2FwFIxibMHmF8MnLIjNXeVaMwFw18fYXYYLLYawfjeac4AkVicFSaGIYdYY-xQ9CBZo8lUwi2adPmepO9V8A4ZQxNXYbYa2DY9GYKeSGgSUBBJBGAPHM1UpXtF-FRDxenV+ZpLvcrFzLMQ4LfFRfgm-DYsjDkCjOgKjBTIDZKWTSjSDWAaDdSBg24cwYwcA1gpMeRRyEXCdOnCBa8TZcEhE6E+TGjRTeE0DBjCKJjFjH3GqBQRAVaTMG9KlB3DyCeTwHgfUfQO4N8ZLf8IwjRG2TwIYd5OoRAQbC4YLUtXObkkAPAIgKACgXA58NOSra8WRfBEwzwLAIgCASoSMAkTwKoFUtUlkulQeAU7ESA9aPEDRYdDiKkdk+U07YuUkmkuTajWjDAZTL5CAaIozSIK9Ggm4VlMFJMKySFRfadH8NeNAhw0BLCaoHgEoSUHCP0RBZBOAPA5iJ2QsLYI1AfNLBAAkYLTLfwkQpVOFBIIAA */
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
          description: "- Update {{chat_settings_type}} Chat settings:\n    - Remove the {{interval}} from the {{day}} intervals.\n    - If it was the last interval for the {{day}}, mark the {{day}} as not a working day.",
          on: {
            "Bot updates the schedule": {
              target: "#Set working hours.Chat.4027381",
              reenter: true,
              description: "- Bot re-renders intervals using the settings.\n- If the day isn't a working day, Bot makes the button near the {day} red."
            }
          }
        },

        "Creating default interval for {{day}}": {
          description: "- Update {{chat_settings_type}} Chat settings:\n    - Add {{default_interval}} to the {{day}} intervals.",

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
          description: "- Update {{chat_settings_type}} Chat settings:\n    - Add {{default_interval}} to the {{day}} intervals."
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
            target: "Bot cleans up messages",
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
            target: "4027381",
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

        "Bot cleans up messages": {
          description: "- Bot removes all messages until 4027381"
        },

        "9938423": {
          description: "Reply to 2238743: \n\n\"OK, the interval was set to `{{user_interval}}`.",

          after: {
            "500": {
              target: "Bot cleans up messages",
              reenter: true
            }
          }
        }
      },

      initial: "Previous messages",
      
    },
    
  },
});
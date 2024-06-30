import { createMachine } from "xstate";

export const machine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QHpZgC4H0AOYBOsA9gHYCGANpgO6F4DWAlsVJugwLZgB0AqmnlwCSEcmADEAZQwACXARIVpNekyjS2nANoAGALqJQ2QrAZsSBkAA9EAWgBsAVgDMXAOwAmOwEYAHA4faDq4AnK4OADQgAJ62QVxO7g4+ACw+3slewY7BAL45kagYOPhEZJTKjMysHNwAQoToXAASpMQiYOoAFh0AxoTs7K0QXADC3T100kwAZoTSpABGhACu6F0dfPhiOvpIIEYmZsQW1ghOdllc7sHBydquacmuCRHRiGFcDr7OyXZ+gYE8gU0Fg5KUKNRaJUWBo6g1mkNROtpH0BkNRuNJjM5osVmt0N1pJs8NsvLtDMZTAxzHtTncnA4uCl3NpkudPCEvHZIjEELcuMkHO5fF4vK4vO4fK57kCQIVQSUFOUoapqpwuPVGi02kiCb1+oM2rx+NJOqRYNIAFaEJiQaScDCqWBiTXSNBtWA7CwHKk00CnLzabzxXzBQNc5KhP48xBPZJcbRpILisVs36y+XFeRlSEqKqwjXw7XtZGow3DYmm83qObWpj2sCO5gW6YMAjoMSWWDoUjobikaZ9vAACgC2gAlGJM2ClbnoWq4VrER09SiDejK2aLehazbiA2m1AW23u169j6jidEKK7PGxSzgk4fNonE-XDGEL8Ez4fE5E8-fHcDxEgzEEs3BZU8xhGouAAUWIAA3NsSE4YgO0rQhcGIbdCR6M10DPClDmpY5aVsQMngFP4nF+W8fHcJwwg-TImQ8RN7kydxUk8UCihnHMKlVAsxl7eJXEFX9kk7bte37Qd8FHbQJynMD+IhQT8xgkTGkYiSaMI-ZKUvMiEBsDJgiZG4fxFcTrgcbk3gQYUxPcYU43-C5cnyOVVMVASVU09VtPiYJJK8KSux7PsuAHIdFOU6c-PUgLoKC-CQrC5IDIvEirwQCVPC4Ow7CfX5tGuB4nA-ew7C4LIQjc1zfxlbzEuzZKoIXDFRLuICny8MQKCoUgok9PRvSM3KTLM586pSLwvl6rkuI-ZJkncLgbw8Yrbnov5XF4hV2sg+dhPS3rnh8AbKx7bALTwO0FlWHd92IMBSDwZEqEbOgIBG7LJr9Kxr1-BM7HK0UHweJ5VqugUlLucSUifFJDvA2cNNS7hgou-qxBu0g7ukAByGxiYB4igdOYJWSZBIuV-P9RVCj96c2x9pUCJJtF8ZI0bUk6hK087ysu66TVui1iYAanJ8bz0B0j-VjVzNtZIMwx5sVXl5EJGXuJInlfDwwz51rfOOuchbSnrRbxgmiagB6wH3J70Be6Q3o+r6fr+qIKd9JXgacxI6dCbXirsLjXAc3lJVqwVioCUJfludx+aSwXAuxkW+qu-GJcJi0SCmND8AQigA+M5WEGKlx-E86UnwSVx30c38LMfLJfh8G5WScLzgT4zOrez7rGnW5xxScbZ5aIwO8uFUGf3BoN-ElVl3GYlkfCZBwsmjl4sicDPLcxrqccSRivBnzQyQmymg9OIDg2vxjGMugft-Cz4Y-8RjWSMwOubYeZ8UoX3Op4Ow20C74HUEXEmIxWg9DAOQOW5JDKP0XlkRkoVwpSn8EEVIsdrwBFcAKVIiZXJcnEg4M2Q8joQVHljceAooEwKrlNGuiQUhUVZJdcUMc-DMQCBtIUYtfwhBfOnEBjCMbgLOqJAAImAaYpBljkHxDUWA5AGgoger2EiLo9E9AMX2C0DEED7xsJY-epchwV3IKXZEPYFiiE4VTRAf5aqcSCMtbQj4kjMUCPGU2oV1oBOuF4U+TDz6KMaK6KgeBTBwGREwBxih6zLAlmASwawmDYFWNIVsqCICwM+gU1YCBpAAB4ljoAAHy1NhPY8uFAGkeKfteUU5CghCgCX01IXhgnQPiIbe8tDhR2BifIzq8SuAAHVSBUmYMU2gyJslwNhDokxZpmAdE4LAWApAYDlJRHsmA25clrCGG6F2EAcIHLgMcmAnS8rfC8FcRmFxziXRho5QMzx4hcSukmSM4N6E+VAbEhRwtRIiWYKoFxhNcAQFaXgRxxi1h4VaJc+B2BUXoscfMHofQ8AQCRTuaQmy8DEwtIcl5HRbkQFQRgVJYhJ5vzeSZBaLIrhjgWtzXwzEGQbVbuDcKdDbwsmibI9G-k5lwsaEg4gKCnE4sRas9JbTyBYukCy0Q5jpAcvYZ4Y1GQo4ZFcNymuf4gxMj+EkIUdDzgkPytA2q68nALXuJKVIkK2owsVTbRoAAlDAeAojnNxUi7VGKKB6oNWyi0JrirbXNctK1Nrg5Xx8cfAqoVaHJGYiVXeoQgjBD6TfRwMyFWnSVVwAACvgakaKHrsEIEhZgYhm3JMIGihg90wAdq7WoaYeB+jIrcWAbNAZWS1TCHQ8V9EIbDMcgPDalbvAgsrf-YBDD5UdXrSGrgABBCAaLVx+xrMiWAeFIAaPELUZ6JcNV4qpU7Rs+5bl3u6BAR9+rB3YHICNR5JK2AIRXDUaQhBpjImveOydV7eyLHNB0BgcHSAVwYCB6ds7yLBiUs3bIJVXw-g-M4BdaQQX+qSLWo91sc6iXDSOlchIEMTvYLe+9-7RAuhffuN9qSqUPTRT+njAGICEFScQPRFLYDAZGvMYgUbtm6PQBaesBJB36v+nPTBC8eWMlcncW89lJQMnsjrLxAQBTWTZEGHmUozbeVkyy+AexA2zOPWAB+hma42HCmyOqgZHCpGCJKX81nTIt1-uJJuwppTPHo1nFhxI-PV2DjYZ8xm-GCJZFIqqjl7DkLWjccUDFSqZB8Cl5hXViRCHaBlrhWWwjkMSII+89waZFd5CxKUJnJUsm9WGBwtW4kwU1M1zxZw6G7yXfvVuzw1rPGqlxbQ-K1rLSZm16ZcqBZ1YLJqBEOo2P6jRG0abXTZuXAW6EVuNEjbVV5XVb17Ib6PHWiffbI8JvqmO8WXUuF1xGjGGACYpdZjzCWEU1c6WFZYJMoxWaaRK13Akt8YtxXHBFUTH+Z8TxIb7qhXIutjHCxLlO6WEHFYTRbitHuO0Do2DNiu3lc4a1PhPEWw9lbvXryhTquVfwi7bLiW+weg7f3FwnZLKuMsG46fVipXWfczOnTFJPOgNnSP6pFSur4aG+9bxY7jsVT4L4Is+qNsln7YDg3cHgkhCdxBULa4R-5rLN9K0hbXuFyLDI1sMSZJEn1kom7E682Tse2kdcBaAp8vqr5rhSkyBKZ7EWuclSDN4ZwLJyrjdhSe3SSQaJx+DnQjbzhnDWSAlxX4IqEymcCK+QMDIa126DT51hA9Mrl+ftcKijgGRci+ImNa1UbgCl2hKXSASSqR4tl38nOM7ZXX74gaBnzfgJDrvRBPpvYwBKKo4LiLco5SilIXh3rDOXTw3yHaUYM1rXARikGOwTCp-lcnQmmz4LiL7QreYr6QJpqeAP6eA-zV5fCBg9ZATbxAphAXC8yVphBPjX7d7BSNoPRIQrD0rPInJwAP42LB5J4JCFpp6uTPaBBXDrZdzXBrTeAYEgHKKqLqKaLqDaLqb6LvSZY5QzZsi9LPCBAMRSK-Ctwfg0wWQlThRAQv7eC+DMEx7pSJLJJGqrhxrEpZI5J5KlyFJrAlLkAQAP4phgxig-i9xARfDBKgwBBRxihci+ADxjad7AHKGiRLIrJjrrKrg0qcGHLcFCYNhHKEEP5BaboSjOC3BBiG4jLkIMjzQeCTKKGuHR4sLBQIpQCUqEi3SEqaEUAQGZAbaBCFpIGBBLYipChuAxw8yCi-DrRKHpHpQqpqrRqapqD5HkAP7f4bQSitx+DSi9zbQlpKRuApAlS3hJGvgBpL5uFNHMYRpRpvqxplzxpdEe6ZbPz2RV4rx9wJAlEiLgxXA+r3ayHPgS4k6HqpYQKiS9qtrSDtqdqqBhF9GfAFaPjj4-hbzrp-hfISj7RXQPgMiNE3GNDnqXrsZKZUqri-oPqiDEGZ6BgvgBKVqJjbr86fhwx3DqxIxshfGAGk4MbuFhrDqdpna6ZRqIZcYwkSbwkbEtanA2D8iijNyuQczlqH5OQhBuD9RJx0L7yJh5B5BAA */
  context: {},
  id: "/set_personal_working_time",
  initial: "Environment",
  states: {
    User: {
      initial: "Idle",
      states: {
        Idle: {
          on: {
            "Set personal working time": {
              target:
                "#/set_personal_working_time.Chat.3983414",

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
              on: {
                "Bot sends": {
                  target: "#/set_personal_working_time.Chat.4027381",
                  reenter: true
                }
              }
            },

            "User has to join meetings first": {
              after: {
                "500": {
                  target: "#/set_personal_working_time.Chat.3745834",
                  reenter: true
                }
              }
            },
          },

          initial: "Check info about the User"
        }
      }
    },
    
    Environment: {
      description: "- Definition: \"Chat\" is a private chat or Telegram group without topics or a topic.\n- Definition: \"Period\" is a block of time.\n- User and Bot are members of a Chat\n- The Bot may read messages and respond in the Chat\n- The Bot username is <bot>",

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
              description: "Here's your schedule",
              on: {
                "always": {
                  target: "#/set_personal_working_time.User.Idle",
                  reenter: true
                },

                "User taps red button near the weekday": {
                  target: "#/set_personal_working_time.Chat.Add the day to the schedule",
                  reenter: true
                },

                "User taps '-'": {
                  target: "#/set_personal_working_time.Chat.Period removing",
                  reenter: true
                },

                "User taps '+'": {
                  target: "#/set_personal_working_time.Chat.Default timeslot creation",
                  reenter: true
                },

                "User taps green button near the weekday": {
                  target: "#/set_personal_working_time.Chat.Remove the day from the schedule",
                  reenter: true
                },

                "User taps on interval": {
                  target: "#/set_personal_working_time.Chat.Bot writes the interval in user text input field",
                  reenter: true
                }
              }
            },

        "Default timeslot creation": {
          on: {
            "Bot creates 23:59-23:59 interval in the table": {
                  target: "#/set_personal_working_time.Chat.Bot writes the interval in user text input field",
                  reenter: true
                }
          }
        },

        "Bot writes the interval in user text input field": {
          on: {
            "User input: <bot> <time interval>": {
              target: "#/set_personal_working_time.Chat.Waiting for the user timeslot change message",
              reenter: true,
            },
          }
        },

        "Waiting for the user timeslot change message": {
          on: {
            "User changes text and sends the message": {
              target: "#/set_personal_working_time.Chat.4253713",
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
            "User taps 'Cancel'": {
              target: "#/set_personal_working_time.Chat.Cancel changing interval",
              reenter: true
            }
          },

          always: {
            target: "#/set_personal_working_time.Chat.Retry changing interval",
            reenter: true,
            guard: "User taps 'Enter again'"
          }
        },

        "Cancel changing interval": {
          on: {
            "Bot deletes #4266726 #4162417": {
              target: "#/set_personal_working_time.Chat.4027381",
              reenter: true
            }
          }
        },

        "Retry changing interval": {
          on: {
            "Bot deletes #4266726 #4162417": {
              target: "#/set_personal_working_time.Chat.Bot writes the interval in user text input field",
              reenter: true
            }
          }
        },

        "Period removing": {
              on: {
                "Period is removing from the table": {
                  target: "#/set_personal_working_time.Chat.4027381",
                  reenter: true
                }
              }
            },

        "Add the day to the schedule": {
          on: {
            "Button changes to green and schedule displays the active time of the day from the database if available": {
              target: "#/set_personal_working_time.Chat.4027381",
              reenter: true
            }
          }
        },

        "Remove the day from the schedule": {
          on: {
            "Button changes to red and schedule does not display any timeslots in this day": {
              target: "#/set_personal_working_time.Chat.4027381",
              reenter: true
            }
          }
        },

        "3983414": {
          description: "\"/set_personal_working_time",

          after: {
            "500": {
              target: "#/set_personal_working_time.Bot.Handle the command",
              reenter: true
            }
          }
        },

        "3745834": {
          description: "Reply to 3983414: \n\n\"You have to join daily meetings first!\n\nUse the /join command.\"",

          after: {
            "500": {
              target: "#/set_personal_working_time.User.Idle",
              reenter: true
            }
          }
        }
      },

      initial: "Previous messages",
      
    },
    
  },
});
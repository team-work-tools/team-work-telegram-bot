import { createMachine } from "xstate";

export const machine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QHpZgC4H0AOYBOsA9gHYCGANpgO6F4DWAlsVJugwLZgB0AqmnlwCSEcmADEAZQwACXARIVpNekyjS2nANoAGALqJQ2QrAZsSBkAA9EAWgBsAVgDMXAOwAmOwEYAHA4faDq4AnK4OADQgAJ62QVxO7g4+ACw+3slewY7BAL45kagYOPhEZJTKjMysHNwAQoToXAASpMQiYOoAFh0AxoTs7K0QXADC3T100kwAZoTSpABGhACu6F0dfPhiOvpIIEYmZsQW1ghOdllc7sHBydquacmuCRHRiGFcDr7OyXZ+gYE8gU0Fg5KUKNRaJUWBo6g1mkNROtpH0BkNRuNJjM5osVmt0N1pJs8NsvLtDMZTAxzHtTncnA4uCl3NpkudPCEvHZIjEELcuMkHO5fF4vK4vO4fK57kCQIVQSUFOUoapqpwuPVGi02kiCb1+oM2rx+NJOqRYNIAFaEJiQaScDCqWBiTXSNBtWA7CwHKk00CnLzabzxXzBQNc5KhP48xBPZJcbRpILisVs36y+XFeRlSEqKqwjXw7XtZGow3DYmm83qObWpj2sCO5gW6YMAjoMSWWDoUjobikaZ9vAACgC2gAlGJM2ClbnoWq4VrER09SiDejK2aLehazbiA2m1AW23u169j6jidEKK7PGxSzgk4fNonE-XDGEL8Ez4fE5E8-fHcDxEgzEEs3BZU8xhGouAAUWIAA3NsSE4YgO0rQhcGIbdCR6M10DPClDmpY5aVsQMngFP4nF+W8fHcJwwg-TImQ8RN7kydxUk8UCihnHMKlVAsxl7eJXEFX9kk7bte37Qd8FHbQJynMD+IhQT8xgkTGkYiSaMI-ZKUvMiEBsDJgiZG4fxFcTrgcbk3gQYUxPcYU43-C5cnyOVVMVASVU09VtPiYJJK8KSux7PsuAHIdFOU6c-PUgLoKC-CQrC5IDIvEirwQCVPC4Ow7CfX5tGuB4nA-ew7C4LIQjc1zfxlbzEuzZKoIXDFRLuICny8MQKCoUgok9PRvSM3KTLM586pSLwvl6rkuI-ZJkncLgbw8Yrbnov5XF4hV2sg+dhPS3rnh8AbKx7bALTwO0FlWHd92IMBSDwZEqEbOgIBG7LJr9Kxr1-BM7HK0UHweJ5VqugUlLucSUifFJDvA2cNNS7hgou-qxBu0g7ukAByGxiYB4igdOYJWSZBIuV-P9RVCj96c2x9pUCJJtF8ZI0bUk6hK087ysu66TVui1iYAanJ8bz0B0j-VjVzNtZIMwx5sVXl5EJGXuJInlfDwwz51rfOOuchbSnrRbxgmiagB6wH3J70Be6Q3o+r6fr+qIKd9JXgacxI6dCbXirsLjXAc3lJVqwVioCUJfludx+aSwXAuxkW+qu-GJcJi0SCmND8AQigA+M5WEGKlx-E86UnwSVx30c38LMfLJfh8G5WScLzgT4zOrez7rGnW5xxScbZ5aIwO8uFUGf3BoN-ElVl3GYlkfCZBwsmjl4sicDPLcxrqccSRivBnzQyQmymg9OTwMgTHmX2lMNmVj68d73g+jaJGPqfCCo8sbjwFJ4Ow20C74HUEXEmPRWg9DAOQOW5JDKPzyn+Aeb9oEDylCVBwgpmJCi8JtYqbIgKtzCFKEBGMUoX3OlAmBDspYuyHPMKApAmDoIfgvEyiQUhUVZJdcUMc-CkPKp8POvhGI0wSPQ-ynUzqiQACJgGmKQZY5B8Q1FgOQBoKIHq9hIi6IxPQTF9gtAxBA+8bC2P3qXIcFdyCl2RD2BYogq5TRrn+WqnEgjLW0I+JIzFAjxlNqFdaITrheCUR1U6wtRKuioHgUwcBkRMBcYoesywJZgEsGsJg2BVjSFbKgiAsDPolNWAgaQAAeJY6AAB8jTYTOPLhQFpPiqbXlFK4T4YQHxBGIVdcJ0D4iG3vOJMhdgElZ3AcFAA6jwtgzBym0GRPkuBsIDEWLNMwDonBYCwFIDAapKJDkwG3IUtYQw3QuwgDhY5cAzkwF6U-EGXwriMwuOcS6MNHKBmePELiV0kyRnBmbIeR1QHn1UY0ESzBVAeMJrgCAnS8CuPMWsPCrQbnwOwBirFrj5g9D6HgCAqKdzSB2XgYmFoTnvI6A8iAqCMCZLEJPa+ThPl5QWiyK4Y4Frc18MxBkG1W7g3CsQ28LJ4nm2HmfRhiLRjINQVcglqLsldPILi6Q7LRDWOkNylhnhTUZCjhkVw-KTJ-iDEyP4SQhTEPOD-fK0DarrycAte4kpUgwp8sq+FqrkmNAAEoYDwFELVKKNm6uxRQA1RrOUWjNcVbalrlo2rtTXK+ATj4FVCrM5IzESq71CEEYIoyb6OAWWAphokAAK+BqSYoeuwQgSFmBiFbekwgmKGD3TAF2ntahph4H6GirxYA83BworVMIxDpX0Qhl4VmwQNo1u8OCmt-hGINoReGrgABBCAmLVx+xrMiWAeFIA6PELUZ6Jd8VHO3HMJ2jZ9wPLvd0CAj7DXDuwOQEaLzyVsAQiuGo0hCDTGRNeyd06r29kWOaDoDB4OkArgwUDs752nBsFychSlm7ZBKq+H8H5nBLrSOCwNSQj1hptpG0d3aVyEkQ1O9gt770AdEC6F9+432EtpQ9TFv6+OAYgIQTJxAjHUtgCBka8xiCxr2YY9AFp6wEmHYa-6c9MECJrgtK4XEgyJ0lAyeyOtEAMm0AKaybIgw8ylEGtqoaVEnp5dPbY7gME5T6U5W8JH36MRCbzTw28t3-0cCkZ44U8jeXk+y+AewPMMK85wfh1dg5EbWi4TWjhUhbp-AyaqLc1b0QZOtRIrkT5KrhZlpJ6piQ5d8Xl58jJEjiPvPcBR1VJnXEFIkTIsTwbp0a+jZRLXuDEiEO0drQWbBhEGT1sUfWQgvmYhZKUrkMgjZfJkBaTGsuLiW18s4YzPhPH3jQmiRtqoMU7laoUIRxJR3mVNgWjaCyagRDqDj+o0RtAu9g-e3rbuhFbg9541VBVuHEqFJIA8GKRgOt9kex71T-eLLqXC64jRjDABMUusx5hLDKauNrCssH2oeA5tINa7gSW+GWxy9hGTg2as+J4kMMewum4k62i4AcllXGWDcJotxWj3HaB06yjxg-tbeeMK67sw7WnD4FoU6rlX8Mu2y4kGuC5+9j0XeOgdrhBxWaX1ZaV1n3Arp05STzoGV34+qRUrq+GhhDtaH4oGfBfFuv1Rtnindm3BRCyFiCoXd7T4zeWb41rqoGYrvdJS-ls6ZerTJYl+slE3AXwamszZF+PD3eWgLkL6q+a4Upjtbw55xEK9wJsMRRxHzHKqzsQN0ij5IVfTjEIc84Zw1kgJcV+BKhMdxwbOF9S+GzkeK-BQITRcKw-ECuQsrRcfXIviJgDxzm4ApdoSl0iEkqJeMvl7HjjO2V1t+13FFRBIdd6I1-Z7yO4Fkk5cQtxRxSh0I96eZR6XxTw3wv6uTShgxrTXAIzxYeqBiFR-iuTEI0zPgXC34WzgFr7MKZqeAwHpCfDWaighIvhATbygphAXC8w1phBPir4P7pTNoPRIQrBMpvLnJwAv4OIMRXDPD14lpN7N68hEaBBmZ-6o63C-CKqm5Y7MY5zqKaLaK6LqD6KabGLvS5aBaXZsiDJBB-hCjyKsjQJty8g0z-6+rrTiTrTeC+AsFLLpSpLpImqriJpkp5IFJFKlylJrAVLkAQAv4phgxig-iZ5hAbrAqJj1xBjCjijeAdwODOFNqNCrJUgbKzCfSrj0qaEnLaEiavKnK8Ev7hTrRp5Xy3BBi+4TKDIMjzQeCzJLxpFqrIpQA0qEi3QkpeEUAwFjYJj7xSh0GBA0ISpCiI4yqCi-DrRtEnojAapuIiY6plxJrkAv7oEbQSitx+DSi9zbTlpKRuApAlS3jNGvjuZ4HNYEGiRRroAxpxqdEJprGuIwH2Rj4rx9wJCBDBCkLgxXB+rQ7hQbwm6l5C6LLpFcD9rtrSCdrdqqDlE7EyL9Z-gpA-jiF2Z-i-ISj7RXQPgMjzEsZnoXoIYqa0qrh-oPqiD8ExaBgvghI1qJi7pVSOSpDkJ3DqxIxsgYm4Eho3GsF3FsZQZkmxpIY8aUlSY0mJ65aEb8iijNy77yJhA-474hBuD9RJzEL7yJhJY5BAA */
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
      description: "\n- Definition: \"Chat\" is a private chat or Telegram group without topics or a topic\n- User and Bot are members of a Chat\n- The Bot may read messages and respond in the Chat\n- The Bot username is <bot>",

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
            guard: "User's message is in the correct format'"
          }, {
            target: "4266726",
            reenter: true,
            guard: "New guard"
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
            "User taps 'cancel'": {
              target: "#/set_personal_working_time.Chat.Cancel changing interval",
              reenter: true
            },
            "User taps 'enter again'": {
              target: "#/set_personal_working_time.Chat.Retry changing interval",
              reenter: true
            },
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
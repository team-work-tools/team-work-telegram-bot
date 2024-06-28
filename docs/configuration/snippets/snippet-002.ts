import { createMachine } from "xstate";

export const machine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QHpZgC4H0AOYBOsA9gHYCGANpgLZgYCWxUsm6dNAdAKpp7sCSEcmADEAZQwACXARIUJNeo1gTWNANoAGALqJQ2QrDqsSukAA9EAWgBMADgCs7DRoCMAFg0BOF589uAbAH+ADQgAJ6I1gDMAOzsLjEuGjExbi7+trZRtgC+OaGoGDj4RGSUCqxKLGxg7ABChOjsABKkxIJgKgAWnQDGhFRUbRDsAMI9vQDWEgwAZoQSpABGhACu6N2d3PjCmjpIIPqGxsSmFgj2bjEa7PZePvbX0d6hEQjW9i7sDq4J3p6ZNz2XL5ECFLDSUoUai0SpMaocBpNVrtISbCT9QbDMYTaZzBbLNYbdA9CTbPC7Fz7PQGIx0EwHc6fFy2dhRWLuWwaLIxOyvSKPW5uazXFxRR6eDQfPIFNAQkqycqwhjw1S1JEtYZokl9AZDdpcHgSLqkZQAK0IDEg8mVSmESIkaHasD2piOdIZoHO1g0UU88Wcnhi-kSqWFUX5CDctn9-msbjS9nsHMCMrBcuKMjKMMUqpq9UamtRnR1GL12PJxtNKgWFoYNtzylmdAI6GEZlg6FI6FqpFmPbwAAo7hoAJTCcGZqFKxsI9WFlEddGY-UjSsm5ToWuW4gNuFNlud10Hd0nM6RB7sTzs7IxT72a8xSMir53aMuawuez+B-2NOTyFFRzfc53YABRYgADcWxIGhiDbStCFwYhN1JXoTXQY8aWOelTkZKwxR8K8PCiNxPBDOxYhCcIL39Hwf28JINB-R4QVlIpAOzCoVWYNUcW7NlUmBUj207bte37fBh2cccAIVLjbTzDhxgE2IgSyNwsMOWkz3whAXCI5wkmsTwfUSfxyLcZ9EnYMjbGDWJPEuGIon8f8M046FuKqPiVKaP0NPcUSux7dg+wHaSxwnDz5K8xTePzPy2QBUj3C009cPPBAHNshwgT8O4LP8FxIzcVz2BFKJkkuDwfz9dyONimcQN8jDbKlFzbBcYQKAAd1IMIXW0N0dMyvSbFMq9vH8KIfWjOwysjfxnAqu9Cum5Jioa+Uszi2dWoEjxKq64RKy7bBlDwa0lnWLdd2IMBSDwdFetoSYIAG9LRs9cwCJDNkHy5O8DISH1rEjLJ-T8Z5Ew0YF-Dc0E5N25qeNApKjs67qztIC6JAAcksfGvpwn6mWW24UilJN0lsMqrJohBbHjJw0goh94x-RH2J26dgLRg6mkx7JsaNc7lCgK6wF3G70DuiQHqel63o+sISY9PCvSsW9bKqpJrjjONfAjRmkjFK9k2ZlIPATXxtqnIDvKU2oMY6kXTrF3HlHxgBqYnhpPb7Nd+95ZviVJPzIyVmVsSMxVceIE2sBGTMScUontzzUZ8xK2uFk6cbxkgZng-BIIodXdK194H3YCzmIeD9xQCOOfC+Wagc7n0XEzpr+Zz5S8-SeMEl2APsI1rLPy6tlk+-G2LKBBm3hZOGKpM8jeRc3lgV7lH++d-iheHtIYkpaltNJ4PvRmm4Picr87DuOm465RxrA3ijt4+Nj00a-enYJUHodP4cZ7Ae3wCoL2BNehtF6GAcg-sL4ZTJpEYMNwjZVWTJ8IMyRnxwziNbIGdwP52BiHvPmgD0ZDxiORD4EDnriwJtLAciwoCkAYEgkaV8sqzV5OvD4T9owJnZPghM8RAhXGKt4Dwf4kYxQAfFahh0PgciiGPZBQcp4fjvszBI3JlpXFSHHVy-oshxiiB+MGzhyHyP-pQpRgtbKqLTufbhk89LJw0G4eI7hAiuAyNyExth-DsGuF1BIpFLFfgoY7RxucVEI15P4BhUC8b41gcQeBiDK5jWrgtHxrFmaA0COKOOxUMEI3cJKbewZf7IwcftBJQtk4URSYXb2LDIGkHYZw3JqCECzRZO1bk3jfQuWTCbFeFS65VLIskWIKRYkKSacApoDpep4CMHAEuEhVhizAGYDYDBsDrAkM2BBEBUknPWAgCQAAeFY6AAB8Dy1QlwHOXcgzz+nX0QCE9uhtTII28aZTwrdvCz07skZmgZll7Ras09gAB1DhcJzmEEYaSfZkC1SwHII0DEJpGCdBoLAWAPSRCVnQm0GAm5DkbGGI6aWEBUKkrgBSmAvysq02sPEUi5FJTJDKuC02c0wmpGvECB8KVuZ-15nE1ZLs2oqUYCqdE51cAQA+WXCg9pCU0pJZuXGWqdV4C+YsXo-Q8AQHVVuPZPB8bKDJZyzoTKIAIIwDs4Qwpkxp25XpJIVU66+G8CQr8XJwam3mbZBMlwfCzWsPC7Oh8kqjDgQgoltL1UME+Xqh0HqhA9mUD61pySJA+pPgkAN+SgaJxCfGIMy07zURXnUpwdNvAOThuyORPMHYrMRWs9gAAlDAeAwhZrVYwM1Xz9UbELV6ktwoknJwrWzEeMQa0h0sf9IMjxt7kWZrHU2d4+UhKqmVR4cNJRuGTQfIByqBIbK2cWjVYAqDYHIOJXZOLGEMpLqcjYFzyBXMrDc4DdBLl3MeY0V5ngEDOEsAkRDGht3nBkbrPwy0uQAj8eUmMsyDIODFDGXw9SFGNKHU+poqK6QzvmFizof6VA1HxQaq63ZcI2nJZS1Jhq6UqAA0yp0rL0QuspehxAkSoisxciGAygQEbL2k9cWT5kEydt5KZWx-as4PuUU0PgpdzVyFIBAW1jBhBPMWBZ5QubdXkF2ehAw0sJCq0WO0dznq32VrjKfKT+k-G+NaSLHwLlX4UzKtEGaXUyIxLsQqwdAskXpqyZm8zlmoCzvzYSxdvmN2n3XaAj4gWRTJH5UGFkLICoJGfPGVk7JUjeM+GkeyGdEsDoRSl4dY70ATts1lnL5B53eaLd6wrCRiu0LAYFxNPjAiMXvptKZkRPw3HFJkR4pTmbsnvVQpxAAFfA9JtVXSoIQaCVnjtbMINqugl0P2XfVbMPAAwNXLCEIFxebJvHRiEuKGpENrxOBSEkOM4XRT7ficOgAghZ9EHn7WllgOhSAqwhD2lusXATOz7WS1oLuETaOIAY86La2AX6BpsstawSCJYagSEILMRHA1zlvaoKzrsSxTSdDoCz0g5c6DfqWF98el8PHV0sItuu8c7yuVcDCyMpkfFAlMcbKqwLodKqPqOp79PWeTte+9lHJOydY7ljj4lgn7VXW1cTnopO0QQEIDs4geWHtU8nW0SdeKCXoHs7uEkD33OfXFygv5CAbDJl+zCx4jkGv2DjskDBBlozXhDNEu9aZ3cevgAcBpirqPuKriHZDSSQ2pC-GRSR9lIw2HFFeVKpl2QxkXrp+VXWU2PsNPgEveSy8GTvMlP0gQQmfBSFGt47JCkhgibyWIVFtfUd77wAQQh+8DOQx+OIfpR-Rh-AkXkpVPxhNIs5Jy14uQ906-pg7+YkSb8jzXm40ZLbCO7k+Rm2-2rZF7dyMqGacUZfHrecZELUEsNCcsdoJ-LKEcVkN-bID-VwL-N4YfYMSiIEGIEJSNG-PTPue-REBcCA5caAkYcYMAKYEueYRYFYM5UsckWAvSewF8JwWLVyKqLqOMcpPlMFemCfcrbAkAgeMAosJcUsFcCsI0DcCQOsB6bVQBJg6uZyHxDg7IaGYjVtRAbIRwLqZmJyJMBGA9YQw+DURcbUKArEA0dcase1OQvcHic5Q8dAJQkOO4b8XKd-OmT-SMWaf0bIGaH8NTWhDwDvQvZLEQ8CKCGCYgOCFwwOHhcadIIiCyKvS4Syf7evTkMJEMIECpdkZOPwEwnvPyVw84SwRIL4BaAJL8MBLICGG4MUIqYEa4JMLqTwYowzQSdSUiMo6TMURwCyKqVOVeWaFTfSf6KqWIKUcHH0ZIJNW-AgmHGjZKQKNwPo-ST4eISGR4emOMZiOOIMXxPhLwVyDmK4TopxfOFwDYkUOIT8EFPwdkVI0RRmTIUJLwa8Tec-LaRYxRHXDGKtGIW4n0D4z8FyBaD4YUcY9If6TISxVyVOfQy4pFU+OhewW4rIDBMiEUI6ZIrQ-SOmQY3bdPAA0iFE4dX1NRW49IWTGMKk78B8FIVuOMCqY2GxAFYqbPfA-4lfDGMtZOTE1k+LBwNOCJOOYUPlN8IMO4oMO8CklYw7K6aCNYZ1DlSlfPCeUvcohGWTao5I78H+VbfSGyTIAEYSWIZOAyBU3XF9bZQPB1XFADCDJwy5DY5MPlH4gwr8dkVwOOcVFIQqT8MUPwX0G0pKOjdFRjdEFjP3A1a3dlXjGADYgyAEOuOGFkYMf7eMVA-oyFDuH0b8IZYwv4qjUA3XVVKAO1UkTVa0BzUzcgFM7AvlAIHTFggqIJU2O4QhMqeyeuOyC40sovcstNDNJzATHNEzL5TE5OCVQEZiQJbxKfaTDIHxdIWheMLwMqP0MIyjYcyIpKPrAbCcmdes6chIyXHdB44iHM0xFkEMAjWMYqJIQEN8IEcMtqO0t9UsHsT9b9HsX9A5I5QDM5EDCAd06IWyLmU47IKUIEcpXwOuRZPhT4EMR4D8gSSMl7TFGMsWNjf3DETjE4HjV1FM5OWTZIcjJOWC78R8ojSxQokyRkjCozKcszCzFUW47kc9VycJKRAEAklkS4SmeYjIbA2C7kzvO-ZYisscwbScvNRsi87UtBdkWNS4IqO8ZwZc94MUQpB8KJYELqWaFivXfrb3Di08tipSrUgfc4WaDIdqPwJ4mxeMZ8JuK8TmcrIIu40ym7U7CQc7Z7RgDYq2XKaINIK-ZmH8CGFmbxVeVwAIYUFkUy+HbVUsJHBYU3R3MnDYywb8G4FyEU5iEqg4t4v0G8lg-RJeEyociI1NNqMdC7A3DKtnY3TnbK9HDfZSuyqwYqPlJ4GFLEreJPU2e4AGWhBIAyX0rIPIPIIAA */
  context: {},
  id: "/set_personal_meetings_time",
  initial: "Environment",
  states: {
    User: {
      initial: "Idle",
      states: {
        Idle: {
          on: {
            "Set personal meetings time": {
              target:
                "#/set_personal_meetings_time.Chat.3983414",

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
                  target: "#/set_personal_meetings_time.Chat.4027381",
                  reenter: true
                }
              }
            },

            "User has to join meetings first": {
              after: {
                "500": {
                  target: "#/set_personal_meetings_time.Chat.3745834",
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
                  target: "#/set_personal_meetings_time.User.Idle",
                  reenter: true
                },

                "User taps red button near the weekday": {
                  target: "#/set_personal_meetings_time.Chat.Add the day to the schedule",
                  reenter: true
                },

                "User taps '-'": {
                  target: "#/set_personal_meetings_time.Chat.Period removing",
                  reenter: true
                },

                "User taps green button near the weekday": {
                  target: "#/set_personal_meetings_time.Chat.Remove the day from the schedule",
                  reenter: true
                },

                "User taps '+'": {
                  target: "#/set_personal_meetings_time.Chat.Bot writes the template in user text input field",
                  reenter: true
                },

                "User taps on interval": {
                  target: "#/set_personal_meetings_time.Chat.Bot writes in user text input field",
                  reenter: true
                }
              }
            },

        "Bot writes in user text input field": {
          on: {
            "User input: <bot> <time interval>": {
                  target: "#/set_personal_meetings_time.Chat.Waiting for the user timeslot change message",
                  reenter: true
                }
          }
        },

        "Waiting for the user timeslot change message": {
          on: {
            "User changes text and sends the message": {
              target: "#/set_personal_meetings_time.Chat.4253713",
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
            reenter: true
          }]
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
          description: "Reply to 4162417: \n\n\"The time period entered was in an incorrect format. Click 'enter again' to try again.\" \n\nThe message contains two buttons 'enter again' and 'cancel'.",
          on: {
            "User taps 'cancel'": {
              target: "#/set_personal_meetings_time.Chat.Cancel changing interval",
              reenter: true
            },
            "User taps 'enter again'": {
              target: "#/set_personal_meetings_time.Chat.Retry changing interval",
              reenter: true
            },
          }
        },

        "Cancel changing interval": {
          on: {
            "Bot deletes #4266726 #4162417": {
              target: "#/set_personal_meetings_time.Chat.4027381",
              reenter: true
            }
          }
        },

        "Retry changing interval": {
          on: {
            "Bot deletes #4266726 #4162417": {
              target: "#/set_personal_meetings_time.Chat.Bot writes in user text input field",
              reenter: true
            }
          }
        },

        "Bot writes the template in user text input field": {
          on: {
            "User input field: <bot> 9:00-17:00": {
              target: "#/set_personal_meetings_time.Chat.Waiting for the user timeslot creation message",
              reenter: true,
            },
          }
        },

        "Waiting for the user timeslot creation message": {
          on: {
            "User changes text and sends the message": {
              target: "#/set_personal_meetings_time.Chat.4162417",
              reenter: true,
            }
          }
        },

        "4162417": {
          description: "Expected message in '<bot> hh:mm-hh:mm' format, \n\n\ may be incorrect format",
          always: [{
            target: "Interval adding",
            reenter: true,
            guard: "User's message is in the correct format'"
          }, {
            target: "4179625",
            reenter: true
          }]
        },

        "Interval adding": {
          on:
          {
            "bot adds interval in chosen day and deletes #4162417": {
              target: "#/set_personal_meetings_time.Chat.4027381",
              reenter: true,
            }
          }
        },

        "4179625": {
          description: "Reply to 4162417: \n\n\"The time period entered was in an incorrect format. Click 'enter again' to try again.\" \n\nThe message contains two buttons 'enter again' and 'cancel'.",
          on: {
            "User taps 'cancel'": {
              target: "#/set_personal_meetings_time.Chat.Cancel adding interval",
              reenter: true
            },
            "User taps 'enter again'": {
              target: "#/set_personal_meetings_time.Chat.Retry adding interval",
              reenter: true
            },
          }
        },

        "Cancel adding interval": {
          on: {
            "Bot deletes #4162417 #4179625": {
              target: "#/set_personal_meetings_time.Chat.4027381",
              reenter: true
            }
          }
        },

        "Retry adding interval": {
          on: {
            "Bot deletes #4162417 #4179625": {
              target: "#/set_personal_meetings_time.Chat.Bot writes the template in user text input field",
              reenter: true
            }
          }
        },

        "Period removing": {
              on: {
                "Period is removing from the table": {
                  target: "#/set_personal_meetings_time.Chat.4027381",
                  reenter: true
                }
              }
            },

        "Add the day to the schedule": {
          on: {
            "Button changes to green and schedule displays the active time of the day from the database if available": {
              target: "#/set_personal_meetings_time.Chat.4027381",
              reenter: true
            }
          }
        },

        "Remove the day from the schedule": {
          on: {
            "Button changes to red and schedule does not display any timeslots in this day": {
              target: "#/set_personal_meetings_time.Chat.4027381",
              reenter: true
            }
          }
        },

        "3983414": {
          description: "\"/set_personal_meetings_time",

          after: {
            "500": {
              target: "#/set_personal_meetings_time.Bot.Handle the command",
              reenter: true
            }
          }
        },

        "3745834": {
          description: "Reply to 3983414: \n\n\"You have to join daily meetings first!\n\nUse the /join command.\"",

          after: {
            "500": {
              target: "#/set_personal_meetings_time.User.Idle",
              reenter: true
            }
          }
        }
      },

      initial: "Previous messages",
      
    },
    
  },
});
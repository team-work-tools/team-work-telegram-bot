import { createMachine } from "xstate";

export const machine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QHpZgC4H0AOYBOsA9gHYCGANpgLZgYCWxUsm6dNAdAKpp7sCSEcmADEAZQwACXARIUJNeo1gTWNANoAGALqJQ2QrDqsSukAA9EAWgBMADgCs7DRoCMAFg0BOF589uAbAH+ADQgAJ6I1gDMAOzsLjEuGjExbi7+trZRtgC+OaGoGDj4RGSUCqxKLGxg7ABChOjsABKkxIJgKgAWnQDGhFRUbRDsAMI9vQDWEgwAZoQSpABGhACu6N2d3PjCmjpIIPqGxsSmFgj2bjEa7PZePvbX0d6hEQjW9i7sDq4J3p6ZNz2XL5ECFLDSUoUai0SpMaocBpNVrtISbCT9QbDMYTaZzBbLNYbdA9CTbPC7Fz7PQGIx0EwHc6fFy2dhRWLuWwaLIxOyvSKPW5uazXFxRR6eDQfPIFNAQkqycqwhjw1S1JEtYZokl9AZDdpcHgSLqkZQAK0IDEg8mVSmESIkaHasD2piOdIZoHO1g0UU88Wcnhi-kSqWFUX5CDctn9-msbjS9nsHMCMrBcuKMjKMMUqpq9UamtRnR1GL12PJxtNKgWFoYNtzylmdAI6GEZlg6FI6FqpFmPbwAAo7hoAJTCcGZqFKxsI9WFlEddGY-UjSsm5ToWuW4gNuFNlud10Hd0nM6RB7sTzs7IxT72a8xSMir53aMuawuez+B-2NOTyFFRzfc53YABRYgADcWxIGhiDbStCFwYhN1JXoTXQY8aWOelTkZKwxR8K8PCiNxPBDOxYhCcIL39Hwf28JINB-R4QVlIpAOzCoVWYNUcW7NlUmBUj207bte37fBh2cccAIVLjbTzDhxgE2IgSyNwsMOWkz3whAXCI5wkmsTwfUSfxyLcZ9EnYMjbGDWJPEuGIon8f8M046FuKqPiVKaP0NPcUSux7dg+wHaSxwnDz5K8xTePzPy2QBUj3C009cPPBAHNshwgT8O4LP8FxIzcVz2BFKJkkuDwfz9dyONimcQN8jDbKlFzbBcYQKAAd1IMIXW0N0dMyvSbFMq9vH8KIfWjOwysjfxnAqu9Cum5Jioa+Uszi2dWoEjxKq64RKy7bBlDwa0lnWLdd2IMBSDwdFetoSYIAG9LRs9cwCJDNkHy5O8DISH1rEjLJ-T8Z5Ew0YF-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-C7-ePZRw07irRHfJD7WdVbjOCPCJDCJGwV6r7ZwwoKpNDVpXTQRrD0pvLnJwCv5YaTLB5W5h7CTaw2SZAAjCSxBGwGQP6b7qKaLaK6InJKZGKPReYZR1ZhwVSuAxIJjJjuDTpGzawxYBjwwYJBbEFJSpLpL6qlgaoYq5K7g0oqB3KlylIbAVLkAQAoH2RsgGSWaJxeCUJ-4gph7v7TrXD97gGDxVp0arJ0jhrzBbKkiSGKYHK4qvKnJIGv4GTz5wyiJxhswBDArWCgoIxxjBgzI+D8HwrXKUqkjnSEqiEuJOGSiTbRI0zZBeCmQO4sgSoIxSofDCqmyGHPYG5JRKrEAIKuK8bqplxiHkCv52DuC-LRjTo+CMKkQd5JhsiuTBjLzfjchBECSBroDBqhpQAlE5LlF14pbnD8J0xToJC+hSjl5AoJwFTO4QqAzRDJhZE8xr6JIVaD7tr1oSCNrNoqiv6py5Tf4+DZDMw-gQwsy1FciuABCdZsTlpe7r6bGP7sB7oHrMayZUqlivrnpCAoHtEkKkQerMSgnt6MyQzESGyTExazSdFNCBp9ofYaYhqQbDo-HCb-HDH0Ff4kLTFFZVS8h3hmbeAAzSKB7si9z2Y5BAA */
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

                "User taps '+'": {
                  target: "#/set_personal_meetings_time.Chat.Default timeslot creation",
                  reenter: true
                },

                "User taps green button near the weekday": {
                  target: "#/set_personal_meetings_time.Chat.Remove the day from the schedule",
                  reenter: true
                },

                "User taps on interval": {
                  target: "#/set_personal_meetings_time.Chat.Bot writes the interval in user text input field",
                  reenter: true
                }
              }
            },

        "Default timeslot creation": {
          on: {
            "Bot creates 23:59-23:59 interval in the table": {
                  target: "#/set_personal_meetings_time.Chat.Bot writes the interval in user text input field",
                  reenter: true
                }
          }
        },

        "Bot writes the interval in user text input field": {
          on: {
            "User input: <bot> <time interval>": {
              target: "#/set_personal_meetings_time.Chat.Waiting for the user timeslot change message",
              reenter: true,
            },
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
              target: "#/set_personal_meetings_time.Chat.Bot writes the interval in user text input field",
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
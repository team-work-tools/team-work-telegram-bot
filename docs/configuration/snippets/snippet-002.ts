import { createMachine } from "xstate";

export const machine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGUwBcAEB3A9gJwGsBLAOygwAscBXPWAOgFVYw96BJCAGzAGJVMuQqXJVasANoAGALqJQABxywiaIjhLyQAD0QBaAKwBmAOz0pRgGwAOI9YCc1k-YBMUgIwAaEAE99JsykPI3drA0cQg0sDAF8Y7wFsfGIySho6egAhHDR6AAkAQxJuMAw0ClKAYxwAWxqiiHoAYQrKggxSADMcDAKAIxpMctLmVl5pOSQQJRU1DS1dBCt7A3oTIIAWGyl7UKkw7z8Ea2s162io3ZcTF3dQuIT0JOFUsQzs3MLinjKKjGq6g1mq12l0ev1Br8Riw8ON3JNFMpVOpNFNFhsLKtrBs3BsrC5LM53JZDoh7Bt6BsDLdrHcTO4XE4pCYHiBEkIUqJ0gwPvkGj9hv9avVikwYZQCrAMAArHCkSAYGpgdAiWC8D4YPBgBRcIhwCZaGbI+ZoxCWRz0KKmVzWZkY9wmUkINynFxGa5GKQGCwrQmWVns5IiNLiLI5PnfUqCgEixqjPASqVoHqy0iK5VqMhSzpEOhoXjaWBoApoMD0AqdUt4AAU3qkAEp+E8OcG3jzw18SlChYDRfHE2UU3KSOmVVmMDm8wapka5qjQIs7pYKQ63PY7BY7I7fIgtuYTp6Th5rNcXC5YvE2c2g69ufQAKIkABuuY0SpI+f7OAUYBISb+lQUCW06IrMKILPo7g7FI9C0vYJjYhsrjuOuRhOiYFIbKEWFug6truCEAbXi8XKhi0Jb0KYVK2BsBZFiWZYVlWtZBI2gYkSGGTkbkVEGDRIHTEic4QQghguPYlFIVR2GoduRwGBS1IOpYlh2AyNLWERgg3qRXFATxERYbRhbFqW5aVqwLENk22kcW2wIUUYhnuBsAmzuBpoIOplj0CpdhbFI4kIWhO6iSp9D2ISyE4oynospe7GcpxDDcZSgUmGpvAFFwWAFD4kiyIaQkeQu+gbLaEXYu4BguYFxIuBsTobDi9BLjcKnkieNjxY8tlJfZqUYh6tK8P2CharALBSlqEAYH01BoMmI4kGABQJoKWDKgQEB5W5xUmqVXmWC4vniSe7q2s4qkkqFl0RQYNw7FhxJdVpzz9Xeg3pZlY0TVNGAAOTaADe1gQdOiIFBx3mMSBjhPYHherSTqWF69AEgSdyXSY4QXr172tp9+lpcN7ijeK41wP9AMANQg4VM77fOEMIFErqeg6NUeNEGVOnc4QRZ6UjLpYsMEZpCXER9ZHE0NGUjb9VNwBgUBar+c0LUtGArWt3abWA227QzoHGszi7VZRDrEji5JbPB1hOt6Emeqp54PQ4TgbD1V59YTMsUXLP0U39ytFB0H6sE+2Wg6bIkmOFzg3I4qPnCEfM7EYlr7FhXo7OabpvS2t7+7kOLGPSRjjMbglg2biBnmE5jRPBAXkpFfO3Ip8dw6YUjlUYGyFzpyUOaX56mARcIIjXseedcouURXGUBHYTkdy5lrd+Xfe2KYQ92UTAcEoSBLk6wGCU5NysA00RSVGAXD09P7ng4segEiuGID05KkKe6TVIXRg4B6jIVi2BQnjH2BNi56SPipdqVdn5MxEuebElJUZey3MpA4oVqqBUtKTWwzgLAuH3tLWBuQAAiYBOgFGoFwIYRAlSwC4Dkf4WoSwonVGwyoHDSxSjdKzew78jBCPDlWKOXBw7dmLH0HgMdhJz3PJaBSNxVHlwcC4PmpgTphAxE4Bqq47hkL9hQsMgg8CqGVoKUgEjsrSOoOKUs2hMCkAUAtCceouAQDPgmNxC0EAYAADwDDQAAPmCWoJU4jI7ZTCQokqLMoYUltFhHGdJbi81wc1RSVgthwxxvYBGg9Ja+xgSlYmAB1AoyJUjdHWn8Rx58olwFYZgQCRQYDpkmgUGAvj-hATINYsALjejFAwCwYo-5SjMNgL0sACTX6QzCJnPuA9XDegdJFLRuD9iZ0Qhlc8GFbDMhMeU0eDkyDBkFMWBQP5Zq2NiVwbh7TBkwCTAUO5CpHl4Ekb0So1Q8AQGuT0JpeAAZSlmfMsZs0IAP3QMrXgZcJ5GEWXXLyedLTlWXI4WwuwHraKpGlJC+wTiXECmc3SFSKK3xIPfKRHSrmpB+ZIl5GA4U8H4RgJFx92rcqwsdNJaKRJCx8ucMIYRzx4hUnzP0KjcLehuNibElKR6pQAEroDwD4AZnTgwsuymyjlCKpQ8vgQSfl9UhXVxfui8ePkUKqXUo4DCClZV2AijjZwD0apWEgYlUx1LciapqDgF8qQbER1+YajUWpQ1PmsX8A1UjOh4FqDI-o8ibXIM8vBMwOMnDx1Rm6c8N0jjxwkucHEx0HT7H9VLQNFyACCEBZqCh2jq5M3ZYCAUgPQvgmRNYaF1UMpMPRVbKhHA0CZvaID9vZUQWAOo8rTP+WoBNZQmGlBwJ0bsHaJxppqHuks-RJSlCILugoUciBcEzQs7NtcRLvwsGld0ednDNQagYdO9JKTd0ulYc4NxVUDWJiGsNUY-j7tTemwUPaKhzp4OqIdI5GXvMHJqBU074N9p+BAHAysSBsOBUu29Oqiidq3SwnIUo0zlEXeyo2SDH2eT0KjCKWE+LXBuFheCOyjjmjMOEYkxa+LRA8HES8RG4XwCmAG8pRUWOHT0C5PEEUoYKU0Qeb9oU9DuiEwEL01JbS3CMMYEDd54yKdnspqCOxYJejdHYWwJ44Z8xPJRc0pKTgBEMhZ0M8YOAlGs4o5TkV3AOepEYZzdg3ZOgJBJc0KEcQBAZGZsz-n3g5BC4kxYZmilrE2NsXYtocFHHfhidGClqqcZxmuTL7ZPj8kg1UYUDQctLKWMufNRXbQlbrU6FT1JBYMmMBYcqsUjANfMRGLs0Y2uihaGANo4dui9AGB4wUVnGZKZZqYCq5wVgYmoqEN1unoi+T2fsPu9IGTe3k1SmbnYBQAQW3GcUQEpSphWrNJUY4oCyZNqFvb5oJK1pxDiFyylGq4ItAjN2OMHopbxNN3kz2Ws9ljGKc+n2MPfdHJmAHni8wdfRT-MwNgsYISpJFZq8Xwreicrcb0mCMrTcfC+NNJB3xoFJ0+giKx1PC00zaWwOnytnn2TsZngUmR71KdAx73E+esZCCdWq39IrRDxPx-QZ4Is8wQlEdSKF1zTdSrxGiKvDqoMouEJCosW4rDkvoVYP9mTFPXFFAe5viZORoi5a3LN36MkFuJO4HgVgZxCuV80ax1w4hPFSElThfcB2+rSIPixUYRYwnYeC1UQgDdCoZu3NgilO1l-6BXRcley3HhXLP9cCSrCKTdwkxh1zwXTl7S7vnbThBUg1NPY9zWWCb86UWuS4YR4RvpjuGU1iXBkj6uwI-6AAAUtQvhoJCqm8zAcz2B2-M8PkfXbJqjVewg2CIUmi+VDEgqWdTZr8PUDFFqG0PoYw5hbT2GrWB1tRFXsxxi9grS9EJAcA7gXnJBuColFkTglnxlrzVWJg1CwEsS5UjTsSkTTDBTKBGVcRIHcUwBzAfggAn2XAiwHkMS1zMxOC8GyWalantgyicmogsHX2qVqXIHqW7HwJaWo1eU6RmX3xgAnwIgQiX3G2OjcAKXF0hhyRYIQjYPJAekcHX3IiZXIBuU+XuRiWjS4An1uARnMHCELSiC9ACBdy8jMxOgCBz2T2XFIVfwPhLmaDvgfhHSgH1SjUkQn09DPFam4zCHWAcHallSCDOC2DyRuDYJKWQLf0PmDS1R1TQ18JwOMMsMtBOFBxIS9Gv1wWyJlzzRckZE4NcPISDXoHA3DR0KTT8OygkKsIczKLsAKRQkYIE1ML4w2WCCj3cHXxbTbSgzygwzg1nX7QkNOBuBchKx9VOydC73QTiI8AdBCBxnX1qIx2g0PW7UmJ4AnwFkdx2ArxsAegwhRigjWH12aiKVuGFhcLiCAA */
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
              on: {
                "Bot replies": {
                  target: "#Set working hours.Chat.4027381",
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
        }
      }
    },
    
    Environment: {
      description: "- Definition: \"Chat\" is a private chat or Telegram group without topics or a topic.\n- Definition: \"Interval\" is a block of time.\n- User and Bot are members of a Chat\n- The Bot may read messages and respond in the Chat\n- The Bot username is <bot>\n- `{working_hours_type}` is `{working_hours_default}` or `{working_hours_personal}`\n- `{working_hours_default}` is `Default`\n- `{working_hours_default}` is `Personal`",

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
                  target: "#Set working hours.User.Idle",
                  reenter: true
                },

                "User presses red button near the weekday": {
                  target: "#Set working hours.Chat.Add the day to the schedule",
                  reenter: true
                },

                "User presses '+'": {
                  target: "#Set working hours.Chat.Default timeslot creation",
                  reenter: true
                },

                "User presses green button near the weekday": {
                  target: "#Set working hours.Chat.Remove the day from the schedule",
                  reenter: true
                },

                "User presses an interval": {
                  target: "#Set working hours.Chat.Bot writes the interval in user text input field",
                  reenter: true
                },

                "User presses 'x'": {
                  target: "#Set working hours.Chat.Removing the interval",
                  reenter: true
                }
              }
            },

        "Default timeslot creation": {
          on: {
            "Bot creates 23:59-23:59 interval in the table": {
                  target: "#Set working hours.Chat.Bot writes the interval in user text input field",
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

        "Removing the interval": {
              on: {
                "Bot removes the interval from the table": {
                  target: "#Set working hours.Chat.4027381",
                  reenter: true
                }
              }
            },

        "Add the day to the schedule": {
          on: {
            "Button changes to green and schedule displays the active time of the day from the database if available": {
              target: "#Set working hours.Chat.4027381",
              reenter: true
            }
          }
        },

        "Remove the day from the schedule": {
          on: {
            "Button changes to red and schedule does not display any timeslots in this day": {
              target: "#Set working hours.Chat.4027381",
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
        }
      },

      initial: "Previous messages",
      
    },
    
  },
});
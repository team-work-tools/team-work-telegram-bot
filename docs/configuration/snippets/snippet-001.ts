import { createMachine } from "xstate";

export const machine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QCUwGMwEsBuYAEATmALaYB2EYBseAhgEYD2ArgC56wDWmADj5Hgi1MAGwCeeYmDCtyUPAEdmcWYzKwAdAAUqsNRoCSEEWADEAFQAW+NMwJEy7WVLyZYCPAB4AIgEEDADIAmgD6ALIAohHmBgByAOIhMZEAfADaAAwAuoigPIywmKpkuSAAHogATNUaABwAzJW1GfUAbAAsAIwZzQCcADQgYogAtJUA7LUaAKyTGdO1rdPT7bWVra0AvpuDqBg4+ESkFLp0TGwc3HwCQqISUjJyisqwxZo61PpGJqYfemR4NCWWhkGA0I7kSgEPD8AiYRgQTI5JAgfKFYqlCoIeotDSNDq9ab1Wq1aa9Xq1QbDBDtaZ48aVXr1WmNBndXpbHYgPZYXCEEiQ04MFjsLi8fgQQTCcSSaSyUHPFTw9TaXT6LS0AiyNC8WisOCuAGsaxSu6yx6g0yoHgiTAG1iMPBqGVqfBKJVqJGlNFFZWYxCdDkaTqdca9DKVTpk0OdVpUxCtKMadbjdo41rrEOc3boXmHAUnahnEWXcU3aX3OVPd2vZXvNVkDTeRgGvRSY1yUwGVgAchoznwADNGNDaPzjlCvSifRiUViRo1KjN2k0ie0uhkKb12vGEEz6hpCRzqh1WuTpp1tjn9nyIYWaMKLmLrpLbjKHvL5DW3qrPo3m62jDtpYnZ-GogLAqCBp3lCMJUPCiLZN6BS+mo-oIJUm7JtuTRhomJIZKmu4jO0rQaBknS1FG4ydPU4x0Rs4zZtyuYHOOgpFo+opXBKprvlWCrfnWv7-Nomrarq+o0OQeDGvgb6Vha8i0FAwhkL8DYcGAFCwFOeQobOoBYuMWHrHR1TErMVEDEMiC1OM4x4qsgb1J0EyEnRV4sTe+YTkK5zcWWr4Vuan6KrWaiaAAQowrAaAAEiCxi+RxcFwgiEEgjAph6aiBl+nOiCNBkh40eM0wZq09TVSZca2QgbkleSLLzNMLRnmmXk8mxMH+SWz68QpoXVi8P4xXFiUUCY7GFmlCGZVBOWdMi+nogVRmIBku4ZF1rG3gWUIPgFpYvnxilhUJkUaONTYhR+cgJUl029dCw7QmBja+GQtDiAAXk8H38rA+TqHAOVIdO+VoYVGHVEuZ4VW1vSphMtG7iGIbJqsOLNNU9n1NMu0+TNh3Fk+PHlma92CaNwk3d4d0CVAj1TSls1vXgH0aAAytpkpji94MrXla3QxtDUrnSaarFRGTtJutJ1dS3QXk51WtD0tHrr0RN5iTfXk0FZ3DTTHoqvTjNKSzyX669I6cw2PN83QttLcLM7reUAZno57TbvUyOMg0zRK4gHKdMGjRuWeeP2brPUHQbgWnUN1NfrTV0W1TTPW89id2+9juTTb42uDQ9AiIwaCcJAphlK8epgBotCDvqBAABRtRkACUVp7WzpNcSdg2WxdGfm7Ft3Z1bxd535BcO3+uf4KXbh4BXVc14h7tQyUMNRrU7TLmuhK0rRocIA0ZEa60DSVMyqbpvH+3z0d-UU8F09j2b0WTwzX8PQAMJqAgMwNATgTSpyZqYUusA+a6QhqtVCe9xadFInSCq9l2gOUWAfSou5ai9BmOGNyF52qUTcs-AeSdh6U34kpcKY0-6jwensEckoG6sGYDQRgg5jZSFgLAFSBoOYfQ8CCWAAB3KgkAAD0zBvrqGkUQCAddOFNxbm3TuGQe592Ji9N+hsU4sNNhFCecV-70M-BoNhBAOGsD1Nwp0fCoGCOETQURDZxFKJkRAeRiipG+Nyh7MWXtYaLEjm1OGFJiQZAvm5Si5FpiMkJMk3CBMqG20McnEeADTE-giGQbAmACBqCkI4DSf4nT8HULJE0gDgSsGCbvdCIwFiHlIoyFYDIdGVC6LuDWdRwz0XXNUQkVVSSZIMWTHJdDzojR-hoBpepgy9CaOrCw1gASAzgTpZposUFhNqniSMFENZhgjGs9GIYj61VInRcqkZCZcm6i-Di2TaGfysQssxmhllxQmOs7BlT-j8loBAfsJoBFCJgPs5BrTMJH0JGGFJ8sTLkgGWGGYaxIyH3JPZSiUz84fIGnMk26dFn-LqPfVMrRxhC2Qgc9C6xDyuQecyQMlRklo3qhjMipy6JdADvfRoRLX4zM+fwpmjDhJUrWcSSWaiHH6mbq3Kg2jdGvOoZxY6pKvnzPybKxph576Hy5XCwyYTz5kXKiuByEwGiUXqLuC819yqLDiaRSYbQxXvIlXqqVDDLoqipZYg18hoXuJBeBIg4KaCRrBBaz2WJXJLjiQ5C5sxli313NUCOAc6XYIvPRRM4xfX3n9R-QN39flLONWG8lso3FghNQTM1mztLr1ilpPZiCRbwv3puDBazLmbjQT0dGyTkz2V6BjdYcsQzlsHrqqtUCg3jz+fWkxEa4AwrgK2rBlQO0AiYKKeBSbQlYnZMOzCDJEa0XwfVVkGgaJrFvgSw+JJmJaqyZWo2a6a0-g+n2GEcJsCN0yuwSRRRLB4BuvjQ+5UGWQyZTDZkJVyo4nmJMW+tVnW8ppeRdchD5ifozEumhAaAM-KAw2EDPAwMQaBHqPA0HjRwcnghotbtGUDtQZjPptE1kNB0efHcvLXJEMWJMEyftGRLDLV5MgCI4ClB-dMoeVHt0ysirxy184FiOTopy3FVEqLiepCRUiwZC2xkaI0TpFGdXv3-dp4N9Y-x6eTaMLlJV7K9I2HEyisxH3Ui5Y5EMknQyCfsop68esNMrtc3kiltaubfDAF5y9ow0HJhqsk8Z8tb6kV3MyI+7kSRcv8xSS8Lz+6-s06utzG6RLqnEpgHUPBG7SSNJA7dWXDlYmqFLHR65b7JIDtF3cK4yIrEjCuO1mE1lOZJU1lLOmVRcwAjQNsMgQKggGwiiMdQTIRkC-hEL03UwvoqmmMkdLAwMhW3+4x633OtcbBqLUHXJIGhknJatTwVJqUO-vUML6x3zCZNgjWoZdxMSPoQvpGsiRVVjLUZ7jXkvfMNZnWKoPUHLAPH7NMgcYkh2IvROoXQ-YkgJlyskzz4sJ3FVj17OPUtMImk9bVc0MrMaggTq1sONAk4DgycncT0YByIX0kTuN0lM+8gl4lL3ckc427-Cx-WUN8eFxRUX-syfBylxJk5F4R0TCWOuZJmOkvs-DZr66zCUvL1tngTxnndf6e9n7Q3pOJcm4vtVIhdEid3eJFrb99XEsuYd4297WcOdu5eh7+2XMvo-TEP9BUgMiDA0iqp733mGqLAPEsWdyMGQ9LctNllc3KKIfPBGO3cf1eO8Ty75Ps9eee9ErzCgLsXpC6vVg0X8s2p9Ej20AZgZSrWWSZMWMcTW9GPbwnlrSfw0p-zmnwuS8e8cfYGvDe1dIAj4DCSKYTRYyhm3Oiid9VYvkU3BsOlcu72r9mfqjfiyt-kqWRATAQgXkh1yQR9wanoiMyYnuwWHXBp3Rh0UN0byaHDFu0mTq30VVzZ3XzTid3-zThsXQHYQ4GVScV4SlWbREXTy8ToB8RUX8QkWUXP2L2ywagJH93FyDliXiQZyxnlwjEVy-0lWo1xxVEKWKVKTIHKVYAvwQDaQDnpBM0bwoQs1GAJiIR0UIi5VIhaDbWEK0zexa3+TkMqhmDiQ1nQQ1mZAvhGEoiIRXHDDaDpwaA5HaAMLWw13eypU5QaDaFMOaFFxaAokM1nUq0QLiSxgDjiVJDDDQQx0wJV1Z3t1wOlW8ONUBQaGwTkKr1FxjBXChzTBJHhznz6TiJxhXAyUSJZz9RwLJTwPSJWTWEFTpVMPKn9zcglwokjHiUDDpFXGRjJF0NpDi2VxqIrTqJ-waOMONXlTNWmACKmBp39msnvgxXqjJEcmaIsgJkeyjA8Oxw7xmJWS0CIGKRYHjV3XcTaKPjakCysJaBK3qjsOO3WHvl0KW0ZD6QOPj2mMpS3XWwTSL3AJL26DchmDvWJBonDGaGmGInlnpDNXKgqkjA5Aqh+NSPXX+JWQbTwKBM0HlTgMqDkO6EGRCyJAJRhPmGmxtUqyqnTDPEIncOqLeQmJSPqLSOOO10BKuJbTmJRhJLiRKnJKhMDB6GpPqmG2xQchlxxGGx1hZO1VW0ON-1rVDW03xOwgVUVkFLJMhMpPFLhPqnliPihJ6KJyYhVgxI5KxLSzoxoAYxwCY0aVYxgyPzkNTC2IojlhLVpGwXw2Vi6C2PojWEIizFWFGPU2wPZKmM5MWWAwdMY31Eg1dPY3gxDKLV1KmEWFnQsgpElniTgJmAvEWFJAmHokJUVIaxjMBzEI83+HoyTJsBdLY1gxulOLAHOKcXxI9MJDqG9P9I6G6QDIDDajpDlihzWJWETHqG2G2CAA */
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
            },
            "Person changes reminder period": {
                  target: "#Receive reminders about skipped daily meeting questions.Bot.Handle reminder period change",
                  reenter: true
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
                },
                "Person changes reminder period": {
                  target: "#Receive reminders about skipped daily meeting questions.Bot.Handle reminder period change",
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
            "Handle reminder period change": {
              always: [{
                target: "#Receive reminders about skipped daily meeting questions.Person.Idle",
                reenter: true,
                guard: "The user answered all questions"
              }, {
                target: "#Receive reminders about skipped daily meeting questions.Person.Does something",
                reenter: true
              }],
              description: "Scenario file: scenario-000.md",
            },
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
          description: "- Definition: \"Chat\" is a Telegram group or a topic in a Telegram group\n- Definition: \"Private chat\" is a Telegram chat (not a group) of two Telegram users\n- Today is Person's working day\n- The Person has already joined meetings\n- Person and Bot are members of a Chat\n- The Bot may read messages and write in Chat\n- Person's username is <person>\n- Bot's username is <bot>\n- Person has a private chat with Bot\n- Person's reminder period in the Chat is <PERSONAL_REMINDER_PERIOD>\n- Today's daily meeting is at <DAILY_MEETING_TIME>",
    
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
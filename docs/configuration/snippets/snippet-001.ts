import { createMachine } from "xstate";

export const machine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QCUwGMwEsBuYAEATmALaYB2EYBseAhgEYD2ArgC56wDWmADj5Hgi1MAGwCeeYmDCtyUPAEdmcWYzKwAdAFVYVDQEkIIsAGIAKgAt8aZgSJl2sqXkywEeADwARAIL6AMgCaAPoAsgCi4Wb6AHIA4sHREQB8ANoADAC6iKA8jLCYqmQ5IAAeiABMVRoAHADMFTXpdQBsACwAjOlNAJwANCBiiAC0FQDsNRoArBPpUzUtU1NtNRUtLQC+GwOoGDj4RKQUVDQMLOxcvPwQgsLiktKyZPJKKphqmjp6hsYmXwR4NAWWjPOCEEjkSgA-gEd4QDLZJAgPIFIolcoIOrNDQNdo9KZ1Go1KY9Ho1AZDBBtKY4sYVHp1akNOldHqbbYgXZYXDgo5Q05MNgcbh8ARCUQSKQyOSKZSwIqfXQEDQABVoBFkaF4tFYYPIeFYVluEoe0ueJlQPBEmDBrEYeDU9zU+Fe8veZARJRRhXd6MQHTZGg6HTGPXSFQ6JJDHRaFMQLUjGjWYzaWJaa2D7J26G5Bwhx2odEFFxF12N9ylTxecoV2iVGi8jDBsEYUkNchM+lYAHIaE58AAzRgA2i8yFUT1I71opEY4YNCrTNqNAltTrpMk9NpxhAMuoafFsqrtFqkqYdLbZvY8w7jwtnIWXUU3cUVx4y121-4Nps0FttiwO3+QFgVBGhbwLPAYThSdcnyH01D9BAKg3JMt0aUMEyJdIUx3YY2haDR0g6GpIzGDo6jGSj1jGLNORzfYxwLAVzmFK4xTuSV32eWU3g+Os9DVDVMC1HgdT1MgDSNV8uLNeRaCgYQyD+JUODAChYFg5F4JnUAMTGVC1koqpCRmUj+kGRAajGMYcRWAM6g6cZ8Uoy96OvPM+ROItWKfMsZNNKteLdfiACFGFYDQAAkQSMTy7ygqg4RAkEYBMLTp19WdEAadID3IsYpnTFo6lKgzY0shAnLy0kmTmKZmlPVM3K5RiIP5HzH1LDiTUrD8a3dTRwsimKKGMJioUS2FGBuIFUtMVIOkRODUSyvTEHSHd0hahib3zDqHxLdiX04wL+r49QNGGhtTr655oti8b2qoPAhwBb8fDIWhxAALxlYCiFgPJ1DgdKsi9HS1rKSoqkXU8ioanoU3GCid2DYMkxWLEmiqay6imHaPIm7zDrY59y1koLP0Gq6Ipu3ruKgB6xviyC3rwb8AGV1JuUdnoIMHlu01bEOyqrlxpVMVlI9I2g3akKspLpzzs0qWm6Ci1x6Qnc2J+9izJ-zbsZ4La2urxjbk5m4r117hw5+tuYoOg9fSpaIZF4oxZjJGNDaLc6iR+l6iaRXEDZDogwaJzT1x6ydba-aSYNvyerfOTTZp83Lara2nqTgF2e-UabeGlwaHoERGDQThIBMUp5XEjRaAHXUCAACga9IAEoLV21mDpT7qToZjPqbCumLdH3OS-zrzC-t4vHvwMvXDwSvq9r+FwanSHRfWqr5jaJdV3xakKLDhB6kI9WWnqCpGRTNME72+eWK646KbOnjx8u7Pp7kBoAAwmoCAzA0COGkjnDsZddAaQynvL2B8OgERpEVaybQbILEjKsHcNQejTDDE5c8jUSJORfgPZOvlh5fzutWC6Q1J7QPursYcNxG6sGYDQRgA5aFwFgApMERclTuBBLAAA7lQSAAB6ZgX11CSKIBAeuHCwDN1blQTu6Qe59yJvzd+R1yYBToZnCekUp7p1zqwgg7DWA6i4Q6Xhxj+GCJoMIqgoiFFSIgLI+REjvEIM9khXGhEKINVhmSQk6RL5ORIkRKY9J8QJIwvjChesDGGzTpTc6IVLrhDINgTABA1BSAcCpF6jB+DqCkvgFUzBK4iRSqwQJCEkHQwQJtSq20OStVfneDJqcR6WJybWOpDS0BNKDD0RoatzBWEksBOBEBNI7xWq0pC5UcQRmIurUM4Zplo2DMfcqBFKKFQjATHp-d0mdUMUbABP8Br8TGdaCZc1IrjBmZg8pAIiC0GWTUh4sABEwBabpdpoxZYHhmNM2qOENwWUpC0UM0xVgRhqP7Mk5EahpP0bczJQzsmPIYaqeprzJmrEogRMYgsPbrLFmsA8jkzmMgDBUBJqNKro0ItsqlFFpmlQqLiguAyaHOLHk8y6LzGnvIPA-DF7KVF2N1OotuWidG9Mofrahn9xVU0lZoaVbzgSRQFQqqYYKoYYgvoRQqy4bLjHqCROoO5zw30KgsaJ1Lr7CrfviwZfCJUkqNZMixRL5BSGBa4n54J-k0EjSCuAlr97tMcouaJNk9kzCWHfHcVRI6B2RZg88VEExjF9f0-1YrmH0NyYaslMqTX02GTxBNri5X4wVXM9S68IpqXgas4W9LkEbjQdM-ZG4UHdDRgkpM1kejozWLLYMFbmJVt1TW0xUqG3Gp1M28NQLE2aDNcjbtkkmAXB5isoWmUU3WtHYQlCdIEYUQqDuZkGhsVrCJNi6WdFNU3NJgGvVIyab-F7HgFUsJsDiSaXgcRhQLB4GunjDFhVaW7yCWLRkeVCpYjmBMO+5UXVcofrZWWKwwxHwWEKq5eiRXrqMZu3+ioqAQagzgWD7z4OIeQ3TVDxa3Y3sQUhdGmN+UzO0RfbcXLHIEIWBMAy-t6SLHLW5MgM04AlAA3ioD1aHm1oVHS8Fc55i2Uomy9FpFSIycpPhAi0xtFP3xg-YMOK6O6100PDdBmt2sYIMZq1Ix2V5WstotYt8SIzDfZVdltrQzTPwf7Yk+M1NXk8wxvTPmW2GbA-WH4YBAt3pGCgpMZUEn4naNEjFl9GTH2ckSdlYWyQXg84nP1WWmO+ZYwJZUQlNTal1DQfUhp8AgeeEVtpGIqiS20WuO+CTA4hhi5SZchFlgRmXPalC0zV2Dx1V1nLfnes-mbK2GQgEJuYeHRClCi4wvhnWNEqLdIdyYOOUVVMJJkUBjpHtqhH9DsHp69+frIlBsSUBeN+SilyCTdEyGT9k65gMkwerEMO5aLH3wRUAicxWiOTvv97VgP7lHZ68NeH3slj7n9qmIOkTQ54RTI51YNnwzEmIml9yGWOveaB9-XLZi85aqmslOaoIqfIPR37AODOQ7RLRoHAhuP6jdHDCky56X2uVs62T4HBrabmJrVL9pMZiKy-p3SRnivSMHgXU0HCqZiRUTaMT0V2WDckv-jlkXtt3EBeuyZ-0eJLeB2twr2rgciLLi6CVQV9r3eMf14L47Pvw1+-5nbd69ZPrfTEH9HiAM4DA10PAIPQWqoLH3IsBdSM6R0mIitxAa2lxWcwWecMSe9dZNTxTphBnM8F2zw7PQTteZ61N9ajBfs5YNV6ISC+O4EwEKRuZBJExzf-uuV5g7KeTH9+N4P2eouA9+9XhXKuNdIBT-9ESSYjQYwhi3AZMM5JKrWXIxudYyLVfPu7-zvvibIfvuoLsAqAuApAmNibhXsVlVFROZrRN9kfGuCgmjNorLiRGzlRu0MSAAXvr3gfobunmAdYrYvYtwk4sbFGjAG4ovCInQF4kor4mIoojfrAVNiHv7GHvLlEjEuyjSKrtjBrnjFrjzjrmuj3oSn3obvkoUsUmQKUqwLfggMMASAQhZtMlZmQrZiMPjAQtojhOynjqVPMPgaToQcAYbiGu8iocVI5k9qgurIyJfMMCRAQrRFUKSIsKRFRO5trn0pIYAZYUGnWqSuMpMmyvUK0HYU0H7M0MRGZg7rglytojyvTtVjCigv4eIYEfthYdIUQcGjupMp8vUJgiofXn7NGMuCjs7u-pSORCrh3hRN0MuKkm1nkQDnciEfqsUREbKpSimMinYYVJbk5Nbk3jGIcviHOiSIVFuOrNSNzjpplsEYUVYf0eSrKmahLLEZMJ0HTovgKqSK6r7JSiZPjL9pGOYT0RsaEaMiUbKlBmAIUiwPGi4rQaMcfA1I4YsM4QRHhF0IuGsA-HjjtvSLjrcQSoGn0WETYU2mGqnm2l8RwaJk3tMM+oSE0erlMHhHLJ+m5lgXLDsjZNCcBsxtYU8YiZuiiXAB2kfBUCoXHnlNFgSNZAGLiW9rao1vHtEqeE7uSfpuTlSQMTSb5nScevKsjMydEqyViRyW-nMHmuyqijZMrliDNtrJ0Vqh7gLkUfCdSXukiSYpKWhISGuEVLKerJieytiZyU0HiZVHLMfNiRGIsASLRMrEKZ7jISSuBjQBxjBrqHBghoaHxsoWiWLCmLZE0F0Jgq0NSAmWjJ0LZMsM0L4YHPSN0D6fqZsWEQGZBtBlxiajxuGShn4cWtaZMAsAuiZGSBLDEkfNMOeAsMSOMFRCRLmUAQ8XlmxoGcWSGdxmGUhtdC8W8Q4pKSoaGDSHGbLKWkmVRDOnMDHijg-GfAmHUFsFsEAA */
  context: {},
  id: "Receive reminders about skipped daily meeting questions",
  initial: "Environment",
  states: {
    User: {
      initial: "Idle",
      states: {
        Idle: {
          on: {
            "The current time is: <DAILY_MEETING_TIME>": {
              target: "#Receive reminders about skipped daily meeting questions.Bot.Daily meeting.Conduct the daily meeting",
              reenter: true,
            },
            "User changes reminder period": {
                  target: "#Receive reminders about skipped daily meeting questions.Bot.Handle reminder period change",
                  reenter: true
            }
          }
        },

        "Participates in the daily meeting": {
          on: {
            "Replies to only one question": {
              target: "#Receive reminders about skipped daily meeting questions.Public chat.9238425",
              reenter: true
            }
          }
        },

        "Does something": {
            on: {
                "It's time for a reminder": {
                  target: "#Receive reminders about skipped daily meeting questions.Bot.Daily meeting.Handle reminder for User",
                  description: "- The current time is: <DAILY_MEETING_TIME> + <PERSONAL_REMINDER_PERIOD> * N\n\n- N is a natural number > 0",
                  reenter: true
                },
                "User changes reminder period": {
                  target: "#Receive reminders about skipped daily meeting questions.Bot.Handle reminder period change",
                  reenter: true
                }

              }
            },
    
            "Participates in the daily meeting again": {
              on: {
                "User sends": {
                  target: "#Receive reminders about skipped daily meeting questions.Public chat.1928336",
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
                target: "#Receive reminders about skipped daily meeting questions.User.Idle",
                reenter: true,
                guard: "The user answered all questions"
              }, {
                target: "#Receive reminders about skipped daily meeting questions.User.Does something",
                reenter: true
              }],
              description: "Scenario file: scenario-000.md",
            },
            "Daily meeting": {
              initial: "Conduct the daily meeting",
              states: {
                "Handle reminder for User": {
                  states: {
                    "Analyzing User responses": {
                      on: {
                        "": {
                          target: "Send a reminder",
                          reenter: true
                        }
                      }
                    },
    
                    "Send a reminder": {
                      always: [{
                        target: "#Receive reminders about skipped daily meeting questions.User's Private chat with Bot.8738475",
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
                          target: "#Receive reminders about skipped daily meeting questions.Public chat.2728347",
                          reenter: true
                        }
                      }
                    }
                  },
    
                  initial: "Analyzing User responses"
                },
    
                "Conduct the daily meeting": {
                  on: {
                    "Bot sends": {
                      target: "#Receive reminders about skipped daily meeting questions.Public chat.Daily meeting messages",
                      reenter: true
                    }
                  }
                },
    
                "Record status of daily messages for User: answered/unanswered": {
                  after: {
                    "500": {
                      target: "#Receive reminders about skipped daily meeting questions.User.Does something",
                      reenter: true
                    }
                  }
                }
              },
            }
          },
        },
    
        Environment: {
          description: "- Today is User's working day\n- User and Bot are members of a Public chat\n- The User has joined meetings in the Public chat\n- The Bot may read messages and write in the Public chat\n- User's username is <person>\n- Bot's username is <bot>\n- User has a Private chat with Bot\n- User's reminder period in the Public chat is <PERSONAL_REMINDER_PERIOD>\n- Today's daily meeting is at <DAILY_MEETING_TIME>",
    
          on: {
            "User opens the Public chat": {
              target: "User.Idle",
              reenter: true
            }
          }
        },
    
        "Public chat": {
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
                "User reads messages": {
                  target: "#Receive reminders about skipped daily meeting questions.User.Participates in the daily meeting",
                  reenter: true
                }
              }
            },
    
            "9238425": {
              description: "Reply to 9235842: \"<some text>\"",
    
              after: {
                "500": {
                  target: "#Receive reminders about skipped daily meeting questions.Bot.Daily meeting.Record status of daily messages for User: answered/unanswered",
                  reenter: true
                }
              }
            },
    
            "1928336": {
              description: "Reply to 9238742: \"<some text>\"",
    
              on: {
                "Then User sends": {
                  target: "8237467",
                  reenter: true
                }
              }
            },
    
            "8237467": {
              description: "Reply to 29384456: \"<some text>\"",
    
              always: {
                target: "#Receive reminders about skipped daily meeting questions.User.Idle",
                reenter: true
              }
            },
    
            "2728347": {
              description: "Reply to 3983414: \n\n\"<user>, please unblock <bot> (it's me) in our private chat so that I can send you reminders about missed daily meeting questions.\"",
    
              on: {
                "User reads the message": {
                  target: "#Receive reminders about skipped daily meeting questions.User.Does something",
                  reenter: true
                }
              }
            }
          },
    
          initial: "Previous messages"
        },
    
        "User's Private chat with Bot": {
          states: {
            "Previous messages": {},
    
            "8738475": {
              description: "Message: \n\n\"Please reply to these daily meeting questions:\n\n<link to 9238742>\n\n<link to 29384456>\"",
    
              always: [{
                target: "#Receive reminders about skipped daily meeting questions.User.Does something",
                reenter: true,
                guard: "User ignores the reminder"
              }, {
                target: "#Receive reminders about skipped daily meeting questions.User.Participates in the daily meeting again",
                reenter: true
              }]
            }
          },
    
          initial: "Previous messages"
        }
      },
    });
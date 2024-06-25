import { createMachine } from "xstate";

export const machine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QCUwGMwEsBuYAEATmALaYB2EYBseAhgEYD2ArgC56wDWmADj5Hgi1MAGwCeeYmDCtyUPAEdmcWYzKwAdAFVYVDQEkIIsAGIAKgAt8aZgSJl2sqXkywEeADwARAIL6AMgCaAPoAsgCi4Wb6AHIA4sHREQB8ANoADAC6iKA8jLCYqmQ5IAAeiABMVRoAHADMFTXpdQBsACwAjOlNAJwANCBiiAC0FQDsNRoArBPpUzUtU1NtNRUtLQC+GwOoGDj4RKQUVDQMLOxcvPwQgsLiktKyZPJKKphqmjp6hsYmXwR4NAWWjPOCEEjkSgA-gEd4QDLZJAgPIFIolcoIOrNDQNdo9KZ1Go1KY9Ho1AZDBBtKY4sYVHp1akNOldHqbbYgXZYXDgo5Q05MNgcbh8ARCUQSKQyOSKZSwIqfXQEDQABVoBFkaF4tFYYPIeFYVluEoe0ueJlQPBEmDBrEYeDU9zU+Fe8veZARJRRhXd6MQHTZGg6HTGPXSFQ6JJDHRaFMQLUjGjWYzaWJaa2D7J26G5Bwhx2odEFFxF12N9ylTxecoV2iVGi8jDBsEYUkNchM+lYAHIaE58AAzRgA2i8yFUT1I71opEY4YNCrTNqNAltTrpMk9NpxhAMuoafFsqrtFqkqYdLbZvY8w7jwtnIWXUU3cUVx4y121-4Nps0FttiwO3+QFgVBGhbwLPAYThSdcnyH01D9BAKg3JMt0aUMEyJdIUx3YY2haDR0g6GpIzGDo6jGSj1jGLNORzfYxwLAVzmFK4xTuSV32eWU3g+Os9DVDVMC1HgdT1MgDSNV8uLNeRaCgYQyD+JUODAChYFg5F4JnUAMTGVC1koqpCRmUj+kGRAajGMYcRWAM6g6cZ8Uoy96OvPM+ROItWKfMsZNNKteLdfiACFGFYDQAAkQSMTy7ygqg4RAkEYBMLTp19WdEAadID3IsYpnTFo6lKgzY0shAnLy0kmTmKZmlPVM3K5RiIP5HzH1LDiTUrD8a3dTRwsimKKGMJioUS2FGBuIFUtMVIOkRODUSyvTEHSHd0hahib3zDqHxLdiX04wL+r49QNGGhtTr655oti8b2qoPAhwBb8fDIWhxAALxlYCiFgPJ1DgdKsi9HS1rKSoqkXU8ioanoU3GCid2DYMkxWLEmiqay6imHaPIm7zDrY59y1koLP0Gq6Ipu3ruKgB6xviyC3rwb8AGV1JuUdnoIMHlu01bEOyqrlxpVMVlI9I2g3akKspLpzzs0qWm6Ci1x6Qnc2J+9izJ-zbsZ4La2urxjbk5m4r117hw5+tuYoOg9fSpaIZF4oxZjJGNDaLc6iR+l6iaRXEDZDogwaJzT1x6ydba-aSYNvyerfOTTZp83Lara2nqTgF2e-UabeGlwaHoERGDQThIBMUp5XEjRaAHXUCAACga9IAEoLV21mDpT7qToZjPqbCumLdH3OS-zrzC-t4vHvwMvXDwSvq9r+FwanSHRfWqr5jaJdV3xakKLDhB6kI9WWnqCpGRTNME72+eWK646KbOnjx8u7Pp7kBoAAwmoCAzA0COGkjnDsZddAaQynvL2B8OgERpEVaybQbILEjKsHcNQejTDDE5c8jUSJORfgPZOvlh5fzutWC6Q1J7QPursYcNxG6sGYDQRgA5aFwFgApMERclTuBBLAAA7lQSAAB6ZgX11CSKIBAeuHCwDN1blQTu6Qe59yJvzd+R1yYBToZnCekUp7p1zqwgg7DWA6i4Q6Xhxj+GCJoMIqgoiFFSIgLI+REjvEIM9khXGhEKINVhmSQk6RL5ORIkRKY9J8QJIwvjChesDGGzTpTc6IVLrhDINgTABA1BSAcCpF6jB+DqCkvgIBwJWCBIQkg6GCBhjzAPARekyw6TaIqJ0Hc6tahhiomuKo+ISrEjSfozqhijYAJ-gNfiKpmCVxEilSKAZGhq3MFYSSwE4EQE0jvFaTSkLlRxBGYi6tQzhh6BUNGwZj7lQIpRQqEYCYclaq-O8GTU4j0sTk2syzVloHWUmOk9RMHlIBEQWghyakPFgAImAjTdItNGLLA8Mw7m1RwhuCylIWihmmKsCMNR-ZknIjUKZBdfk0OcWPRZl1gXWlBXNSKqxKIETGILD2pyxZrAPI5V5jJNkJNRpVdGhFLlcoonc0qFQaVvxmZk-52SFkMNVCs1lYL5XkoqFMFRdjdTqLblonRXzKH62oZ-BlVMmWaBZWs9lB4H76qmKiqGGIL6EUKsuGy4x6gkTqDuc8N9CoLGidy6+Sqfkqr+XwxlmqnVsvqfTAFPEpBItcdC8EcKaBZuRXAT1+8WmOUXNEmyNyZhLDvjuKokdA5EsweeKiCYxixuYvG+lzD6G5Mddq51aaLHqvkIW1xrr8b6p2epdeEU1LwOOcLflyCNxoLubcjcKDuhowSUmayPR0ZrFlsGTtg8bVGN7aY5lg7U06nTaOxFRbNB6uRjOySTALg8yOULTKpbvVrsIShOkCMKL3MqsyDQVK1hEipdLOilr0ndttVe3+ioqC9igrCbA4l1l4HEYUCweBrp43JYVXlu8gli0ZHlQqWI5gTDvuVENkqH62VlisMMR8FiKs+f3JDpME12sBTTf4mGeDYdw+y-DhHiN01Iy2t2v7EFIXRpjOVWztEX23JKxyBCFgTAMv7ekiwO1uTIDNOAJREPTMEz2+ZfaFR8rRXOeYtlKKbLJaRUiOnKT4QIhc1oenyLzG1nxvRtLkOXoc9e9DBBnNepGAavK1lenrGiSRGY4HKQGsIuMpG1yj4rAQ-x2zQ8UMxbQwJZUPwwAJf-SMFBSYyoJPGXLO+BEdyMmPs5IkBrUtkgvOF3WZWL1zIzY50T9YhKam1LqGg+pDT4GE88erzSMRVEltotcd8EmBxDNlxAy5CLLAjMuf1KE7lnqoR-aLE3YvVZ-M2VsMhAKrcoyu9FKFFypfDOlrCWWdyYKeUVVMJIiUBjpNd61t3xuPqq9+GbIk5sSQRSt+SilyBrdUyGKDW65gMkwerEMO5aLH3wX09WBISoxmpcNxOyq7MVfu1V4a2PvZLH3P7VMQdImhzwimIMBIGTET050eY0O6XM-hw62mI1l622gjNFKoJ2fIOJ37AOvOQ7RLRoHAhfT6jdHDCkj5V4RuRaZ3dmXmr-4TbVy0mMxFNc87pHz3Xumgx3wK5RBkmZXL0++V2q3cPv6TbMQ+sPecrV23ekqB33q8Qu8Dm7nXl9SoG82eZO+p4zPm4Z3GkPWSw8Pbt6O6Ptt3HKk+t9MQf0eIAzgMDXQ8APsuf9AsfcixD1IzpD0pyQPBWnZImRs84ZJdRdDyY1nTCHMV-5rHh2egna8z1gnjvgu1xzGNwyUirQBkBnyuZBJEwnclYi4z8r1uS8z-Mb2+fBdF9LxZnJ9ga8N410gOvqqRJJiNBjCGFuAZGGOSJVNZOxhuOsESobiBhPkXmqjfrLmXlHiAhQOApAstr2t-iGJRLSN3osOSmuCgmjNopriPo0Fxu0JMoHlalLtftPkgbPhNhoNYrYvYtwk4sbNmjAG4ovCInQF4kor4mIool-m3ollVEntzinsHFEjEgajSIbtjCbnjGbu5BbpfmNsXgwZqvkoUsUmQKUqwN-m0oHLSJ5iPmQr5iMPjAQtojhAagRM0FOnAVflPibFVimust-sVNMNEurKgurIyJfMMCRAQvMAkpEdHKsJgq4VoQgTof2lqiCmClnmrD4U0H7M0MRG5oen1iQdEpjIHNEsSKGCgnTvnkHuerDtoR4bLl4S6uMFspgt-r3n7NGMuATqmESKTofn0mUdjMuKkjQQJm4bUUmkkQ0WmpyimESj4YVC7k5G7sRBGDEgGIocSEjCSE4dSHnuoQXsHmMQkXUcmrerqm6hLBkZMJ0NIeZA-KSKGr7JyiZPjJDpGHETUccRMUCmcS6iqEQIUiwAWi4jwfMcfA1OloEc0J1pVKEeGEmOmMEeGBuPSH0h8bMuMfaqcSkS6iOiXuOqCeIQ1lVCsdMCBoSORCAXMHhHLNMMEamChArIbmoTZpbkcYmliZMb8cOlegSXAJOkfBUNgdEnlFlgSNZAGMblMEDr6n1iVGmKeDhG0OiaqhySJkstyfeniSYnyS+m6sjMKYMmKRSZKU0NKZVJtiSjZPrliJtmFpUbQZPpieqTejiTyTFrqWhISGuEVIaaKeSRKVSeaZSHLMfBSasZzrRMrCqUJqhrLmJjQBJjgFJvUjJoaK-t-imLZE0F0Jgq0NSHmWjJ0LZAVLRGGNtvgjGfZizvGUqOJpJrqHhgRumSRlRGRlMIaZMAsIeiZGSBLDEkfNMOeAsMSOMFRCRFWdLogZqgmVhsmY2dJs2URtdP8WAICQ4rqZmfiLUMRLLG2gWVRLunMERHLCSPccsAmHUFsFsEAA */
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
                        target: "#Receive reminders about skipped daily meeting questions.User's private chat with Bot.8738475",
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
          description: "- Definition: \"Chat\" is a Telegram group or a topic in a Telegram group\n- Definition: \"Private chat\" is a Telegram chat (not a group) of two Telegram users\n- Today is User's working day\n- The User has already joined meetings\n- User and Bot are members of a Chat\n- The Bot may read messages and write in Chat\n- User's username is <person>\n- Bot's username is <bot>\n- User has a private chat with Bot\n- User's reminder period in the Chat is <PERSONAL_REMINDER_PERIOD>\n- Today's daily meeting is at <DAILY_MEETING_TIME>",
    
          on: {
            "User opens the Chat": {
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
    
        "User's private chat with Bot": {
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
import { createMachine } from "xstate";

export const machine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGUwBcAEB3A9gJwGsBLAOygwAscBXPWAOgFVYw96BJCAGzAGJVMuQqXJVasANoAGALqJQABxywiaIjhLyQAD0QBaAKwAOI-QBMRgMxHjAdgAsBgGwGDZgDQgAnvqMBGentbA1sATiC-Zyk-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-FlKuAQ6bttyTzYMb93k-26CA-W3KEqgZjsyrEQzPi0jdhPGG1Mosd23JbBpNxZizt1g7G4u99rX3OvtzkopAyKSh4GVhPVDAkAMTpB7fYtqahUrxv8BgM0yFEokGqFwagEARA2hbOAwqMOxmBPMP4biWw9hXCe9WtRdk+JVMU08D82HqvqdbQM4Xncxc8ol0koY0uMHpBq9WaOYBY7x0M75mnWWrw5jZMYASrNiSOGYgvCwrjrN04ZazKpCQALIRivAGYAuGmx6cZk-imxaQxAhgpkwc63J6Ehpqw4BdGeHCZJefnWzBc+kr5BsZK1NV5aMdYHyimpNKJ-BcG4hx8zWxVfNn0HAyhD9GXoOhARx+Pin64BeNxcy0OJF4tmVS++feBb8TfDzGVlPgzM53UiA2nD0JcBiTFCzqMhtB+b84wo7oS44oTQd+k0t4tkmw2wDOP4hwo27+RizMhIRYewVSgkAUCWfSEsro9YHooBkobQYAHQ5UvQ-QQeIwwIg+J2mWF4NgMGKm-ggW68ny-E5wXOV46w7sgsAMABtYQBDYy4zY0oa4-oW4KoO4n84BDMqO30zEawnOr2aOl45wr2NwT4imtwdgfBfwAh+BTY3oIh64jUm4pAXYn8vY-Yuo0hKc2YUBqYbgSOy+bg+crisQBwCOVKBCxgOh9Ax0AcGUw0SEKEF0NWGENhF4VKriIQjwyiVw9etmpwrGE6NmRYIQeWGyHuiWoU9AskncAR6KOsWkER9slwhiBg-EzwWe1gnEaw30VKniXkzu2wvhu8UUV0sUEOWuwcA6Z8Z0JRjMKiMRT41wNwAkec6qIQmOTmDaO0rgkaWR2Bvs-h6Qp02U50Fy4RNBcekRQxXiIxeY4QAkiRVI-EpggsBWNw14+YmBixHWgoUs7RqMssIqAxqwyYFwZawWHMAkM+VIBCCq1IgsGcJIDwvhjxKMdifaisOMeMqsRMpMIqesbxYQE2cy4QhYRwC0fxKwv0+I-EyiIQLgWm4J-s4cLx0JIcEJARw4BobxLIAQ1wLsO02YwSOJkQHkox34V24Kvhh69cxkTca4ZAcAbx1s56JcFRz+lwr+d6EyqYzE5IMQ1whYmRH2n6oCrQ4C+8BoUC+AMCmUcCIee4pOqCwi78CCmoKJsmJCcOi0ty3EJxXEfEVC+YxIrMLI5G82rC7CnCNqaAAxEiRwri-MDeGYTeOJ2WwmOw9EbIFgwsMMWBHWaCgZEQgQVupILsjgIJnyDwk8Nuye1wIQqY+OAyjIIxlggZCpNKnqeYQQ4mb+VImw56hSBcGcUpUitS6pYeXuuy0SMylZ2xVeVIewFwRZ5IzwLs2OdsKwRi+C7IYQLsJcL2pZ1yQy+yAxLuuYzwbggWcB6wnyC67M68XkRiDwYQV+GpSW+QNyBygZRitki0H4hGT4uOrB-EF6bBLg4m6eVKq5oK26-gm5Ui+IWwfEmwFRZIVwCy7I+IwJkMy+j6Vg-5gQ3GAMm5FgFwBwYWEaxYeYy01sOYcBPePedZCx3Znu15NKs2Gcm5F2fEVwaiZ5XkGcaORidIdksQ9eK6AsiZdxguBinmqWZgm5gsFwxgqedI8i9W3M56FgAMBWZImGGcKF9Wnpg51Ow5CA5IGwf4Lkrui0dG0m9I30hIFgyybI2ZKFWMEUSkNAco4urc951Ki58YNecyr5aOEiBcoFLkhw-y0QfFFF2R329AhOIgxOsApOwOGUoOu2+2PcJAFMgZ7i+INw55V4dgxinElw56MRJi-gdR+lKF4VZAkV0VG2sV22YOnRCUcQVZ2S4MmwNeVgSmjZXE9FGYxq4QBSrM76-FeGAypVUA5V98a2MVFOzqEA95AkdkrMs8qYXkgVCyTwc1kMa86heSKFPuouDl-urc5BcIsukJCulJSuRAKugFfg6umu5UOueuBuVZs1D5Ls8m7OtuSGEyVK96X0jaDCSZAl3uKEHcu1wYA8Aeh1welpoelFdAqZwmxx1SWZIQ5IC8qwtkO0pcEleYO0hecQQAA */
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
          description: "- Update temporary {{chat_settings_type}} Chat settings:\n    - Remove all intervals for the {day}.\n    - Mark the {day} as not a working day.",

          on: {
            "Bot updates the schedule": {
              target: "#Set working hours.Chat.4027381",
              reenter: true,
              description: "- The {button} becomes red\n- Working hours for {day} disappear."
            }
          }
        },

        "Removing the {interval}": {
          description: "- Update temporary {{chat_settings_type}} Chat settings:\n    - Remove the {{interval}} from the {{day}} intervals.\n    - If it was the last interval for the {{day}}, mark the {{day}} as not a working day.",
          on: {
            "Bot updates the schedule": {
              target: "#Set working hours.Chat.4027381",
              reenter: true,
              description: "- Bot re-renders intervals using the settings.\n- If the day isn't a working day, Bot makes the button near the {day} red."
            }
          }
        },

        "Creating default interval for {{day}}": {
          description: "- Update temporary {{chat_settings_type}} Chat settings:\n    - Add {{default_interval}} to the {{day}} intervals.",

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
          description: "- Update temporary {{chat_settings_type}} Chat settings:\n    - Add {{default_interval}} to the {{day}} intervals."
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
        },

        "Save schedule changes": {
          on: {
            "Bot removes some messages": {
              target: "#Set working hours.Chat.Bot removes messages about setting working hours",
              reenter: true,
              description: "`{schedule_was_updated}` = `True`"
            }
          },
          description: "- Replace existing {{chat_settings_type}} Chat settings with updated temporary {{chat_settings_type}} Chat settings."
        },

        "Create temporary {{chat_settings_type}} Chat settings": {
          description: "- Make temporary settings from a copy of existing Chat settings.",

          after: {
            "500": {
              target: "#Set working hours.Chat.4027381",
              reenter: true
            }
          }
        }
      }
    },
    
    Environment: {
      description: "- Definition: \"Chat\" is a private chat or Telegram group without topics or a topic.\n- Definition: \"Interval\" is a block of time.\n- User and Bot are members of a Chat\n- The Bot may read messages and respond in the Chat\n- The Bot username is <bot>\n- `{working_hours_type}` is `{working_hours_default}` or `{working_hours_personal}`\n- `{working_hours_default}` is `Default`\n- `{working_hours_default}` is `Personal`\n- `{default_interval}` is `23:59 - 23:59`\n- `{chat_settings_type}` is 'default' if `{working_hours_type}` is `{working_hours_default}` else 'personal'\n- `{schedule_was_updated}` can be `True` or `False`.",

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
              description: "Message:\n\n\"Here's {'the default' if {working_hours_type} is {working_hours_default} else 'your'} working hours schedule for a week.{'\n\nYour personal schedule is the same as the default schedule until you edit it.' if {working_hours_type} is {working_hours_personal} else ''}\n\nThe red button to the right of a day of the week means there are no working hours this day. Press the red button to make this day a working day. The button will become green.\n\nPress the green button to remove all working hours for this day and make this day a day off.\n\nFor working days, there's at least one working hours interval in the `hh:mm - hh:mm` format.\n\nPress an interval to edit it.\n\nPress ✖️ to remove an interval.\n\nPress ➕ to add an interval.\"\n\nInline buttons:\n- Schedule table\n- [Save] - Save changes\n- [Cancel] - Don't save changes\n\nNotes:\n\n- If `{{chat_settings_type}}` is `'personal'` and User hasn't edited the personal schedule before, the schedule table is rendered using the default schedule data.",
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
                },

                "User presses 'Save'": {
                  target: "#Set working hours.Bot.Save schedule changes",
                  reenter: true
                },

                "User presses 'Cancel'": {
                  target: "Bot removes messages about setting working hours",
                  reenter: true,
                  description: "`{schedule_was_updated}` = `False`"
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
            target: "Bot removes messages about editing an interval until 4027381 (not including)",
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
            target: "#Set working hours.Bot.Create temporary {{chat_settings_type}} Chat settings",
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

        "Bot removes messages about editing an interval until 4027381 (not including)": {
          on: {
            "User reads": {
              target: "4027381",
              reenter: true
            }
          }
        },

        "9938423": {
          description: "Reply to 2238743: \n\n\"OK, the interval was set to `{{user_interval}}`.",

          after: {
            "500": {
              target: "Bot removes messages about editing an interval until 4027381 (not including)",
              reenter: true
            }
          }
        },

        "Bot removes messages about setting working hours": {
          on: {
            "Bot replies": "8738272"
          },
          description: "- Until 3983414 (not including)"
        },

        "8738272": {
          description: "Reply to 3983414:\n\n\"The {{chat_settings_type}} schedule was {'' if {schedule_was_updated} else 'not '}updated.\"",

          on: {
            always: {
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
import { createMachine } from "xstate";

export const machine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QHpZgC4H0AOYBOsA9gHYCGANphKQJbkCemeYAtjcRPjvjYRAHQBVNHn4BJCOTABiAMoYABOgAWYBczYd8C3Hl4QA2gAYAuolDZCsGul7FzIAB6IAbAGYAHPwDsAFg9uAExGbkYArB6BEQA0IPSIALT+-G6+vi4AjBEuRi4eLmEAnAC+xbGoGNwEJBRUtAxMrOyceFX6-ABChOj8ABKkHFJKqgoAxoQsLAMCAMKqowDWCuwAZoQKpABGhACu6MNqwvjSxmZIIJbWtiQOzgiBGRmB-JkugfmF3oUeRbHxCAlAi5+BlvLkXGkPL53llfGFSuU0FhdEQyJRqHRGBpmlxdO0uj1+oM1Co1ONJtN+HMwItlsQ1httnsDgojngThkzhYrDY7LdEFFIikwkYjGkMkZAu8XH9EkCQWCXBD-NCPLD4WUQBVkfhUbUMQ1sVpWni+J1un1pkNSWMJlMOEIRAplKRYAoAFaEdiQBQsMAYdhQWAnUwOS68m7nO7BJX8CJhDIuL6FYIZDyyhCJjL8DxGDKFNxhUK+Nyg6EIrVIqp69H1LFNY1tM0Ey3Elnk+0CNnO10er3EH1+gPEIMcrkXHnXexRgXpIxxqWg3MhFMZDNZMIpQKFdyFEsuQrhbwaxGVFE1WuYxqaFpNgQtomSEkjDuU7sut3odae9i+-22Ec3RWGgCHQaRHFgdBSHQMB+FIFYYLwAAKEUjAASmkbVqwvOoryNW9TXvC1H2tF87TfJ0PyUb9+z-YcgwUYDQNOMNJz5Gd7nzNx+CMDxvDVB5fCMPcwgzNxjx4t48l8Y8wgiAsKyw880Vww0GwInhm2Iq1nzJciHXkfZ8O0QjwMg6DYPgxCUNFDClN1HCDXrG9cU0ojCR09t9IEQz1HUky3JY85wynflM3yecIiEsU3DcA8nhlOIBUCXwczzUFJTFXwJRKTV7OqFSnOvHETTc80PLbG1Xwdd9ey-MZmAsjYdD0AA3JrRhdfYAHcbGUBQCTMqCYLghD8Bs9DMKrZT9TrYrG0I8rWyfLyKRqyi6vWUZGpg5rsDajquoUXqVAG7ogu5K52NAO5QRTF5c28HJwnigsMzCTJJL4uSIlisJ3kU6aHMKubjNKvQzQAUWIVqQJIP1iDA7tCFwYhPxGOZoIuicrsjG7ECeedJQ8b7UlLdwPozBJHi8CFPDVRMgkKJ5AbPYHZrw-zwfaTGem3AI-ECIaLNG6zULsoGCo5tSXO5s1ef4fnxOhbGQuupxEDBbx+BTaLAlCXiIW8dcZP4aFEwhQoEwlLLWZ1KXLxlkq7ypLqUj8X7fGFkarPG8WprZh3VOc53FoV5XPdVti8Y1hBvFLF4UsifMQiLXxCjEpM41zPdUhFMJj1y097ZrYP5o0iHZjdtxvlSDIvYg4bLLG5D-fy0uirBl3w9r7LfCj3Hp3x8LTdCNVeJJwsckCKmnkKM2+LhRVQVQ3w7ewkHOdl7u3ZTKF9aFxuRd91vbIDkvHNBrmd+gnX3mhIIB4jIfY5+bMlSTPOfjBFN3qCHM9wFDTECfwkpSiamIHwOADh26Xy3qHNyrFB5hW8M8YmpMSyM0pklAE-huK8QygXHcNd05rzypLDuV9t6LTZEg5+YU4peBJpETKop665GNjghIaoUiZELHmAI25SxuHXjNR2IcFplTZOIJ8dDQocWysCZhwRghsKEkmd6OtMgF3rswrIiZRHs3EeXVyldypyPVrdT4kU35JkKCmARVN3jzjTGmJUx4Dyij3IYoOndr6LQfJ5Kq3kLEx2jAI7OCY7EOLTLPe6PwPA7n+nJEIJYTyVkDpQ+BkizGBMqmRNaVcaRLFWOsLYux9g2locFaOL9oxPGzPkdOkR0j+ESv8am4Q4xxTFKgiI24UouB8Vkp2OT8TaXyXpQpjptBUR-AOCAdEAJBlCXUgUwlNzHn3MzKEIpCzvS8CKSIfg0xpG8LCIZ5DMlwNGRXcZFUVrBOmbVT8NFfxDmWUBECkFVlhSiN8HW31DynOypnbWUopLRQKL9YZNyJF3K0g80iUzOz8F8mDHQiCanII4g8MUcZ47+ETIS-MGYD5mx3FEWKFMDyws3rc0x9zlrIttM8jaryGpgCaqQFqNB2q7U6tBY6fUzroF+bi8EkTiX2NTOmHBcl54QpAaKaFAQ6XS3hYyqGMM4bEARmK7F9COJZG4oEPpVsExWxru0xINdNkRG8Oc4sjrHXquMV3MOXVxXD2+KlGuEp8wWp0U4tMLx-oBHyAXUIng3Vlw9WVBWStBbetjhkYRZtEyfH1iELiokcGPG1gUeOH0IQQiLKCWNfjqEJurh7AIvgU23VLM8WKU9C7+HyJw-4QRsyOvcEJZmBQ1SVqoQgsxPd6310bQTVJkkEzyRkuw3wVN04ggeBENNXwcixTIcXDeGqTFyyrrfPeD9AjTszM2uMCZElKkNmKPN-x84vCTDJEIaoC4hBHdkhFx6egAAVmCw12G6P0sBYCkBgPAQ18jh4Sn-v6vM9ifrnNngnJmg7viWrkoEcBxQgA */
  context: {},
  id: "/set_personal_daily_reminder_period",
  initial: "Environment",
  states: {
    User: {
      initial: "Idle",
      states: {
        Idle: {
          on: {
            "Set the reminder period": {
              target:
                "#/set_personal_daily_reminder_period.Chat.3983414",

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
              always: [{
                target: "Set reminder period",
                reenter: true,
                guard: "User has a private chat with Bot"
              }, {
                target: "User has to create a private chat with Bot",
                reenter: true
              }]
            },

            "User has to join meetings first": {
              after: {
                "500": {
                  target: "#/set_personal_daily_reminder_period.Chat.3745834",
                  reenter: true
                }
              }
            },

            "Set reminder period": {
              after: {
                "500": {
                  target: "#/set_personal_daily_reminder_period.Chat.2983742",
                  reenter: true,
                }
              },
              description: "- Set reminder period for this User in this Chat to <period> minutes\n- Update scheduled reminders for today's daily meeting if the User participates in today's meeting"
            },

            "User has to create a private chat with Bot": {
              after: {
                "500": {
                  target: "#/set_personal_daily_reminder_period.Chat.9284232",
                  reenter: true
                }
              }
            }
          },

          initial: "Check info about the User"
        }
      }
    },
    
    Environment: {
      description: "\n- Definition: \"Chat\" is a Telegram group without topics or a topic\n- Definition: \"Private chat\" is a Telegram chat (not a group) of two Telegram users\n- User and Bot are members of a Telegram group that is or has a Chat\n- The Bot may read messages and respond in the Chat\n- The Bot username is <bot>",

      on: {
        "User opens the Chat": {
          target: "User.Idle",
          reenter: true
        }
      }
    },

    Chat: {
      states: {
        "Previous messages": {},

        "3983414": {
          description: "\"/set_personal_daily_reminder_period <period>\"\n- <period> - a number of minutes, e.g. 15.",

          after: {
            "500": {
              target: "#/set_personal_daily_reminder_period.Bot.Handle the command",
              reenter: true
            }
          }
        },

        "2983742": {
          description: "Reply to 3983414:\n\n\"OK, I'll remind you in our chat every <period> minutes after the start of a daily meeting to reply to missed daily meeting questions.\"",

          after: {
            "500": {
              target: "#/set_personal_daily_reminder_period.User.Idle",
              reenter: true
            }
          }
        },

        "3745834": {
          description: "Reply to 3983414: \n\n\"You have to join daily meetings first!\n\nUse the /join command.\"",

          after: {
            "500": {
              target: "#/set_personal_daily_reminder_period.User.Idle",
              reenter: true
            }
          }
        },

        "9284232": {
          description: "Reply to 3983414: \n\n\"You should first create a private chat with <bot> (it's me).\"",

          after: {
            "500": {
              target: "#/set_personal_daily_reminder_period.User.Idle",
              reenter: true
            }
          }
        }
      },

      initial: "Previous messages"
    }
  },
});

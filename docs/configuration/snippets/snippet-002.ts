import { createMachine } from "xstate";

export const machine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QHpZgC4H0AOYBOsA9gHYCGANpgO6F4DWAlsVJugwLZgB0AqmnlwCSEcmADEAZQwACXARIVpNekyjS2nANoAGALqJQ2QrAZsSBkAA9EAWgBsAVgDMXAOwAmOwEYAHA4faDq4AnK4OADQgAJ62QVxO7g4+ACw+3slewY7BAL45kagYOPhEZJTKjMysHNwAQoToXAASpMQiYOoAFh0AxoTs7K0QXADC3T100kwAZoTSpABGhACu6F0dfPhiOvpIIEYmZsQW1ghOdllc7sHBydquacmuCRHRiGFcDr7OyXZ+gYE8gU0Fg5KUKNRaJUWBo6g1mkNROtpH0BkNRuNJjM5osVmt0N1pJs8NsvLtDMZTAxzHtTncnA4uCl3NpkudPCEvHZIjEELcuMkHO5fF4vK4vO4fK57kCQIVQSUFOUoapqpwuPVGi02kiCb1+oM2rx+NJOqRYNIAFaEJiQaScDCqWBiTXSNBtWA7CwHKk00CnLzabzxXzBQNc5KhP48xBPZJcbRpILisVs36y+XFeRlSEqKqwjXw7XtZGow3DYmm83qObWpj2sCO5gW6YMAjoMSWWDoUjobikaZ9vAACgC2gAlGJM2ClbnoWq4VrER09SiDejK2aLehazbiA2m1AW23u169j6jidEKK7PGxSzgk4fNonE-XDGEL8Ez4fE5E8-fHcDxEgzEEs3BZU8xhGouAAUWIAA3NsSE4YgO0rQhcGIbdCR6M10DPClDmpY5aVsQMngFP4nF+W8fHcJwwg-TImQ8RN7kydxUk8UCihnHMKlVAsxl7eJXEFX9kk7bte37Qd8FHbQJynMD+IhQT8xgkTGkYiSaMI-ZKUvMiEBsDJgiZG4fxFcTrgcbk3gQYUxPcYU43-C5cnyOVVMVASVU09VtPiYJJK8KSux7PsuAHIdFOU6c-PUgLoKC-CQrC5IDIvEirwQCVPC4Ow7CfX5tGuB4nA-ew7C4LIQjc1zfxlbzEuzZKoIXDFRLuICny8MQKCoUgok9PRvSM3KTLM586pSLwvl6rkuI-ZJkncLgbw8Yrbnov5XF4hV2sg+dhPS3rnh8AbKx7bALTwO0FlWHd92IMBSDwZEqEbOgIBG7LJr9Kxr1-BM7HK0UHweJ5VqugUlLucSUifFJDvA2cNNS7hgou-qxBu0g7ukAByGxiYB4igdOYJWSZBIuV-P9RVCj96c2x9pUCJJtF8ZI0bUk6hK087ysu66TVui1iYAanJ8bz0B0j-VjVzNtZIMwx5sVXl5EJGXuJInlfDwwz51rfOOuchbSnrRbxgmiagB6wH3J70Be6Q3o+r6fr+qIKd9JXgacxI6dCbXirsLjXAc3lJVqwVioCUJfludx+aSwXAuxkW+qu-GJcJi0SCmND8AQigA+M5WEGKlx-E86UnwSVx30c38LMfLJfh8G5WScLzgT4zOrez7rGnW5xxScbZ5aIwO8uFUGf3BoN-ElVl3GYlkfCZBwsmjl4sicDPLcxrqccSRivBnzQyQmymg9OIDg2vxjGMugft-Cz4Y-8RjWSMwOubYeZ8UoX3Op4Ow20C74HUEXEmIxWg9DAOQOW5JDKP0XlkRkoVwpSn8EEVIsdrwBFcAKVIiZXJcnEg4M2Q8joQVHljceAooEwKrlNGuiQUhUVZJdcUMc-DMQCBtIUYtfwhBfOnEBjCMbgLOqJAAImAaYpBljkHxDUWA5AGgoger2EiLo9E9AMX2C0DEED7xsJY-epchwV3IKXZEPYFiiE4VTRAf5aqcSCMtbQj4kjMUCPGU2oV1oBOuF4U+TDz6KMaK6KgeBTBwGREwBxih6zLAlmASwawmDYFWNIVsqCICwM+gU1YCBpAAB4ljoAAHy1NhPY8uFAGkeKfteUU5CghCgCX01IXhgnQPiIbe8tDhR2BifIzq8SuAAHVSBUmYMU2gyJslwNhDokxZpmAdE4LAWApAYDlJRHsmA25clrCGG6F2EAcIHLgMcmAnS8rfC8FcRmFxziXRho5QMzx4hcSukmSM4N6E+VAbEhRwtRIiWYKoFxhNcAQFaXgRxxi1h4VaJc+B2BUXoscfMHofQ8AQCRTuaQmy8DEwtIcl5HRbkQFQRgVJYhJ5vzeSZBaLIrhjgWtzXwzEGQbVbuDcKdDbwsmibI9G-k5lwsaEg4gKCnE4sRas9JbTyBYukCy0Q5jpAcvYZ4Y1GQo4ZFcNymuf4gxMj+EkIUdDzgkPytA2q68nALXuJKVIkK2owsVTbRoAAlDAeAojnNxUi7VGKKB6oNWyi0JrirbXNctK1Nrg5Xx8cfAqoVaHJGYiVXeoQgjBD6TfRwMyFWnSVVwAACvgakaKHrsEIEhZgYhm3JMIGihg90wAdq7WoaYeB+jIrcWAbNAZWS1TCHQ8V9EIbDMcgPDalbvAgsrf-YBDD5UdXrSGrgABBCAaLVx+xrMiWAeFIAaPELUZ6JcNV4qpU7Rs+5bl3u6BAR9+rB3YHICNR5JK2AIRXDUaQhBpjImveOydV7eyLHNB0BgcHSAVwYCB6ds7yLBiUs3bIJVXw-g-M4BdaQQX+qSLWo91sc6iXDSOlchIEMTvYLe+9-7RAuhffuN9qSqUPTRT+njAGICEFScQPRFLYDAZGvMYgUbtm6PQBaesBJB36v+nPTBC8eWMlcncW89lJQMnsjrLxAQBTWTZEGHmUozbeVkyy+AexA2zOPWAB+hma42HCmyOqgZHCpGCJKX81nTIt1-hcZ8+8wzesHlCuRdbGPGnwH56uwcbAJf5YI+89waZVUcvYchgoNaAr-PRb19Gs4sOJEIdo2WuG5bCOQxIhW2JSNK7yFiUoTOSpZMlha9XmFdU1K1zxZw6G7yXfvVuzw1rPGqlxbQ-K7iUPEjzGOMiD0CwmwWTUCIdRsf1GiNo02umzcuAt0IrcaJG2qryuq3r1tBFcp4R8424kwRO8WXUuF1xGjGGACYpdZjzCWEU1cxJrt5UYrNNIlattJG+MWsrjgiqJhq-wyG+7UuHoa5Nosy5Swg4rCaLcVo9x2gdGwZsCOTLnDWp8J4i3Hsrb69eUKdVyr+EXbZcSJ85WHb++qAH5PVxlg3NT6sVK6z7gZ06YpJ50DM9tfVIqV1fDQ33reTHcdiqfBfBFn1Rtni-dheqeCSEJ3EFQhrhWWDpo30rSFte4XIsMjWwxJkkSfWSiboTrz6Wx7aU17loCny+qvmuFKTIEoXsRfZ5zMIt4Hs+Gt8GpjOlaGSSj6cOhG3nDOGskBLivwRUJlM4EV8gYGQ1rFyPCXeeMo0XCkXxArkLK0TL1yL4iY1rVRuAKXaEpdIBJKqHi2QafOsNxldbvtdxRUQSHXeiMejexgCUVRwXEW5RylFKHPC-L5Txviv1y0owZrWuAjFIMdgmFT-K5OhNNnwXFn9C7zGXL5pqeDX7pCfCWaigBLSJtz9Z9RuD2RhgpCVphBPhn7-7pSNoPRIQrD0rPInJwAr42L+5x4JCFpJ6uQvaBBXDrZdzXBrTeAoER7pQqJqIaJaKHLqb6LvQ5Y5QzZsi9LPCBAMRSK-Ctwfg0wWQlThRAT37eC+D0EsLBSJLJJGqrhxrEpZI5J5KlyFJrAlLkAQAr4phgxig-i9xARfDBKgwBBRxihci+ADwOByEQKiRLIrJjrrKrg0rqDaLsFCYNhHK4Er5BaboSjOC3BBh64jLkIMjzQeCTKyEt5gK56sIIpQCUqEi3SEqqEUDX6ZAbaBCFoZ6BBLYipChuAxw8yCi-DrSOHzIqpqrRqapqBZHkAr5v4bQSitx+DSi9zbQlpKRuApAlS3ixGvgBpz5-4MHMYRpRpvqxplzxotEu7+Y5r2Sl4rx9wJD5EiLgxXA+oPaSHPii4Hat427t69qtrSDtqdqqCBEdGfAsghA1apD0Ssx-hfISj7RXQPgMg1ENrnqXrsZKZUqri-oPqiD4Gp6BgvgBKVqJjbo86fhwx3DqxIxsg-hAS-Enosadrna6ZRqIZcYgkSbglLE5anA2D8iijNy96MTlo75OQhBuD9RJx0L7yJh5B5BAA */
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
            guard: "User's message is in the correct format'"
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
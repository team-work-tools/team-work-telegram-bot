import { createMachine } from "xstate";

export const machine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QHpZgC4H0AOYBOsA9gHYCGANphKQJbkCemeYAtjcRPjvjYRAHQAFfEWL8AkhHJgAxAGUMAAnQALMIuZsO+Rbjy8IAbQAMAXUShshWDXS9iFkAA9EANgDMADn4B2ACye7gBMxu7GAKyeQZEANCD0iAC0Afzufn6uAIyRrsaunq7hAJwAviVxqBjcBCQUVLQMTKzsnHjVBvwAQoTo-AASpBzSymqKAMaELCyDAgDCamMA1orsAGaEiqQARoQArugj6sI1xDIm5kggVjZ2JI4uCEGZmUH8Wa5BBUU+RZ7FcQkEIkgq5+JkfHlXOlPH5Ptk-OEyhU0Fg9KI6tQ6IxNC0uHoOt1egMhupVOoJlMZvx5mAlitiOtNjt9odFMdRGdMhdLNZbPZ7oholFUuFjMZ0pljEFPq4AUkQWCIa4oQFYZ54YjyiBKqiRLVKJjGjjtG18Xwuj1+jNhmTxpNphwhHriIoVKRYIoAFaEdiQRQsMAYdhQWBnMyOa58u6XB4hZX8SLhTKuH5FEKZTxyhDJzL8TzGTJFdzhMJ+dzg2FI7Uo6rog0NbHNE3tc2Eq0k1kUh0CdkkV3ur0+4h+gNB4ghzncq6824OGOCjLGBPS8H50JpzJZ7LhVJBIoeIpl1xFCI+TXIqpo-X1LFNLStFsCNvEqSk0Zdqm9l1uj3oDbe9h-UDOxxw9VYaAIdAZCcWB0FIdAwH4UhVgQvAAApRWMABKGQdVra9DUbe88R4VtLRfG133tT9nX7X9-yHICxxDRRwMg84Ixnfl50eQt3H4YxPB8dUnj8YxD3CLN3DPASPnyPwz3CSIiyrPCrzIetb2NB8zSfcjrTfclqMdBQDm0nRdOg2D4MQ5DUIwsUcLU50MQbO9cVNUi9KJAzO2MgRTI0JtWl0LyOMuSNZwFbMCiXSIxPFdx3GPF5ZXiQUgj8PMC3BKVxT8SVSi1ZyTlcrTgpI-QyJ8jtbQ-R0vzo5QNjGZgbM2XR9AAN3asY3QOAB3WwVEUQkrLghCkJQ-AHOw3Ca3UsqjQqzyqu89tXz8ykGton9mvGNqEI67But6-rFCG1RRp6cKeRubjQAecE0zefMfFyCIUqLLNwiyWShKUyIkvCT5VIWlzNOW4jVo6ABRYguogkgA2IKDGsIXBiF-UZ5ng27p3u6NHsQF4lylTwAbScsPF+rNEmebwoS8dVk2CIoXjBy8IZvKGPMfal+v4PdAn8IJxpsqb7MwpzwdKyGiL53SBfgoXfmk2F8cih7nEQCEfH4NMEqCMJBKhHwtwU-hYWTKEiiTSV8s53U5Z5hXmyV3HenVoG-HFya7Jm6X5q5l3CPc92vOVr3-B9zWuKJnWEB8cs3kyqJC1CEs-CKKSUwTfNDzSUVwjPIqL2dutXfDnTI891I1YK32YIm2zpvQoOSsrsPzJh806-cBvMj8OPCbnYmYstsJ1UEini1yII6ZeIoraEhElXBTC-Cd-CNKrnv+brtMYWNsXm4lgP28c4OK4Itz949wWj9hYIR6jMfE7+XNlRTIu-ghNMfrBDzIeQoGYQQBClGULUxA+BwEcJ3W+5VoaPk4qPaKPhXjk0pmWVmtN0pAgCPxQSyZs5KVyCWO229Fry2rpVDoX5UFv2islbwFMoh5TFEPPI5t8GJHVKkLIIICjgneD8Kh3Nu4rX5l+CQr5GFRR4gVUEbCQghE4WJFMP0DZZBLkPNh2RkziNDnfKRStCTyO1k9b4cVP4piKGmAsmZeGfCXBmcEQR-A+GeL9ZKRiu4mOQWY-StUqLbQgBYhOsZHH5yTHYhxGZF4vT+Gw5OZtMpeD8Yg3mEc1oWhqptOq-kBa0mWGsDY2w9gHFtAwiK8d36xheLmAo2cogZACGlQE9MIgJmSuKDBkQ9yZVcJk3ekjAmR2fL5QpYSnQnCagBYcEAmIgRDBE+pgpxI7jPEedmMJRTFh+t4UUUR-AZnSF48IGQRlLTdjXXJkyQlGRmY1Paf5ByAVHCssCEFYJrOitEX4BsAYnjOQVXO+tpRyQSoUIG1yaH3wmcEgpoTuz8ECj3UKa0-k8SeOKBMycAjJgJYWLMJ8rb7miElGmx44V71MYi-JlEnmopeQON5rUwDtVIJ1GgPUjp9XghdYa110DYvHnGUEiYiX2PTE4wESll6QvAWKGFgRaVjMVpHeGiM8DIzAKjMVidsj8Q8QCpShYKEdKSAPLZkQfBeNLPa+16qAmatyZ7Q1DxfhZQHpKQsdslJeLpk8RmIMzz-2TB4hELqkFuo6HXYW6sgiepJuWfiSjvjG1CHxSS+Dnj60KMnX6UIoQlnBDG7Jdz42C29oEPwKbszlleElOepcAgFB4YCYIuZ7UeDEuzQo6oK23LoX3Gtg9621LQTxSUaRZJJmUgpLhfg6bZzBE8SImRpL7lCGkYdtDe5zEfp8Z+yap1MJnU2hMSZPD7lyLFBEP1unKk8aEdUJdQj7oRe6wWghmCIz2B6AMsBYCkBgPAc9Cjx6zubezAs9jAZBt4Vu3MbMB2-CTAGoIUCShAA */
  context: {},
  id: "/set_personal_daily_reminder_period",
  initial: "Environment",
  states: {
    Person: {
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
            "Check info about the Person": {
              always: [{
                target: "Person has joined meetings",
                reenter: true,
                guard: "Person has joined meetings"
              }, {
                target: "Person has to join meetings first",
                reenter: true
              }]
            },

            "Person has joined meetings": {
              always: [{
                target: "Set reminder period",
                reenter: true,
                guard: "Person has a private chat with Bot"
              }, {
                target: "Person has to create a private chat with Bot",
                reenter: true
              }]
            },

            "Person has to join meetings first": {
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
              description: "- Set reminder period for this Person in this Chat to <period> minutes\n- Update scheduled reminders for today's daily meeting if the Person participates in today's meeting"
            },

            "Person has to create a private chat with Bot": {
              after: {
                "500": {
                  target: "#/set_personal_daily_reminder_period.Chat.9284232",
                  reenter: true
                }
              }
            }
          },

          initial: "Check info about the Person"
        }
      }
    },
    
    Environment: {
      description: "\n- Definition: \"Chat\" is a Telegram group or a topic in a Telegram group\n- Definition: \"Private chat\" is a Telegram chat (not a group) of two Telegram users\n- Person and Bot are members of a Telegram group that is or has a Chat\n- The Bot may read messages and respond in the Chat\n- The Bot username is <bot>",

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
              target: "#/set_personal_daily_reminder_period.Person.Idle",
              reenter: true
            }
          }
        },

        "3745834": {
          description: "Reply to 3983414: \n\n\"You have to join daily meetings first!\n\nUse the /join command.\"",

          after: {
            "500": {
              target: "#/set_personal_daily_reminder_period.Person.Idle",
              reenter: true
            }
          }
        },

        "9284232": {
          description: "Reply to 3983414: \n\n\"You should first create a private chat with <bot> (it's me).\"",

          after: {
            "500": {
              target: "#/set_personal_daily_reminder_period.Person.Idle",
              reenter: true
            }
          }
        }
      },

      initial: "Previous messages"
    }
  },
});

import { createMachine } from "xstate";

export const machine = createMachine({
  context: {},
  id: "/set_reminder_period",
  initial: "Person",
  states: {
    Person: {
      initial: "Idle",
      states: {
        Idle: {
          on: {
            "Time: 18:01; Context: working day": {
              target:
                "#/set_reminder_period.Bot.Meeting.Time to send questions",
            },
            "Command: /set_reminder_period 15": {
              target:
                "#/set_reminder_period.Bot.Handle /set_reminder_period.(internal): change reminder period",
            },
          },
        },
        Must_answer_questions: {
          on: {
            "Questions are answered": {
              target: "Idle",
            },
            "Time: 18:16": {
              target:
                "#/set_reminder_period.Bot.Meeting.Time to send notification",
            },
          },
        },
      },
    },
    Bot: {
      initial: "Meeting",
      states: {
        Meeting: {
          initial: "Time to send notification",
          states: {
            "Time to send notification": {
              on: {
                "Message: <notification message>": {
                  target: "#/set_reminder_period.Person.Must_answer_questions",
                },
              },
            },
            "Time to send questions": {
              on: {
                "Message: <meeting messages>": {
                  target: "#/set_reminder_period.Person.Must_answer_questions",
                },
              },
            },
          },
        },
        "Handle /set_reminder_period": {
          initial: "(internal): change reminder period",
          states: {
            "(internal): change reminder period": {
              on: {
                'Message: "OK, you will receive notifications every 15 minutes"':
                  {
                    target: "#/set_reminder_period.Person.Idle",
                  },
              },
            },
          },
        },
      },
    },
  },
});

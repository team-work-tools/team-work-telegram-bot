import { createMachine } from "xstate";

export const machine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QHpZgC4H0BOYC2AlgHYRjaYAOZBA9hAHQAKZsNR9AkhADZgDEAFQJ4wCAAQBGABwIADBIDcYgMJt0YAB7pxAdxrYA1sShiIAQwCeAbVkBdRKAo1YBdLSIOQGxAFYATAA0IBaIUhL0EgBs0QCcACxxPgDsSZFSqQC+GUGoGDj4xKTkVNi0DMzYrOxcvHyqeHhmJOK5WLiEJGSU1HSSPjb2SCBOLm5snt4IkYHBiBIAzOHRsXEL8zGyST5SWTlobQWdxT3lLGz0ALIArrBYTbA6XQCOV3BjRLB8AIqvt+6wYjMuEBH0euAgA08I1c7gmcz8fiS9CSMWkm1kfh821kPiCIQQPjiSKScRiMT8UkRURiKN2IFa+Q6RW6pToTDO7Gut0w9zBmBeb3+gmEokkMiikKG0PecIJM3xSSkcXoy0J81kMW2Ej8kTpDPahS6JTK9AAQjR0JcwBhjPQhCIxOgaGI0CQxEQLQQAGYEADGZnefAucFgZhg4gAPB63D7-e8xCJYKGYAA+SWOZww8ZDSak5VJPzk+SyKSa7VJPGISI4+irSI+avzVLRebzPX7RmG46shjmy3Bm1EKB2kWO52uiBiAV-NifYNJsOiiMiQcmRPJuBpuxQzMynOIPPIwt+YulnzlysEuKReio+vxGLzKTzSKJdt5A1HFkmvv0AASTQ8GAYj6oczLGmyAAUxDqNgRBmNwACU4i+gAFk0MBiJ+RRiBBEBBiGi7iAAOiAADyADSARiBYNBXGIOgENw3BYWAvpgAQABuwHRt6foBv8YhgNx2AWH0CbEFc6iwKR6bDLusL7ggh4FkWEglmWiKXk+MT0JisgGbIcQ4gkyRZNkIAeqQ8BDKBTJGicO6jIpoCTAAtBWswIG5N6GX5-klj474HPZ3YmhUVROVmHhKTE9Z6T48gIn4EgSJqmraUS9DbPMmIvvMiSKm+Fl2V235shF5w1GAUV7q5cyJPM9AYhqkQ0g2Jm4l5cQFcipJ3nFSSyE+mLBZ2X54eylTnFydygs8vzvDZGbOdm9UIOpCwJUlCKpelXX4liyrLNW0w0gZEhjdhDk9maFq1S5XgHhIl4pT4tZRAWiU0hSuolR211hWyv4Dm4Q4PWtT0IKWl7XrIen9ZScU6q+QX-R+YE3T+FpWquI4Ok6LpgG6vGxgJkPSo9kwLJ5+LVu9d7JCSmo5X4V2Y0DvY46Dtr2sBhMTlOi3-BDMXrRIxkqpEEsohiv1pHEl6EkidbSyeyQUgk7OheVXOWgBJC8CBAMc7rouyjDXnqn42XPk+SqFiS2za2Vk2-gbQHGxjOuTdBRCwfBSEoehQ7AYDuGOVKCmQ9TTbaaWyKJfIWx+D19ZJOZGRAA */
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

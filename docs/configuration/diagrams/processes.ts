import { createMachine, assign, createActor } from 'xstate';
import {generateMermaidFromXState } from 'fsm2mermaid'

const countMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBUCGsDWACAMgSwDMwsBhATwGMAbMAOgE0B7AVy1QCdjUsAXMVALZYBYAQCMw7LJ1gAHRgDtYeMTSwFG7AMQAlOP3YUAFgG0ADAF1Eoecp55F1kAA9EAWgCMAZgBsAFloAJkCzHzMADi9A8IjwgBoQMncPMwBOWnDIrwBWVK8PXPDAry8AX1KEtExcQmJyajomVg4uXn4hEXFJaTh5JRU1DW0q7ABZVAVUGBEFHnMrJBBbPHtHRdcEN1TU7IyzbNDsjz9AgHZIjwSkzZCAiL8vU+zw1LNA7bMPcsr0bHwiUiUGi0PSwAzGBgsLDGRiMMG8Rg9MEcYxaZDtLAAd00GHmTmWqwUTg2nl8Xlo2T8ZlOgT82X8DyuiA8PnJ70eUTeZipqR83xAIxqAPqwNB4KMkNYMLhxB4iJk4q0AGU8AI8FQOGxZLJYHjFgSHET1skCgFAqyzic8tlzn4mQgPKdTrQvKk-OEfGdIplsl4-PzBf86kC6GKURKmkjxW1BFicWwFBAtABJCBgWaEMhsLCydiMVSiPU2OErQ3E5JeSIUunWjypOsxLz2kq7F7vbZWm2+gO-IXBhog-ThyVY9grLhiFg8XhGYi5-M0ARaRRYdE0KDsQRFpYlwnlzbHc0ZKkpA6ssl2xKIPysjItswlV0vcJ+U496pBwEDsOGCNQzFjnwbCTsw048LOOZ5gWS54AoM7ELBfDsJMVBYBAjAUMwMw8KghJYCuADisJQGoAAiGG6pY+K7mWxoHuaPgUjE0RPJ84T0oE9o3uSWQ3j4NqhB4RRvvyCiMGm8CLIGtRfjQ1F2LRoAkgUwTHp8+yhCUrKXtcbjvB4tCnHSkQ0l4nypE675-DJIqNFCLTZnwsadBIUgyH0ygFuomjyaWaxKRWNpBG6PivJ8-EWfaencrQJz6ZWwQ2n4FlWX2smhkOv6+XudGeK+AQvupZ5aX6UUeIEtB5OEpyetVwTUpW-oVAKvafrZg7Ir+I7SvCcpRuG2WKS4FY5BSpxuoExypOafiXFeCBGS6L4svsOSzb6ZTNdJwohh14ojgq4YxkI2LsNgEwQIN-nDQeVLhC6FkNexKSpC+9qBPSlUdqc3JvM+m0-B+Nm7T+EKRodv5YMoaoalIqDapJxYKddynHM6BShWZr3scl73+BSvJGZEJxCeNqVtSDmVg-+gETlO8GQQuohXUaAW3UJtCsvs7GuhZSXNq9GT+NkzzJc8RzcuTwPflTEqwQzqb8LACKyHgFAs-ueW0pzlL7K81VOn4OmIL6ASUqyHq+t4N5SztMudRC8vgcQAAKUGLsrYIUDlSN+azN2eJNARRK+FklHWRynPapvVhbPhhB43j0rb-bAoKAgTFMojpjwGu5U66SWiT3jscEc26SEtDlaEr5E2YNfleU5RAA */
  context: {
    count: 0,
  },

  states: {
    "You are a team member responsible for": {
      on: {
        Research: {
          target: "Research",
          reenter: true
        },

        "Task Management": {
          target: "Task management",
          reenter: true
        }
      }
    },

    Research: {
      states: {
        "You choose to research": {
          on: {
            "Team work": "You research team work and",
            "Similar apps": "You research similar apps"
          }
        },

        "You research team work and": {
          on: {
            "Identify a problem": "You write about the problem"
          }
        },

        "You research similar apps": {},

        "You write about the problem": {
          on: {
            "on Telegram": "in the Ideas topic",
            "in the internal documentation on Google Docs": "in the Problems section"
          }
        },

        "in the Ideas topic": {},
        "in the Problems section": {}
      }
    },

    "Task management": {
      initial: ""
    }
  },

  initial: "You are a team member responsible for",
  id: "Task Life Cycle"
});

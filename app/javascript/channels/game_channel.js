import consumer from "channels/consumer"

// consumer.subscriptions.create("GameChannel", {
//   connected() {
//     // Called when the subscription is ready for use on the server
//   },
//
//   disconnected() {
//     // Called when the subscription has been terminated by the server
//   },
//
//   received(data) {
//     console.log(data)
//     // Called when there's incoming data on the websocket for this channel
//   }
// });


const game = (game_id, container_id) => consumer.subscriptions.create(
    {
      channel: "GameChannel",
      game_id: game_id,
      container_id: container_id,
    },
    {
      connected() {
        // Called when the subscription is ready for use on the server
      },

      disconnected() {
        // Called when the subscription has been terminated by the server
      },

      received(data) {
        let div = document.createElement('div')
        console.log(data)
        // div.innerHTML = data.element
        // container.prepend(div)
        // Called when there's incoming data on the websocket for this channel
      }
    });

export default game;
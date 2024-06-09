// import consumer from "channels/consumer"
//
// const gameChannel = consumer.subscriptions.create("GameChannel", {
//   connected() {
//     // Called when the subscription is ready for use on the server
//   },
//
//   disconnected() {
//     // Called when the subscription has been terminated by the server
//   },
//
//   received(data) {
//     // Called when there's incoming data on the websocket for this channel
//     if (window.uiHandler) {
//       window.uiHandler.handleCardReceived(data);
//     }
//   },
//
// });
//
// export default gameChannel;


// const game = (game_id) => consumer.subscriptions.create(
//     {
//       channel: "GameChannel",
//       game_id: game_id,
//     },
//     {
//       connected() {
//         // Called when the subscription is ready for use on the server
//       },
//
//       disconnected() {
//         // Called when the subscription has been terminated by the server
//       },
//
//       received(data) {
//         let div = document.createElement('div')
//       }
//     });
//
// export default game;
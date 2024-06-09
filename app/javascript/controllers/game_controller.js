import { Controller } from "@hotwired/stimulus"
// import {createConsumer} from "@rails/actioncable"
// import game from "../channels/game_channel";


// Connects to data-controller="game"
export default class extends Controller {
  connect() {
    // game(this.element.id)
    // createConsumer().subscriptions.create({
    //   channel: "GameChannel",
    //   room: this.element.id
    // },
    //     {
    //       received(data) {
    //       }
    //     })
  }
}

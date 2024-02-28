import { Controller } from "@hotwired/stimulus"
import game from "../channels/game_channel";

// Connects to data-controller="game"
export default class extends Controller {
  connect() {
    // console.log(this.element)
    game(this.element.id)
  }
}

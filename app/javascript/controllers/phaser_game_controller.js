import { Controller } from "@hotwired/stimulus"
import Phaser from "phaser"
import Game from "../scenes/game"


// Connects to data-controller="phaser-game"
export default class extends Controller {
  connect() {
    this.game = new Phaser.Game({
      type: Phaser.AUTO,
      scene: [
        Game
      ]
    });
  }


}


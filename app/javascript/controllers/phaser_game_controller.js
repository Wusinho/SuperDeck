import { Controller } from "@hotwired/stimulus"
import Phaser from "phaser"
import Game from "../scenes/game"

// https://www.youtube.com/watch?v=QjrVfAvxQ6w CONTINUE WATCHING

// Connects to data-controller="phaser-game"
export default class extends Controller {
  connect() {
    this.createGame();
  }

  createGame(){
    const config = {
        type: Phaser.AUTO,
        width: 1500,
        height: 1000,
        parent: this.element,
        scene: [
          Game
        ]
      };
    new Phaser.Game(config)
  }


}


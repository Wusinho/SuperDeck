import { Controller } from "@hotwired/stimulus"
import Phaser from "phaser"
import Game from "../scenes/game"
import Example from "../scenes/example"

// https://www.youtube.com/watch?v=QjrVfAvxQ6w CONTINUE WATCHING

// Connects to data-controller="phaser-game"
export default class extends Controller {
  connect() {
    this.createGame();
  }

  createGame(){
    const config = {
        type: Phaser.AUTO,
        width: 1200,
        height: 1250,
        scene: Game
      };
    new Phaser.Game(config)
  }
}


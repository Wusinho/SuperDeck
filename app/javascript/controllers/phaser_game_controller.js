import { Controller } from "@hotwired/stimulus"
import Phaser from "phaser"
import Game from "../scenes/game"
import Example from "../scenes/example"

// https://www.youtube.com/watch?v=QjrVfAvxQ6w CONTINUE WATCHING

// Connects to data-controller="phaser-game"
export default class extends Controller {
  connect() {
    // game_channel(123);
    // this.player = new Phaser("player", {})

    // this.current_player = this.element.dataset.user_id
    this.createGame();
  }

  createGame(){
    const config = {
        type: Phaser.AUTO,
        width: 1200,
        height: 1250,
        scene: Game
      };

    // const config = {
    //   type: Phaser.AUTO,
    //   width: 800,
    //   height: 600,
    //   physics: {
    //     default: 'arcade',
    //     arcade: {
    //       gravity: { y: 200 }
    //     }
    //   },
    //   scene: Example
    // };

    new Phaser.Game(config)
  }


}


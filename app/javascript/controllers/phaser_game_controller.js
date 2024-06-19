import { Controller } from "@hotwired/stimulus"
import Phaser from "phaser"
import Game from "../scenes/game"

// Connects to data-controller="phaser-game"
export default class extends Controller {
  static targets = [
    'read'
  ]
  connect() {
    this.element.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });
    this.createGame();
  }

  createGame(){
    const config = {
        type: Phaser.AUTO,
        width: 1200,
        height: 1250,
        scene: Game,
        backgroundColor: '#a7c957',
        scale: {
          autoCenter: Phaser.Scale.CENTER_BOTH
        }
      };
    this.game = new Phaser.Game(config)
    this.game.canvas.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });
  }

  close(e) {
    e.preventDefault();
    this.readTarget.innerHTML = ''
  }
}


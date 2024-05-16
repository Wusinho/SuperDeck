import CardHandler from "../helpers/CardHandler"
import DeckHandler from "../helpers/DeckHandler";
import InteractiveHandler from "../helpers/InteractiveHandler";
import UIHandler from "../helpers/UIHandler";
import GameHandler from "../helpers/GameHandler";

export default class Game extends Phaser.Game {
	constructor() {
		super({
			key: 'Game',
		});
	}

	preload(){
		this.load.image("cyanCardBack", "../../assets/images/CyanCardBack.png");
		this.load.image("cyanCardBack", "../../assets/images/CyanCardBack.png");
	}

	create(){
		this.CardHandler = new CardHandler();
		this.DeckHandler = new DeckHandler(this);
		this.GameHandler = new GameHandler(this);
		this.UIHandler = new UIHandler(this);
		this.UIHandler.buildUI();
		this.InteractiveHandler = new InteractiveHandler(this);
	}

	update(){

	}
}


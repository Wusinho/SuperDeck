import CardHandler from "../helpers/CardHandler"
import DeckHandler from "../helpers/DeckHandler";
import InteractiveHandler from "../helpers/InteractiveHandler";
import UIHandler from "../helpers/UIHandler";
import GameHandler from "../helpers/GameHandler";
// import SocketHandler from "../helpers/SocketHandler";

export default class Game extends Phaser.Scene {
	static players_ids = []
	constructor() {
		super('Game');
		this.defaultImage = "https://res.cloudinary.com/wusinho1/image/upload/v1715968436/CyanCardBack_z7pnhq.png"
	}

	preload(){
		this.load.image("cyanCardBack", this.defaultImage );
		this.load.image('magentaCardBack', this.defaultImage );
		this.load.image('cyanBoolean', this.defaultImage );
		this.load.image('magentaBoolean', this.defaultImage );
		this.load.image('cyanPing', this.defaultImage );
		this.load.image('magentaPing', this.defaultImage );
		this.load.image('defaultCardSprite', this.defaultImage );
	}

	create(){
		this.CardHandler = new CardHandler();
		this.DeckHandler = new DeckHandler(this);
		this.GameHandler = new GameHandler(this);
		// this.SocketHandler = new SocketHandler(this);
		this.UIHandler = new UIHandler(this);
		// this.UIHandler.buildUI();
		this.InteractiveHandler = new InteractiveHandler(this);
	}

	update(){

	}
}


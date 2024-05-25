import CardHandler from "../helpers/CardHandler"
import DeckHandler from "../helpers/DeckHandler";
import InteractiveHandler from "../helpers/InteractiveHandler";
import UIHandler from "../helpers/UIHandler";
import GameHandler from "../helpers/GameHandler";
import GameActions from "../helpers/GameActions";
import Zones from "../helpers/Zones";
import CardManager from "../helpers/CardManager";
// import SocketHandler from "../helpers/SocketHandler";

export default class Game extends Phaser.Scene {
	static players_ids = []
	constructor() {
		super('Game');
		this.defaultImage = "https://res.cloudinary.com/wusinho1/image/upload/v1716611300/front_card_fezmfn.webp"
		this.opponentCard = "https://res.cloudinary.com/wusinho1/image/upload/v1716611307/back_card_eajo4d.webp"
	}

	preload(){
		this.load.image('defaultCardSprite', this.defaultImage );
		this.load.image('defaultOpponentSprite', this.opponentCard );
	}

	create(){
		this.CardHandler = new CardHandler();
		this.DeckHandler = new DeckHandler(this);
		this.GameHandler = new GameHandler(this);
		// this.SocketHandler = new SocketHandler(this);
		this.UIHandler = new UIHandler(this);
		// this.UIHandler.buildUI();
		this.InteractiveHandler = new InteractiveHandler(this);
		this.GameActions = new GameActions(this);
		this.CardManager = new CardManager(this);
		this.Zones = new Zones(this);
	}

	update(){

	}
}


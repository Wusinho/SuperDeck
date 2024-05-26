import CardHandler from "../helpers/CardHandler"
import DeckHandler from "../helpers/DeckHandler";
import InteractiveHandler from "../helpers/InteractiveHandler";
import BoardCreation from "../helpers/board_creation/BoardCreation";
import LoadGame from "../helpers/load_game/LoadGame";
import GameActionSocketHandler from "../helpers/sockets/GameActionSocketHandler";

export default class Game extends Phaser.Scene {
	static players_ids = []
	constructor() {
		super('Game');
		this.opponentCard = "https://res.cloudinary.com/wusinho1/image/upload/v1716614018/back_card_0_zx41zw.png"
	}

	preload(){
		this.load.image('defaultCardSprite', this.opponentCard );
		this.load.image('defaultOpponentSprite', this.opponentCard );
	}

	create(){
		this.GameActions = new GameActionSocketHandler(this);
		this.CardHandler = new CardHandler();
		this.DeckHandler = new DeckHandler(this);
		this.LoadGame = new LoadGame(this);
		this.BoardCreation = new BoardCreation(this);
		this.InteractiveHandler = new InteractiveHandler(this);
	}

	update(){

	}
}


import BoardCreation from "../helpers/board_creation/BoardCreation";
import LoadGame from "../helpers/load_game/LoadGame";
import GameActionSocketHandler from "../helpers/sockets/GameActionSocketHandler";
import SpecialActionSocketHandler from "../helpers/sockets/SpecialActionsSocketHandler";

export default class Game extends Phaser.Scene {
	static players_ids = []
	constructor() {
		super('Game');
		this.opponentCard = "https://res.cloudinary.com/wusinho1/image/upload/v1718770276/back_card_savana_d8rfgf.png"
	}

	preload(){
		this.load.image('defaultCardSprite', this.opponentCard );
		this.load.image('defaultOpponentSprite', this.opponentCard );
	}

	create(){
		this.GameActions = new GameActionSocketHandler(this);
		this.SpecialActions = new SpecialActionSocketHandler(this)
		this.LoadGame = new LoadGame(this);
		this.BoardCreation = new BoardCreation(this);
	}

	update(){

	}
}


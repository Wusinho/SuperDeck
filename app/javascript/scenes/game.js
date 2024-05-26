import CardHandler from "../helpers/CardHandler"
import DeckHandler from "../helpers/DeckHandler";
import InteractiveHandler from "../helpers/InteractiveHandler";
import BoardCreation from "../helpers/board_creation/BoardCreation";
import LoadGame from "../helpers/load_game/LoadGame";
import GameActions from "../helpers/game_action/GameActions";
import Zones from "../helpers/Zones";
import CardManager from "../helpers/CardManager";
// import SocketHandler from "../helpers/SocketHandler";

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
		this.CardHandler = new CardHandler();
		this.DeckHandler = new DeckHandler(this);
		this.LoadGame = new LoadGame(this);
		// this.SocketHandler = new SocketHandler(this);
		this.BoardCreation = new BoardCreation(this);
		// this.UIHandler.buildUI();
		this.InteractiveHandler = new InteractiveHandler(this);
		this.GameActions = new GameActions(this);
		this.CardManager = new CardManager(this);
		this.Zones = new Zones(this);
	}

	update(){

	}
}


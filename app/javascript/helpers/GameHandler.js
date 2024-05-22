import BoardHandler from "./BoardHandler";
import SocketHandler from "./SocketHandler";

export default class GameHandler {
	constructor(scene) {
		this.boardHandler = new BoardHandler(scene);
		scene.events.on("boardReceived", this.handleBoardReceived, this);
		this.gameState = 'Initializing';
		this.isMyTurn = false;
		this.topSite =  {
			username: '',
			hand: [],
			playzone: [],
			graveyard: [],
			exile: [],
			gameOver: false,
			index: 1,
		};
		this.leftSite =  {
			username: '',
			hand: [],
			playzone: [],
			graveyard: [],
			exile: [],
			gameOver: false,
			index: 2,
		};

		this.rightSite =  {
			username: '',
			hand: [],
			playzone: [],
			graveyard: [],
			exile: [],
			gameOver: false,
			index: 3,
		};

		this.bottomSite =  {
			username: '',
			hand: [],
			playzone: [],
			graveyard: [],
			exile: [],
			gameOver: false,
			index: 4,
		};

		this.currentUser = null

		this.changeTurn = () =>{
			this.isMyTurn = !this.isMyTurn;
			console.log('isMyTurn: ' + this.isMyTurn);
		}
		this.changeGameState = (gameState) =>{
			this.gameState = gameState;
			console.log('Game State: ' + this.gameState);
		}
	}

	handleBoardReceived(data) {
		console.log('handleBoardReceived');
		if ( this.currentUser === null) {
			this.currentUser = data[0];
		}

		const filtered_data = data[1].filter(opponent => opponent.id != this.currentUser.id);
		filtered_data.forEach(opponent => this.order_player_position(opponent))


		console.log(this.leftSite);
		console.log(this.currentUser);
		console.log(this.rightSite);
		console.log(this.topSite);
	}

	order_player_position(opponent){
		if(this.currentUser.order === 3){
			if (opponent.order === 1) {
				this.topSite = opponent
			} else if (opponent.order === 2) {
				this.leftSite = opponent
			} else {
				this.rightSite = opponent
			}
		} else {
			if ( this.currentUser.order - opponent.order === -1 ) {
				this.rightSite = opponent
			} else if (Math.abs(this.currentUser.order - opponent.order) === 2 ) {
				this.topSite = opponent
			} else {
				this.leftSite = opponent
			}
		}
	}

}
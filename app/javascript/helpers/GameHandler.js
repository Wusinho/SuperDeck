export default class GameHandler {
	constructor() {
		this.gameState = 'Initializing';
		this.isMyTurn = false;
		this.playerOne =  { hand: [],
			playzone: [],
			graveyard: [],
			exile: [],
			gameOver: false,
			index: 0
		};
		this.playerTwo =  { hand: [],
			playzone: [],
			graveyard: [],
			exile: [],
			gameOver: false,
			index: 1
		};

		this.playerThree =  { hand: [],
			playzone: [],
			graveyard: [],
			exile: [],
			gameOver: false,
			index: 2
		};

		this.playerFour =  { hand: [],
			playzone: [],
			graveyard: [],
			exile: [],
			gameOver: false,
			index: 3
		};

		this.changeTurn = () =>{
			this.isMyTurn = !this.isMyTurn;
			console.log('isMyTurn: ' + this.isMyTurn);
		}
		this.changeGameState = (gameState) =>{
			this.gameState = gameState;
			console.log('Game State: ' + this.gameState);
		}
	}
}
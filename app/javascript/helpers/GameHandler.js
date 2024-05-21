export default class GameHandler {
	constructor() {
		this.gameState = 'Initializing';
		this.isMyTurn = false;
		this.playerOne =  {
			username: '',
			hand: [],
			playzone: [],
			graveyard: [],
			exile: [],
			gameOver: false,
			index: '',
		};
		this.playerTwo =  {
			username: '',
			hand: [],
			playzone: [],
			graveyard: [],
			exile: [],
			gameOver: false,
			index: '',
		};

		this.playerThree =  {
			username: '',
			hand: [],
			playzone: [],
			graveyard: [],
			exile: [],
			gameOver: false,
			index: '',
		};

		this.playerFour =  {
			username: '',
			hand: [],
			playzone: [],
			graveyard: [],
			exile: [],
			gameOver: false,
			index: '',
		};

		this.currentUser = {
			username: '',
			hand: [],
			playzone: [],
			graveyard: [],
			exile: [],
			gameOver: false,
			index: '',
		}

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
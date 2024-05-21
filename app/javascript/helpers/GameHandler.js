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
			index: 1,
		};
		this.playerTwo =  {
			username: '',
			hand: [],
			playzone: [],
			graveyard: [],
			exile: [],
			gameOver: false,
			index: 2,
		};

		this.playerThree =  {
			username: '',
			hand: [],
			playzone: [],
			graveyard: [],
			exile: [],
			gameOver: false,
			index: 3,
		};

		this.playerFour =  {
			username: '',
			hand: [],
			playzone: [],
			graveyard: [],
			exile: [],
			gameOver: false,
			index: 4,
		};

		this.currentUser = {
			username: '',
			hand: [],
			playzone: [],
			graveyard: [],
			exile: [],
			gameOver: false,
			index: '',
			id: '',
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
export default class GameHandler {
	constructor() {
		this.gameState = 'Initializing';
		this.isMyTurn = false;
		this.playerDeck =  [];
		this.opponentDeck =  [];
		this.playerHand = [];
		this.opponentHand = [];
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
import LoadGameSocketHandler from "../sockets/LoadGameSocketHandler";
import CurrentPlayer from "../players/CurrentPlayer";
import LeftPlayer from "../players/LeftPlayer";
import RightPlayer from "../players/RightPlayer";
import TopPlayer from "../players/TopPlayer";
import Players from "../players/Players";

export default class LoadGame {
	constructor(scene) {
		new LoadGameSocketHandler(scene);
		this.players = new Players(scene);
		this.scene = scene;
		this.scene.events.on("loadGameReceived", this.handleBoardReceived, this);
		this.gameState = 'Initializing';

		this.isMyTurn = false;

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

		if ( this.players.currentPlayer === null) {
			this.players.addCurrentPlayer(new CurrentPlayer(this.scene, data[0]));
		}

		const onlyOpponents = this.players.filterOpponents(data[1])
		onlyOpponents.forEach(opponent => this.order_player_position(opponent))
	}

	order_player_position(opponent){
		let opponentOrder;
		let currentPlayerOrder = this.players.currentPlayer.order
		if(currentPlayerOrder === 3){
			if (opponent.order === 1) {
				opponentOrder = 'TOP';
			} else if (opponent.order === 2) {
				opponentOrder = 'LEFT'
			} else {
				opponentOrder = 'RIGHT';
			}
		} else {
			if ( currentPlayerOrder - opponent.order === -1 ) {
				opponentOrder = 'RIGHT'
			} else if (Math.abs(currentPlayerOrder - opponent.order) === 2 ) {
				opponentOrder = 'TOP'
			} else {
				opponentOrder = 'LEFT'
			}
		}
		this.players.addPlayer(opponentOrder, opponent);
	}
}
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
			this.players.addCurrenPlayer(new CurrentPlayer(this.scene, data[0]));
		}

		const filtered_data = this.players.onlyOpponentPlayer(data[1])
		filtered_data.forEach(opponent => this.order_player_position(opponent))
	}

	order_player_position(opponent){
		let player;
		let currentPlayerOrder = this.players.currentPlayer.order

		if(currentPlayerOrder === 3){
			if (opponent.order === 1) {
				player = new TopPlayer(this.scene, opponent);
			} else if (opponent.order === 2) {
				player = new LeftPlayer(this.scene, opponent);
			} else {
				player = new RightPlayer(this.scene, opponent);
			}
		} else {
			if ( currentPlayerOrder - opponent.order === -1 ) {
				player = new RightPlayer(this.scene, opponent);
			} else if (Math.abs(currentPlayerOrder - opponent.order) === 2 ) {
				player = new TopPlayer(this.scene, opponent);
			} else {
				player = new LeftPlayer(this.scene, opponent);
			}
		}
		this.players.addPlayer(player);
	}
}
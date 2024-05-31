import LoadGameSocketHandler from "../sockets/LoadGameSocketHandler";
import CurrentPlayer from "../players/CurrentPlayer";
import LeftPlayer from "../players/LeftPlayer";
import RightPlayer from "../players/RightPlayer";
import TopPlayer from "../players/TopPlayer";
import Players from "../players/Players";

export default class LoadGame {
	constructor(scene) {
		new LoadGameSocketHandler(scene);
		this.scene = scene;
		this.topSite =  null;
		this.leftSite =  null;
		this.rightSite = null;
		this.currentUser = null

		this.scene.events.on("boardReceived", this.handleBoardReceived, this);
		this.gameState = 'Initializing';

		this.isMyTurn = false;
		this.players = [];

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

		if ( this.scene.Players.currentPlayer === null) {
			this.scene.Players.addCurrenPlayer(new CurrentPlayer(this.scene, data[0]));
		}

		const filtered_data = this.scene.Players.onlyOpponentPlayer(data[1])
		filtered_data.forEach(opponent => this.order_player_position(opponent))
	}

	order_player_position(opponent){
		let player;
		let currentPlayerOrder = this.scene.Players.currentPlayer.order

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
		this.scene.Players.addPlayer(player);
	}
}
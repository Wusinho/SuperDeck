import BoardHandler from "./BoardHandler";
import SocketHandler from "./SocketHandler";

export default class GameHandler {
	constructor(scene) {
		this.boardHandler = new BoardHandler(scene);
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
		console.log(data[2])

		if ( this.currentUser === null) {
			this.currentUser = data[0];
			this.players.push(this.currentUser)
			this.scene.currentUserName = this.create_text(60,1020, this.currentUser.username)
				.setFontSize(14)
				.setFontFamily("Arial")
				.setInteractive();
		}

		const filtered_data = data[1].filter(opponent => opponent.id != this.currentUser.id);
		filtered_data.forEach(opponent => this.order_player_position(opponent))

	}

	order_player_position(opponent){
		if(this.currentUser.order === 3){
			if (opponent.order === 1) {
				this.topSite = opponent
				this.players.push(opponent)
				this.scene.topSiteName = this.create_text(800,200, opponent.username)
			} else if (opponent.order === 2) {
				this.leftSite = opponent
				this.players.push(opponent)
				this.scene.leftSiteName = this.create_text(50,255, opponent.username)
			} else {
				this.rightSite = opponent
				this.players.push(opponent)
				this.scene.rightSiteName = this.create_text(920,255, opponent.username)
			}
		} else {
			if ( this.currentUser.order - opponent.order === -1 ) {
				this.rightSite = opponent
				this.players.push(opponent)
				this.scene.rightSiteName = this.create_text(920,255, opponent.username)
			} else if (Math.abs(this.currentUser.order - opponent.order) === 2 ) {
				this.topSite = opponent
				this.players.push(opponent)
				this.scene.topSiteName = this.create_text(800,200, opponent.username)
			} else {
				this.leftSite = opponent
				this.players.push(opponent)
				this.scene.leftSiteName = this.create_text(50,255, opponent.username)
			}
		}
	}

	create_text(x,y,text) {
		return this.scene.add.text(x,y, text)
	}

}
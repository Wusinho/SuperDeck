import BoardHandler from "./BoardHandler";
import SocketHandler from "./SocketHandler";

export default class GameHandler {
	constructor(scene) {
		this.boardHandler = new BoardHandler(scene);
		this.scene = scene;
		this.scene.events.on("boardReceived", this.handleBoardReceived, this);
		this.gameState = 'Initializing';

		this.isMyTurn = false;

		this.topSite =  null;
		this.leftSite =  null;
		this.rightSite = null;
		this.currentUser = null

		this.players = [this.topSite, this.leftSite, this.rightSite, this.currentUser];

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
			console.log(this.currentUser)
			this.scene.currentUserName = this.create_text(50,1000, this.currentUser.username)
				.setFontSize(14)
				.setFontFamily("Arial")
				.setInteractive();
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
				this.scene.topSiteName = this.create_text(50,1000, opponent.username)
			} else if (opponent.order === 2) {
				this.leftSite = opponent
				this.scene.leftSiteName = this.create_text(50,200, opponent.username)
			} else {
				this.rightSite = opponent
				this.scene.rightSiteName = this.create_text(900,200, opponent.username)
			}
		} else {
			if ( this.currentUser.order - opponent.order === -1 ) {
				this.rightSite = opponent
				this.scene.rightSiteName = this.create_text(900,200, opponent.username)
			} else if (Math.abs(this.currentUser.order - opponent.order) === 2 ) {
				this.topSite = opponent
				this.scene.topSiteName = this.create_text(50,1000, opponent.username)
			} else {
				this.leftSite = opponent
				this.scene.leftSiteName = this.create_text(50,200, opponent.username)
			}
		}
	}

	create_text(x,y,text) {
		return this.scene.add.text(x,y, text)
	}

}
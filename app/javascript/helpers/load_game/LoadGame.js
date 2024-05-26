import LoadGameSocketHandler from "../sockets/LoadGameSocketHandler";
import CurrentPlayer from "../players/CurrentPlayer";
import LeftPlayer from "../players/LeftPlayer";
import RightPlayer from "../players/RightPlayer";
import TopPlayer from "../players/TopPlayer";

export default class LoadGame {
	constructor(scene) {
		this.boardHandler = new LoadGameSocketHandler(scene);
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

		if ( this.currentUser === null) {
			this.player = new CurrentPlayer(this.scene, data[0])
			console.log(this.player)
			this.currentUser = data[0];
			this.scene.currentUserName = this.create_text(50,1050, this.currentUser)
				.setFontSize(14)
				.setFontFamily("Arial")
				.setInteractive();

			let cards = this.currentUser.cards.hand
			this.addCardsToVerticalPlayers(cards, this.scene.currentUserHandArea.x, this.scene.currentUserHandArea.y, false)
		}

		const filtered_data = data[1].filter(opponent => opponent.id != this.currentUser.id);
		filtered_data.forEach(opponent => this.order_player_position(opponent))
	}

	order_player_position(opponent){
		let cards = opponent.cards.hand
		let x_axis = this.scene.topOpponentHandArea.x
		let y_axis = this.scene.topOpponentHandArea.y

		if(this.currentUser.order === 3){
			if (opponent.order === 1) {
				this.addCardsToVerticalPlayers(cards, x_axis, y_axis)
				this.scene.topSiteName = this.create_text(900,70, opponent)
			} else if (opponent.order === 2) {
				this.leftSite = opponent
				this.scene.CardManager.createVerticalOpponentCard(this.scene, cards,x_axis, y_axis)
				this.scene.leftSiteName = this.create_text(30,135, opponent)
			} else {
				this.rightSite = opponent
				this.scene.CardManager.createVerticalOpponentCard(this.scene, cards,x_axis, y_axis)
				this.scene.rightSiteName = this.create_text(1050,135, opponent)
			}
		} else {
			if ( this.currentUser.order - opponent.order === -1 ) {
				this.rightSite = opponent
				this.scene.CardManager.createVerticalOpponentCard(this.scene, cards,x_axis, y_axis)
				this.scene.rightSiteName = this.create_text(1050,135, opponent)
			} else if (Math.abs(this.currentUser.order - opponent.order) === 2 ) {
				this.topSite = opponent
				this.addCardsToVerticalPlayers(cards, x_axis, y_axis)
				this.scene.topSiteName = this.create_text(900,70, opponent)
			} else {
				this.leftSite = opponent
				this.scene.CardManager.createVerticalOpponentCard(this.scene, cards, x_axis, y_axis)
				this.scene.leftSiteName = this.create_text(30,135, opponent)
			}
		}
	}

	create_text(x,y,opponent) {
		this.players.push(opponent)
		return this.scene.add.text(x,y, opponent.username)
	}

	addCardsToVerticalPlayers = (cards = [], x, y, opponent = true) => {

		if (opponent){
			for (let i in cards) {
				this.scene.CardManager.createHorizontalOpponentCard(x * 0.17, y , i, 'defaultOpponentSprite')
			}
		} else {
			for (let i in cards) {
				this.scene.CardManager.createCurrentUserCard(x * 0.17, y, i, 'defaultCardSprite', cards[i]);
			}
		}
	};

}
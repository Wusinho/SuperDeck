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

		if ( this.currentUser === null) {
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
				this.addCardsToHorizontalPlayers(cards,x_axis, y_axis)
				this.scene.leftSiteName = this.create_text(30,135, opponent)
			} else {
				this.rightSite = opponent
				this.addCardsToHorizontalPlayers(cards,x_axis, y_axis)
				this.scene.rightSiteName = this.create_text(1050,135, opponent)
			}
		} else {
			if ( this.currentUser.order - opponent.order === -1 ) {
				this.rightSite = opponent
				this.addCardsToHorizontalPlayers(cards,x_axis, y_axis)
				this.scene.rightSiteName = this.create_text(1050,135, opponent)
			} else if (Math.abs(this.currentUser.order - opponent.order) === 2 ) {
				this.topSite = opponent
				this.addCardsToVerticalPlayers(cards, x_axis, y_axis)
				this.scene.topSiteName = this.create_text(900,70, opponent)
			} else {
				this.leftSite = opponent
				this.addCardsToHorizontalPlayers(cards, x_axis, y_axis)
				this.scene.leftSiteName = this.create_text(30,135, opponent)
			}
		}
	}

	create_text(x,y,opponent) {
		this.players.push(opponent)
		return this.scene.add.text(x,y, opponent.username)
	}

	addCardsToVerticalPlayers = (cards = [], x, y, opponent = true) => {

		for (let i in cards) {
			const spriteKey = opponent ? "defaultOpponentSprite" : "defaultCardSprite";
			const cardName = opponent ? "" : cards[i].name;
			this.createVerticalCard(x * 0.17, y , i, spriteKey);
		}
	};

	addCardsToHorizontalPlayers = (cards = [], x, y, opponent = true) => {

		for (let i in cards) {
			const cardName = opponent ? "" : cards[i].name;
			this.createHorizontalCard(x, y * 0.17, i);
		}
	};

	createVerticalCard = (x, y, i, spriteKey = 'defaultOpponentSprite', cardName = '' ) => {
		let value = 125 + (x * i) + (50)

		const card = this.scene.add.sprite(value, y, spriteKey).setInteractive();

		card.displayWidth = 100;
		card.displayHeight = 240;
	};

	createHorizontalCard = (x, y, i ) => {
		let value = 150 + (y * i) + (10*i);

		const card = this.scene.add.sprite(-44, value, 'defaultOpponentSprite').setInteractive();

		card.displayWidth = 100;
		card.displayHeight = 240;

		card.angle = 90;
	};

}
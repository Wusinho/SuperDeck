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
			this.scene.currentUserName = this.create_text(120,1050, this.currentUser)
				.setFontSize(14)
				.setFontFamily("Arial")
				.setInteractive();

			let cards = this.currentUser.cards.hand
			this.addCardsToCurrentUserHand(cards, false)
		}

		const filtered_data = data[1].filter(opponent => opponent.id != this.currentUser.id);
		filtered_data.forEach(opponent => this.order_player_position(opponent))
	}

	order_player_position(opponent){
		if(this.currentUser.order === 3){
			if (opponent.order === 1) {
				let cards = opponent.cards.hand
				this.addCardsToCurrentUserHand(cards, true)
				this.scene.topSiteName = this.create_text(900,70, opponent)
			} else if (opponent.order === 2) {
				this.leftSite = opponent
				this.scene.leftSiteName = this.create_text(30,135, opponent)
			} else {
				this.rightSite = opponent
				this.scene.rightSiteName = this.create_text(1050,135, opponent)
			}
		} else {
			if ( this.currentUser.order - opponent.order === -1 ) {
				this.rightSite = opponent
				this.scene.rightSiteName = this.create_text(1050,135, opponent)
			} else if (Math.abs(this.currentUser.order - opponent.order) === 2 ) {
				this.topSite = opponent
				let cards = opponent.cards.hand
				this.addCardsToCurrentUserHand(cards, true)
				this.scene.topSiteName = this.create_text(900,70, opponent)
			} else {
				this.leftSite = opponent
				this.scene.leftSiteName = this.create_text(30,135, opponent)
			}
		}
	}

	addCardsIfAny(cards, opponent = true){
		if (cards){
			this.addCardsToCurrentUserHand(cards.hand, opponent);
		} else {
			this.addCardsToCurrentUserHand([], opponent);
		}
	}


	create_text(x,y,opponent) {
		this.players.push(opponent)
		return this.scene.add.text(x,y, opponent.username)
	}

	addCardsToCurrentUserHand = (cards = [], opponent = true) => {
		const handAreaX = this.scene.currentUserHandArea.x - (this.scene.currentUserHandArea.width / 2);
		const handAreaY = this.scene.currentUserHandArea.y;
		for (let i in cards) {
			const spriteKey = opponent ? "defaultOpponentSprite" : "defaultCardSprite";
			this.createCardSprite(handAreaX, handAreaY, spriteKey, cards[i].name, i);
		}
	};

	createCardSprite = (x, y, spriteKey, cardName, i) => {
		const card = this.scene.add.sprite(0, 0, spriteKey).setInteractive();

		card.displayWidth = x + 100;
		card.displayHeight = 240;
		card.setOrigin(0.5);

		// Add a white border around the card
		const border = this.scene.add.rectangle(0, 0, this.cardWidth, this.cardHeight);
		border.setStrokeStyle(2, 0xffffff);
		border.setOrigin(0.5);

		// Add card name text
		const cardText = this.scene.add.text(0, 0, cardName, {
			fontSize: '14px',
			fill: '#fff',
			fontFamily: 'Arial'
		}).setOrigin(0.5, 1.5);

		let value = (x + 70+(115 * i))
		this.scene.add.container(value, y, [border, card, cardText]);
	};

}
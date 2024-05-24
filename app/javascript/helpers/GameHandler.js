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
			this.addCardsToVerticalPlayers(cards, this.scene.currentUserHandArea.x, this.scene.currentUserHandArea.y, false)
		}

		const filtered_data = data[1].filter(opponent => opponent.id != this.currentUser.id);
		filtered_data.forEach(opponent => this.order_player_position(opponent))
	}

	order_player_position(opponent){
		if(this.currentUser.order === 3){
			if (opponent.order === 1) {
				let cards = opponent.cards.hand
				this.addCardsToVerticalPlayers(cards,this.scene.topOpponentHandArea.x, this.scene.topOpponentHandArea.y, true)
				this.scene.topSiteName = this.create_text(900,70, opponent)
			} else if (opponent.order === 2) {
				this.leftSite = opponent
				let cards = opponent.cards.hand
				this.addCardsToHorizontalPlayers(cards,this.scene.leftOpponentHandArea.x, this.scene.leftOpponentHandArea.y, true)
				this.scene.leftSiteName = this.create_text(30,135, opponent)
			} else {
				this.rightSite = opponent
				let cards = opponent.cards.hand
				this.addCardsToHorizontalPlayers(cards,this.scene.rightOpponentHandArea.x, this.scene.rightOpponentHandArea.y, true)
				this.scene.rightSiteName = this.create_text(1050,135, opponent)
			}
		} else {
			if ( this.currentUser.order - opponent.order === -1 ) {
				this.rightSite = opponent
				let cards = opponent.cards.hand
				this.addCardsToHorizontalPlayers(cards,this.scene.rightOpponentHandArea.x, this.scene.rightOpponentHandArea.y, true)
				this.scene.rightSiteName = this.create_text(1050,135, opponent)
			} else if (Math.abs(this.currentUser.order - opponent.order) === 2 ) {
				this.topSite = opponent
				let cards = opponent.cards.hand
				this.addCardsToVerticalPlayers(cards,this.scene.topOpponentHandArea.x, this.scene.topOpponentHandArea.y, true)
				this.scene.topSiteName = this.create_text(900,70, opponent)
			} else {
				this.leftSite = opponent
				let cards = opponent.cards.hand
				this.addCardsToHorizontalPlayers(cards,this.scene.leftOpponentHandArea.x, this.scene.leftOpponentHandArea.y, true)
				this.scene.leftSiteName = this.create_text(30,135, opponent)
			}
		}
	}



	create_text(x,y,opponent) {
		this.players.push(opponent)
		return this.scene.add.text(x,y, opponent.username)
	}

	addCardsToVerticalPlayers = (cards = [], x, y, opponent = true) => {
		const handAreaX = x*0.17;

		for (let i in cards) {
			const spriteKey = opponent ? "defaultOpponentSprite" : "defaultCardSprite";
			const cardName = opponent ? "" : cards[i].name;
			this.createVerticalCard(handAreaX, y, spriteKey, cardName, i);
		}
	};

	addCardsToHorizontalPlayers = (cards = [], x, y, opponent = true) => {
		const handAreaY = y*0.17;

		for (let i in cards) {
			const spriteKey = opponent ? "defaultOpponentSprite" : "defaultCardSprite";
			const cardName = opponent ? "" : cards[i].name;
			this.createHorizontalCard(x, handAreaY, spriteKey, cardName, i);
		}
	};

	createVerticalCard = (x, y, spriteKey, cardName, i) => {
		let value = 125 + (x * i) + (50)

		const card = this.scene.add.sprite(value, y, spriteKey).setInteractive();

		// card.displayWidth = x + 60;
		card.displayWidth = 100;
		card.displayHeight = 240;

		// Add a white border around the card
		// const border = this.scene.add.rectangle(0, 0, this.cardWidth, this.cardHeight);
		// border.setStrokeStyle(2, 0xffffff);
		// border.setOrigin(0.5);

		// Add card name text
		// const cardText = this.scene.add.text(0, 0, cardName, {
		// 	fontSize: '14px',
		// 	fill: '#fff',
		// 	fontFamily: 'Arial'
		// })

	};

	createHorizontalCard = (x, y, spriteKey, cardName, i) => {

		let value = 150 + (y * i) + (10*i);

		const card = this.scene.add.sprite(-44, value, spriteKey).setInteractive();

		card.displayWidth = 100; // Set card width
		card.displayHeight = 240; // Set card height


		// Rotate the card by 90 degrees to make it horizontal
		card.angle = 90;

		// Add a white border around the card
		// const border = this.scene.add.rectangle(0, 0, this.cardHeight, this.cardWidth);
		// border.setStrokeStyle(2, 0xffffff);
		// border.setOrigin(0.5);
		// border.angle = 90; // Rotate the border to match the card

		// Add card name text
		// const cardText = this.scene.add.text(0, 0, cardName, {
		// 	fontSize: '14px',
		// 	fill: '#fff',
		// 	fontFamily: 'Arial'
		// }).setOrigin(0.5, 1.5);

		// Adjust the card position
	};

}
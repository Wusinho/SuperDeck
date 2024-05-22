import ZoneHandler from "./ZoneHandler";
import SocketHandler from "./SocketHandler";

export default class UIHandler {
	constructor(scene) {
		// this.zoneHandler = new ZoneHandler(scene);
		this.scene = scene;
		this.socketHandler = new SocketHandler(scene);
		window.uiHandler = this; // Make this instance accessible globally

		// this.buildZones();
		this.buildPlayerAreas();
		this.buildGameText();

		this.scene.events.on("socketReceived", this.handleSocketReceived, this);
	}

	buildZones = () => {
		this.scene.dropZone = this.zoneHandler.renderZone(470, 500);
		this.zoneHandler.renderOutline(this.scene.dropZone);
	};

	buildPlayerAreas = () => {
		// CURRENT USER
		this.scene.currentUserHandArea = this.scene.add.rectangle(550, 1200, 850, 230);
		this.scene.currentUserHandArea.setStrokeStyle(4, 0xff68b4);
		// this.scene.currentUserCementery = this.scene.add.rectangle(1000, 1200, 155, 215);
		// this.scene.currentUserCementery.setStrokeStyle(3, 0x00fff);


		// LEFT PLAYER
		this.scene.leftOpponentHandArea = this.scene.add.rectangle(-40, 500, 230 , 800 )
		this.scene.leftOpponentHandArea.setStrokeStyle(4, 0xff68b4);

		// RIGHT USER

		this.scene.rightOpponentHandArea = this.scene.add.rectangle(1150, 500, 230 , 800 )
		this.scene.rightOpponentHandArea.setStrokeStyle(4, 0xff68b4);

		// TOP PLAYER
		this.scene.topOpponentHandArea = this.scene.add.rectangle(550, -50, 850, 230);
		this.scene.topOpponentHandArea.setStrokeStyle(4, 0xff68b4);
		// this.scene.topOpponentCementery = this.scene.add.rectangle(1000, 135, 155, 215);
		// this.scene.topOpponentCementery.setStrokeStyle(3, 0x00fff);
	};

	buildGameText = () => {
		this.scene.dealCards = this.scene.add.text(500, 625, "Draw Card")
			.setFontSize(14)
			.setFontFamily("Arial")
			.setInteractive();

		this.scene.dealCards.on("pointerdown", this.handleDrawCardClick.bind(this));
	};

	handleDrawCardClick = () => {
		this.socketHandler.send({ action: "draw_card" });
	};

	handleSocketReceived = (data) => {
		let playersCard = this.scene.GameHandler.players.filter(player => player.id === data[0].id)
		let currentUser = this.scene.GameHandler.currentUser;
			this.addCardToHand(data, playersCard[0], currentUser);
	};

	addCardToHand = (data, playersCard, currentUser) => {
		let handAreaX;
		let handAreaY;
		let index;
		let spriteKey;

		if ( playersCard.id == currentUser.id ) {
			handAreaX = this.scene.currentUserHandArea.x - (this.scene.currentUserHandArea.width / 2);
			handAreaY = this.scene.currentUserHandArea.y;
			index = currentUser.cards.hand.length;
			currentUser.cards.hand.push(data[1])
			spriteKey = "defaultCardSprite";
			this.createCardSprite(handAreaX, handAreaY, spriteKey, data[1].name, index);

		} else {
			if ( Math.abs(playersCard.order - currentUser.order) ===2 ) {
				handAreaX = this.scene.topOpponentHandArea.x - (this.scene.topOpponentHandArea.width / 2);
				handAreaY = this.scene.topOpponentHandArea.y;
				spriteKey = "defaultOpponentSprite";
				index = playersCard.cards.hand.length;
				playersCard.cards.hand.push(data[1])
				this.createCardSprite(handAreaX, handAreaY * 0.17, spriteKey, '', index);
			} else if ( currentUser.order - playersCard.order === 1 || currentUser.order - playersCard.order === -3) {
				console.log('LEFT')
				handAreaX = this.scene.leftOpponentHandArea.x - (this.scene.leftOpponentHandArea.width / 2);
				handAreaY = this.scene.leftOpponentHandArea.y;
				spriteKey = "defaultOpponentSprite";
				index = playersCard.cards.hand.length;
				playersCard.cards.hand.push(data[1])

				this.createCardSpriteY(handAreaX, handAreaY * 0.17, spriteKey, '', index);

			} else {
				console.log('RIGHT')
				handAreaX = this.scene.rightOpponentHandArea.x - (this.scene.rightOpponentHandArea.width / 2);
				handAreaY = this.scene.rightOpponentHandArea.y;
				spriteKey = "defaultOpponentSprite";
				index = playersCard.cards.hand.length;
				console.log(index)
				playersCard.cards.hand.push(data[1])
				this.createCardSpriteY(handAreaX, handAreaY * 0.17, spriteKey, '', index);
			}
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

	createCardSpriteY = (x, y, spriteKey, cardName, i) => {
		const card = this.scene.add.sprite(0, 0, spriteKey).setInteractive();

		card.displayWidth = 240; // Set card width
		card.displayHeight = 100; // Set card height
		card.setOrigin(0.5);

		// Rotate the card by 90 degrees to make it horizontal
		card.angle = 90;

		// Add a white border around the card
		const border = this.scene.add.rectangle(0, 0, this.cardHeight, this.cardWidth);
		border.setStrokeStyle(2, 0xffffff);
		border.setOrigin(0.5);
		border.angle = 90; // Rotate the border to match the card

		// Add card name text
		const cardText = this.scene.add.text(0, 0, cardName, {
			fontSize: '14px',
			fill: '#fff',
			fontFamily: 'Arial'
		}).setOrigin(0.5, 1.5);

		// Adjust the card position
		let value = (y + 70 + (115 * i));
		this.scene.add.container(x, value, [border, card, cardText]);
	};


	dealCards = () => {
		// Your logic to deal cards goes here
		console.log("Dealing cards...");
	};
}

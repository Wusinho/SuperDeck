import ZoneHandler from "./ZoneHandler";
import SocketHandler from "./SocketHandler";
import gameChannel from "../channels/game_channel";

// Tablero
export default class UIHandler {
	constructor(scene) {
		this.zoneHandler = new ZoneHandler(scene);
		this.scene = scene
		window.uiHandler = this;

		this.socketHandler = new SocketHandler(scene);

		this.buildZones();
		this.buildPLayerAreas();
		this.buildGameText();
	}

	buildZones = () => {
		this.scene.dropZone = this.zoneHandler.renderZone(470, 500);
		this.zoneHandler.renderOutline(this.scene.dropZone)
	}

	buildPLayerAreas = () => {
		this.scene.playerHandArea = this.scene.add.rectangle(470, 860, 850, 230);
		this.scene.playerHandArea.setStrokeStyle(4, 0xff68b4);
		this.scene.playerDeckArea = this.scene.add.rectangle(1000, 860, 155, 215);
		this.scene.playerDeckArea.setStrokeStyle(3, 0x00fff);

		this.scene.opponentHandArea = this.scene.add.rectangle(470, 135, 850, 230);
		this.scene.opponentHandArea.setStrokeStyle(4, 0xff68b4);
		this.scene.opponentDeckArea = this.scene.add.rectangle(1000, 135, 155, 215);
		this.scene.opponentDeckArea.setStrokeStyle(3, 0x00fff);
	}

	buildGameText = () => {
		this.scene.dealCards = this.scene.add.text(960, 445, 'Draw Card')
			.setFontSize(14)
			.setFontFamily("Arial")
			.setInteractive();

		this.scene.dealCards.on('pointerdown', this.handleDrawCardClick.bind(this));

	}

	handleDealCardsClick = () => {
		console.log("Deal Cards clicked");
		// Add your logic to handle dealing cards here
	}

	handleDrawCardClick = () => {
		this.socketHandler.send({ action: "draw_card", data: "12345" });
		// gameChannel.send({ action: "draw_card", data: '12345' });
	}

	dealCards = () => {
		// Your logic to deal cards goes here
		console.log("Dealing cards...");
	}

	handleCardReceived = (data) => {
		console.log("Card received:", data);

		// console.log("Card received:", data);
		// Add the received card to the player's hand area
		this.addCardToHand(data);
	};

	addCardToHand = (cardData) => {
		const cardX = this.scene.playerHandArea.x + (this.scene.playerHandArea.width / 2);
		const cardY = this.scene.playerHandArea.y - 50;

		// Use the provided image_url or a default sprite key
		const spriteKey = cardData.image_url ? 'remoteCardImage' : 'defaultCardSprite';

		// If using a remote image, load it
		if (cardData.image_url) {
			this.scene.load.image('remoteCardImage', cardData.image_url);
			this.scene.load.once('complete', () => {
				this.createCardSprite(cardX, cardY, spriteKey, cardData.name);
			});
			this.scene.load.start();
		} else {
			this.createCardSprite(cardX, cardY, spriteKey, cardData.name);
		}
	};

	createCardSprite = (x, y, spriteKey, cardName) => {
		const card = this.scene.add.sprite(x, y, spriteKey).setInteractive();
		this.scene.input.setDraggable(card);

		// Add card name text
		const cardText = this.scene.add.text(0, 0, cardName, {
			fontSize: '14px',
			fill: '#fff',
			fontFamily: 'Arial'
		}).setOrigin(0.5);

		// Group the card and text together
		const cardContainer = this.scene.add.container(x, y, [card, cardText]);
		cardContainer.setSize(card.width, card.height);
		// this.scene.input.setDraggable(cardContainer);

		console.log("Card added to hand area:", cardContainer);
	};

}
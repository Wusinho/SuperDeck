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
		this.scene.playerHandArea = this.scene.add.rectangle(470, 1100, 850, 230);
		this.scene.playerHandArea.setStrokeStyle(4, 0xff68b4);
		this.scene.playerCementery = this.scene.add.rectangle(1000, 1100, 155, 215);
		this.scene.playerCementery.setStrokeStyle(3, 0x00fff);

		this.scene.opponentHandArea = this.scene.add.rectangle(470, 135, 850, 230);
		this.scene.opponentHandArea.setStrokeStyle(4, 0xff68b4);
		this.scene.opponentCementery = this.scene.add.rectangle(1000, 135, 155, 215);
		this.scene.opponentCementery.setStrokeStyle(3, 0x00fff);
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
		console.log("Card received:", data);
			this.addCardToHand(data);
	};

	addCardToHand = (cards) => {
		const handAreaX = this.scene.playerHandArea.x - (this.scene.playerHandArea.width / 2);
		const handAreaY = this.scene.playerHandArea.y;
		for (let i in cards) {
			const spriteKey = cards[i].image_url ? "remoteCardImage" : "defaultCardSprite";

				if (cards[i].image_url) {
					this.scene.load.image("remoteCardImage", cards[i].image_url);
					this.scene.load.once("complete", () => {
						this.createCardSprite(handAreaX, handAreaY, spriteKey, cards[i].name, i);
					});
					this.scene.load.start();
				} else {
					this.createCardSprite(handAreaX, handAreaY, spriteKey, cards[i].name, i);
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


	dealCards = () => {
		// Your logic to deal cards goes here
		console.log("Dealing cards...");
	};
}

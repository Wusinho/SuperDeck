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
		let player = this.scene.GameHandler.players.filter(player => player.id === data[0])
		// console.log( data)

			// this.addCardToHand(data);
	};

	addCardToHand = (cards) => {
		const handAreaX = this.scene.currentUserHandArea.x - (this.scene.currentUserHandArea.width / 2);
		const handAreaY = this.scene.currentUserHandArea.y;
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

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
			index = currentUser.cards.hand.length;
			currentUser.cards.hand.push(data[1])
			spriteKey = "defaultCardSprite";
			this.createVerticalCard(this.scene.currentUserHandArea.x * 0.17, this.scene.currentUserHandArea.y, spriteKey, data[1].name, index);

		} else {
			if ( Math.abs(playersCard.order - currentUser.order) ===2 ) {
				spriteKey = "defaultOpponentSprite";
				index = playersCard.cards.hand.length;
				playersCard.cards.hand.push(data[1])
				this.createVerticalCard(this.scene.topOpponentHandArea.x * 0.17, this.scene.topOpponentHandArea.y, spriteKey, '', index);
			} else if ( currentUser.order - playersCard.order === 1 || currentUser.order - playersCard.order === -3) {
				console.log('LEFT')
				spriteKey = "defaultOpponentSprite";
				index = playersCard.cards.hand.length;
				playersCard.cards.hand.push(data[1])

				this.createHorizontalCard(this.scene.leftOpponentHandArea.x, this.scene.leftOpponentHandArea.y *0.17, spriteKey, '', index);

			} else {
				console.log('RIGHT')
				spriteKey = "defaultOpponentSprite";
				index = playersCard.cards.hand.length;
				console.log(index)
				playersCard.cards.hand.push(data[1])
				this.createHorizontalCard(this.scene.rightOpponentHandArea.x, this.scene.rightOpponentHandArea.y*0.17, spriteKey, '', index);
			}
		}

	};

	createVerticalCard = (x, y, spriteKey, cardName, i) => {
		let value = 125 + (x * i) + (50)

		const card = this.scene.add.sprite(value, y, spriteKey).setInteractive();

		card.displayWidth = 100;
		card.displayHeight = 240;
	};

	createHorizontalCard = (x, y, spriteKey, cardName, i) => {
		let value = 150 + (y * i) + (10*i);

		const card = this.scene.add.sprite(-44, value, spriteKey).setInteractive();

		card.displayWidth = 100;
		card.displayHeight = 240;

		card.angle = 90;
	};


	dealCards = () => {
		// Your logic to deal cards goes here
		console.log("Dealing cards...");
	};
}

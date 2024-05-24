import ZoneHandler from "./ZoneHandler";
import SocketHandler from "./SocketHandler";
import { createCurrentUserCard, createVerticalOpponentCard, createHorizontalOpponentCard } from "./CardUtils";

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
		this.scene.currentUserHandArea = this.scene.add.rectangle(550, 1240, 850, 230).setStrokeStyle(4, 0xff68b4);
		this.scene.currentManaPool = this.scene.add.rectangle(550, 1070, 850, 100).setStrokeStyle(4, 0xff68b4)
		this.scene.currentUserPlayzone = this.scene.add.rectangle(550, 960, 850, 100).setStrokeStyle(4, 0xff68b4);


		// LEFT PLAYER
		this.scene.leftOpponentHandArea = this.scene.add.rectangle(-40, 500, 230 , 800 )
		this.scene.leftOpponentHandArea.setStrokeStyle(4, 0xff68b4);

		// RIGHT USER

		this.scene.rightOpponentHandArea = this.scene.add.rectangle(1150, 500, 230 , 800 )
		this.scene.rightOpponentHandArea.setStrokeStyle(4, 0xff68b4);

		// TOP PLAYER
		this.scene.topOpponentHandArea = this.scene.add.rectangle(550, -50, 850, 230);
		this.scene.topOpponentHandArea.setStrokeStyle(4, 0xff68b4);
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
		let index = playersCard.cards.hand.length;;
		currentUser.cards.hand.push(data[1])
		let x_axis = this.scene.currentUserHandArea.x;
		let y_axis = this.scene.currentUserHandArea.y;

		if ( playersCard.id == currentUser.id ) {
			createCurrentUserCard(this.scene, x_axis * 0.17, y_axis, index, 'defaultCardSprite', data[1].name, this.moveToZone.bind(this));
		} else {
			if ( Math.abs(playersCard.order - currentUser.order) ===2 ) {
				playersCard.cards.hand.push(data[1])
				createVerticalOpponentCard(x_axis * 0.17, y_axis, index);
			} else if ( currentUser.order - playersCard.order === 1 || currentUser.order - playersCard.order === -3) {
				playersCard.cards.hand.push(data[1])
				createHorizontalOpponentCard(x_axis, y_axis * 0.17, index);
			} else {
				playersCard.cards.hand.push(data[1])
				createHorizontalOpponentCard(x_axis, y_axis * 0.17, index);
			}
		}

	};

	moveToZone = (card, zone) => {
		if (zone === 'mana_pool') {
			card.x = this.scene.currentManaPool.x;
			card.y = this.scene.currentManaPool.y;
			console.log('Card moved to mana_pool');
		} else if (zone === 'playzone') {
			card.x = this.scene.currentUserPlayzone.x;
			card.y = this.scene.currentUserPlayzone.y;
			console.log('Card moved to playzone');
		}
	};
}

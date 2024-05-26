import DrawCardSocketHandler from "../sockets/DrawCardSocketHandler";
// import { createCurrentUserCard, createVerticalOpponentCard, createHorizontalOpponentCard } from "./CardUtils";

export default class BoardCreation {
	constructor(scene) {
		// this.zoneHandler = new ZoneHandler(scene);
		this.scene = scene;
		this.socketHandler = new DrawCardSocketHandler(scene);
		// window.uiHandler = this; // Make this instance accessible globally

		// this.buildZones();
		this.buildPlayerAreas();
		this.buildGameText();

		// this.scene.events.on("socketReceived", this.handleSocketReceived, this);
	}

	buildPlayerAreas = () => {
		// CURRENT USER
		this.scene.currentUserHandArea = this.build_rectangle(550, 1240, 850, 230);
		this.scene.currentManaPool = this.build_rectangle(550, 1070, 850, 100);
		this.scene.currentUserPlayzone = this.build_rectangle(550, 960, 850, 100);
		this.scene.currentUserExile = this.build_rectangle(1080, 975, 200, 140);
		this.scene.currentUserGraveyard = this.build_rectangle(1080, 1120, 200, 140)


		// LEFT PLAYER
		this.scene.leftOpponentHandArea = this.build_rectangle(-40, 500, 230 , 800 )

		// RIGHT USER

		this.scene.rightOpponentHandArea = this.build_rectangle(1150, 500, 230 , 800 )

		// TOP PLAYER
		this.scene.topOpponentHandArea = this.build_rectangle(550, -50, 850, 230);
	};

	build_rectangle = (a,b,c,d) => {
		return this.scene.add.rectangle(a,b,c,d).setStrokeStyle(4, 0xff68b4);
	}

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

	// handleSocketReceived = (data) => {
	// 	let playersCard = this.scene.LoadGame.players.filter(player => player.id === data[0].id)
	// 	let currentUser = this.scene.LoadGame.currentUser;
	// 	// this.addCardToHand(data, playersCard[0], currentUser);
	// };
	//
	// addCardToHand = (data, playersCard, currentUser) => {
	// 	let index = playersCard.cards.hand.length;;
	// 	currentUser.cards.hand.push(data[1])
	// 	let x_axis = this.scene.currentUserHandArea.x;
	// 	let y_axis = this.scene.currentUserHandArea.y;
	//
	// 	if ( playersCard.id == currentUser.id ) {
	// 		this.scene.CardManager.createCurrentUserCard(x_axis * 0.17, y_axis, index, 'defaultCardSprite', data[1]);
	// 	} else {
	// 		if ( Math.abs(playersCard.order - currentUser.order) ===2 ) {
	// 			playersCard.cards.hand.push(data[1])
	// 			this.scene.CardManager.createVerticalOpponentCard(x_axis * 0.17, y_axis, index);
	// 		} else if ( currentUser.order - playersCard.order === 1 || currentUser.order - playersCard.order === -3) {
	// 			playersCard.cards.hand.push(data[1])
	// 			this.scene.CardManager.createHorizontalOpponentCard(x_axis, y_axis * 0.17, index);
	// 		} else {
	// 			playersCard.cards.hand.push(data[1])
	// 			this.scene.CardManager.createHorizontalOpponentCard(x_axis, y_axis * 0.17, index);
	// 		}
	// 	}
	//
	// };
}

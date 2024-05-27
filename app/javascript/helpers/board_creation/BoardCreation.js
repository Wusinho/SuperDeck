import DrawCardSocketHandler from "../sockets/DrawCardSocketHandler";
// import { createCurrentUserCard, createVerticalOpponentCard, createHorizontalOpponentCard } from "./CardUtils";

export default class BoardCreation {
	constructor(scene) {
		// this.zoneHandler = new ZoneHandler(scene);
		this.scene = scene;
		this.socketHandler = new DrawCardSocketHandler(scene);

		// this.buildZones();
		this.buildPlayerAreas();
		this.buildGameText();

	}

	buildPlayerAreas() {
		const width = this.scene.game.config.width;
		const height = this.scene.game.config.height;
		const centerX = width / 2;
		const centerY = height / 2;

		// Bottom Player (Current Player)
		this.createPlayerZones(
			'currentPlayer',
			{ x: centerX, y: height - 50 },
			{ width: width, height: 100 }, // Hand Zone
			{ width: width, height: 50 },  // Mana Pool
			{ width: width, height: 100 }, // Play Zone
			{ x: width - 50, y: height - 250, width: 100, height: 100 }  // Graveyard
		);

		// Top Player
		this.createPlayerZones(
			'topPlayer',
			{ x: centerX, y: 50 },
			{ width: width, height: 100 }, // Hand Zone
			{ width: width, height: 50 },  // Mana Pool
			{ width: width, height: 100 }, // Play Zone
			{ x: 50, y: 250, width: 100, height: 100 }  // Graveyard
		);

		// Right Player
		this.createPlayerZones(
			'rightPlayer',
			{ x: width - 50, y: centerY },
			{ width: 100, height: height * 0.6 }, // Hand Zone
			{ width: 100, height: 50 },           // Mana Pool
			{ width: 100, height: height * 0.6 }, // Play Zone
			null                                  // No Graveyard for side players
		);

		// Left Player
		this.createPlayerZones(
			'leftPlayer',
			{ x: 50, y: centerY },
			{ width: 100, height: height * 0.6 }, // Hand Zone
			{ width: 100, height: 50 },           // Mana Pool
			{ width: 100, height: height * 0.6 }, // Play Zone
			null                                  // No Graveyard for side players
		);
	}

	createPlayerZones(player, centerPosition, handSize, manaPoolSize, playZoneSize, graveyard) {
		const { x, y } = centerPosition;

		// Hand Zone
		this.scene[`${player}HandArea`] = this.scene.add.rectangle(
			x, y - handSize.height / 2,
			handSize.width, handSize.height
		).setStrokeStyle(2, 0xff68b4);

		// Mana Pool
		this.scene[`${player}ManaPool`] = this.scene.add.rectangle(
			x, y - handSize.height - manaPoolSize.height / 2 - 10,
			manaPoolSize.width, manaPoolSize.height
		).setStrokeStyle(2, 0xff68b4);

		// Play Zone
		this.scene[`${player}Playzone`] = this.scene.add.rectangle(
			x, y - handSize.height - manaPoolSize.height - playZoneSize.height / 2 - 20,
			playZoneSize.width, playZoneSize.height
		).setStrokeStyle(2, 0xff68b4);

		if (graveyard) {
			// Graveyard
			this.scene[`${player}Graveyard`] = this.scene.add.rectangle(
				graveyard.x, graveyard.y,
				graveyard.width, graveyard.height
			).setStrokeStyle(2, 0xff68b4);
		}
	}


	// buildGameText = () => {
	// 	this.scene.dealCards = this.scene.add.text(500, 625, "Draw Card")
	// 		.setFontSize(14)
	// 		.setFontFamily("Arial")
	// 		.setInteractive();
	//
	// 	this.scene.dealCards.on("pointerdown", this.handleDrawCardClick.bind(this));
	// };
	//
	// handleDrawCardClick = () => {
	// 	this.socketHandler.send({ action: "draw_card" });
	// };

}

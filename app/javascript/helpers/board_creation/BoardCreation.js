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
		let currentPlayerZone= {
				center: {x: centerX, y: height},
				hand: { width: width, height: 100}, // Hand Zone
				pool: { width: width, height: 100},  // Mana Pool
				play_zone: { width: width, height: 100}, // Play Zone
				graveyard: { x: width - 50, y: height - 250, width: 100, height: 100},  // Graveyard
		}

		this.scene.currentPlayerHandArea = this.scene.add.rectangle(
			currentPlayerZone.center.x,
			currentPlayerZone.center.y - currentPlayerZone.hand.height / 2,
			currentPlayerZone.hand.width,
			currentPlayerZone.hand.height
		).setStrokeStyle(2, 0xff68b4);

		const smallPartBox = 200
		// Mana Pool
		this.scene.currentPlayerManaPoolArea = this.scene.add.rectangle(
			currentPlayerZone.center.x - 100,
			currentPlayerZone.center.y - currentPlayerZone.hand.height - currentPlayerZone.pool.height / 2 - 10,
			currentPlayerZone.pool.width - smallPartBox,
			currentPlayerZone.pool.height
		).setStrokeStyle(2, 0xff68b4);


		// Play Zone
		this.scene.currentPlayerPlayZoneArea = this.scene.add.rectangle(
			currentPlayerZone.center.x - 100,
			currentPlayerZone.center.y - currentPlayerZone.hand.height - currentPlayerZone.pool.height - currentPlayerZone.play_zone.height / 2 - 20,
			currentPlayerZone.play_zone.width - smallPartBox,
			currentPlayerZone.play_zone.height
		).setStrokeStyle(2, 0xff68b4);

		const totalCurrentUserHeight = currentPlayerZone.play_zone.height + currentPlayerZone.pool.height + currentPlayerZone.hand.height + 20

		this.scene.currentPlayerInformation = this.scene.add.rectangle(
			currentPlayerZone.center.x + (currentPlayerZone.play_zone.width - smallPartBox) / 2,
			currentPlayerZone.center.y - currentPlayerZone.hand.height - currentPlayerZone.pool.height - currentPlayerZone.play_zone.height / 2 - 20,
			currentPlayerZone.hand.width - (currentPlayerZone.play_zone.width - smallPartBox),
			currentPlayerZone.hand.height
		).setStrokeStyle(2, 0xff68b4);

		this.scene.currentPlayerGraveyardArea = this.scene.add.rectangle(
			currentPlayerZone.center.x + (currentPlayerZone.play_zone.width - smallPartBox) / 2,
			currentPlayerZone.center.y - currentPlayerZone.hand.height - currentPlayerZone.pool.height / 2 - 10,
			currentPlayerZone.hand.width - (currentPlayerZone.play_zone.width - smallPartBox),
			currentPlayerZone.hand.height
		).setStrokeStyle(2, 0xff68b4);

		const commonSides = 50
		const barWidth = 2
		const commonPlayGround = commonSides * barWidth

		let leftPlayerZone = {
			center: { x: commonSides, y: centerY },
			hand: { width: commonSides, height: height }, // Hand Zone
			pool: { width: commonPlayGround, height: height - commonPlayGround - 20 },           // Mana Pool
			play_zone: { width: commonPlayGround, height: height }, // Play Zone
		}
		const totalHeight = leftPlayerZone.pool.height - totalCurrentUserHeight;
		const partHeight = totalHeight / 3;

// User Information Area (top)
		this.scene.leftPlayerUserInfo = this.scene.add.rectangle(
			leftPlayerZone.center.x - leftPlayerZone.center.x / 2,
			leftPlayerZone.hand.width + partHeight / 2,  // Position near the top
			leftPlayerZone.hand.width,
			partHeight
		).setStrokeStyle(2, 0xff68b4);

// Hand Area (below User Info)
		this.scene.leftPlayerHandArea = this.scene.add.rectangle(
			leftPlayerZone.center.x - leftPlayerZone.center.x / 2,
			leftPlayerZone.hand.width + partHeight + partHeight / 2 + 10,  // Position below User Info
			leftPlayerZone.hand.width,
			partHeight
		).setStrokeStyle(2, 0xff68b4);

// Graveyard Area (below Hand Area)
		this.scene.leftPlayerGraveyardArea = this.scene.add.rectangle(
			leftPlayerZone.center.x - leftPlayerZone.center.x / 2,
			leftPlayerZone.hand.width + partHeight * 2 + partHeight / 2 + 20,  // Position below Hand Area
			leftPlayerZone.hand.width,
			partHeight
		).setStrokeStyle(2, 0xff68b4);

		this.scene.leftPlayerManaPoolArea = this.scene.add.rectangle(
			leftPlayerZone.center.x + leftPlayerZone.pool.width / 2 + 10  ,
			leftPlayerZone.center.y - (totalCurrentUserHeight/2) + commonSides + 10,
			leftPlayerZone.pool.width,
			leftPlayerZone.pool.height - totalCurrentUserHeight,
		).setStrokeStyle(2, 0xff68b4);

		this.scene.leftPlayerPlayZoneArea = this.scene.add.rectangle(
			leftPlayerZone.center.x + leftPlayerZone.pool.width + leftPlayerZone.play_zone.width / 2 + 20,
			leftPlayerZone.center.y - (totalCurrentUserHeight/2) + commonSides + 10,
			leftPlayerZone.pool.width,
			leftPlayerZone.pool.height - totalCurrentUserHeight,
		).setStrokeStyle(2, 0xff68b4);

		// Right Player
		let rightPlayerZone = {
		center: { x: width, y: centerY },
		hand: { width: commonSides, height: height }, // Hand Zone
		pool: { width: commonSides * 2, height: height - (commonSides *2) - 20 },           // Mana Pool
		play_zone: { width: commonSides * 2, height: height },
		}

		this.scene.rightPlayerUserInfo = this.scene.add.rectangle(
			rightPlayerZone.center.x - rightPlayerZone.hand.width / 2,
			leftPlayerZone.hand.width + partHeight / 2,  // Position near the top
			rightPlayerZone.hand.width,
			partHeight
		).setStrokeStyle(2, 0xff68b4);

// Hand Area (below User Info)
		this.scene.rightPlayerHandArea = this.scene.add.rectangle(
			rightPlayerZone.center.x - rightPlayerZone.hand.width / 2,
			leftPlayerZone.hand.width + partHeight + partHeight / 2 + 10,  // Position below User Info
			rightPlayerZone.hand.width,
			partHeight
		).setStrokeStyle(2, 0xff68b4);

// Graveyard Area (below Hand Area)
		this.scene.rightPlayerGraveyardArea = this.scene.add.rectangle(
			rightPlayerZone.center.x - rightPlayerZone.hand.width / 2,
			leftPlayerZone.hand.width + partHeight * 2 + partHeight / 2 + 20,   // Position below Hand Area
			rightPlayerZone.hand.width,
			partHeight
		).setStrokeStyle(2, 0xff68b4);

		this.scene.rightPlayerManaPoolArea = this.scene.add.rectangle(
			rightPlayerZone.center.x - rightPlayerZone.pool.width - 10,
			rightPlayerZone.center.y - (totalCurrentUserHeight/2) + commonSides + 10,
			rightPlayerZone.pool.width,
			rightPlayerZone.pool.height - totalCurrentUserHeight,
		).setStrokeStyle(2, 0xff68b4);

		this.scene.rightPlayerPlayZoneArea = this.scene.add.rectangle(
			rightPlayerZone.center.x - rightPlayerZone.hand.width - rightPlayerZone.pool.width - 20 - rightPlayerZone.play_zone.width / 2,
			rightPlayerZone.center.y - (totalCurrentUserHeight/2) + commonSides + 10,
			rightPlayerZone.pool.width,
			rightPlayerZone.pool.height - totalCurrentUserHeight,
		).setStrokeStyle(2, 0xff68b4);

		// Top Player
		let topPlayerZone = {
			center: { x: centerX, y: commonSides },
			hand: { width: width - 20, height: commonSides }, // Hand Zone
			pool: { width: width - 40, height: commonSides },  // Mana Pool
			play_zone: { width: width - 60, height: commonSides }, // Play Zone
			graveyard: { x: 50, y: 250, width: 100, height: 100 },  // Graveyard
		}

		this.scene.topPlayerHandArea = this.scene.add.rectangle(
			topPlayerZone.center.x,
			topPlayerZone.hand.height / 2,
			topPlayerZone.hand.width - ( topPlayerZone.hand.height*2 ),
			topPlayerZone.hand.height
		).setStrokeStyle(2, 0x219ebc);

		// Mana Pool
		this.scene.topPlayerManaPoolArea = this.scene.add.rectangle(
			topPlayerZone.center.x,
			(topPlayerZone.pool.height  +  topPlayerZone.pool.height / 2) + 10 ,
			topPlayerZone.pool.width - (topPlayerZone.pool.height*4),
			topPlayerZone.pool.height
		).setStrokeStyle(2, 0x219ebc);

		// Play Zone
		this.scene.topPlayerPlayZoneArea = this.scene.add.rectangle(
			topPlayerZone.center.x,
			(topPlayerZone.hand.height + topPlayerZone.pool.height + topPlayerZone.play_zone.height) + 20,
			topPlayerZone.play_zone.width - (topPlayerZone.play_zone.height*6) - (commonPlayGround * 2),
			(topPlayerZone.play_zone.height * 2)
		).setStrokeStyle(2, 0xff68b4);

	}

	addZoneLabel(zone, label) {
		const labelText = this.scene.add.text(zone.x, zone.y, label, {
			fontSize: '16px',
			fill: '#000'
		}).setOrigin(0.5);
	}


	buildGameText = () => {
		const width = this.scene.game.config.width;
		const height = this.scene.game.config.height;
		const centerX = width / 2;
		const centerY = height / 2;
		this.scene.dealCards = this.scene.add.text(centerX, centerY, "Draw Card")
			.setFontSize(14)
			.setFontFamily("Arial")
			.setInteractive();

		this.scene.dealCards.on("pointerdown", this.handleDrawCardClick.bind(this));
	};

	handleDrawCardClick = () => {
		this.socketHandler.send({ action: "draw_card" });
	};

}

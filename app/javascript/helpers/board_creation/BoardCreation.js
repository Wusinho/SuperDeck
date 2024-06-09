import DrawCardSocketHandler from "../sockets/DrawCardSocketHandler";
// import { createCurrentUserCard, createVerticalOpponentCard, createHorizontalOpponentCard } from "./CardUtils";

export default class BoardCreation {
	constructor(scene) {
		this.scene = scene;
		this.drawCardHandler = new DrawCardSocketHandler(scene);

		this.buildCardViewer();
		this.buildPlayerAreas();
		this.buildDrawButton();
	}

	buildCardViewer() {
		const width = this.scene.game.config.width;
		const height = this.scene.game.config.height;
		const centerX = width / 2;
		const centerY = height - (height / 2) - 100; // Position at the bottom third

		const cardViewerWidth = 400;
		const cardViewerHeight = 600;

		// Create a container to hold the viewer elements
		const cardViewerContainer = this.scene.add.container(centerX, centerY);

		// Create a semi-transparent background
		const background = this.scene.add.graphics();
		background.fillStyle(0x333333, 0.5); // Gray with 50% opacity
		background.fillRoundedRect(-cardViewerWidth / 2, -cardViewerHeight / 2, cardViewerWidth, cardViewerHeight, 15);

		// Add placeholder text
		const placeholderText = this.scene.add.text(0, 0, 'Card Viewer Placeholder', {
			fontSize: '24px',
			fontFamily: 'Arial',
			color: '#ffffff',
			align: 'center'
		}).setOrigin(0.5);

		// Add the background and text to the container
		cardViewerContainer.add([background, placeholderText]);

		// Store references for later use if needed
		this.cardViewerContainer = cardViewerContainer;
		this.cardViewerText = placeholderText;

		// Initially hide the card viewer
		this.cardViewerContainer.setVisible(false);
	}


	buildDrawButton = () => {
		const width = this.scene.game.config.width;
		const height = this.scene.game.config.height;
		const centerX = width / 2;
		const centerY = height - (height / 3) + 20;

		// Button dimensions
		const buttonWidth = 120;
		const buttonHeight = 40;

		// Create a graphics object for the button background
		const buttonBackground = this.scene.add.graphics();
		buttonBackground.fillStyle(0x008CBA, 1); // Button color (e.g., blue)
		buttonBackground.fillRoundedRect(centerX - buttonWidth / 2, centerY - buttonHeight / 2, buttonWidth, buttonHeight, 10); // Rounded corners

		// Create text for the button
		const buttonText = this.scene.add.text(centerX, centerY, "Draw Card", {
			fontSize: "14px",
			fontFamily: "Arial",
			color: "#ffffff" // Text color
		}).setOrigin(0.5);

		// Create a container to group the background and text
		const button = this.scene.add.container(0, 0, [buttonBackground, buttonText])
			.setInteractive(new Phaser.Geom.Rectangle(centerX - buttonWidth / 2, centerY - buttonHeight / 2, buttonWidth, buttonHeight), Phaser.Geom.Rectangle.Contains)
			.on('pointerdown', this.handleDrawCardClick.bind(this));

		// Add hover effect
		button.on('pointerover', () => {
			buttonBackground.clear();
			buttonBackground.fillStyle(0x005f75, 1); // Darker color on hover
			buttonBackground.fillRoundedRect(centerX - buttonWidth / 2, centerY - buttonHeight / 2, buttonWidth, buttonHeight, 10);
			this.scene.input.setDefaultCursor('pointer'); // Change cursor to pointer
		});

		button.on('pointerout', () => {
			buttonBackground.clear();
			buttonBackground.fillStyle(0x008CBA, 1); // Original color
			buttonBackground.fillRoundedRect(centerX - buttonWidth / 2, centerY - buttonHeight / 2, buttonWidth, buttonHeight, 10);
			this.scene.input.setDefaultCursor('default'); // Change cursor to default
		});
	};


	handleDrawCardClick = () => {
		this.drawCardHandler.send({ action: "draw_card" });
	};

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

		const totalWidth = topPlayerZone.hand.width - (topPlayerZone.hand.height * 2);
		const spacing = 10;
		const totalSpacing = 2 * spacing; // Two spaces between three sections
		const availableWidth = totalWidth - totalSpacing;
		const sectionWidth = availableWidth / 3;
		const sectionHeight = topPlayerZone.hand.height;

		const topX = topPlayerZone.center.x;
		const topY = topPlayerZone.hand.height / 2;

		const leftX = topX - sectionWidth - (spacing / 2);
		const middleX = topX;
		const rightX = topX + sectionWidth + (spacing / 2);

		this.scene.topPlayerHandArea = this.scene.add.rectangle(
			leftX,
			topY,
			sectionWidth,
			sectionHeight
		).setStrokeStyle(2, 0xeae2b7);

		this.scene.topPlayerUserInfo = this.scene.add.rectangle(
			middleX,
			topY,
			sectionWidth,
			sectionHeight
		).setStrokeStyle(2, 0x219ebc);

		this.scene.topPlayerGraveyardArea = this.scene.add.rectangle(
			rightX,
			topY,
			sectionWidth,
			sectionHeight
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
}

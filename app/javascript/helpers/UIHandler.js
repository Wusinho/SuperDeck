import ZoneHandler from "./ZoneHandler";
import gameChannel from "../channels/game_channel";

// Tablero
export default class UIHandler {
	constructor(scene) {
		this.zoneHandler = new ZoneHandler(scene);
		this.scene = scene
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

		// Debugging: Check if the interactive area is set
		// this.scene.dealCards.on('pointerover', () => console.log('Pointer over Draw Card'));
		// this.scene.dealCards.on('pointerout', () => console.log('Pointer out of Draw Card'));
		// this.scene.dealCards.on('pointerdown', () => console.log('Pointer down on Draw Card'));
	}

	handleDealCardsClick = () => {
		console.log("Deal Cards clicked");
		// Add your logic to handle dealing cards here
	}

	handleDrawCardClick = () => {
		gameChannel.send({ action: "draw_card", data: '12345' });
		// Add your logic to handle dealing cards here
	}

	dealCards = () => {
		// Your logic to deal cards goes here
		console.log("Dealing cards...");
	}
}
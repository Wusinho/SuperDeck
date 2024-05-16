import ZoneHandler from "./ZoneHandler";

export default class UIHandler {
	constructor(scene) {
		this.zoneHandler = new ZoneHandler(scene);

		this.buildZones = () => {
			scene.dropZone = this.zoneHandler.renderZone(470, 500);
			this.zoneHandler.renderOutline(scene.dropZone)
		}

		this.buildPLayerAreas = () => {
			scene.playerHandArea = scene.add.rectangle(470, 860, 850, 230);
			scene.playerHandArea.setStrokeStyle(4, 0xff68b4);
			scene.playerDeckArea = scene.add.rectangle(1000, 860, 155, 215);
			scene.playerDeckArea.setStrokeStyle(3, 0x00fff);

			scene.opponentHandArea = scene.add.rectangle(470, 135, 850, 230);
			scene.opponentHandArea.setStrokeStyle(4, 0xff68b4);
			scene.opponentDeckArea = scene.add.rectangle(1000, 135, 155, 215);
			scene.opponentDeckArea.setStrokeStyle(3, 0x00fff);
		}

		this.buildGameText = () => {
			scene.dealCards = scene.add.text(960, 445, 'Deal Cards').setFontSize(14).setFontFamily("Arial")
		}

		this.buildUI = () => {
			this.buildZones();
			this.buildPLayerAreas();
			this.buildGameText();

		}
	}
}
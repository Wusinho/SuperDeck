import ZoneHandler from "./ZoneHandler";

export default class UIHandler {
	constructor(scene) {
		this.zoneHandler = new ZoneHandler(scene);

		this.buildZones = () => {
			scene.dropZone = this.zoneHandler.renderZone(470, 500);
			this.zoneHandler.renderOutline(scene.dropZone)
		}

		this.buildGameText = () => {
			scene.dealCards = scene.add.text(960, 445, 'Deal Cards').setFontSize(14).setFontFamily("Arial")
		}

		this.buildUI = () => {
			this.buildZones();
			this.buildGameText();

		}
	}
}
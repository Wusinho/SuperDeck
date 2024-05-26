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

	buildPlayerAreas = () => {
		// CURRENT USER
		this.scene.currentUserHandArea = this.build_rectangle(550, 1240, 850, 230);
		this.scene.currentUserManaPool = this.build_rectangle(550, 1070, 850, 100);
		this.scene.currentUserPlayZone = this.build_rectangle(550, 960, 850, 100);
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

}

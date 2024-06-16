import Player from './Player';
import Card from "../cards/Card";
import {PlayerTypes} from "../PlayerTypes";

export default class LeftPlayer extends Player {
	constructor(scene, player) {
		super(scene, player);
		this.player_type = PlayerTypes.OPPONENT
		this.card_angle = 90
		this.card_spacing = 60
		this.createUserName();
		this.hand_size = {
			width: 150,
			height: 200,
		};
		this.other_zones = {
			width: 100,
			height: 100,
		};
		this.hand_area = this.scene.leftPlayerHandArea;
		this.mana_pool_area = this.scene.leftPlayerManaPoolArea;
		this.play_zone_area = this.scene.leftPlayerPlayZoneArea;
		this.graveyard_area = this.scene.leftPlayerGraveyardArea;
		this.addCardsToGame(player.cards);
	}

	createUserName() {
		let centerX = this.scene.leftPlayerUserInfo.x;
		let centerY = this.scene.leftPlayerUserInfo.y;
		this.scene.currentUserName = this.create_text(centerX, centerY, this.player_username)
			.setFontSize(14)
			.setFontFamily("Arial")
			.setInteractive();
	}

	updateHandSize() {
		const handSize = this.cards.hand.length;
		if (this.scene.leftPlayerHandSize) {
			// If the text object already exists, update its text
			this.scene.leftPlayerHandSize.setText(`${handSize}`);
		} else {
			// If the text object does not exist, create it
			let centerX = this.scene.leftPlayerHandArea.x;
			let centerY = this.scene.leftPlayerHandArea.y;

			this.scene.leftPlayerHandSize = this.create_text(centerX, centerY, `${handSize}`)
		}
	}

	updateCardPositions(zone) {
		let spacing = this.card_spacing ; // Spacing between cards
		let area = this.getAreaPosition(zone);

		this.cards[zone].forEach((card, index) => {
			if (zone !== 'hand') {
				card.y = (area.height - area.y) - ((area.height - area.y) / 2) + (index * spacing) + (spacing / 2);
				card.x = area.x;
			} else {
				card.y = area.y
				card.x = area.x
			}
		});
		this.updateHandSize()
	}

}

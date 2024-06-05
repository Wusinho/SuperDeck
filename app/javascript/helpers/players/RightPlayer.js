import Player from './Player';

export default class RightPlayer extends Player {
	constructor(scene, player) {
		super(scene, player);
		this.createUserName()
		this.hand_size = {
			width: 150,
			height: 200,
		}
		this.other_zones = {
			width: 100,
			height: 60,
		}
		this.addHandCardsToGame(player.cards.hand)
		this.addManaPoolCardsToGame(player.cards.mana_pool)
		this.addExileCardsToGame(player.cards.exile)
		this.addGraveyardCardsToGame(player.cards.graveyard)
		this.addPlayZoneCardsToGame(player.cards.play_zone)
	}

	createUserName(){
		let centerX = this.scene.rightPlayerUserInfo.x
		let centerY = this.scene.rightPlayerUserInfo.y
		this.scene.currentUserName = this.create_text(centerX,centerY, this.playerUsername)
			.setFontSize(14)
			.setFontFamily("Arial")
			.setInteractive();
	}

	updateHandSize() {
		const handSize = this.cards.hand.length;
		if (this.scene.rightPlayerHandSize) {
			// If the text object already exists, update its text
			this.scene.rightPlayerHandSize.setText(`${handSize}`);
		} else {
			// If the text object does not exist, create it
			let centerX = this.scene.rightPlayerHandArea.x;
			let centerY = this.scene.rightPlayerHandArea.y;

			this.scene.rightPlayerHandSize = this.create_text(centerX, centerY, `${handSize}`)
				.setFontSize(14)
				.setFontFamily("Arial")
				.setInteractive();
		}
	}

	getAreaPosition(zone) {
		let area;
		switch (zone) {
			case 'hand':
				area = this.scene.rightPlayerHandArea;
				break;
			case 'mana_pool':
				area = this.scene.rightPlayerManaPoolArea;
				break;
			case 'play_zone':
				area = this.scene.rightPlayerPlayZoneArea;
				break;
			case 'exile':
				area = this.scene.rightPlayerGraveyardArea;
				break;
			case 'graveyard':
				area = this.scene.rightPlayerGraveyardArea;
				break;
			default:
				console.error(`Unknown zone: ${zone}`);
				return { x: 0, y: 0 };
		}

		return { x: area.x, y: area.y, width: area.width, height: area.height };
	}
}
import Player from './Player';

export default class LeftPlayer extends Player {
	constructor(scene, player) {
		super(scene, player);
		this.createUserName();
		this.hand_size = {
			width: 150,
			height: 200,
		};
		this.other_zones = {
			width: 100,
			height: 60,
		};
		this.addHandCardsToGame(player.cards.hand);
		this.addManaPoolCardsToGame(player.cards.mana_pool);
		this.addExileCardsToGame(player.cards.exile);
		this.addGraveyardCardsToGame(player.cards.graveyard);
		this.addPlayZoneCardsToGame(player.cards.play_zone);
	}

	createUserName() {
		let centerX = this.scene.leftPlayerUserInfo.x;
		let centerY = this.scene.leftPlayerUserInfo.y;
		this.scene.currentUserName = this.create_text(centerX, centerY, this.playerUsername)
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
				.setFontSize(14)
				.setFontFamily("Arial")
				.setInteractive();
		}
	}


	getAreaPosition(zone) {
		let area;
		switch (zone) {
			case 'hand':
				area = this.scene.leftPlayerHandArea;
				break;
			case 'mana_pool':
				area = this.scene.leftPlayerManaPoolArea;
				break;
			case 'play_zone':
				area = this.scene.leftPlayerPlayZoneArea;
				break;
			case 'exile':
				area = this.scene.leftPlayerGraveyardArea;
				break;
			case 'graveyard':
				area = this.scene.leftPlayerGraveyardArea;
				break;
			default:
				console.error(`Unknown zone: ${zone}`);
				return { x: 0, y: 0 };
		}

		return { x: area.x, y: area.y, width: area.width, height: area.height };
	}

	createOpponentCard(cardData) {
		let initialPosition = this.getAreaPosition(cardData.zone);

		let cardCreated = this.scene.add.sprite(initialPosition.x, initialPosition.y, 'defaultCardSprite').setInteractive();
		cardCreated.card_id = cardData.player_card_id;
		cardCreated.zone = cardData.zone;
		cardCreated.action = cardData.action;

		if (cardData.zone === 'hand') {
			cardCreated.setVisible(false); // Make the card invisible if it's in the hand
		}

		this.cards[cardData.zone].push(cardCreated);
		this.updateCardPositions(cardData.zone);

		this.scene.load.image(`card-${cardData.player_card_id}`, cardData.image_url);
		this.scene.load.once('complete', () => {
			if (cardData.zone !== 'mana_pool') {
				cardCreated.setTexture(`card-${cardData.player_card_id}`);
			}

			let scale = this.calculateScale(cardCreated, cardData.zone);
			cardCreated.setScale(scale);

			this.updateCardPositions(cardData.zone);
		});
		this.scene.load.start();

		if (cardData.action === 'tapped') {
			cardCreated.angle = 90;
		}

		return cardCreated;
	}

	updateCardPositions(zone) {
		let spacing = 110; // Spacing between cards
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
	}
}

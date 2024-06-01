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
		const handSize = this.cards.hand.length

		this.scene.currentUserName = this.create_text(centerX,centerY, this.playerUsername)
			.setFontSize(14)
			.setFontFamily("Arial")
			.setInteractive();
		this.scene.rightPlayerHandSize = this.create_text(centerX, centerY + 40, handSize)
			.setFontSize(this.opponentCardFontSize)
			.setFontFamily("Arial")
			.setInteractive();
	}

	addHandCardsToGame(data) {
		data.forEach(card => {
			this.createOpponentCard(card);
		});
		this.updateHandSize();
	}

	updateHandSize() {
		const handSize = this.cards.hand.length;
		this.scene.rightPlayerHandSize.setText(`${handSize}`);
	}

	addManaPoolCardsToGame(data) {
		data.forEach(card => this.createOpponentCard(card));
	}

	addExileCardsToGame(data) {
		data.forEach(card => this.createOpponentCard(card));
	}

	addGraveyardCardsToGame(data) {
		data.forEach(card => this.createOpponentCard(card));
	}

	addPlayZoneCardsToGame(data) {
		data.forEach(card => this.createOpponentCard(card));
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

	moveOpponentCardToZone(card_id, newZone, oldZone) {
		let cardIndex = this.cards[oldZone].findIndex(card => card.card_id === card_id);
		console.log(this.cards)
		console.log(cardIndex)
		if (cardIndex !== -1) {
			let [card] = this.cards[oldZone].splice(cardIndex, 1);
			card.zone = newZone;

			if (newZone === 'hand') {
				card.setVisible(false); // Make the card invisible if it's in the hand
				this.cards.hand.push(card);
				this.updateHandSize();
				this.updateCardPositions(zone);
				return;
			}

			card.setVisible(true);

			if (newZone === 'mana_pool') {
				card.setTexture('defaultCardSprite');
			} else {
				this.scene.load.image(`card-${card.card_id}`, card.action.image_url);
				this.scene.load.once('complete', () => {
					card.setTexture(`card-${card.card_id}`);
				});
				this.scene.load.start();
			}
			this.cards[newZone].push(card);

			let scale = this.calculateScale(card, newZone);
			card.setScale(scale);

			this.updateCardPositions(newZone);
		}
	}

	updateCardPositions(zone) {
		let spacing = 110; // Spacing between cards
		let area = this.getAreaPosition(zone)

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

	calculateScale(card, zone) {
		let desiredWidth, desiredHeight;
		if (zone === 'hand') {
			desiredWidth = this.hand_size.width;
			desiredHeight = this.hand_size.height;
		} else {
			desiredWidth = this.other_zones.width;
			desiredHeight = this.other_zones.height;
		}

		// Get the original size of the card
		let originalWidth = card.width;
		let originalHeight = card.height;

		// Calculate the scale factor to maintain the aspect ratio
		return Math.min(desiredWidth / originalWidth, desiredHeight / originalHeight);
	}

}
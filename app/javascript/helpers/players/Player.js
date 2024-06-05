export default class Player {

	// userType 0 => self, 1 => opponent
	constructor(scene, player) {
		// new LoadGameSocketHandler(scene);
		this.scene = scene;
		this.playerId = player.id;
		this.playerUsername = player.username;
		this.order = player.order;
		this.life = player.life;
		this.cards = {
			hand: [],
			mana_pool: [],
			play_zone: [],
			exile: [],
			graveyard: []
		};
		this.opponentCardFontSize = 30;
	}

	create_text(x,y, text) {
		return this.scene.add.text(x,y, text )
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

	calculateScale(card, zone) {
		let desiredWidth, desiredHeight;
		if (zone === 'hand') {
			desiredWidth = this.hand_size.width;
			desiredHeight = this.hand_size.height;
		} else {
			desiredWidth = this.other_zones.width;
			desiredHeight = this.other_zones.height;
		}

		let originalWidth = card.width;
		let originalHeight = card.height;

		return Math.min(desiredWidth / originalWidth, desiredHeight / originalHeight);
	}

	addHandCardsToGame(data) {
		data.forEach(card => {
			this.createOpponentCard(card);
		});
		this.updateHandSize();
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

}

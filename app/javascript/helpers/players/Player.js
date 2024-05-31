import DrawCardSocketHandler from "../sockets/DrawCardSocketHandler";
import GameActionSocketHandler from "../sockets/GameActionSocketHandler";
import LoadGameSocketHandler from "../sockets/LoadGameSocketHandler";

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
		this.scene.events.on("socketReceived", this.handleDrawCardReceived, this);
		this.scene.events.on("gameActionsReceived", this.handleGameActionsReceived, this);
	}

	create_text(x,y, text) {
		return this.scene.add.text(x,y, text )
	}

	handleGameActionsReceived = data => {
		if (data.player_id !== this.playerId) return

		if (data.action) {
			// console.log(data)
		} else {
			this.moveCardToZone(data.card_id, data.new_zone)
		}
	}

	moveCardToZone(card_id, newZone) {

		for (let zone in this.cards) {
			let cardIndex = this.cards[zone].findIndex(card => card.card_id === card_id);
			console.log(cardIndex)
			console.log(this.playerUsername)
			if (cardIndex !== -1) {
				let [card] = this.cards[zone].splice(cardIndex, 1);
				card.zone = newZone;

				if (newZone === 'mana_pool') {
					card.setTexture('defaultCardSprite');
				} else {
					this.scene.load.image(`card-${card.card_id}`, card.action.image_url);
					this.scene.load.once('complete', () => {
						card.setTexture(`card-${card.card_id}`);
					});
					this.scene.load.start();
				}

				let scale = this.calculateScale(card, newZone);
				card.setScale(scale);
				this.cards[newZone].push(card);

				this.updateCardPositions(zone);
				this.updateCardPositions(newZone);
				break;
			}
		}
	}

	handleDrawCardReceived = data => {
		if (data.id !== this.playerId) return

		this.createCard(data.card)
	};

	createOpponentCard(cardData) {
		let scale;
		let img_url = cardData.image_url;
		let initialPosition = this.getAreaPosition(cardData.zone);

		let cardCreated = this.scene.add.sprite(initialPosition.x, initialPosition.y, 'defaultCardSprite').setInteractive();
		cardCreated.card_id = cardData.player_card_id;
		cardCreated.zone = cardData.zone;
		cardCreated.action = cardData.action;

		this.cards[cardData.zone].push(cardCreated);
		this.updateCardPositions(cardData.zone);

		this.scene.load.image(`card-${cardData.player_card_id}`, img_url);
		this.scene.load.once('complete', () => {
			// cardCreated.setTexture(`card-${cardData.player_card_id}`);

			if (cardData.zone !== 'mana_pool') {
				cardCreated.setTexture(`card-${cardData.player_card_id}`);
			}

			// Get the original size of the card
			let scale = this.calculateScale(cardCreated, cardData.zone);
			// Apply the scale to the card
			cardCreated.setScale(scale);

			// Update card positions after setting the texture
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
		let area = this.getAreaPosition(zone)

		this.cards[zone].forEach((card, index) => {
			card.x = area.x - (area.width / 2) + (index * spacing) + (spacing / 2);
			card.y = area.y;
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

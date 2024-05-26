import Player from './Player';
export default class CurrentPlayer extends Player {
	constructor(scene, player) {
		super(scene, player);
		this.hand_area_x_axis = this.scene.currentUserHandArea.x * 0.17
		this.hand_area_y_axis = this.scene.currentUserHandArea.y
		this.addNewCardsToHand = this.addNewCardsToHand.bind(this)
		this.scene.currentUserName = this.create_text(50,1050, this.playerUsername)
			.setFontSize(14)
			.setFontFamily("Arial")
			.setInteractive();
		this.hand = this.scene.currentUserHandArea;
		this.manaPool = this.scene.currentManaPool;
		this.playZone = this.scene.currentUserPlayzone;
		this.exile = this.scene.currentUserExile;
		this.graveyard = this.scene.currentUserGraveyard;
	}

	// addNewCardsToHandOnLoad(data){
	// 	for (let i in data) {
	// 		this.createCard(data[i])
	//
	// 	}
	// }

	addNewCardsToHand(){
		for (let i in this.playerHandCards) {
			// this.createCard(data[i])
			this.scene.CardManager.createCurrentUserCard(this.hand_area_x_axis, this.hand_area_y_axis, i, this.playerHandCards[i]);

		}
	}

	createCard(cardData) {
		let img_url = cardData.image_url;
		let cardCreated = this.scene.add.sprite(0, 0, 'defaultCardSprite').setInteractive();
		cardCreated.cardId = cardData.player_card_id;
		cardCreated.displayWidth = 100;
		cardCreated.displayHeight = 140;

		this.cards[cardCreated.cardId] = { sprite: cardCreated, zone: cardData.zone, index: Object.keys(this.cards).length };

		this.updateCardPositions();

		this.scene.load.image(`card-${cardData.id}`, img_url);
		this.scene.load.once('complete', () => {
			cardCreated.setTexture(`card-${cardData.id}`);
		});
		this.scene.load.start();

		cardCreated.on('pointerdown', (pointer) => {
			if (pointer.rightButtonDown()) {
				// Handle right-click (context menu, etc.)
				this.showContextMenu(pointer, cardCreated);
			} else if (pointer.leftButtonDown()) {
				cardCreated.angle += 90; // Rotate the card
			}
		});

		return cardCreated;
	}

	updateCardPositions() {
		let handArea = this.handArea;
		let cardsInHand = Object.values(this.cards).filter(card => card.zone === 'hand');

		cardsInHand.forEach((cardData, index) => {
			let card = cardData.sprite;
			card.x = handArea.x - (handArea.width / 2) + (index * 110) + 55; // Adjust spacing and centering
			card.y = handArea.y;
		});
	}

	moveCardToZone(cardId, zone) {
		let cardData = this.cards[cardId];
		if (!cardData) return;

		cardData.zone = zone;

		if (zone === 'mana_pool') {
			cardData.sprite.x = this.manaPool.x;
			cardData.sprite.y = this.manaPool.y;
		} else if (zone === 'playzone') {
			cardData.sprite.x = this.playZone.x;
			cardData.sprite.y = this.playZone.y;
		} else if (zone === 'exile') {
			cardData.sprite.x = this.exile.x;
			cardData.sprite.y = this.exile.y;
		} else if (zone === 'graveyard') {
			cardData.sprite.x = this.graveyard.x;
			cardData.sprite.y = this.graveyard.y;
		} else
			cardData.sprite.x = this.hand.x;
			cardData.sprite.y = this.hand.y;

		this.updateCardPositions();
	}

	showContextMenu(pointer, card) {
		const contextMenu = document.getElementById('context-menu');
		contextMenu.style.display = 'block';
		contextMenu.style.left = `${pointer.event.clientX}px`;
		contextMenu.style.top = `${pointer.event.clientY}px`;

		contextMenu.card = card;

		document.getElementById('play-in-mana-pool').onclick = () => {
			this.moveCardToZone(card.cardId, 'mana_pool');
			contextMenu.style.display = 'none';
		};

		document.getElementById('play-in-playzone').onclick = () => {
			this.moveCardToZone(card.cardId, 'playzone');
			contextMenu.style.display = 'none';
		};

		document.getElementById('play-in-playzone-flipped').onclick = () => {
			this.moveCardToZone(card.cardId, 'playzone');
			card.angle += 90; // Rotate the card when placing it in the playzone flipped
			contextMenu.style.display = 'none';
		};

		document.getElementById('play-in-hand').onclick = () => {
			this.moveCardToZone(card.cardId, 'hand');
			card.angle += 90; // Rotate the card when placing it in the playzone flipped
			contextMenu.style.display = 'none';
		};

		// Hide context menu when clicking outside
		document.addEventListener('click', (event) => {
			if (contextMenu.style.display === 'block' && !contextMenu.contains(event.target)) {
				contextMenu.style.display = 'none';
			}
		});

		// Prevent context menu from hiding when clicking inside
		contextMenu.addEventListener('click', (event) => {
			event.stopPropagation();
		});
	}

}

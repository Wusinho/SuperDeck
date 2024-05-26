import Player from './Player';
export default class CurrentPlayer extends Player {
	constructor(scene, player) {
		super(scene, player);
		// this.hand_area_x_axis = this.scene.currentUserHandArea.x * 0.17
		// this.hand_area_y_axis = this.scene.currentUserHandArea.y
		// this.addNewCardsToHand = this.addNewCardsToHand.bind(this)
		this.scene.currentUserName = this.create_text(50,1050, this.playerUsername)
			.setFontSize(14)
			.setFontFamily("Arial")
			.setInteractive();
		// this.hand = this.scene.currentUserHandArea;
		// this.manaPool = this.scene.currentManaPool;
		// this.playZone = this.scene.currentUserPlayzone;
		// this.exile = this.scene.currentUserExile;
		// this.graveyard = this.scene.currentUserGraveyard;
		// this.addNewCardsToHand();
	}

	addHandCardsToGame(data){
		for (let i in data) {
			this.createCard(data[i])
		}
	}

	addManaPoolCardsToGame(data){
		for (let i in data) {
			this.createCard(data[i])
		}
	}

	addExileCardsToGame(data){
		for (let i in data) {
			this.createCard(data[i])
		}
	}

	addGraveyardCardsToGame(data){
		for (let i in data) {
			this.createCard(data[i])
		}
	}

	addPlayZoneCardsToGame(data){
		for (let i in data) {
			this.createCard(data[i])
		}
	}

	createCard(cardData) {
		let img_url = cardData.image_url;
		let initialPosition = this.getAreaPosition(cardData.zone);

		let cardCreated = this.scene.add.sprite(initialPosition.x, initialPosition.y, 'defaultCardSprite').setInteractive();
		cardCreated.card_id = cardData.player_card_id;
		cardCreated.zone = cardData.zone;

		this.cards[cardData.zone].push(cardCreated);
		this.updateCardPositions(cardData.zone);

		this.scene.load.image(`card-${cardData.id}`, img_url);
		this.scene.load.once('complete', () => {
			cardCreated.setTexture(`card-${cardData.id}`);

			// Get the original size of the card
			let originalWidth = cardCreated.width;
			let originalHeight = cardCreated.height;

			// Set the desired width and height
			let desiredWidth = 100; // Adjust as needed
			let desiredHeight = 100; // Adjust as needed

			// Calculate the scale factor to maintain the aspect ratio
			let scale = Math.min(desiredWidth / originalWidth, desiredHeight / originalHeight);

			// Apply the scale to the card
			cardCreated.setScale(scale);

			// Update card positions after setting the texture
			this.updateCardPositions(cardData.zone);
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

	getAreaPosition(zone) {
		let area;
		switch (zone) {
			case 'hand':
				area = this.scene.currentUserHandArea;
				break;
			case 'mana_pool':
				area = this.scene.currentUserManaPool;
				break;
			case 'playzone':
				area = this.scene.currentUserPlayzone;
				break;
			case 'exile':
				area = this.scene.currentUserExile;
				break;
			case 'graveyard':
				area = this.scene.currentUserGraveyard;
				break;
			default:
				console.error(`Unknown zone: ${zone}`);
				return { x: 0, y: 0 };
		}

		return { x: area.x, y: area.y, width: area.width };
	}

	moveCardToZone(card_id, newZone) {
		for (let zone in this.cards) {
			let cardIndex = this.cards[zone].findIndex(card => card.card_id === card_id);
			if (cardIndex !== -1) {
				let [card] = this.cards[zone].splice(cardIndex, 1);
				card.zone = newZone;
				this.cards[newZone].push(card);
				this.updateCardPositions(zone);
				this.updateCardPositions(newZone);
				break;
			}
		}
	}

	updateCardPositions(zone) {
		let spacing = 110; // Spacing between cards
		let area = this.getAreaPosition(zone)

		this.cards[zone].forEach((card, index) => {
			card.x = area.x - (area.width / 2) + (index * spacing) + (spacing / 2);
			card.y = area.y;
		});
	}

	showContextMenu(pointer, card) {
		const contextMenu = document.getElementById('context-menu');
		contextMenu.style.display = 'block';
		contextMenu.style.left = `${pointer.event.clientX}px`;
		contextMenu.style.top = `${pointer.event.clientY}px`;

		contextMenu.card = card;

		document.getElementById('play-in-mana-pool').onclick = () => {
			this.moveCardToZone(card.card_id, 'mana_pool');
			this.scene.GameActions.send({ action: "change_zone", param: {player_card_id: card.card_id,
					new_zone: 'mana_pool'} });
			contextMenu.style.display = 'none';
		};

		document.getElementById('play-in-playzone').onclick = () => {
			this.moveCardToZone(card.card_id, 'playzone');
			this.scene.GameActions.send({ action: "change_zone", param: {player_card_id: card.card_id,
					new_zone: 'playzone'} });
			contextMenu.style.display = 'none';
		};

		document.getElementById('play-in-playzone-morph').onclick = () => {
			this.moveCardToZone(card.card_id, 'playzone');
			this.scene.GameActions.send({ action: "change_zone", param: {player_card_id: card.card_id,
					new_zone: 'playzone'} });
			contextMenu.style.display = 'none';
		};

		document.getElementById('play-in-graveyard').onclick = () => {
			this.moveCardToZone(card.card_id, 'graveyard');
			this.scene.GameActions.send({ action: "change_zone", param: {player_card_id: card.card_id,
					new_zone: 'graveyard'} });
			contextMenu.style.display = 'none';
		};

		document.getElementById('play-in-hand').onclick = () => {
			this.moveCardToZone(card.card_id, 'hand');
			this.scene.GameActions.send({ action: "change_zone", param: {player_card_id: card.card_id,
					new_zone: 'hand'} });
			contextMenu.style.display = 'none';
		};

		document.getElementById('play-in-exile').onclick = () => {
			this.moveCardToZone(card.card_id, 'exile');
			this.scene.GameActions.send({ action: "change_zone", param: {player_card_id: card.card_id,
					new_zone: 'exile'} });
			contextMenu.style.display = 'none';
		};

		document.addEventListener('click', (event) => {
			if (contextMenu.style.display === 'block' && !contextMenu.contains(event.target)) {
				contextMenu.style.display = 'none';
			}
		});

		contextMenu.addEventListener('click', (event) => {
			event.stopPropagation();
		});
	}

}

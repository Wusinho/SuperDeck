import Player from './Player';
import {get} from "@rails/request.js";

export default class CurrentPlayer extends Player {
	constructor(scene, player) {
		super(scene, player);
		this.createUserName()
		this.hand_size = {
			width: 150,
			height: 200,
		}
		this.other_zones = {
			width: 100,
			height: 100,
		}
		this.addHandCardsToGame(player.cards.hand)
		this.addManaPoolCardsToGame(player.cards.mana_pool)
		this.addExileCardsToGame(player.cards.exile)
		this.addGraveyardCardsToGame(player.cards.graveyard)
		this.addPlayZoneCardsToGame(player.cards.play_zone)
	}

	createUserName(){
		let centerX = this.scene.currentPlayerInformation.x
		let centerY = this.scene.currentPlayerInformation.y

		this.scene.currentUserName = this.create_text(centerX,centerY, this.playerUsername)
			.setFontSize(40)
			.setFontFamily("Arial")
			.setInteractive();
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
		let initialPosition = this.getAreaPosition(cardData.zone);

		let cardCreated = this.scene.add.sprite(initialPosition.x, initialPosition.y, 'defaultCardSprite').setInteractive();
		cardCreated.card_id = cardData.player_card_id;
		cardCreated.zone = cardData.zone;
		cardCreated.action = cardData.action;

		this.cards[cardData.zone].push(cardCreated);
		this.updateCardPositions(cardData.zone);

		this.scene.load.image(`card-${cardData.player_card_id}`, cardData.image_url);
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
			cardCreated.angle += 90;
		}

		cardCreated.on('pointerdown', (pointer) => {
			if (pointer.rightButtonDown()) {
				this.showContextMenu(pointer, cardCreated);
			} else if (pointer.leftButtonDown() && cardCreated.zone !== 'hand' ) {

				if (cardCreated.angle === 0) {
					cardCreated.angle = 90;
					this.scene.GameActions.send({ action: "change_action", param: { player_card_id: cardCreated.card_id,
							new_action: 'tapped', zone: cardCreated.zone } });
				} else {
					cardCreated.angle = 0;
					this.scene.GameActions.send({ action: "change_action", param: { player_card_id: cardCreated.card_id,
							new_action: 'normal', zone: cardCreated.zone } });
				}

			}
		});

		return cardCreated;
	}

	getAreaPosition(zone) {
		let area;
		switch (zone) {
			case 'hand':
				area = this.scene.currentPlayerHandArea;
				break;
			case 'mana_pool':
				area = this.scene.currentPlayerManaPoolArea;
				break;
			case 'play_zone':
				area = this.scene.currentPlayerPlayZoneArea;
				break;
			case 'exile':
				area = this.scene.currentPlayerGraveyardArea;
				break;
			case 'graveyard':
				area = this.scene.currentPlayerGraveyardArea;
				break;
			default:
				console.error(`Unknown zone: ${zone}`);
				return { x: 0, y: 0 };
		}

		return { x: area.x, y: area.y, width: area.width };
	}

	updateCardPositions(zone) {
		let spacing = 110; // Spacing between cards
		let area = this.getAreaPosition(zone)

		this.cards[zone].forEach((card, index) => {
			card.x = area.x - (area.width / 2) + (index * spacing) + (spacing / 2);
			card.y = area.y;
		});
	}

	moveCardToZone(card_id, newZone) {
		for (let zone in this.cards) {
			let cardIndex = this.cards[zone].findIndex(card => card.card_id === card_id);
			if (cardIndex !== -1) {
				let [card] = this.cards[zone].splice(cardIndex, 1);
				card.zone = newZone;

				if (newZone === 'mana_pool' ) {
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

		document.getElementById('play-in-play_zone').onclick = () => {
			this.moveCardToZone(card.card_id, 'play_zone');
			this.scene.GameActions.send({ action: "change_zone", param: {player_card_id: card.card_id,
					new_zone: 'play_zone'} });
			contextMenu.style.display = 'none';
		};

		document.getElementById('play-in-play_zone-morph').onclick = () => {
			this.moveCardToZone(card.card_id, 'play_zone');
			this.scene.GameActions.send({ action: "change_zone", param: {player_card_id: card.card_id,
					new_zone: 'play_zone'} });
			contextMenu.style.display = 'none';
		};

		document.getElementById('play-in-graveyard').onclick = () => {
			this.moveCardToZone(card.card_id, 'graveyard');
			this.scene.GameActions.send({ action: "change_zone", param: {player_card_id: card.card_id,
					new_zone: 'graveyard'} });
			if (card.action === 'tapped') card.angle = 0
			contextMenu.style.display = 'none';
		};

		document.getElementById('play-in-hand').onclick = () => {
			this.moveCardToZone(card.card_id, 'hand');
			this.scene.GameActions.send({ action: "change_zone", param: {player_card_id: card.card_id,
					new_zone: 'hand'} });
			if (card.action === 'tapped') card.angle = 0
			contextMenu.style.display = 'none';
		};

		document.getElementById('play-in-exile').onclick = () => {
			this.moveCardToZone(card.card_id, 'exile');
			this.scene.GameActions.send({ action: "change_zone", param: {player_card_id: card.card_id,
					new_zone: 'exile'} });
			if (card.action === 'tapped') card.angle = 0
			contextMenu.style.display = 'none';
		};

		document.getElementById('read-card').onclick = () => {
			const card_id = card.card_id
			const url = `/player_cards/${card_id}`

			get(url, {
				responseKind: "turbo-stream"
			})
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

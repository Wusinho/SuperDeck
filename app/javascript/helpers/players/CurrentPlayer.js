import Player from './Player';
import Card from '../cards/Card'
import { PlayerTypes } from "../PlayerTypes";
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
		this.addCardsToGame(player.cards);
	}

	createUserName(){
		let centerX = this.scene.currentPlayerInformation.x
		let centerY = this.scene.currentPlayerInformation.y

		this.scene.currentUserName = this.create_text(centerX,centerY, this.playerUsername)
			.setFontSize(40)
			.setFontFamily("Arial")
			.setInteractive();
	}

	addCardsToGame(cards) {
		Object.keys(cards).forEach(zone => {
			cards[zone].forEach(cardData => this.createCard(cardData, zone));
		});
	}

	createCard(cardData) {
		const initialPosition = this.getAreaPosition(cardData.zone);
		const initialAngle = this.getInitialAngle(cardData.zone);

		const card = new Card(
			this.scene,
			cardData,
			initialPosition,
			initialAngle,
			PlayerTypes.CURRENT,
			this.hand_size,
			this.other_zones
		);
		this.cards[cardData.zone].push(card);
		this.updateCardPositions(cardData.zone);

		return card;
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

	getInitialAngle(zone) {
		switch (zone) {
			case 'hand':
			case 'mana_pool':
			case 'play_zone':
			case 'exile':
			case 'graveyard':
				return 0; // Current player's cards are at angle 0
			default:
				return 0; // Default angle
		}
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
					this.scene.load.image(`card-${card.card_id}`, card.image_url);
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
			this.scene.GameActions.send({ action: "change_zone", param: {card_id: card.card_id,
					new_zone: 'mana_pool'} });
			contextMenu.style.display = 'none';
		};

		document.getElementById('play-in-play_zone').onclick = () => {
			this.moveCardToZone(card.card_id, 'play_zone');
			this.scene.GameActions.send({ action: "change_zone", param: {card_id: card.card_id,
					new_zone: 'play_zone'} });
			contextMenu.style.display = 'none';
		};

		document.getElementById('play-in-play_zone-morph').onclick = () => {
			this.moveCardToZone(card.card_id, 'play_zone');
			this.scene.GameActions.send({ action: "morphed_from_hand", param: { player_card_id: card.card_id,
					new_zone: 'play_zone', new_action: 'morphed'} });
			contextMenu.style.display = 'none';
		};

		document.getElementById('play-in-graveyard').onclick = () => {
			this.moveCardToZone(card.card_id, 'graveyard');
			this.scene.GameActions.send({ action: "change_zone", param: {card_id: card.card_id,
					new_zone: 'graveyard'} });
			if (card.action === 'tapped') card.angle = 0
			contextMenu.style.display = 'none';
		};

		document.getElementById('play-in-hand').onclick = () => {
			this.moveCardToZone(card.card_id, 'hand');
			this.scene.GameActions.send({ action: "change_zone", param: {card_id: card.card_id,
					new_zone: 'hand'} });
			if (card.action === 'tapped') card.angle = 0
			contextMenu.style.display = 'none';
		};

		document.getElementById('play-in-exile').onclick = () => {
			this.moveCardToZone(card.card_id, 'exile');
			this.scene.GameActions.send({ action: "change_zone", param: {card_id: card.card_id,
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

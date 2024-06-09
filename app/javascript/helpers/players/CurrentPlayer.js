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
		this.hand_area = this.scene.currentPlayerHandArea;
		this.mana_pool_area = this.scene.currentPlayerManaPoolArea;
		this.play_zone_area = this.scene.currentPlayerPlayZoneArea;
		this.graveyard_area = this.scene.currentPlayerGraveyardArea;
		this.addCardsToGame(player.cards);
	}

	// moveCardToZone(data) {
	// 	const card_id = data.card_id;
	// 	const newZone = data.new_zone;
	// 	const oldZone = data.old_zone;
	//
	// 	// Find the index of the card in the old zone
	// 	let cardIndex = this.cards[oldZone].findIndex(card => card.card_id === card_id);
	//
	// 	if (cardIndex !== -1) {
	// 		// Remove the card from the old zone
	// 		let [card] = this.cards[oldZone].splice(cardIndex, 1);
	// 		card.zone = newZone;
	//
	// 		if (newZone === oldZone) return
	// 		card.setVisible(false);
	//
	// 		this.cards[newZone].push(card);
	//
	// 		this.updateCardPositions(oldZone);
	// 		this.updateCardPositions(newZone);
	// 		card.loadCardTexture()
	//
	// 	} else {
	// 		console.error(`Card with ID ${card_id} not found in ${oldZone}`);
	// 	}
	// }

	createUserName(){
		let centerX = this.scene.currentPlayerInformation.x
		let centerY = this.scene.currentPlayerInformation.y

		this.scene.currentUserName = this.create_text(centerX,centerY, this.player_name)
			.setFontSize(40)
			.setFontFamily("Arial")
			.setInteractive();
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
				area = this.hand_area;
				break;
			case 'mana_pool':
				area = this.mana_pool_area;
				break;
			case 'play_zone':
				area = this.play_zone_area;
				break;
			case 'exile':
				area = this.graveyard_area;
				break;
			case 'graveyard':
				area = this.graveyard_area
				break;
			default:
				console.error(`Unknown zone: ${zone}`);
				return { x: 0, y: 0 };
		}

		return { x: area.x, y: area.y, width: area.width, height: area.height };
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

	showContextMenu(pointer, card) {
		const contextMenu = document.getElementById('context-menu');
		contextMenu.style.display = 'block';
		contextMenu.style.left = `${pointer.event.clientX}px`;
		contextMenu.style.top = `${pointer.event.clientY}px`;

		contextMenu.card = card;

		document.getElementById('play-in-mana-pool').onclick = () => {
			// this.moveCardToZone(card.card_id, 'mana_pool');
			this.scene.GameActions.send({ action: "change_zone", param: { card_id: card.card_id,
					new_zone: 'mana_pool'} });
			contextMenu.style.display = 'none';
		};

		document.getElementById('play-in-play_zone').onclick = () => {
			// this.moveCardToZone(card.card_id, 'play_zone');
			this.scene.GameActions.send({ action: "change_zone", param: { card_id: card.card_id,
					new_zone: 'play_zone'} });
			contextMenu.style.display = 'none';
		};

		document.getElementById('play-in-play_zone-morph').onclick = () => {
			// this.moveCardToZone(card.card_id, 'play_zone');
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

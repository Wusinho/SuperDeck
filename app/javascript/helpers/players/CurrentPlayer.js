import Player from './Player';
import { PlayerTypes } from "../PlayerTypes";

export default class CurrentPlayer extends Player {
	constructor(scene, player) {
		super(scene, player);
		this.player_type = PlayerTypes.CURRENT
		this.card_angle = 0
		this.card_spacing = 90
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

	createUserName(){
		let centerX = this.scene.currentPlayerInformation.x
		let centerY = this.scene.currentPlayerInformation.y

		this.scene.currentUserName = this.create_text(centerX,centerY, this.player_username)
			.setFontSize(40)
			.setFontFamily("Arial")
			.setInteractive();
	}

	// updateHandSize() {
	// 	const handSize = this.cards.hand.length;
	// 	if (this.scene.currentPlayerPlayerHandSize) {
	// 		// If the text object already exists, update its text
	// 		this.scene.currentPlayerPlayerHandSize.setText(`${handSize}`);
	// 	} else {
	// 		// If the text object does not exist, create it
	// 		let centerX = this.scene.currentPlayerHandArea.x;
	// 		let centerY = this.scene.currentPlayerHandArea.y;
	//
	// 		this.scene.currentPlayerPlayerHandSize = this.create_text(centerX, centerY, `${handSize}`)
	// 			.setFontSize(14)
	// 			.setFontFamily("Arial")
	// 			.setInteractive();
	// 	}
	// }

	updateCardPositions(zone) {
		let spacing = this.card_spacing; // Spacing between cards
		let area = this.getAreaPosition(zone)

		this.cards[zone].forEach((card, index) => {
			card.x = area.x - (area.width / 2) + (index * spacing) + (spacing / 2);
			card.y = area.y;
		});
		// this.updateHandSize()
	}

	showContextMenu(pointer, card) {
		const contextMenu = document.getElementById('context-menu');
		contextMenu.style.display = 'block';
		contextMenu.style.left = `${pointer.event.clientX}px`;
		contextMenu.style.top = `${pointer.event.clientY}px`;

		contextMenu.card = card;

		document.getElementById('play-in-mana-pool').onclick = () => {
			// this.moveCardToZone(card.card_id, 'mana_pool');
			this.scene.GameActions.send({ action: "change_zone", param: { player_card_id: card.player_card_id,
					new_zone: 'mana_pool'} });
			contextMenu.style.display = 'none';
		};

		document.getElementById('play-in-play_zone').onclick = () => {
			this.scene.GameActions.send({ action: "change_zone", param: { player_card_id: card.player_card_id,
					new_zone: 'play_zone'} });
			contextMenu.style.display = 'none';
		};

		document.getElementById('play-in-play_zone-morph').onclick = () => {
			const response = card.zone === 'play_zone' ? !card.morphed : true;
			this.scene.GameActions.send({ action: "morphed_from_hand", param: { player_card_id: card.player_card_id,
					new_zone: 'play_zone', morphed: response, tapped: card.tapped, old_zone: 'hand' } });
			contextMenu.style.display = 'none';
		};

		document.getElementById('play-in-graveyard').onclick = () => {
			this.scene.GameActions.send({ action: "change_zone", param: {player_card_id: card.player_card_id,
					new_zone: 'graveyard'} });
			contextMenu.style.display = 'none';
		};

		document.getElementById('play-in-hand').onclick = () => {
			this.scene.GameActions.send({
				action: "change_zone",
				param: {
					player_card_id: card.player_card_id,
					new_zone: 'hand'
				}
			});
			contextMenu.style.display = 'none';
		};

		document.getElementById('play-in-exile').onclick = () => {
			this.moveCardToZone(card.player_card_id, 'exile');
			this.scene.GameActions.send({ action: "change_zone", param: {player_card_id: card.player_card_id,
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

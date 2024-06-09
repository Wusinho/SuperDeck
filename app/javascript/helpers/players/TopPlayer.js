import Player from './Player';
import Card from "../cards/Card";
import {PlayerTypes} from "../PlayerTypes";

export default class TopPlayer extends Player {
	constructor(scene, player){
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
		this.hand_area = this.scene.topPlayerHandArea;
		this.mana_pool_area = this.scene.topPlayerManaPoolArea;
		this.play_zone_area = this.scene.topPlayerPlayZoneArea;
		this.graveyard_area = this.scene.topPlayerGraveyardArea;
		this.addCardsToGame(player.cards);
	}

	createUserName(){
		let centerX = this.scene.topPlayerUserInfo.x
		let centerY = this.scene.topPlayerUserInfo.y
		this.scene.currentUserName = this.create_text(centerX,centerY, this.player_name)
			.setFontSize(14)
			.setFontFamily("Arial")
			.setInteractive();
	}

	updateHandSize() {
		const handSize = this.cards.hand.length;
		if (this.scene.topPlayerHandSize) {
			// If the text object already exists, update its text
			this.scene.topPlayerHandSize.setText(`${handSize}`);
		} else {
			// If the text object does not exist, create it
			let centerX = this.scene.topPlayerHandArea.x;
			let centerY = this.scene.topPlayerHandArea.y;

			this.scene.topPlayerHandSize = this.create_text(centerX, centerY, `${handSize}`)
		}
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

	createCard(cardData) {
		const initialPosition = this.getAreaPosition(cardData.zone);
		const initialAngle = this.getInitialAngle(cardData.zone);

		const card = new Card(
			this.scene,
			cardData,
			initialPosition,
			initialAngle,
			PlayerTypes.OPPONENT,
			this.hand_size,
			this.other_zones
		);
		this.cards[cardData.zone].push(card);
		this.updateCardPositions(cardData.zone);

		return card;
	}

	updateCardPositions(zone) {
		let spacing = 110; // Spacing between cards
		let area = this.getAreaPosition(zone)

		this.cards[zone].forEach((card, index) => {
			if (zone !== 'hand') {
				card.x = area.x - (area.width / 2) + (index * spacing) + (spacing / 2);
				card.y = area.y;
			} else {
				card.x = area.x
				card.y = area.y
			}
		});
	}

	getInitialAngle(zone) {
		switch (zone) {
			case 'hand':
			case 'mana_pool':
			case 'play_zone':
			case 'exile':
			case 'graveyard':
				return -90; // Current player's cards are at angle 0
			default:
				return 0; // Default angle
		}
	}

	moveOpponentCardToZone(data) {
		const card_id = data.card_id;
		const newZone = data.new_zone;
		const oldZone = data.old_zone;

		// Find the index of the card in the old zone
		let cardIndex = this.cards[oldZone].findIndex(card => card.card_id === card_id);

		if (cardIndex !== -1) {
			// Remove the card from the old zone
			let [card] = this.cards[oldZone].splice(cardIndex, 1);
			card.zone = newZone;

			if (newZone === oldZone) return
			console.log(card)
			card.setVisible(false);

			this.cards[newZone].push(card);

			this.updateCardPositions(oldZone);
			this.updateCardPositions(newZone);
			card.loadCardTexture()

		} else {
			console.error(`Card with ID ${card_id} not found in ${oldZone}`);
		}
	}

}
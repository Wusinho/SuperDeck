import Card from "../cards/Card";
import {PlayerTypes} from "../PlayerTypes";

export default class Player {

	// userType 0 => self, 1 => opponent
	constructor(scene, player) {
		this.scene = scene;
		this.player_id = player.id;
		this.player_name = player.username;
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
		return this.scene.add.text(x,y, text ).setFontSize(this.opponentCardFontSize)
			.setFontFamily("Arial")
			.setInteractive();
	}

	addCardsToGame(cards) {
		Object.keys(cards).forEach(zone => {
			cards[zone].forEach(cardData => this.createCard(cardData));
		});
	}

	getPlayerType(){
		return this.player_type;
	}

	getHandSize(){
		return this.hand_size;
	}

	getOtherZones(){
		return this.other_zones;
	}

	createCard(cardData) {
		const initialPosition = this.getAreaPosition(cardData.zone);
		const initialAngle = this.getInitialAngle(cardData.zone);

		const card = new Card(
			this.scene,
			cardData,
			initialPosition,
			initialAngle,
			this.getPlayerType(),
			this.getHandSize(),
			this.getOtherZones()
		);
		this.cards[cardData.zone].push(card);
		this.updateCardPositions(cardData.zone);

		return card;
	}

	moveCardToZone(data) {
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
			card.setVisible(false);

			this.cards[newZone].push(card);

			this.updateCardPositions(oldZone);
			this.updateCardPositions(newZone);
			card.loadCardTexture()

		} else {
			console.error(`Card with ID ${card_id} not found in ${oldZone}`);
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

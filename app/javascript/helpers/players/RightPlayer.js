import Player from './Player';
import Card from '../cards/Card'
import { PlayerTypes } from "../PlayerTypes";

export default class RightPlayer extends Player {
	constructor(scene, player) {
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
		this.addCardsToGame(player.cards);
	}

	addCardsToGame(cards) {
		Object.keys(cards).forEach(zone => {
			cards[zone].forEach(cardData => this.createCard(cardData));
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

	createUserName(){
		let centerX = this.scene.rightPlayerUserInfo.x
		let centerY = this.scene.rightPlayerUserInfo.y
		this.scene.currentUserName = this.create_text(centerX,centerY, this.playerUsername)
	}

	updateHandSize() {
		const handSize = this.cards.hand.length;
		if (this.scene.rightPlayerHandSize) {
			// If the text object already exists, update its text
			this.scene.rightPlayerHandSize.setText(`${handSize}`);
		} else {
			// If the text object does not exist, create it
			let centerX = this.scene.rightPlayerHandArea.x;
			let centerY = this.scene.rightPlayerHandArea.y;

			this.scene.rightPlayerHandSize = this.create_text(centerX, centerY, `${handSize}`)
				.setFontSize(14)
				.setFontFamily("Arial")
				.setInteractive();
		}
	}

	getAreaPosition(zone) {
		let area;
		switch (zone) {
			case 'hand':
				area = this.scene.rightPlayerHandArea;
				break;
			case 'mana_pool':
				area = this.scene.rightPlayerManaPoolArea;
				break;
			case 'play_zone':
				area = this.scene.rightPlayerPlayZoneArea;
				break;
			case 'exile':
				area = this.scene.rightPlayerGraveyardArea;
				break;
			case 'graveyard':
				area = this.scene.rightPlayerGraveyardArea;
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
			if (zone !== 'hand') {
				card.y = (area.height - area.y) - ((area.height - area.y) / 2) + (index * spacing) + (spacing / 2);
				card.x = area.x;
			} else {
				card.y = area.y
				card.x = area.x
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
}
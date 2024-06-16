import Card from "../cards/Card";
import {PlayerTypes} from "../PlayerTypes";

export default class Player {

	// userType 0 => self, 1 => opponent
	constructor(scene, player) {
		this.scene = scene;
		this.player_id = player.player_id;
		this.player_username = player.username;
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

	getCardAngle(){
		return this.card_angle;
	}

	getPlayerId(){
		return this.player_id;
	}

	getInitialAngle(zone) {
		switch (zone) {
			case 'hand':
			case 'mana_pool':
			case 'play_zone':
			case 'exile':
			case 'graveyard':
				return this.getCardAngle(); // Current player's cards are at angle 0
			default:
				return 0; // Default angle
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
			this.getPlayerId(),
			cardData.current_holder_id,
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

	cardTransaction(data) {
		const player_card_id = data.player_card_id;
		const newZone = data.new_zone;
		const oldZone = data.old_zone;

		// Find the index of the card in the old zone
		let cardIndex = this.cards[oldZone].findIndex(card => card.player_card_id === player_card_id);

		if (cardIndex === -1) {
			console.log(`Cant find Card with ID ${player_card_id}`);
			return
		}

			if (newZone !== oldZone) {
				let [card] = this.cards[oldZone].splice(cardIndex, 1);
				card.zone = newZone;
				card.morphed = data.morphed;
				card.tapped = data.tapped;

				card.setVisible(false);

				this.cards[newZone].push(card);

				this.updateCardPositions(oldZone);
				this.updateCardPositions(newZone);
				card.loadCardTexture()

			} else {
				let card = this.cards[oldZone][cardIndex]
				card.morphed = data.morphed;
				card.tapped = data.tapped;
				card.loadCardTexture()
			}


	}

	specialCardTransaction = (data, old_holder) => {
		const player_card_id = data.player_card_id;
		const newZone = data.new_zone;
		const oldZone = data.old_zone;

		let cardIndex = old_holder.cards[oldZone].findIndex(card => card.player_card_id === player_card_id);
		if (cardIndex === -1) {
			console.log(`Card with ID not found in ${player_card_id}, method SpecialCardTransaction`);
			return
		}

		let [card] = old_holder.cards[oldZone].splice(cardIndex, 1);
		old_holder.updateCardPositions(oldZone);
		card.updateNewHolder(this.player_id,
												 this.getCardAngle(),
												 this.getHandSize(),
												 this.getOtherZones() )

		this.cards[newZone].push(card);
		card.loadCardTexture()
		this.updateCardPositions(newZone);
	}

	showOpponentMenu(pointer, card) {
		const contextMenu = document.getElementById('opponent-menu');
		contextMenu.style.display = 'block';
		contextMenu.style.left = `${pointer.event.clientX}px`;
		contextMenu.style.top = `${pointer.event.clientY}px`;

		contextMenu.card = card;

		let liElement = document.getElementById('play-in-rob')
		liElement.innerHTML = card.inManaPool() ? 'Robar Tierra' : `Robar ${card.card_name}`;


		document.getElementById('play-in-rob').onclick = () => {
			this.scene.SpecialActions.send({ action: "special_action", param: { player_card_id: card.player_card_id,
					current_holder_id: card.current_holder_id, zone: card.zone, current_player_id: this.scene.LoadGame.players.currentPlayer.player_id } });
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

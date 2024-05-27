import DrawCardSocketHandler from "../sockets/DrawCardSocketHandler";
import GameActionSocketHandler from "../sockets/GameActionSocketHandler";
import LoadGameSocketHandler from "../sockets/LoadGameSocketHandler";

export default class Player {

	// userType 0 => self, 1 => opponent
	constructor(scene, player) {
		// new LoadGameSocketHandler(scene);
		this.scene = scene;
		this.playerId = player.id;
		this.playerUsername = player.username;
		this.order = player.order;
		this.life = player.life;
		this.cards = {
			hand: [],
			mana_pool: [],
			play_zone: [],
			exile: [],
			graveyard: []
		};
		this.handleHandCards(player.cards.hand)
		this.handleManaPoolCards(player.cards.mana_pool)
		this.handleExileCards(player.cards.exile)
		this.handleGraveyardCards(player.cards.graveyard)
		this.handlePlayZoneCards(player.cards.play_zone)
		this.scene.events.on("socketReceived", this.handleDrawCardReceived, this);
		this.scene.events.on("gameActionsReceived", this.handleGameActionsReceived, this);
	}

	create_text(x,y) {
		return this.scene.add.text(x,y, this.playerUsername )
	}

	handleGameActionsReceived = data => {
		if (data.player_id === this.playerId) return

		if (data.action) {
			console.log(data)
			// this.changeAction(data)
		} else {
			this.moveCardToZone(data.card_id, data.new_zone)
		}
	}

	handleHandCards = cards => {
		this.addHandCardsToGame(cards)
	};

	handleManaPoolCards = cards => {
		this.addManaPoolCardsToGame(cards)
	};

	handleExileCards = cards => {
		this.addExileCardsToGame(cards)
	}

	handleGraveyardCards = cards => {
		this.addGraveyardCardsToGame(cards)
	}

	handlePlayZoneCards = cards => {
		this.addPlayZoneCardsToGame(cards)
	}

	handleDrawCardReceived = data => {
		if (data.id !== this.playerId) return

		this.createCard(data.card)
	};
}

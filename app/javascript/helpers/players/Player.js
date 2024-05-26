import DrawCardSocketHandler from "../sockets/DrawCardSocketHandler";
import GameActionSocketHandler from "../sockets/GameActionSocketHandler";
import LoadGameSocketHandler from "../sockets/LoadGameSocketHandler";

export default class Player {

	// userType 0 => self, 1 => opponent
	constructor(scene, player) {
		// new LoadGameSocketHandler(scene);
		this.scene = scene;
		this.cards = {};
		this.userType = null
		this.playerId = player.id;
		this.playerUsername = player.username;
		this.order = player.order;
		this.life = player.life;
		this.cards = {
			hand: [],
			mana_pool: [],
			playzone: [],
			exile: [],
			graveyard: []
		};
		// this.playerHandCards = player.cards.hand;
		this.handleHandCards(player.cards.hand)
		this.handleManaPoolCards(player.cards.mana_pool)
		this.handleExileCards(player.cards.exile)
		this.handleGraveyardCards(player.cards.graveyard)
		this.handlePlayzoneCards(player.cards.playzone)

		// this.playerManaPoolCards = player.cards.mana_pool;
		// this.playerPlayZoneCards = player.cards.playzone;
		// this.playerGraveyardCards = player.cards.graveyard;
		this.playerExiledCards = player.cards.exile;
		this.is_player_opponent = this.is_player_opponent.bind(this);
		// this.moveToZone = this.moveToZone.bind(this)
		this.scene.events.on("socketReceived", this.handleDrawCardReceived, this);
		this.scene.events.on("gameActionsReceived", this.handleGameActionsReceived, this);
	}

	is_player_opponent(user_id){
		this.userType = this.playerId === user_id ? 0 : 1
	}

	create_text(x,y) {
		return this.scene.add.text(x,y, this.playerUsername )
	}

	handleGameActionsReceived = data => {
		if (data.player_id !== this.playerId) return

		if (data.from === 'hand') {

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

	handlePlayzoneCards = cards => {
		this.addPlayZoneCardsToGame(cards)
	}

	handleDrawCardReceived = data => {
		if (data.id !== this.playerId) return

		this.createCard(data.card)
	};
}

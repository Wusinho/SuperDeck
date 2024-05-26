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
		this.playerHandCards = player.cards.hand;
		this.playerManaPoolCards = player.cards.mana_pool;
		this.playerPlayZoneCards = player.cards.playzone;
		this.playerGraveyardCards = player.cards.graveyard;
		this.playerExiledCards = player.cards.exile;
		this.is_player_opponent = this.is_player_opponent.bind(this);
		// this.moveToZone = this.moveToZone.bind(this)
		this.scene.events.on("socketReceived", this.handleGameOnLoadReceived, this);
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

	handleGameOnLoadReceived = data => {
		if (data[0] !== this.playerId) return

		this.playerHandCards = data[1]
		this.addNewCardsToHand()
	};
}

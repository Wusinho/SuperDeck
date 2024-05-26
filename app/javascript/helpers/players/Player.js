export default class Player {

	// userType 0 => self, 1 => opponent
	constructor(scene, player) {
		this.scene = scene;
		this.userType = null
		this.playerId = player.id;
		this.playerUsername = player.username;
		this.order = player.order;
		this.life = player.life;
		this.playerHandCards = player.cards.hand;
		this.playerPlayZoneCards = player.cards.playzone;
		this.playerGraveyardCards = player.cards.graveyard;
		this.playerExiledCards = player.cards.exile;
		this.is_player_opponent = this.is_player_opponent.bind(this);
	}

	is_player_opponent(user_id){
		this.userType = this.playerId === user_id ? 0 : 1
	}
}

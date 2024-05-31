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
		this.opponentCardFontSize = 30;
	}

	create_text(x,y, text) {
		return this.scene.add.text(x,y, text )
	}

}

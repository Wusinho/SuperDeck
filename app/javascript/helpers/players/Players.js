export default class Players {
	constructor(scene) {
		this.scene = scene;
		this.players = []
		this.currentPlayer = null
		// this.addPlayer = this.addPlayer.bind(this);
		// this.onlyOpponentPlayer = this.onlyOpponentPlayer.bind(this);
		this.scene.events.on("drawCardReceived", this.handleDrawCardReceived, this);
		this.scene.events.on("gameActionsReceived", this.handleGameActionsReceived, this);
	}

	addPlayer(player) {
		this.players.push(player)
	}

	addCurrenPlayer(player){
		this.currentPlayer = player
	}

	onlyOpponentPlayer(players){
		return players.filter(opponent => opponent.id != this.currentPlayer.playerId);
	}

	handleGameActionsReceived = data => {
		console.log('GameActions')
		console.log(data)
		const player = this.players.find(player => player.playerId === data.player_id);
		console.log(player)
		if (player) {
			player.moveOpponentCardToZone(data.card_id, data.new_zone, data.old_zone);
		} else {
			console.error(`Player with ID ${data.player_id} not found`);
		}
	}

	handleDrawCardReceived = data => {
		const playerId = data.id;
		if (playerId == this.currentPlayer.playerId) {
			this.currentPlayer.createCard(data.card)
		} else {
			const player = this.players.find(player => player.playerId === playerId);
			if (player) {
				player.createOpponentCard(data.card);
				player.updateHandSize();
			} else {
				console.error(`Player with ID ${playerId} not found`);
			}
		}
	};
}
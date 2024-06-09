export default class Players {
	constructor(scene) {
		this.scene = scene;
		this.players = []
		this.currentPlayer = null
		this.scene.events.on("drawCardReceived", this.handleDrawCardReceived, this);
		this.scene.events.on("gameActionsReceived", this.handleGameActionsReceived, this);
	}

	addPlayer(newPlayer) {
		const existingIndex = this.players.findIndex(player => player.player_id === newPlayer.player_id);
		if (existingIndex !== -1) {
			this.players[existingIndex] = newPlayer;
		} else {
			this.players.push(newPlayer);
		}
	}

	addCurrenPlayer(player){
		this.currentPlayer = player
	}

	onlyOpponentPlayer(players){
		return players.filter(opponent => opponent.id != this.currentPlayer.player_id);
	}

	handleGameActionsReceived = data => {
		const playerId = data.player_id;

		if (playerId === this.currentPlayer.player_id) {
			this.currentPlayer.moveCardToZone(data);

		} else {
			const player = this.players.find(player => player.player_id === data.player_id);
			if (player) {
				player.moveOpponentCardToZone(data);
			} else {
				console.error(`Player with ID ${data.player_id} not found`);
			}
		}
	}

	handleDrawCardReceived = data => {
		const playerId = data.player_id;
		if (playerId === this.currentPlayer.player_id) {
			this.currentPlayer.createCard(data.card)
		} else {
			const player = this.players.find(player => player.playerId === playerId);
			if (player) {
				player.createCard(data.card);
				// player.updateHandSize();
			} else {
				console.error(`Player with ID ${playerId} not found`);
			}
		}
	};
}
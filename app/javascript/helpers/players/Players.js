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

	addPlayer(newPlayer) {
		const existingIndex = this.players.findIndex(player => player.playerId === newPlayer.playerId);

		if (existingIndex !== -1) {
			this.players[existingIndex] = newPlayer;
		} else {
			this.players.push(newPlayer);
		}
	}


	addCurrenPlayer(player){
		this.currentPlayer = player
		console.log(this.players)
	}

	onlyOpponentPlayer(players){
		return players.filter(opponent => opponent.id != this.currentPlayer.playerId);
	}

	handleGameActionsReceived = data => {
		const player = this.players.find(player => player.playerId === data.player_id);

		if (data.action && data.action !== 'morphed'){


		} else {
			if (player) {
				player.moveOpponentCardToZone(data);
			} else {
				console.error(`Player with ID ${data.player_id} not found`);
			}
		}

	}

	handleDrawCardReceived = data => {
		const playerId = data.player_id;
		console.log(data)
		if (playerId == this.currentPlayer.playerId) {
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
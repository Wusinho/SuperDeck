export default class Players {
	constructor(scene) {
		this.scene = scene;
		this.players = []
		this.currentPlayer = null
		this.addPlayer = this.addPlayer.bind(this);
		this.onlyOpponentPlayer = this.onlyOpponentPlayer.bind(this);
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
}
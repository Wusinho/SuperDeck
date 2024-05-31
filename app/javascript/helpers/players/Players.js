import DrawCardSocketHandler from "../sockets/DrawCardSocketHandler";
import GameActionSocketHandler from "../sockets/GameActionSocketHandler";
import LoadGameSocketHandler from "../sockets/LoadGameSocketHandler";

export default class Players {
	constructor(scene) {
		this.scene = scene;
		this.players = []
		this.currentPlayer = null
		this.addPlayer = this.addPlayer.bind(this);
		this.onlyOpponentPlayer = this.onlyOpponentPlayer.bind(this);
		this.scene.events.on("socketReceived", this.handleDrawCardReceived, this);
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
		if (data.player_id !== this.playerId) return
		console.log('MOVE CRAD')

		if (data.action) {
			// console.log(data)
		} else {
			this.players.forEach(player => {

				player.moveOpponentCardToZone(data.card_id, data.new_zone)
			})
		}
	}

	handleDrawCardReceived = data => {
		if (data.id !== this.playerId) return
		console.log('DRAW')

		this.players.forEach(player => {
			console.log(player.id, player.name)

			// player.createOpponentCard(data.card_id, data.new_zone)
		})
	};
}
import TopPlayer from "./TopPlayer";
import LeftPlayer from "./LeftPlayer";
import RightPlayer from "./RightPlayer";

export default class Players {
	constructor(scene) {
		this.scene = scene;
		this.players = []
		this.currentPlayer = null
		this.scene.events.on("drawCardReceived", this.handleDrawCardReceived, this);
		this.scene.events.on("gameActionsReceived", this.handleGameActionsReceived, this);
		this.scene.events.on("specialActionsReceived", this.handleGameSpecialActionsReceived, this);
	}

	addPlayer(typeOfPlayer, newPlayer) {
		const existingIndex = this.players.findIndex(player => player.player_id === newPlayer.player_id);
		if (existingIndex !== -1) {
		} else {
			if (newPlayer.player_id === this.currentPlayer.player_id) return
			if (typeOfPlayer === 'TOP'){
				this.players.push(new TopPlayer(this.scene, newPlayer))
			} else if (typeOfPlayer === 'LEFT'){
				this.players.push(new LeftPlayer(this.scene, newPlayer))
			} else if (typeOfPlayer === 'RIGHT'){
				this.players.push(new RightPlayer(this.scene, newPlayer))
			} else{
				console.log("SOMETHING WENT WRONG")
			}
		}
	}

	findOpponent(opponent_id){
		return this.players.find(player => player.player_id === opponent_id);
	}

	addCurrentPlayer(player){
		this.currentPlayer = player
	}

	filterOpponents(players){
		return players.filter(player => player.id !== this.currentPlayer.player_id);
	}

	handleGameSpecialActionsReceived = data => {
		const playerId = data.current_player_id;

		if (playerId === this.currentPlayer.player_id) {
			const old_holder = this.players.find(player => player.player_id === data.current_holder_id);
			this.currentPlayer.specialCardTransaction(data, old_holder);
		} else {
			// const player = this.players.find(player => player.player_id === playerId);
			// if (player) {
			// 	player.specialCardTransaction(data);
			// } else {
			// 	console.error(`Player with ID ${data.player_id} not found`);
			// }
		}
	}

	handleGameActionsReceived = data => {
		const playerId = data.current_holder_id;

		if (playerId === this.currentPlayer.player_id) {
			this.currentPlayer.cardTransaction(data);
		} else {
			const player = this.players.find(player => player.player_id === data.player_id);
			if (player) {
				player.cardTransaction(data);
			} else {
				console.error(`Player with ID ${data.current_holder_id} not found`);
			}
		}
	}

	handleDrawCardReceived = data => {
		const playerId = data.current_holder_id;
		if (playerId === this.currentPlayer.player_id) {
			this.currentPlayer.createCard(data.card)
		} else {
			const player = this.players.find(player => player.player_id === playerId);
			if (player) {
				player.createCard(data.card);
			} else {
				console.error(`Player with ID ${playerId} not found`);
			}
		}
	};
}
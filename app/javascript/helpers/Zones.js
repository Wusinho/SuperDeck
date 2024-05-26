import GameActionSocketHandlere from "./sockets/GameActionSocketHandler";

export default class Zones {
	constructor(scene) {
		this.scene = scene;
		this.socketGameActionsHandler = new GameActionSocketHandlere(scene)
		this.currentUserZone = this.currentUserZone.bind(this)
	}

	currentUserZone(card, zone) {
		let currentUser = this.scene.LoadGame.currentUser;

		if (zone === 'mana_pool') {
			card.x = this.scene.currentManaPool.x;
			card.y = this.scene.currentManaPool.y;
			this.socketGameActionsHandler.send({ action: 'to_mana_pool', param: this.card_id(card.card_id) } )
		} else if (zone === 'playzone') {
			this.socketGameActionsHandler.send({ action: 'to_playzone', param: this.card_id(card.card_id)  } )
			card.x = this.scene.currentUserPlayzone.x;
			card.y = this.scene.currentUserPlayzone.y;
		} else if (zone === 'graveyard') {
			this.socketGameActionsHandler.send({ action: 'to_graveyard', param: this.card_id(card.card_id) } )
			card.x = this.scene.currentUserGraveyard.x;
			card.y = this.scene.currentUserGraveyard.y;
		} else if (zone === 'exile') {
			this.socketGameActionsHandler.send({ action: 'to_exile', param: this.card_id(card.card_id) } )
			card.x = this.scene.currentUserExile.x;
			card.y = this.scene.currentUserExile.y;
		} else {
			this.socketGameActionsHandler.send({ action: 'to_hand', param: this.card_id(card.card_id) } )
			card.x = this.scene.currentUserHandArea.x;
			card.y = this.scene.currentUserHandArea.y;
		}
	}

	card_id(id) {
		return { card_id: id }
	}
}

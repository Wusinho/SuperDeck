export default class Zones {
	constructor(scene) {
		this.scene = scene;
		this.moveToZone = this.moveToZone.bind(this)
	}

	moveToZone(card, zone) {
		if (zone === 'mana_pool') {
			card.x = this.scene.currentManaPool.x;
			card.y = this.scene.currentManaPool.y;
			console.log('Card moved to mana_pool');
		} else if (zone === 'playzone') {
			card.x = this.scene.currentUserPlayzone.x;
			card.y = this.scene.currentUserPlayzone.y;
			console.log('Card moved to playzone');
		} else if (zone === 'graveyard') {
			card.x = this.scene.currentUserGraveyard.x;
			card.y = this.scene.currentUserGraveyard.y;
			console.log('Card moved to graveyard');
		} else if (zone === 'exile') {
			card.x = this.scene.currentUserExile.x;
			card.y = this.scene.currentUserExile.y;
			console.log('exile')
		} else {
			card.x = this.scene.currentUserHandArea.x;
			card.y = this.scene.currentUserHandArea.y;
			console.log('hand')
		}
	}
}

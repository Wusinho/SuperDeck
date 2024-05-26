import Player from './Player';
export default class CurrentPlayer extends Player {
	constructor(scene, player) {
		super(scene, player);
		this.hand_area_x_axis = this.scene.currentUserHandArea.x * 0.17
		this.hand_area_y_axis = this.scene.currentUserHandArea.y
		this.addNewCardsToHand = this.addNewCardsToHand.bind(this)
		this.scene.currentUserName = this.create_text(50,1050, this.playerUsername)
			.setFontSize(14)
			.setFontFamily("Arial")
			.setInteractive();
		this.addNewCardsToHand()
		// console.log(this.scene.LoadGame)
	}

	addNewCardsToHand(){
		for (let i in this.playerHandCards) {
			this.scene.CardManager.createCurrentUserCard(this.hand_area_x_axis, this.hand_area_y_axis, i, this.playerHandCards[i]);
		}
	}

	addNewCardsToManaPpl(){
		for (let i in this.playerManaPoolCards) {

		}
	}

	// moveToZone(card, zone) {
	// 	if (zone === 'mana_pool') {
	// 		card.x = this.scene.currentManaPool.x;
	// 		card.y = this.scene.currentManaPool.y;
	// 		console.log('Card moved to mana_pool');
	// 	} else if (zone === 'playzone') {
	// 		card.x = this.scene.currentUserPlayzone.x;
	// 		card.y = this.scene.currentUserPlayzone.y;
	// 		console.log('Card moved to playzone');
	// 	} else if (zone === 'graveyard') {
	// 		card.x = this.scene.currentUserGraveyard.x;
	// 		card.y = this.scene.currentUserGraveyard.y;
	// 		console.log('Card moved to graveyard');
	// 	} else if (zone === 'exile') {
	// 		card.x = this.scene.currentUserExile.x;
	// 		card.y = this.scene.currentUserExile.y;
	// 		console.log('exile')
	// 	} else {
	// 		card.x = this.scene.currentUserHandArea.x;
	// 		card.y = this.scene.currentUserHandArea.y;
	// 		console.log('hand')
	// 	}
	// }
}

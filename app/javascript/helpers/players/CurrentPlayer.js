import Player from './Player';
export default class CurrentPlayer extends Player {
	constructor(scene, player) {
		super(scene, player);
		this.x_axis = this.scene.currentUserHandArea.x * 0.17
		this.y_axis = this.scene.currentUserHandArea.y
		this.addNewCardsToHand = this.addNewCardsToHand.bind(this)
		this.scene.currentUserName = this.create_text(50,1050, this.playerUsername)
			.setFontSize(14)
			.setFontFamily("Arial")
			.setInteractive();
		this.addNewCardsToHand()
	}

	addNewCardsToHand(){
		for (let i in this.playerHandCards) {
			this.scene.CardManager.createCurrentUserCard(this.x_axis, this.y_axis, i, this.playerHandCards[i]);
		}
	}
}

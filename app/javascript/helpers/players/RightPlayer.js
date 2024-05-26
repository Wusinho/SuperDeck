import Player from './Player';
export default class RightPlayer extends Player {
	constructor(scene, player) {
		super(scene, player);
		this.x_axis = this.scene.rightOpponentHandArea.x
		this.y_axis = this.scene.rightOpponentHandArea.y
		this.addNewCardsToHand = this.addNewCardsToHand.bind(this)
		this.create_text(1050,135)
		this.addNewCardsToHand()
	}

	addNewCardsToHand(){
		for (let i in this.playerHandCards) {
			this.scene.CardManager.createHorizontalOpponentCard(this.x_axis, this.y_axis, i);
		}
	}
}
import Player from './Player';
export default class LeftPlayer extends Player {
	constructor(scene, player) {
		super(scene, player);
		this.x_axis = this.scene.leftOpponentHandArea.x
		this.y_axis = this.scene.leftOpponentHandArea.y
		this.addNewCardsToHand = this.addNewCardsToHand.bind(this)
		this.create_text(30,135)
		this.addNewCardsToHand()
	}

	addNewCardsToHand(){
		for (let i in this.playerHandCards) {
			this.scene.CardManager.createHorizontalOpponentCard(this.x_axis, this.y_axis, i);
		}
	}

}
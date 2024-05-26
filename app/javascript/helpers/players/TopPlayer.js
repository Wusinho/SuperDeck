import Player from './Player';
export default class TopPlayer extends Player {
	constructor(scene, player){
		super(scene, player);
		this.x_axis = this.scene.topOpponentHandArea.x * 0.17
		this.y_axis = this.scene.topOpponentHandArea.y
		this.addNewCardsToHand = this.addNewCardsToHand.bind(this)
		this.create_text(900,70)
		this.addNewCardsToHand()
	}
	addNewCardsToHand(){
		for (let i in this.playerHandCards) {
			this.scene.CardManager.createVerticalOpponentCard(this.x_axis, this.y_axis, this.playerHandCards[i]);
		}
	}
}
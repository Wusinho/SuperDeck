import Player from './Player';
export default class TopPlayer extends Player {
	constructor(scene, player){
		super(scene, player);
		this.x_axis = this.scene.topOpponentHandArea.x
		this.y_axis = this.scene.topOpponentHandArea.y
		for (let i in this.playerHandCards) {
			this.scene.CardManager.createHorizontalOpponentCard(this.x_axis * 0.17, this.y_axis, i);
		}

		this.create_text(900,70, this.playerUsername)
	}
}
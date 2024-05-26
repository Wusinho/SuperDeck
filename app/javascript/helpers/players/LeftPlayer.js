import Player from './Player';
export default class LeftPlayer extends Player {
	constructor(scene, player) {
		super(scene, player);
		this.x_axis = this.scene.leftOpponentHandArea.x
		this.y_axis = this.scene.leftOpponentHandArea.y
		for (let i in this.playerHandCards) {
			this.scene.CardManager.createVerticalOpponentCard(this.x_axis, this.y_axis, this.playerHandCards[i]);
		}

		this.create_text(30,135, this.playerUsername)
	}
}
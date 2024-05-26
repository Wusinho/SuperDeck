import Player from './Player';
export default class RightPlayer extends Player {
	constructor(scene, player) {
		super(scene, player);
		this.x_axis = this.scene.rightOpponentHandArea.x
		this.y_axis = this.scene.rightOpponentHandArea.y
		for (let i in this.playerHandCards) {
			this.scene.CardManager.createVerticalOpponentCard(this.x_axis, this.y_axis, this.playerHandCards[i]);
		}

		this.create_text(1050,135, this.playerUsername)
	}
}
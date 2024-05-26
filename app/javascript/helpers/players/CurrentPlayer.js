import Player from './Player';
export default class CurrentPlayer extends Player {
	constructor(scene, player) {
		super(scene, player);
		this.x_axis = this.scene.currentUserHandArea.x
		this.y_axis = this.scene.currentUserHandArea.y

		for (let i in this.playerHandCards) {
			this.scene.CardManager.createCurrentUserCard(this.x_axis * 0.17, this.y_axis, i, 'defaultCardSprite', this.playerHandCards[i]);
		}
		this.scene.currentUserName = this.create_text(50,1050, this.playerUsername)
			.setFontSize(14)
			.setFontFamily("Arial")
			.setInteractive();
	}
}

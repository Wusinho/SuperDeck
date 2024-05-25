export default class Card {
	constructor(scene) {
		// this.render = (x,y, type)=> {
		// 	let sprite = type === 'playerCard' ? this.playerCardSprite : this.opponentCardSprite;
		//
		// 	let card = scene.add.image(x,y, sprite).setScale(0.25, 0.25).setInteractive().setData({
		// 		name: this.name,
		// 		type: type,
		// 		sprite: sprite,
		// 	})
		//
		// 	if (type ==='playerCard') {
		// 		scene.input.setDraggable(card)
		// 	}
		//
		// 	return card;
		// }

		this.renderCard = (x,y, opponent)=> {
			let sprite = opponent ? this.defaultOpponentSprite : this.defaultCardSprite;

			let card = scene.add.image(x,y, sprite).setScale(0.25, 0.25).setInteractive().setData({
				name: this.name,
				type: type,
				sprite: sprite,
			})

			return card;
		}
	}
}
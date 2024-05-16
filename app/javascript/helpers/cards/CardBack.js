import Card from './Card'

export default class CardBack extends Card {
	constructor(scene) {
		super(scene);
		this.name = 'cardBack';
		this.playerCardSrpite = 'cyanCardBack'
		this.opponentCardSrpite = 'magentaCardBack'
	}
}
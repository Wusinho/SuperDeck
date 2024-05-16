import Card from './Card'

export default class Buleano extends Card {
	constructor(scene) {
		super(scene);
		this.name = 'booleam';
		this.playerCardSrpite = 'cyanBoolean'
		this.opponentCardSrpite = 'magentaBoolean'
	}
}
import Card from './Card'

export default class Ping extends Card {
	constructor(scene) {
		super(scene);
		this.name = 'ping';
		this.playerCardSrpite = 'cyanPing'
		this.opponentCardSrpite = 'magentaPing'
	}
}
import CardBack from "./cards/CardBack";
import Buleano from "./cards/Buleano";
import Ping from "./cards/Ping";

export default class DeckHandler {
	constructor(scene) {
		this.dealCard = (x, y, name, type) => {
			let cards = {
				cardBack: new CardBack(scene),
				boolean: new Buleano(scene),
				ping: new Ping(scene),
			}
			let newCard = cards[name];
			return(newCard.render(x,y, type))
		}
	}
}
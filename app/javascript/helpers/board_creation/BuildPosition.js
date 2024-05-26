export default class BuildPosition {
	constructor(scene) {
		this.scene = scene;
		this.positions = new Array(2);
		this.nextPosition = this.nextPosition.bind(this);
	}

	nextFreePosition() {
		for (let i in this.positions) {
			if (this.positions[i] === null || this.positions[i] === undefined) {
				return i;
			}
		}

		this.positions.push(null)
		return this.positions.length - 1
	}

	placeCardWithIndex() {
		const freePosition = this.nextFreePosition()

	}

	removeCard() {

	}

}
export default class PLayer {
	constructor(name, type) {
		this.name = name;
		this.type = type;
		this.hits = [];
	}

	addHit(limitX, limitY) {
		if (limitX * limitY === this.hits.length) return undefined;

		let x;
		let y;
		do {
			x = Math.floor(Math.random() * (limitX));
			y = Math.floor(Math.random() * (limitY));
		}
		while (this.hits.find(hit => hit[0] === x && hit[1] === y) !== undefined);
		let hit = [x, y];
		this.hits.push(hit);
		return hit;
	}
}
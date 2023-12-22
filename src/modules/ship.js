export default class Ship {
	constructor(size, direction, position) {
		this.position = position;
		console.log(this.position);

		if (size < 1 || size > 4) throw new Error("Invalid size.");
		else this.size = size;

		if (! /^(W|E|S|N)$/.test(direction)) throw new Error("Invalid direction.");
		else this.direction = direction;

		this.tiles = [];
		for (let i = 0; i < this.size; i++) {
			if (direction === "W") this.tiles.push([position[0], position[1] - i]);
			else if (direction === "E") this.tiles.push([position[0], position[1]
				+ i]);
			else if (direction === "N") this.tiles.push([position[0] - i, position[1]]);
			else if (direction === "S") this.tiles.push([position[0] + i, position[1]]);
		}

		this.hitTiles = [];

	}

	hit(coordinates) {
		const index = this.tiles.findIndex(tileCoordinates => {
			return tileCoordinates[0] === coordinates[0] && tileCoordinates[1] === coordinates[1];
		});
		if (index === -1) return false;
		else {
			this.hitTiles.push(coordinates);
			return true;
		}
	}

	isSunk() {
		if (this.hitTiles.length === this.tiles.length) return true;
		else return false;
	}
}
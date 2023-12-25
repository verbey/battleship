export default class Ship {
	constructor(size, direction, position) {
		this.position = position;

		if (size < 1 || size > 4) throw new Error("Invalid size.");
		else this.size = size;

		if (! /^(W|E|S|N)$/.test(direction)) throw new Error("Invalid direction.");
		else this.direction = direction;

		this.tiles = [];
		for (let i = 0; i < this.size; i++) {
			if (direction === "W") this.tiles.push([position[0], position[1] - i]);
			else if (direction === "E") this.tiles.push([position[0], position[1] + i]);
			else if (direction === "N") this.tiles.push([position[0] - i, position[1]]);
			else if (direction === "S") this.tiles.push([position[0] + i, position[1]]);
		}

		this.hitTiles = [];

	}

	hit(coordinates) {
		// Searches whether coordinates belong to a ship. If yes, proceeds to check if the coordinates were
		// already hit. If not, adds the coordinates to this.hitTiles
		const index = this.tiles.findIndex(tileCoordinates => {
			return tileCoordinates[0] === coordinates[0] && tileCoordinates[1] === coordinates[1];
		});
		if (index !== -1) {
			const index = this.hitTiles.findIndex(tileCoordinates => {
				return tileCoordinates[0] === coordinates[0] && tileCoordinates[1] === coordinates[1];
			});
			if (index === -1) {
				this.hitTiles.push(coordinates);
			}
		}
	}

	isSunk() {
		if (this.hitTiles.length === this.tiles.length) return true;
		else return false;
	}
}
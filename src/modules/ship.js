export default class Ship {
	constructor(size, direction, position) {
		const [positionX, positionY] = position;

		this.positionX = positionX;
		this.positionY = positionY;

		if (size < 1 || size > 4) throw new Error("Invalid size.");
		else this.size = size;

		if (! /^(W|E|S|N)$/.test(direction)) throw new Error("Invalid direction.");
		else this.direction = direction;

		this.tiles = [];
		for (let i = 0; i < this.size; i++) {
			if (direction === "W") this.tiles.push([positionX, positionY - i]);
			else if (direction === "E") this.tiles.push([positionX, positionY
				+ i]);
			else if (direction === "N") this.tiles.push([positionX - i, positionY]);
			else if (direction === "S") this.tiles.push([positionX + i, positionY]);
		}

	}

	hit(coordinates) {
		const index = this.tiles.findIndex(tileCoordinates => {
			return tileCoordinates[0] === coordinates[0] && tileCoordinates[1] === coordinates[1];
		});
		if (index === -1) return false;
		else {
			this.tiles.splice(index, 1);
			return true;
		}
	}

	isSunk() {
		if (this.length - this.tiles.length === 0) return false;
		else return true;
	}
}
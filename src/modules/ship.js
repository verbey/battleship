export default class Ship {
	constructor(size, direction, position) {
		const [positionX, positionY] = position;

		if (size < 1 || size > 4) throw new Error("Invalid size.");
		else this.size = size;

		if (! /W|E|S|N/.test(direction)) throw new Error("Invalid direction.");
		else this.direction = direction;

		if (positionX < 0 || positionX > 10 || positionY < 0 || positionY > 10) throw new Error("Invalid position coordinates.");
		else this.position = position;

		if (direction === "W" && positionX - size < 0) throw new Error("Can't create a ship facing west here.");
		else if (direction === "E" && positionX + size > 9) throw new Error("Can't create a ship facing east here.");
		else if (direction === "N" && positionY + size > 9) throw new Error("Can't create a ship facing north here.");
		else if (direction === "S" && positionY - size < 0) throw new Error("Can't create a ship facing south here.");

		this.tiles = [];
		for (let i = 0; i < this.size; i++) {
			if (direction === "W") this.tiles.push([positionX - i, positionY]);
			else if (direction === "E") this.tiles.push([positionX + i, positionY]);
			else if (direction === "N") this.tiles.push([positionX, positionY + i]);
			else if (direction === "S") this.tiles.push([positionX, positionY - i]);
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
import Ship from "./ship";

export default class Gameboard {
	constructor(x, y) {
		this.xLimit = x;
		this.yLimit = y;
		this.ships = [];
		this.targetedTiles = [];
	}

	addShip(size, direction, position) {
		if (position[0] < 0 || position[0] > this.yLimit || position[1] < 0 || position[1] > this.xLimit) throw new Error("Invalid position coordinates.");

		if (direction === "W" && position[0] - size < 0) throw new Error("Can't create a ship facing west here.");
		else if (direction === "E" && position[0] + size > this.yLimit) throw new Error("Can't create a ship facing east here.");
		else if (direction === "N" && position[1] + size > this.xLimit) throw new Error("Can't create a ship facing north here.");
		else if (direction === "S" && position[1] - size < 0) throw new Error("Can't create a ship facing south here.");

		const ship = new Ship(size, direction, position);
		ship.tiles.forEach(coordinates => {
			const overlap = this.isShipTile(coordinates);
			if (overlap) throw new Error("Ships overlap.");
		});

		this.ships.push(ship);
	}

	isShipTile(coordinates) {
		for (let i = 0; i < this.ships.length; i++) {
			const index = this.ships[i].tiles.findIndex(tileCoordinates => {
				return tileCoordinates[0] === coordinates[0] && tileCoordinates[1] === coordinates[1];
			});
			if (index === -1) return false;
			else return true;
		}
	}

	receiveAttack(coordinates) {
		const index = this.targetedTiles.findIndex(tileCoordinates => {
			return tileCoordinates[0] === coordinates[0] && tileCoordinates[1] === coordinates[1];
		});

		if (index === -1) {
			this.targetedTiles.push(coordinates);
			for (let i = 0; i < this.ships.length; i++) {
				this.ships[i].hit(coordinates);
			}
		}
	}

	areAllSunk() {
		for (let i = 0; i < this.ships.length; i++) {
			if (this.ships[i].tiles.length !== this.ships[i].hitTiles.length) return false;
		}
		return true;
	}

	removeAllShips() {
		this.ships = [];
	}
}
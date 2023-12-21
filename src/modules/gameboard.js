import Ship from "./ship";

export default class Gameboard {
	constructor(x, y) {
		this.board = [];
		for (let i = 0; i < x; i++) {
			this.board.push([]);
			for (let j = 0; j < y; j++) {
				this.board[i].push(0);
			}
		}

		this.ships = [];
		this.missed = [];
		this.hits = [];
	}

	addShip(size, direction, position) {
		if (position[0] < 0 || position[0] > this.board.length || position[1] < 0 || position[1] > this.board.length) throw new Error("Invalid position coordinates.");

		if (direction === "W" && position[0] - size < 0) throw new Error("Can't create a ship facing west here.");
		else if (direction === "E" && position[0] + size > this.board.length) throw new Error("Can't create a ship facing east here.");
		else if (direction === "N" && position[1] + size > this.board.length) throw new Error("Can't create a ship facing north here.");
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
				console.log(tileCoordinates, coordinates);
				return tileCoordinates[0] === coordinates[0] && tileCoordinates[1] === coordinates[1];
			});
			if (index === -1) return false;
			else return true;
		}
	}

	receiveAttack(coordinates) {
		for (let i = 0; i < this.ships.length; i++) {
			const result = this.ships[i].hit(coordinates);
			if (this.ships[i].tiles.length === 0) this.ships.splice(i, 1);
			if (result) {
				this.hits.push(coordinates);
				return;
			}
		}
		this.missed.push(coordinates);
	}

	areAllSunk() {
		if (this.ships.length === 0) return true;
		else return false;
	}
}
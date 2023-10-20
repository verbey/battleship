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
	}

	addShip(ship) {
		if (ship.positionX < 0 || ship.positionX > this.board.length || ship.positionY < 0 || ship.positionY > this.board.length) throw new Error("Invalid position coordinates.");

		if (ship.direction === "W" && ship.positionX - ship.size < 0) throw new Error("Can't create a ship facing west here.");
		else if (ship.direction === "E" && ship.positionX + ship.size > this.board.length) throw new Error("Can't create a ship facing east here.");
		else if (ship.direction === "N" && ship.positionY + ship.size > this.board.length) throw new Error("Can't create a ship facing north here.");
		else if (ship.direction === "S" && ship.positionY - ship.size < 0) throw new Error("Can't create a ship facing south here.");

		this.ships.push(ship);
	}
}
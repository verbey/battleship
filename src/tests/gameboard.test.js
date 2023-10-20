import Gameboard from "../modules/gameboard";

test("Gameboard creation. Ship creation.", () => {
	const gameboard = new Gameboard(10, 10);
	gameboard.addShip(3, "N", [4, 1]);
	expect(gameboard.ships.length).toEqual(1);
});

test("Gameboard creation. Invalid position coordinates.", () => {
	const gameboard = new Gameboard(10, 10);
	expect(() => gameboard.addShip(3, "W", [-1, 5])).toThrowError("Invalid position coordinates.");
});

test("Gameboard creation. Eastern direction overflow.", () => {
	const gameboard = new Gameboard(10, 10);
	expect(() => gameboard.addShip(3, "E", [9, 3])).toThrowError("Can't create a ship facing east here.");
});

test("Gameboard creation. Northern direction overflow.", () => {
	const gameboard = new Gameboard(10, 10);
	expect(() => gameboard.addShip(3, "N", [1, 9])).toThrowError("Can't create a ship facing north here.");

});

test("Gameboard creation. Western direction overflow.", () => {
	const gameboard = new Gameboard(10, 10);
	expect(() => gameboard.addShip(4, "W", [0, 4])).toThrowError("Can't create a ship facing west here.");

});

test("Gameboard creation. Southern direction overflow.", () => {
	const gameboard = new Gameboard(10, 10);
	expect(() => gameboard.addShip(2, "S", [5, 0])).toThrowError("Can't create a ship facing south here.");

});

test("Gameboard. Missed.", () => {
	const gameboard = new Gameboard(10, 10);
	gameboard.addShip(1, "N", [4, 1]);
	gameboard.receiveAttack([0, 0]);
	expect(gameboard.missed).toEqual([[0, 0]]);
	expect(gameboard.areAllSunk()).toEqual(false);
});

test("Gameboard. Ship sunk.", () => {
	const gameboard = new Gameboard(10, 10);
	gameboard.addShip(1, "N", [4, 1]);
	gameboard.receiveAttack([4, 1]);
	expect(gameboard.missed).toEqual([]);
	expect(gameboard.areAllSunk()).toEqual(true);
	expect(gameboard.hits).toEqual([[4, 1]]);
});
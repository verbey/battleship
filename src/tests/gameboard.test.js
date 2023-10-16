import Gameboard from 'gameboard';

test("Gameboard creation. Ship creation.", () => {
	const gameboard = new Gameboard(10, 10);
	gameboard.addShip(3, "N", [4, 1]);
	expect(gameboard.ships).toEqual(1);
});

test("Gameboard. Missed.", () => {
	const gameboard = new Gameboard(10, 10);
	gameboard.addShip(3, "N", [4, 1]);
	gameboard.receiveAttack([0, 0]);
	expect(gameboard.missed).toEqual([0, 0]);
});

test("Gameboard. Ship sunk.", () => {
	const gameboard = new Gameboard(10, 10);
	gameboard.addShip(1, "N", [4, 1]);
	gameboard.receiveAttack([4, 1]);
	expect(gameboard.missed).toEqual([]);
	expect(gameboard.sunkShips).toEqual(1);
	expect(gameboard.hits).toEqual([[4, 1]]);
});
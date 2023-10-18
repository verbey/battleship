import Ship from "../modules/ship";

test("Ship creation. Western direction.", () => {
	const ship = new Ship(4, "W", [5, 5]);
	expect(ship.size).toEqual(4);
	expect(ship.direction).toEqual("W");
	expect(ship.position).toEqual([5, 5]);
});

test("Ship creation. Northern direction.", () => {
	const ship = new Ship(3, "N", [4, 1]);

	expect(ship.size).toEqual(3);
	expect(ship.direction).toEqual("N");
	expect(ship.position).toEqual([4, 1]);
});

test("Ship creation. Eastern direction.", () => {
	const ship = new Ship(2, "E", [2, 3]);

	expect(ship.size).toEqual(2);
	expect(ship.direction).toEqual("E");
	expect(ship.position).toEqual([2, 3]);
});

test("Ship creation. Southern direction.", () => {
	const ship = new Ship(4, "S", [4, 4]);

	expect(ship.size).toEqual(4);
	expect(ship.direction).toEqual("S");
	expect(ship.position).toEqual([4, 4]);
});

test("Ship creation. Invalid direction.", () => {
	expect(() => {
		new Ship(4, "X", [4, 4]);
	}).toThrowError("Invalid direction.");
});

test("Ship creation. Invalid size.", () => {
	expect(() => {
		new Ship(5, "E", [2, 3]);
	}).toThrowError("Invalid size.");
});

test("Ship creation. Invalid position coordinates.", () => {
	expect(() => {
		new Ship(4, "E", [-1, 3]);
	}).toThrowError("Invalid position coordinates.");
});

test("Ship creation. Eastern direction overflow.", () => {
	expect(() => {
		new Ship(3, "E", [7, 3]);
	}).toThrowError("Can't create a ship facing east here.");
});

test("Ship creation. Northern direction overflow.", () => {
	expect(() => {
		new Ship(3, "N", [1, 9]);
	}).toThrowError("Can't create a ship facing north here.");
});

test("Ship creation. Western direction overflow.", () => {
	expect(() => {
		new Ship(4, "W", [0, 4]);
	}).toThrowError("Can't create a ship facing west here.");
});

test("Ship creation. Southern direction overflow.", () => {
	expect(() => {
		new Ship(2, "S", [5, 0]);
	}).toThrowError("Can't create a ship facing south here.");
});

test("Ship attack. Missed.", () => {
	const ship = new Ship(3, "E", [2, 3]);

	ship.hit([1, 1]);

	expect(ship.size).toEqual(3);
	expect(ship.direction).toEqual("E");
	expect(ship.position).toEqual([2, 3]);
	expect(ship.tiles).toEqual([
		[2, 3],
		[3, 3],
		[4, 3]
	]);
});

test("Ship attack. Hit.", () => {
	const ship = new Ship(3, "E", [2, 3]);

	ship.hit([3, 3]);

	expect(ship.size).toEqual(3);
	expect(ship.direction).toEqual("E");
	expect(ship.position).toEqual([2, 3]);
	expect(ship.tiles).toEqual([
		[2, 3],
		[4, 3]
	]);
});

test("Ship attack. Sunk.", () => {
	const ship = new Ship(1, "E", [2, 3]);

	ship.hit([2, 3]);

	expect(ship.isSunk()).toEqual(true);
});
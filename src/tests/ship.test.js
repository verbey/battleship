import Ship from "./src/modules/ship";

test("Ship creation. Western direction.", () => {
	expect(new Ship(4, "W", [5, 5])).toEqual({
		size: 4,
		direction: "W",
		position: [5, 5],
		tiles: [[2, 5], [3, 5], [4, 5], [5, 5]],
	});
});

test("Ship creation. Northern direction.", () => {
	expect(new Ship(3, "N", [4, 1])).toEqual({
		size: 3,
		direction: "N",
		position: [4, 3],
		tiles: [[4, 3], [4, 2], [4, 1]],
	});
});

test("Ship creation. Eastern direction.", () => {
	expect(new Ship(2, "E", [2, 3])).toEqual({
		size: 2,
		direction: "E",
		position: [2, 3],
		tiles: [[2, 3], [3, 3]],
	});
});

test("Ship creation. Southern direction.", () => {
	expect(new Ship(4, "S", [4, 4])).toEqual({
		size: 4,
		direction: "S",
		position: [4, 1],
		tiles: [[4, 1], [4, 2], [4, 3], [4, 4]],
	});
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
		new Ship(3, "N", [1, 1]);
	}).toThrowError("Can't create a ship facing north here.");
});

test("Ship creation. Western direction overflow.", () => {
	expect(() => {
		new Ship(4, "W", [0, 4]);
	}).toThrowError("Can't create a ship facing west here.");
});

test("Ship creation. Southern direction overflow.", () => {
	expect(() => {
		new Ship(2, "S", [5, 7]);
	}).toThrowError("Can't create a ship facing south here.");
});

test("Ship attack. Missed.", () => {
	const ship = new Ship(3, "E", [2, 3]);
	ship.hit([1, 1]);
	expect(ship).toEqual({
		size: 3,
		direction: "E",
		position: [2, 3],
		tiles: [
			[2, 3],
			[3, 3],
			[4, 3],
		],
	});
});

test("Ship attack. Hit.", () => {
	const ship = new Ship(3, "E", [2, 3]);
	ship.hit([3, 3]);
	expect(ship).toEqual({
		size: 3,
		direction: "E",
		position: [2, 3],
		tiles: [
			[2, 3],
			[4, 3],
		],
	});
});

test("Ship attack. Sunk.", () => {
	const ship = new Ship(1, "E", [2, 3]);
	ship.hit([2, 3]);
	expect(ship.isSunk()).toEqual(true);
});
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

test("Ship creation. Invalid direction. String that contains letter of valid direction.", () => {
	expect(() => {
		new Ship(4, "XabcWabc", [4, 4]);
	}).toThrowError("Invalid direction.");
});

test("Ship creation. Invalid size.", () => {
	expect(() => {
		new Ship(5, "E", [2, 3]);
	}).toThrowError("Invalid size.");
});

test("Ship attack. Missed.", () => {
	const ship = new Ship(3, "E", [2, 3]);

	ship.hit([1, 1]);

	expect(ship.size).toEqual(3);
	expect(ship.direction).toEqual("E");
	expect(ship.position).toEqual([2, 3]);
	expect(ship.tiles).toEqual([
		[2, 3],
		[2, 4],
		[2, 5]
	]);
});

test("Ship attack. Hit.", () => {
	const ship = new Ship(3, "E", [2, 3]);

	ship.hit([2, 4]);

	expect(ship.size).toEqual(3);
	expect(ship.direction).toEqual("E");
	expect(ship.position).toEqual([2, 3]);
	expect(ship.tiles).toEqual([
		[2, 3],
		[2, 4],
		[2, 5]
	]);
	expect(ship.isSunk()).toEqual(false);
	expect(ship.hitTiles).toEqual([[2, 4]]);
});

test("Ship attack. Sunk.", () => {
	const ship = new Ship(1, "E", [2, 3]);

	ship.hit([2, 3]);

	expect(ship.isSunk()).toEqual(true);
});

test("Ship attack. Doesn't duplicate hits.", () => {
	const ship = new Ship(1, "E", [2, 3]);

	ship.hit([2, 3]);
	ship.hit([2, 3]);
	ship.hit([2, 3]);

	expect(ship.isSunk()).toEqual(true);
	expect(ship.hitTiles).toEqual([[2, 3]]);
});
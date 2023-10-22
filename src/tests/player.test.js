import PLayer from "../modules/player";

test("Player creation.", () => {
	const player = new PLayer("John", "bot");
	expect(player.name).toBe("John");
	expect(player.type).toBe("bot");
});

test("Hit coordinates generation. Small board.", () => {
	const player = new PLayer("John", "bot");
	expect(player.addHit(1, 1)).toStrictEqual([0, 0]);
	expect(player.addHit(1, 1)).toBe(undefined);
});

test("Hit coordinates generation. Medium board.", () => {
	const player = new PLayer("John", "bot");
	expect(player.addHit(2, 2)).toBeDefined();
	expect(player.addHit(2, 2)).toBeDefined();
	expect(player.addHit(2, 2)).toBeDefined();
	expect(player.addHit(2, 2)).toBeDefined();
	expect(player.addHit(2, 2)).toBeUndefined();
});
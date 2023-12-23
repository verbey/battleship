import PLayer from "../modules/player";
import Gameboard from "../modules/gameboard";

test("Player creation. Bot", () => {
	const player = new PLayer("John", "bot");
	expect(player.name).toBe("John");
	expect(player.type).toBe("bot");
	expect(player.gameboard).toBeInstanceOf(Gameboard);
});

test("Player creation. Human", () => {
	const player = new PLayer("John", "human");
	expect(player.name).toBe("John");
	expect(player.type).toBe("human");
	expect(player.gameboard).toBeInstanceOf(Gameboard);
});

test("Generate hit target. Targets available.", () => {
	const player = new PLayer("John", "human");
	const target = player.generateHitTarget([]);
	expect(target).toBeInstanceOf(Array);
});

test("Generate hit target. No targets available.", () => {
	const player = new PLayer("John", "human");
	let targetedTiles = [];
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) targetedTiles.push([i, j]);
	}
	const target = player.generateHitTarget(targetedTiles);
	expect(target).toBeUndefined();
});
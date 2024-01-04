import Gameboard from "./gameboard";

export default class PLayer {
	constructor(name, type) {
		if (!name || name === "") name = type === "bot" ? "Computer" : "Bob";
		else this.name = name;
		if (!type || type === "") type = "human";
		else this.type = type;
		this.gameboard = new Gameboard(10, 10);
	}

	generateHitTarget(gameboard) {
		let allTiles = [];
		for (let i = 0; i < gameboard.yLimit; i++) {
			for (let j = 0; j < gameboard.xLimit; j++) allTiles.push([i, j]);
		}

		const freeTiles = allTiles.filter(tile => {
			const hitTile = gameboard.targetedTiles.find(hitTile => hitTile[0] === tile[0] && hitTile[1] === tile[1]);
			return !hitTile;
		});

		const randomFreeTile = freeTiles[Math.floor(Math.random() * freeTiles.length)];
		return randomFreeTile;
	}
}
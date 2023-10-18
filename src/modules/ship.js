export default class Ship {
	constructor(size, direction, position) {
		const [positionX, positionY] = position;
		this.size = size;
		this.direction = direction;
		this.position = position;
		this.tiles = [];
		for (let i = 0; i < this.size; i++) {
			if (direction === "W") this.tiles.push([positionX - i, positionY]);
			else if (direction === "E") this.tiles.push([positionX + i, positionY]);
			else if (direction === "N") this.tiles.push([positionX, positionY - i]);
			else if (direction === "S") this.tiles.push([positionX, positionY + i]);
		}
	}
}
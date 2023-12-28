import Gameboard from "./gameboard";

import Player from "./player";

export default class Interface {

	constructor() {
		this.left = document.querySelector(".left");
		this.right = document.querySelector(".right");
		this.selectedShipDirection = "E";
	}

	createPlayers() {
		const playerNameInput = document.createElement("input");
		playerNameInput.type = "text";
		playerNameInput.placeholder = "Enter your name";
		playerNameInput.classList.add("playerNameInput");
		this.right.appendChild(playerNameInput);
		this.createPlayerGameboard();
		this.playerGameboard = new Gameboard(10, 10);

		const finishPlayerCreation = document.createElement("button");
		finishPlayerCreation.addEventListener("click", (event) => {
			const allShips = document.querySelectorAll("div[class^='one'],div[class^='two'],div[class^='three'],div[class^='four']");
			const allShipsArr = Array.from(allShips);

			if (allShipsArr.some(ship => ship.parentNode.classList.value === "shipSelectionContainer")) return;

			this.createPlayerGameboard();
			this.player = new Player(playerNameInput.value);
			this.opponentGameboard = new Gameboard(10, 10);

			const startGame = document.createElement("button");
			startGame.addEventListener("click", () => {
				this.startGame();
			});
			startGame.textContent = "Start Game";
			this.right.appendChild(startGame);

			event.target.remove();
		});

		finishPlayerCreation.textContent = "Done";
		this.right.appendChild(finishPlayerCreation);
	}

	createPlayerGameboard() {
		// Clear old elements if they exist
		while (this.left.firstChild) {
			this.left.firstChild.remove();
		}

		const oldShipSelectionContainer = document.querySelector(".shipSelectionContainer");
		if (oldShipSelectionContainer) oldShipSelectionContainer.remove();

		document.querySelector(".rotateButton")?.remove();

		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				const tile = document.createElement("div");
				tile.classList.add("tile");
				this.left.appendChild(tile);

				tile.addEventListener("dragover", (e) => {
					e.preventDefault();
				});

				tile.addEventListener("drop", (e) => {
					const data = e.dataTransfer.getData("text");
					e.target.appendChild(document.querySelector(`.${data}`));
				});
			}
		}

		const shipSelectionContainer = document.createElement("div");
		shipSelectionContainer.classList.add("shipSelectionContainer");
		this.right.appendChild(shipSelectionContainer);

		const shipFourSize = document.createElement("div");
		shipFourSize.classList.add("four-0");
		shipFourSize.classList.add("E"); // Add E class
		shipFourSize.draggable = true;
		shipSelectionContainer.appendChild(shipFourSize);

		shipFourSize.addEventListener("dragstart", (e) => {
			e.dataTransfer.setData("text", "four-0");
		});

		for (let i = 0; i < 2; i++) {
			const shipThreeSize = document.createElement("div");
			shipThreeSize.classList.add(`three-${i}`);
			shipThreeSize.classList.add("E");
			shipThreeSize.draggable = true;
			shipSelectionContainer.appendChild(shipThreeSize);

			shipThreeSize.addEventListener("dragstart", (e) => {
				e.dataTransfer.setData("text", `three-${i}`);
			});
		}

		for (let i = 0; i < 3; i++) {
			const shipTwoSize = document.createElement("div");
			shipTwoSize.classList.add(`two-${i}`);
			shipTwoSize.classList.add("E");
			shipTwoSize.draggable = true;
			shipSelectionContainer.appendChild(shipTwoSize);

			shipTwoSize.addEventListener("dragstart", (e) => {
				e.dataTransfer.setData("text", `two-${i}`);
			});
		}

		for (let i = 0; i < 4; i++) {
			const shipOneSize = document.createElement("div");
			shipOneSize.classList.add(`one-${i}`);
			shipOneSize.classList.add("E");
			shipOneSize.draggable = true;
			shipSelectionContainer.appendChild(shipOneSize);

			shipOneSize.addEventListener("dragstart", (e) => {
				e.dataTransfer.setData("text", `one-${i}`);
			});
		}

		const rotateButton = document.createElement("button");
		rotateButton.textContent = "Rotate Ships";
		rotateButton.classList.add("rotateButton");
		rotateButton.addEventListener("click", () => {
			const ships = document.querySelectorAll(".shipSelectionContainer div");
			ships.forEach(ship => {
				ship.classList.toggle("E");
				ship.classList.toggle("N");
			});
		});
		this.right.appendChild(rotateButton);

	}

}
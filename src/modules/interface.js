import Gameboard from "./gameboard";
import Player from "./player";

export default class Interface {
	constructor() {
		this.left = document.querySelector(".left");
		this.right = document.querySelector(".right");
		this.generalMenu = document.querySelector(".generalMenu");
		this.selectedShipSize = 1;
		this.selectedShipDirection = "East";
	}

	createPlayers() {
		this.playerGameboard = new Gameboard(10, 10);
		const playerNameInput = document.createElement("input");
		this.right.appendChild(playerNameInput);

		const shipSelectionContainer = document.createElement("div");
		shipSelectionContainer.classList.add("shipSelectionContainer");
		this.right.appendChild(shipSelectionContainer);

		const shipFourSize = document.createElement("div");
		shipFourSize.classList.add("four");
		shipSelectionContainer.appendChild(shipFourSize);
		shipFourSize.addEventListener("click", (event) => {
			this.selectedShipSize = 4;
			event.target.classList.add("selected");
		});

		for (let i = 0; i < 2; i++) {
			const shipThreeSize = document.createElement("div");
			shipThreeSize.classList.add("three");
			shipSelectionContainer.appendChild(shipThreeSize);
			shipThreeSize.addEventListener("click", (event) => {
				this.selectedShipSize = 3;
				event.target.classList.add("selected");
			});
		}

		for (let i = 0; i < 3; i++) {
			const shipTwoSize = document.createElement("div");
			shipTwoSize.classList.add("two");
			shipSelectionContainer.appendChild(shipTwoSize);
			shipTwoSize.addEventListener("click", (event) => {
				this.selectedShipSize = 2;
				event.target.classList.add("selected");
			});
		}

		for (let i = 0; i < 4; i++) {
			const shipOneSize = document.createElement("div");
			shipOneSize.classList.add("one");
			shipSelectionContainer.appendChild(shipOneSize);
			shipOneSize.addEventListener("click", (event) => {
				this.selectedShipSize = 1;
				event.target.classList.add("selected");
			});
		}

		for (let i = 0; i < this.playerGameboard.board.length; i++) {
			for (let j = 0; j < this.playerGameboard.board[i].length; j++) {
				const tile = document.createElement("div");
				tile.classList.add("tile");
				this.left.appendChild(tile);
				tile.addEventListener("click", () => {
					this.playerGameboard.addShip(this.selectedShipSize, this.selectedShipDirection, [i, j]);
				});
			}
		}

		const finishPlayerCreation = document.createElement("button");
		finishPlayerCreation.addEventListener("click", (event) => {
			this.player = new Player(playerNameInput.value);

			this.opponentGameboard = new Gameboard(10, 10);

			playerNameInput.value = "";

			while (this.left.lastElementChild) {
				this.left.removeChild(this.left.lastElementChild);
			}



			for (let i = 0; i < this.opponentGameboard.board.length; i++) {
				for (let j = 0; j < this.opponentGameboard.board[i].length; j++) {
					const tile = document.createElement("div");
					tile.classList.add("tile");
					this.left.appendChild(tile);
					tile.addEventListener("click", () => {
						this.opponentGameboard.addShip(this.selectedShipSize, this.selectedShipDirection, [i, j]);
					});
				}
			}

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
}
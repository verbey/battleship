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
		playerNameInput.type = "text";
		playerNameInput.placeholder = "Enter your name";
		playerNameInput.classList.add("playerNameInput");
		this.right.appendChild(playerNameInput);

		const shipSelectionContainer = document.createElement("div");
		shipSelectionContainer.classList.add("shipSelectionContainer");
		this.right.appendChild(shipSelectionContainer);

		const shipFourSize = document.createElement("div");
		shipFourSize.classList.add("four");
		shipFourSize.classList.add("0");
		shipFourSize.draggable = true;
		shipSelectionContainer.appendChild(shipFourSize);

		shipFourSize.addEventListener("dragstart", (e) => {
			e.dataTransfer.setData("text", e.target.classList);
		});

		for (let i = 0; i < 2; i++) {
			const shipThreeSize = document.createElement("div");
			shipThreeSize.classList.add("three");
			shipThreeSize.classList.add(`${i}`);
			shipThreeSize.draggable = true;
			shipSelectionContainer.appendChild(shipThreeSize);
			shipThreeSize.addEventListener("dragstart", (e) => {
				e.dataTransfer.setData("text", e.target.classList);
			});
		}

		for (let i = 0; i < 3; i++) {
			const shipTwoSize = document.createElement("div");
			shipTwoSize.classList.add("two");
			shipTwoSize.classList.add(`${i}`);
			shipTwoSize.draggable = true;
			shipSelectionContainer.appendChild(shipTwoSize);
			shipTwoSize.addEventListener("dragstart", (e) => {
				e.dataTransfer.setData("text", e.target.classList);
			});

		}

		for (let i = 0; i < 4; i++) {
			const shipOneSize = document.createElement("div");
			shipOneSize.classList.add("one");
			shipOneSize.classList.add(`${i}`);
			shipOneSize.draggable = true;
			shipSelectionContainer.appendChild(shipOneSize);
			shipOneSize.addEventListener("dragstart", (e) => {
				e.dataTransfer.setData("text", e.target.classList);
			});
		}

		for (let i = 0; i < this.playerGameboard.board.length; i++) {
			for (let j = 0; j < this.playerGameboard.board[i].length; j++) {
				const tile = document.createElement("div");
				tile.classList.add("tile");
				this.left.appendChild(tile);
				tile.addEventListener("dragover", (e) => {
					e.preventDefault();
				});

				tile.addEventListener("drop", (e) => {
					const data = e.dataTransfer.getData("text");
					e.target.appendChild(document.getElementsByClassName(data)[0]);
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
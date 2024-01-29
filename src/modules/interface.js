import Player from "./player";
import FoxgirlImage from "../imgs/fox_girl.webp";

export default class Interface {

	constructor() {
		this.left = document.querySelector(".left");
		this.right = document.querySelector(".right");
		this.selectedShipDirection = "E";
	}

	createPlayers() {
		this.clearRightAndLeft();

		const playerNameInput = document.createElement("input");
		playerNameInput.type = "text";
		playerNameInput.placeholder = "Enter your name";
		playerNameInput.classList.add("playerNameInput");
		this.right.appendChild(playerNameInput);

		const playerTypeCheckbox = document.createElement("input");
		playerTypeCheckbox.type = "checkbox";
		playerTypeCheckbox.id = "playerTypeCheckbox";
		this.right.appendChild(playerTypeCheckbox);

		const playerTypeLabel = document.createElement("label");
		playerTypeLabel.textContent = "Computer";
		playerTypeLabel.htmlFor = "playerTypeCheckbox";
		this.right.appendChild(playerTypeLabel);

		this.createPlayerGameboard();

		const finishPlayerCreation = document.createElement("button");
		finishPlayerCreation.addEventListener("click", (event) => {
			this.player = new Player(playerNameInput.value, playerTypeCheckbox.checked ? "bot" : "human");

			const shipAppend = this.appendShipsToGameboard(this.player.gameboard);
			if (shipAppend === 1) return;

			this.createPlayerGameboard();

			event.target.remove();

			const startGame = document.createElement("button");
			startGame.addEventListener("click", () => {
				this.opponent = new Player(playerNameInput.value, playerTypeCheckbox.checked ? "bot" : "human");

				const shipAppend = this.appendShipsToGameboard(this.opponent.gameboard);
				if (shipAppend === 1) return;

				this.startGame();
			});
			startGame.textContent = "Start Game";
			this.right.appendChild(startGame);
		});

		finishPlayerCreation.textContent = "Done";
		this.right.appendChild(finishPlayerCreation);
	}


	appendShipsToGameboard(gameboard) {
		const allShips = document.querySelectorAll("div[class^='one'],div[class^='two'],div[class^='three'],div[class^='four']");
		const allShipsArr = Array.from(allShips);
		if (allShipsArr.some(ship => ship.parentNode.classList.value === "shipSelectionContainer")) return 1;

		try {

			const allShips = document.querySelectorAll("div[class^='one'],div[class^='two'],div[class^='three'],div[class^='four']");

			allShips.forEach(ship => {

				let shipSizeNum;
				const shipSize = ship.classList.value.split(" ")[0].split("-")[0];
				if (shipSize === "one") shipSizeNum = 1;
				else if (shipSize === "two") shipSizeNum = 2;
				else if (shipSize === "three") shipSizeNum = 3;
				else shipSizeNum = 4;

				const shipDirection = ship.classList.value.split(" ")[1];

				const parentTileIndex = Array.from(ship.parentElement.parentElement.childNodes).indexOf(ship.parentElement);

				gameboard.addShip(shipSizeNum, shipDirection, [Math.floor(parentTileIndex / 10), parentTileIndex % 10]);
			});

		} catch (err) {
			console.log(err);
			this.createPlayerGameboard();
			return 1;
		}
	}

	createPlayerGameboard() {
		// Clear old elements if they exist
		while (this.left.firstChild) {
			this.left.firstChild.remove();
		}

		const oldShipSelectionContainer = document.querySelector(".shipSelectionContainer");
		if (oldShipSelectionContainer) oldShipSelectionContainer.remove();

		document.querySelector(".rotateButton")?.remove();

		const gameboardElement = document.createElement("div");
		gameboardElement.classList.add("gameboard");
		this.left.appendChild(gameboardElement);

		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				const tile = document.createElement("div");
				tile.classList.add("tile");
				gameboardElement.appendChild(tile);

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
		shipFourSize.classList.add("E");
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
				ship.classList.toggle("S");
			});
		});
		this.right.appendChild(rotateButton);

	}

	startGame() {
		this.clearRightAndLeft();

		const playerNameElement = document.createElement("div");
		playerNameElement.classList.add("name");
		playerNameElement.textContent = this.player.name;
		this.left.appendChild(playerNameElement);

		const opponentNameElement = document.createElement("div");
		opponentNameElement.classList.add("name");
		opponentNameElement.textContent = this.opponent.name;
		this.right.appendChild(opponentNameElement);

		this.displayGameboards("player");
	}

	displayGameboards(turn) {
		let currentTurnPlayer;
		let nextTurnPlayer;
		if (turn === "player") {
			currentTurnPlayer = this.player;
			nextTurnPlayer = this.opponent;
		}
		else if (turn === "opponent") {
			currentTurnPlayer = this.opponent;
			nextTurnPlayer = this.player;
		}

		if (currentTurnPlayer.type === "bot") {
			const botAttackCoordinates = currentTurnPlayer.generateHitTarget(nextTurnPlayer.gameboard);
			nextTurnPlayer.gameboard.receiveAttack(botAttackCoordinates);
			if (nextTurnPlayer.gameboard.areAllSunk()) this.announceWinner(currentTurnPlayer, nextTurnPlayer);
			else if (turn === "opponent") this.displayGameboards(nextTurnPlayer.gameboard.isShipTile(botAttackCoordinates) ? "opponent" : "player");
			else if (turn === "player") this.displayGameboards(nextTurnPlayer.gameboard.isShipTile(botAttackCoordinates) ? "player" : "opponent");
		}
		else {
			const gameboardElements = document.querySelectorAll(".gameboard");
			gameboardElements.forEach(gameboardElement => {
				gameboardElement.remove();
			});

			const newPlayerGameboardElement = document.createElement("div");
			newPlayerGameboardElement.classList.add("gameboard");
			this.left.appendChild(newPlayerGameboardElement);


			const newOpponentGameboardElement = document.createElement("div");
			newOpponentGameboardElement.classList.add("gameboard");
			this.right.appendChild(newOpponentGameboardElement);

			for (let i = 0; i < 10; i++) {
				for (let j = 0; j < 10; j++) {
					const tile = document.createElement("div");
					tile.classList.add("tile");
					tile.dataset.i = i;
					tile.dataset.j = j;

					const ifTargeted = this.player.gameboard.targetedTiles.find((coord) => coord[0] === i && coord[1] === j) !== undefined;
					if (ifTargeted && this.player.gameboard.isShipTile([i, j])) tile.classList.add("hit");
					else if (ifTargeted) tile.classList.add("miss");

					if (turn === "opponent") {
						tile.addEventListener("click", (event) => {
							const coordinates = [Number(event.target.dataset.i), Number(event.target.dataset.j)];
							this.player.gameboard.receiveAttack(coordinates);
							if (this.player.gameboard.areAllSunk() === true) this.announceWinner(this.opponent, this.player);
							else this.displayGameboards(this.player.gameboard.isShipTile(coordinates) ? "opponent" : "player");
						});
					}

					newPlayerGameboardElement.appendChild(tile);
				}
			}

			for (let i = 0; i < 10; i++) {
				for (let j = 0; j < 10; j++) {
					const tile = document.createElement("div");
					tile.classList.add("tile");
					tile.dataset.i = i;
					tile.dataset.j = j;

					const ifTargeted = this.opponent.gameboard.targetedTiles.find((coord) => coord[0] === i && coord[1] === j) !== undefined;
					if (ifTargeted && this.opponent.gameboard.isShipTile([i, j])) tile.classList.add("hit");
					else if (ifTargeted) tile.classList.add("miss");

					if (turn === "player") {
						tile.addEventListener("click", (event) => {
							const coordinates = [Number(event.target.dataset.i), Number(event.target.dataset.j)];
							this.opponent.gameboard.receiveAttack(coordinates);
							if (this.opponent.gameboard.areAllSunk() === true) this.announceWinner(this.player, this.opponent);
							else this.displayGameboards(this.opponent.gameboard.isShipTile(coordinates) ? "player" : "opponent");
						});
					}

					newOpponentGameboardElement.appendChild(tile);
				}
			}
		}
	}

	announceWinner(winnerPlayerObject, loserPlayerObject) {
		this.clearRightAndLeft();

		const announceText = document.createElement("div");
		announceText.classList.add("announceText");
		announceText.textContent = "The winner is...";
		this.left.appendChild(announceText);

		const winnerName = document.createElement("div");
		winnerName.classList.add("statText");
		winnerName.textContent = winnerPlayerObject.name;
		this.left.appendChild(winnerName);

		const stats = document.createElement("div");
		stats.classList.add("stats");

		const missedHitsText = document.createElement("div");
		missedHitsText.textContent = "Missed hits";
		missedHitsText.classList.add("statText");
		stats.appendChild(missedHitsText);

		const missedHitsNum = document.createElement("div");
		missedHitsNum.textContent = `${loserPlayerObject.gameboard.targetedTiles.length - 20}/${loserPlayerObject.gameboard.targetedTiles.length}`;
		missedHitsNum.classList.add("statNum");
		stats.appendChild(missedHitsNum);

		const ownShipTilesLeftText = document.createElement("div");
		ownShipTilesLeftText.textContent = "Own ship tiles left";
		ownShipTilesLeftText.classList.add("statText");
		stats.appendChild(ownShipTilesLeftText);

		const ownShipTilesLeftNum = document.createElement("div");
		let ownShipTilesLeftCount = 20;
		for (let i = 0; i < winnerPlayerObject.gameboard.ships.length; i++) ownShipTilesLeftCount -= winnerPlayerObject.gameboard.ships[i].hitTiles.length;
		ownShipTilesLeftNum.textContent = `${ownShipTilesLeftCount}`;
		ownShipTilesLeftNum.classList.add("statNum");
		stats.appendChild(ownShipTilesLeftNum);
		this.right.appendChild(stats);

		const startNewGameButton = document.createElement("button");
		startNewGameButton.textContent = "New game";
		startNewGameButton.addEventListener("click", () => {
			this.createPlayers();
		});
		this.right.appendChild(startNewGameButton);

		const foxGirlImage = new Image();
		foxGirlImage.src = FoxgirlImage;
		foxGirlImage.alt = "Happy fox girl looking at viewer.";
		stats.appendChild(foxGirlImage);

		const textBubble = document.createElement("div");
		textBubble.textContent = "Good job, commander!";
		textBubble.classList.add("textBubble");
		stats.appendChild(textBubble);
	}

	clearRightAndLeft() {
		while (this.right.firstChild) {
			this.right.removeChild(this.right.firstChild);
		}
		while (this.left.firstChild) {
			this.left.removeChild(this.left.firstChild);
		}
	}
}
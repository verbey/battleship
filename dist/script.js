/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_interface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/interface */ \"./src/modules/interface.js\");\n/* harmony import */ var _modules_ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/ship */ \"./src/modules/ship.js\");\n/* harmony import */ var _modules_player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/player */ \"./src/modules/player.js\");\n/* harmony import */ var _modules_gameboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/gameboard */ \"./src/modules/gameboard.js\");\n\n\n\n\nconst interfaceInstance = new _modules_interface__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\ninterfaceInstance.createPlayers();\n\n//# sourceURL=webpack://battleship/./src/main.js?");

/***/ }),

/***/ "./src/modules/gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Gameboard)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/modules/ship.js\");\n\nclass Gameboard {\n  constructor(x, y) {\n    this.xLimit = x;\n    this.yLimit = y;\n    this.ships = [];\n    this.targetedTiles = [];\n  }\n  addShip(size, direction, position) {\n    if (position[0] < 0 || position[0] > this.yLimit || position[1] < 0 || position[1] > this.xLimit) throw new Error(\"Invalid position coordinates.\");\n    if (direction === \"W\" && position[1] - size < 0) throw new Error(\"Can't create a ship facing west here.\");else if (direction === \"E\" && position[1] + size > this.yLimit) throw new Error(\"Can't create a ship facing east here.\");else if (direction === \"N\" && position[0] - size < 0) throw new Error(\"Can't create a ship facing north here.\");else if (direction === \"S\" && position[0] + size > this.yLimit) throw new Error(\"Can't create a ship facing south here.\");\n    const ship = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](size, direction, position);\n    ship.tiles.forEach(coordinates => {\n      const overlap = this.isShipTile(coordinates);\n      if (overlap) throw new Error(\"Ships overlap.\");\n    });\n    this.ships.push(ship);\n  }\n  isShipTile(coordinates) {\n    for (let i = 0; i < this.ships.length; i++) {\n      const index = this.ships[i].tiles.findIndex(tileCoordinates => {\n        return tileCoordinates[0] === coordinates[0] && tileCoordinates[1] === coordinates[1];\n      });\n      if (index === -1) continue;else return true;\n    }\n    return false;\n  }\n  receiveAttack(coordinates) {\n    const index = this.targetedTiles.findIndex(tileCoordinates => {\n      return tileCoordinates[0] === coordinates[0] && tileCoordinates[1] === coordinates[1];\n    });\n    if (index === -1) {\n      this.targetedTiles.push(coordinates);\n      for (let i = 0; i < this.ships.length; i++) {\n        this.ships[i].hit(coordinates);\n      }\n    }\n  }\n  areAllSunk() {\n    for (let i = 0; i < this.ships.length; i++) {\n      if (this.ships[i].tiles.length !== this.ships[i].hitTiles.length) return false;\n    }\n    return true;\n  }\n  removeAllShips() {\n    this.ships = [];\n  }\n}\n\n//# sourceURL=webpack://battleship/./src/modules/gameboard.js?");

/***/ }),

/***/ "./src/modules/interface.js":
/*!**********************************!*\
  !*** ./src/modules/interface.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Interface)\n/* harmony export */ });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/modules/player.js\");\n/* harmony import */ var _imgs_fox_girl_webp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../imgs/fox_girl.webp */ \"./src/imgs/fox_girl.webp\");\n\n\nclass Interface {\n  constructor() {\n    this.left = document.querySelector(\".left\");\n    this.right = document.querySelector(\".right\");\n    this.selectedShipDirection = \"E\";\n  }\n  createPlayers() {\n    const playerNameInput = document.createElement(\"input\");\n    playerNameInput.type = \"text\";\n    playerNameInput.placeholder = \"Enter your name\";\n    playerNameInput.classList.add(\"playerNameInput\");\n    this.right.appendChild(playerNameInput);\n    this.createPlayerGameboard();\n    const finishPlayerCreation = document.createElement(\"button\");\n    finishPlayerCreation.addEventListener(\"click\", event => {\n      this.player = new _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"](playerNameInput.value);\n      const shipAppend = this.appendShipsToGameboard(this.player.gameboard);\n      if (shipAppend === 1) return;\n      this.createPlayerGameboard();\n      event.target.remove();\n      const startGame = document.createElement(\"button\");\n      startGame.addEventListener(\"click\", () => {\n        this.opponent = new _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"](playerNameInput.value, \"bot\");\n        const shipAppend = this.appendShipsToGameboard(this.opponent.gameboard);\n        if (shipAppend === 1) return;\n        this.startGame();\n      });\n      startGame.textContent = \"Start Game\";\n      this.right.appendChild(startGame);\n    });\n    finishPlayerCreation.textContent = \"Done\";\n    this.right.appendChild(finishPlayerCreation);\n  }\n  appendShipsToGameboard(gameboard) {\n    const allShips = document.querySelectorAll(\"div[class^='one'],div[class^='two'],div[class^='three'],div[class^='four']\");\n    const allShipsArr = Array.from(allShips);\n    if (allShipsArr.some(ship => ship.parentNode.classList.value === \"shipSelectionContainer\")) return 1;\n    try {\n      const allShips = document.querySelectorAll(\"div[class^='one'],div[class^='two'],div[class^='three'],div[class^='four']\");\n      allShips.forEach(ship => {\n        let shipSizeNum;\n        const shipSize = ship.classList.value.split(\" \")[0].split(\"-\")[0];\n        if (shipSize === \"one\") shipSizeNum = 1;else if (shipSize === \"two\") shipSizeNum = 2;else if (shipSize === \"three\") shipSizeNum = 3;else shipSizeNum = 4;\n        const shipDirection = ship.classList.value.split(\" \")[1];\n        const parentTileIndex = Array.from(ship.parentElement.parentElement.childNodes).indexOf(ship.parentElement);\n        gameboard.addShip(shipSizeNum, shipDirection, [Math.floor(parentTileIndex / 10), parentTileIndex % 10]);\n      });\n    } catch (err) {\n      console.log(err);\n      this.createPlayerGameboard();\n      return 1;\n    }\n  }\n  createPlayerGameboard() {\n    // Clear old elements if they exist\n    while (this.left.firstChild) {\n      this.left.firstChild.remove();\n    }\n    const oldShipSelectionContainer = document.querySelector(\".shipSelectionContainer\");\n    if (oldShipSelectionContainer) oldShipSelectionContainer.remove();\n    document.querySelector(\".rotateButton\")?.remove();\n    const gameboardElement = document.createElement(\"div\");\n    gameboardElement.classList.add(\"gameboard\");\n    this.left.appendChild(gameboardElement);\n    for (let i = 0; i < 10; i++) {\n      for (let j = 0; j < 10; j++) {\n        const tile = document.createElement(\"div\");\n        tile.classList.add(\"tile\");\n        gameboardElement.appendChild(tile);\n        tile.addEventListener(\"dragover\", e => {\n          e.preventDefault();\n        });\n        tile.addEventListener(\"drop\", e => {\n          const data = e.dataTransfer.getData(\"text\");\n          e.target.appendChild(document.querySelector(`.${data}`));\n        });\n      }\n    }\n    const shipSelectionContainer = document.createElement(\"div\");\n    shipSelectionContainer.classList.add(\"shipSelectionContainer\");\n    this.right.appendChild(shipSelectionContainer);\n    const shipFourSize = document.createElement(\"div\");\n    shipFourSize.classList.add(\"four-0\");\n    shipFourSize.classList.add(\"E\"); // Add E class\n    shipFourSize.draggable = true;\n    shipSelectionContainer.appendChild(shipFourSize);\n    shipFourSize.addEventListener(\"dragstart\", e => {\n      e.dataTransfer.setData(\"text\", \"four-0\");\n    });\n    for (let i = 0; i < 2; i++) {\n      const shipThreeSize = document.createElement(\"div\");\n      shipThreeSize.classList.add(`three-${i}`);\n      shipThreeSize.classList.add(\"E\");\n      shipThreeSize.draggable = true;\n      shipSelectionContainer.appendChild(shipThreeSize);\n      shipThreeSize.addEventListener(\"dragstart\", e => {\n        e.dataTransfer.setData(\"text\", `three-${i}`);\n      });\n    }\n    for (let i = 0; i < 3; i++) {\n      const shipTwoSize = document.createElement(\"div\");\n      shipTwoSize.classList.add(`two-${i}`);\n      shipTwoSize.classList.add(\"E\");\n      shipTwoSize.draggable = true;\n      shipSelectionContainer.appendChild(shipTwoSize);\n      shipTwoSize.addEventListener(\"dragstart\", e => {\n        e.dataTransfer.setData(\"text\", `two-${i}`);\n      });\n    }\n    for (let i = 0; i < 4; i++) {\n      const shipOneSize = document.createElement(\"div\");\n      shipOneSize.classList.add(`one-${i}`);\n      shipOneSize.classList.add(\"E\");\n      shipOneSize.draggable = true;\n      shipSelectionContainer.appendChild(shipOneSize);\n      shipOneSize.addEventListener(\"dragstart\", e => {\n        e.dataTransfer.setData(\"text\", `one-${i}`);\n      });\n    }\n    const rotateButton = document.createElement(\"button\");\n    rotateButton.textContent = \"Rotate Ships\";\n    rotateButton.classList.add(\"rotateButton\");\n    rotateButton.addEventListener(\"click\", () => {\n      const ships = document.querySelectorAll(\".shipSelectionContainer div\");\n      ships.forEach(ship => {\n        ship.classList.toggle(\"E\");\n        ship.classList.toggle(\"S\");\n      });\n    });\n    this.right.appendChild(rotateButton);\n  }\n  startGame() {\n    while (this.right.firstChild) {\n      this.right.removeChild(this.right.firstChild);\n    }\n    while (this.left.firstChild) {\n      this.left.removeChild(this.left.firstChild);\n    }\n    const playerNameElement = document.createElement(\"div\");\n    playerNameElement.classList.add(\"name\");\n    playerNameElement.textContent = this.player.name;\n    this.left.appendChild(playerNameElement);\n    const opponentNameElement = document.createElement(\"div\");\n    opponentNameElement.classList.add(\"name\");\n    opponentNameElement.textContent = this.opponent.name;\n    this.right.appendChild(opponentNameElement);\n    this.displayGameboards(\"player\");\n  }\n  displayGameboards(turn) {\n    const gameboardElements = document.querySelectorAll(\".gameboard\");\n    gameboardElements.forEach(gameboardElement => {\n      gameboardElement.remove();\n    });\n    const newPlayerGameboardElement = document.createElement(\"div\");\n    newPlayerGameboardElement.classList.add(\"gameboard\");\n    this.left.appendChild(newPlayerGameboardElement);\n    const newOpponentGameboardElement = document.createElement(\"div\");\n    newOpponentGameboardElement.classList.add(\"gameboard\");\n    this.right.appendChild(newOpponentGameboardElement);\n    for (let i = 0; i < 10; i++) {\n      for (let j = 0; j < 10; j++) {\n        const tile = document.createElement(\"div\");\n        tile.classList.add(\"tile\");\n        tile.dataset.i = i;\n        tile.dataset.j = j;\n        const ifTargeted = this.player.gameboard.targetedTiles.find(coord => coord[0] === i && coord[1] === j) !== undefined;\n        if (ifTargeted && this.player.gameboard.isShipTile([i, j])) tile.classList.add(\"hit\");else if (ifTargeted) tile.classList.add(\"miss\");\n        if (turn === \"opponent\") {\n          tile.addEventListener(\"click\", event => {\n            const coordinates = [Number(event.target.dataset.i), Number(event.target.dataset.j)];\n            this.player.gameboard.receiveAttack(coordinates);\n            if (this.player.gameboard.areAllSunk() === true) this.announceWinner(this.opponent, this.player);else this.displayGameboards(this.player.gameboard.isShipTile(coordinates) ? \"opponent\" : \"player\");\n          });\n        }\n        newPlayerGameboardElement.appendChild(tile);\n      }\n    }\n    for (let i = 0; i < 10; i++) {\n      for (let j = 0; j < 10; j++) {\n        const tile = document.createElement(\"div\");\n        tile.classList.add(\"tile\");\n        tile.dataset.i = i;\n        tile.dataset.j = j;\n        const ifTargeted = this.opponent.gameboard.targetedTiles.find(coord => coord[0] === i && coord[1] === j) !== undefined;\n        if (ifTargeted && this.opponent.gameboard.isShipTile([i, j])) tile.classList.add(\"hit\");else if (ifTargeted) tile.classList.add(\"miss\");\n        if (turn === \"player\") {\n          tile.addEventListener(\"click\", event => {\n            const coordinates = [Number(event.target.dataset.i), Number(event.target.dataset.j)];\n            this.opponent.gameboard.receiveAttack(coordinates);\n            if (this.opponent.gameboard.areAllSunk() === true) this.announceWinner(this.player, this.opponent);else this.displayGameboards(this.opponent.gameboard.isShipTile(coordinates) ? \"player\" : \"opponent\");\n          });\n        }\n        newOpponentGameboardElement.appendChild(tile);\n      }\n    }\n  }\n  announceWinner(winnerPlayerObject, loserPlayerObject) {\n    while (this.right.firstChild) {\n      this.right.removeChild(this.right.firstChild);\n    }\n    while (this.left.firstChild) {\n      this.left.removeChild(this.left.firstChild);\n    }\n    const announceText = document.createElement(\"div\");\n    announceText.classList.add(\"announceText\");\n    announceText.textContent = \"The winner is...\";\n    this.left.appendChild(announceText);\n    const winnerName = document.createElement(\"div\");\n    winnerName.classList.add(\"statText\");\n    winnerName.textContent = winnerPlayerObject.name;\n    this.left.appendChild(winnerName);\n    const stats = document.createElement(\"div\");\n    stats.classList.add(\"stats\");\n    const missedHitsText = document.createElement(\"div\");\n    missedHitsText.textContent = \"Missed hits\";\n    missedHitsText.classList.add(\"statText\");\n    stats.appendChild(missedHitsText);\n    const missedHitsNum = document.createElement(\"div\");\n    missedHitsNum.textContent = `${loserPlayerObject.gameboard.targetedTiles.length - 20}/${loserPlayerObject.gameboard.targetedTiles.length}`;\n    missedHitsNum.classList.add(\"statNum\");\n    stats.appendChild(missedHitsNum);\n    const ownShipTilesLeftText = document.createElement(\"div\");\n    ownShipTilesLeftText.textContent = \"Own ship tiles left\";\n    ownShipTilesLeftText.classList.add(\"statText\");\n    stats.appendChild(ownShipTilesLeftText);\n    const ownShipTilesLeftNum = document.createElement(\"div\");\n    let ownShipTilesLeftCount = 20;\n    for (let i = 0; i < winnerPlayerObject.gameboard.ships.length; i++) ownShipTilesLeftCount -= winnerPlayerObject.gameboard.ships[i].hitTiles.length;\n    ownShipTilesLeftNum.textContent = `${ownShipTilesLeftCount}`;\n    ownShipTilesLeftNum.classList.add(\"statNum\");\n    stats.appendChild(ownShipTilesLeftNum);\n    this.right.appendChild(stats);\n    const startNewGameButton = document.createElement(\"button\");\n    startNewGameButton.textContent = \"New game\";\n    this.right.appendChild(startNewGameButton);\n    const foxGirlImage = new Image();\n    foxGirlImage.src = _imgs_fox_girl_webp__WEBPACK_IMPORTED_MODULE_1__;\n    foxGirlImage.alt = \"Happy fox girl looking at viewer.\";\n    stats.appendChild(foxGirlImage);\n    const textBubble = document.createElement(\"div\");\n    textBubble.textContent = \"Good job, commander!\";\n    textBubble.classList.add(\"textBubble\");\n    stats.appendChild(textBubble);\n  }\n}\n\n//# sourceURL=webpack://battleship/./src/modules/interface.js?");

/***/ }),

/***/ "./src/modules/player.js":
/*!*******************************!*\
  !*** ./src/modules/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PLayer)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/modules/gameboard.js\");\n\nclass PLayer {\n  constructor(name, type) {\n    if (type === undefined || type === \"\") this.type = \"human\";else this.type = type;\n    if (name === undefined || name === \"\") this.name = this.type === \"bot\" ? \"Computer\" : \"Bob\";else this.name = name;\n    this.gameboard = new _gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"](10, 10);\n  }\n  generateHitTarget(gameboard) {\n    let allTiles = [];\n    for (let i = 0; i < gameboard.yLimit; i++) {\n      for (let j = 0; j < gameboard.xLimit; j++) allTiles.push([i, j]);\n    }\n    const freeTiles = allTiles.filter(tile => {\n      const hitTile = gameboard.targetedTiles.find(hitTile => hitTile[0] === tile[0] && hitTile[1] === tile[1]);\n      return !hitTile;\n    });\n    const randomFreeTile = freeTiles[Math.floor(Math.random() * freeTiles.length)];\n    return randomFreeTile;\n  }\n}\n\n//# sourceURL=webpack://battleship/./src/modules/player.js?");

/***/ }),

/***/ "./src/modules/ship.js":
/*!*****************************!*\
  !*** ./src/modules/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship {\n  constructor(size, direction, position) {\n    this.position = position;\n    if (size < 1 || size > 4) throw new Error(\"Invalid size.\");else this.size = size;\n    if (!/^(W|E|S|N)$/.test(direction)) throw new Error(\"Invalid direction.\");else this.direction = direction;\n    this.tiles = [];\n    for (let i = 0; i < this.size; i++) {\n      if (direction === \"W\") this.tiles.push([position[0], position[1] - i]);else if (direction === \"E\") this.tiles.push([position[0], position[1] + i]);else if (direction === \"N\") this.tiles.push([position[0] - i, position[1]]);else if (direction === \"S\") this.tiles.push([position[0] + i, position[1]]);\n    }\n    this.hitTiles = [];\n  }\n  hit(coordinates) {\n    // Searches whether coordinates belong to a ship. If yes, proceeds to check if the coordinates were\n    // already hit. If not, adds the coordinates to this.hitTiles\n    const index = this.tiles.findIndex(tileCoordinates => {\n      return tileCoordinates[0] === coordinates[0] && tileCoordinates[1] === coordinates[1];\n    });\n    if (index !== -1) {\n      const index = this.hitTiles.findIndex(tileCoordinates => {\n        return tileCoordinates[0] === coordinates[0] && tileCoordinates[1] === coordinates[1];\n      });\n      if (index === -1) {\n        this.hitTiles.push(coordinates);\n      }\n    }\n  }\n  isSunk() {\n    if (this.hitTiles.length === this.tiles.length) return true;else return false;\n  }\n}\n\n//# sourceURL=webpack://battleship/./src/modules/ship.js?");

/***/ }),

/***/ "./src/imgs/fox_girl.webp":
/*!********************************!*\
  !*** ./src/imgs/fox_girl.webp ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"586b16ddf5752eded966.webp\";\n\n//# sourceURL=webpack://battleship/./src/imgs/fox_girl.webp?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;
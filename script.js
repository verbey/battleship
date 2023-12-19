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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Gameboard)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/modules/ship.js\");\n\nclass Gameboard {\n  constructor(x, y) {\n    this.board = [];\n    for (let i = 0; i < x; i++) {\n      this.board.push([]);\n      for (let j = 0; j < y; j++) {\n        this.board[i].push(0);\n      }\n    }\n    this.ships = [];\n    this.missed = [];\n    this.hits = [];\n  }\n  addShip(size, direction, position) {\n    if (position[0] < 0 || position[0] > this.board.length || position[1] < 0 || position[1] > this.board.length || position[0]) throw new Error(\"Invalid position coordinates.\");\n    if (direction === \"W\" && position[0] - size < 0) throw new Error(\"Can't create a ship facing west here.\");else if (direction === \"E\" && position[0] + size > this.board.length) throw new Error(\"Can't create a ship facing east here.\");else if (direction === \"N\" && position[1] + size > this.board.length) throw new Error(\"Can't create a ship facing north here.\");else if (direction === \"S\" && position[1] - size < 0) throw new Error(\"Can't create a ship facing south here.\");\n    const ship = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](size, direction, position);\n    ship.tiles.forEach(coordinates => {\n      const overlap = this.isShipTile(coordinates);\n      if (overlap) throw new Error(\"Ships overlap.\");\n    });\n    this.ships.push(ship);\n  }\n  isShipTile(coordinates) {\n    for (let i = 0; i < this.ships.length; i++) {\n      const index = this.ships[i].tiles.findIndex(tileCoordinates => {\n        return tileCoordinates[0] === coordinates[0] && tileCoordinates[1] === coordinates[1];\n      });\n      if (index === -1) return false;else return true;\n    }\n  }\n  receiveAttack(coordinates) {\n    for (let i = 0; i < this.ships.length; i++) {\n      const result = this.ships[i].hit(coordinates);\n      if (this.ships[i].tiles.length === 0) this.ships.splice(i, 1);\n      if (result) {\n        this.hits.push(coordinates);\n        return;\n      }\n    }\n    this.missed.push(coordinates);\n  }\n  areAllSunk() {\n    if (this.ships.length === 0) return true;else return false;\n  }\n}\n\n//# sourceURL=webpack://battleship/./src/modules/gameboard.js?");

/***/ }),

/***/ "./src/modules/interface.js":
/*!**********************************!*\
  !*** ./src/modules/interface.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Interface)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/modules/gameboard.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./src/modules/player.js\");\n\n\nclass Interface {\n  constructor() {\n    this.left = document.querySelector(\".left\");\n    this.right = document.querySelector(\".right\");\n    this.generalMenu = document.querySelector(\".generalMenu\");\n    this.selectedShipDirection = \"E\";\n  }\n  createPlayers() {\n    this.playerGameboard = new _gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"](10, 10);\n    const playerNameInput = document.createElement(\"input\");\n    playerNameInput.type = \"text\";\n    playerNameInput.placeholder = \"Enter your name\";\n    playerNameInput.classList.add(\"playerNameInput\");\n    this.right.appendChild(playerNameInput);\n    const shipSelectionContainer = document.createElement(\"div\");\n    shipSelectionContainer.classList.add(\"shipSelectionContainer\");\n    this.right.appendChild(shipSelectionContainer);\n    const shipFourSize = document.createElement(\"div\");\n    shipFourSize.classList.add(\"four\");\n    shipFourSize.classList.add(\"0\");\n    shipFourSize.draggable = true;\n    shipSelectionContainer.appendChild(shipFourSize);\n    shipFourSize.addEventListener(\"dragstart\", e => {\n      e.dataTransfer.setData(\"text\", e.target.classList);\n    });\n    for (let i = 0; i < 2; i++) {\n      const shipThreeSize = document.createElement(\"div\");\n      shipThreeSize.classList.add(\"three\");\n      shipThreeSize.classList.add(`${i}`);\n      shipThreeSize.draggable = true;\n      shipSelectionContainer.appendChild(shipThreeSize);\n      shipThreeSize.addEventListener(\"dragstart\", e => {\n        e.dataTransfer.setData(\"text\", e.target.classList);\n      });\n    }\n    for (let i = 0; i < 3; i++) {\n      const shipTwoSize = document.createElement(\"div\");\n      shipTwoSize.classList.add(\"two\");\n      shipTwoSize.classList.add(`${i}`);\n      shipTwoSize.draggable = true;\n      shipSelectionContainer.appendChild(shipTwoSize);\n      shipTwoSize.addEventListener(\"dragstart\", e => {\n        e.dataTransfer.setData(\"text\", e.target.classList);\n      });\n    }\n    for (let i = 0; i < 4; i++) {\n      const shipOneSize = document.createElement(\"div\");\n      shipOneSize.classList.add(\"one\");\n      shipOneSize.classList.add(`${i}`);\n      shipOneSize.draggable = true;\n      shipSelectionContainer.appendChild(shipOneSize);\n      shipOneSize.addEventListener(\"dragstart\", e => {\n        e.dataTransfer.setData(\"text\", e.target.classList);\n      });\n    }\n    for (let i = 0; i < this.playerGameboard.board.length; i++) {\n      for (let j = 0; j < this.playerGameboard.board[i].length; j++) {\n        const tile = document.createElement(\"div\");\n        tile.classList.add(\"tile\");\n        this.left.appendChild(tile);\n        tile.addEventListener(\"dragover\", e => {\n          e.preventDefault();\n        });\n        tile.addEventListener(\"drop\", e => {\n          const sizeString = e.dataTransfer.getData(\"text\").split(\" \")[0];\n          let size = 0;\n          if (sizeString === \"one\") size = 1;else if (sizeString === \"two\") size = 2;else if (sizeString === \"three\") size = 3;else if (sizeString === \"four\") size = 4;\n          this.playerGameboard.addShip(size, this.selectedShipDirection, [i, j]);\n        });\n      }\n    }\n    const finishPlayerCreation = document.createElement(\"button\");\n    finishPlayerCreation.addEventListener(\"click\", event => {\n      this.player = new _player__WEBPACK_IMPORTED_MODULE_1__[\"default\"](playerNameInput.value);\n      this.opponentGameboard = new _gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"](10, 10);\n      playerNameInput.value = \"\";\n      while (this.left.lastElementChild) {\n        this.left.removeChild(this.left.lastElementChild);\n      }\n      for (let i = 0; i < this.opponentGameboard.board.length; i++) {\n        for (let j = 0; j < this.opponentGameboard.board[i].length; j++) {\n          const tile = document.createElement(\"div\");\n          tile.classList.add(\"tile\");\n          this.left.appendChild(tile);\n        }\n      }\n      const startGame = document.createElement(\"button\");\n      startGame.addEventListener(\"click\", () => {\n        this.startGame();\n      });\n      startGame.textContent = \"Start Game\";\n      this.right.appendChild(startGame);\n      event.target.remove();\n    });\n    finishPlayerCreation.textContent = \"Done\";\n    this.right.appendChild(finishPlayerCreation);\n  }\n}\n\n//# sourceURL=webpack://battleship/./src/modules/interface.js?");

/***/ }),

/***/ "./src/modules/player.js":
/*!*******************************!*\
  !*** ./src/modules/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PLayer)\n/* harmony export */ });\nclass PLayer {\n  constructor(name, type) {\n    this.name = name;\n    this.type = type;\n    this.hits = [];\n  }\n  addHit(limitX, limitY) {\n    if (limitX * limitY === this.hits.length) return undefined;\n    let x;\n    let y;\n    do {\n      x = Math.floor(Math.random() * limitX);\n      y = Math.floor(Math.random() * limitY);\n    } while (this.hits.find(hit => hit[0] === x && hit[1] === y) !== undefined);\n    let hit = [x, y];\n    this.hits.push(hit);\n    return hit;\n  }\n}\n\n//# sourceURL=webpack://battleship/./src/modules/player.js?");

/***/ }),

/***/ "./src/modules/ship.js":
/*!*****************************!*\
  !*** ./src/modules/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship {\n  constructor(size, direction, position) {\n    const [positionX, positionY] = position;\n    this.positionX = positionX;\n    this.positionY = positionY;\n    if (size < 1 || size > 4) throw new Error(\"Invalid size.\");else this.size = size;\n    if (!/^(W|E|S|N)$/.test(direction)) throw new Error(\"Invalid direction.\");else this.direction = direction;\n    this.tiles = [];\n    for (let i = 0; i < this.size; i++) {\n      if (direction === \"W\") this.tiles.push([positionX - i, positionY]);else if (direction === \"E\") this.tiles.push([positionX + i, positionY]);else if (direction === \"N\") this.tiles.push([positionX, positionY + i]);else if (direction === \"S\") this.tiles.push([positionX, positionY - i]);\n    }\n  }\n  hit(coordinates) {\n    const index = this.tiles.findIndex(tileCoordinates => {\n      return tileCoordinates[0] === coordinates[0] && tileCoordinates[1] === coordinates[1];\n    });\n    if (index === -1) return false;else {\n      this.tiles.splice(index, 1);\n      return true;\n    }\n  }\n  isSunk() {\n    if (this.length - this.tiles.length === 0) return false;else return true;\n  }\n}\n\n//# sourceURL=webpack://battleship/./src/modules/ship.js?");

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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;
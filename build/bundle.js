/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Layer {
    constructor({ width = 0, height = 0, translateX = 0, translateY = 0, fillStyle = '', alpha = 1, children = [] }) {
        this.width = width;
        this.height = height;
        this.translateX = translateX;
        this.translateY = translateY;
        this.fillStyle = fillStyle;
        this.alpha = alpha;
        this.layers = children;
    }
    add(layer) {
        this.layers.push(layer);
    }
    remove(layer) {
        const { layers } = this;
        const index = layers.indexOf(layer);
        if (index > -1) {
            layers.splice(index, 1);
        }
    }
    clearLayers() {
        this.layers.length = 0;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Layer;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const { sin, cos } = Math;
class Point {
    constructor({ x, y }) {
        this.x = x;
        this.y = y;
    }
    rotate(angle, origin) {
        const { x, y } = this;
        return new Point({
            x: cos(angle) * (x - origin.x) - sin(angle) * (y - origin.y) + origin.x,
            y: sin(angle) * (x - origin.x) + cos(angle) * (y - origin.y) + origin.y,
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Point;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tetris_index__ = __webpack_require__(3);

const game = new __WEBPACK_IMPORTED_MODULE_0__tetris_index__["a" /* default */]();
document.body.appendChild(game.view.element);
document.addEventListener('keydown', event => {
    switch (event.code) {
        case 'KeyP':
            return game.pauseToggle();
        case 'ArrowDown':
            return game.moveDownFallingBlock();
        case 'ArrowLeft':
            return game.moveLeftFallingBlock();
        case 'ArrowRight':
            return game.moveRightFallingBlock();
        case 'PageUp':
            return game.rotateLeft();
        case 'PageDown':
            return game.rotateRight();
        case 'Backspace':
            return game.goToPrevState();
    }
});


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_index__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_block__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_point__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__view_index__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__store__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__unique__ = __webpack_require__(15);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};






const { floor, PI, min } = Math;
class GameController {
    constructor() {
        this.store = new __WEBPACK_IMPORTED_MODULE_4__store__["a" /* default */](new __WEBPACK_IMPORTED_MODULE_0__model_index__["a" /* default */]({ width: 16, height: 32 }));
        this.view = new __WEBPACK_IMPORTED_MODULE_3__view_index__["a" /* default */](this.store.getModel());
        this.insertFallingBlock();
    }
    pauseToggle() {
        this.view.pause();
    }
    rotateLeft() {
        this.rotate(PI / 2);
    }
    rotateRight() {
        this.rotate(-PI / 2);
    }
    moveLeftFallingBlock() {
        this.fallingBlock = this.moveLeft(this.fallingBlock) || this.fallingBlock;
    }
    moveRightFallingBlock() {
        this.fallingBlock = this.moveRight(this.fallingBlock) || this.fallingBlock;
    }
    moveDownFallingBlock() {
        const block = this.moveDown(this.fallingBlock);
        if (block) {
            this.fallingBlock = block;
            return true;
        }
        return false;
    }
    goToPrevState() {
        this.stopFallingBlock();
        this.store.goToPrevState();
        this.view.gameBoard.clear();
        this.view.gameBoard.insertBlock(new __WEBPACK_IMPORTED_MODULE_1__model_block__["a" /* default */]({
            items: this.store.getModel().fields
                .reduce((items, column) => [...items, ...column], [])
                .filter(field => field.hasBlock)
        }));
    }
    moveLeft(block) {
        return this.move(block, new __WEBPACK_IMPORTED_MODULE_2__model_point__["a" /* default */]({ x: -1, y: 0 }));
    }
    moveRight(block) {
        return this.move(block, new __WEBPACK_IMPORTED_MODULE_2__model_point__["a" /* default */]({ x: 1, y: 0 }));
    }
    moveDown(block) {
        return this.move(block, new __WEBPACK_IMPORTED_MODULE_2__model_point__["a" /* default */]({ x: 0, y: 1 }));
    }
    move(block, vector) {
        const newBlock = block.move(vector);
        if (this.replace(block, newBlock)) {
            this.view.gameBoard.moveBlock(block, vector);
            return newBlock;
        }
    }
    rotate(angle) {
        const block = this.fallingBlock;
        const newBlock = block.rotate(angle, block.items[0]);
        if (this.replace(block, newBlock)) {
            this.fallingBlock = newBlock;
            this.view.gameBoard.rotateBlock(block, angle, newBlock);
        }
    }
    replace(block, newBlock) {
        const { store } = this;
        const fields = store.getModel().cloneFields();
        if (this.canReplace(block, newBlock)) {
            block.items.forEach(({ x, y }) => {
                fields[x][y] = fields[x][y].clone({ hasBlock: false });
            });
            newBlock.items.forEach(({ x, y }) => {
                fields[x][y] = fields[x][y].clone({ hasBlock: true });
            });
            store.pushState(store.getModel().clone({ fields }));
            return true;
        }
        else {
            return false;
        }
    }
    canReplace(block, newBlock) {
        return this.canInsertBlock(newBlock.diff(block));
    }
    canInsertBlock(block) {
        const { fields } = this.store.getModel();
        return block.items.reduce((canInsert, point) => {
            const field = fields[point.x] ? fields[point.x][point.y] : null;
            return field && !field.hasBlock && canInsert;
        }, true);
    }
    insertBlock(block) {
        const { store } = this;
        const fields = store.getModel().cloneFields();
        if (this.canInsertBlock(block)) {
            this.view.gameBoard.insertBlock(block);
            block.items.forEach(({ x, y }) => fields[x][y] = fields[x][y].clone({ hasBlock: true }));
            store.pushState(store.getModel().clone({ fields }));
            return true;
        }
        else {
            return false;
        }
    }
    removeFilledRows() {
        const toRemove = this.fallingBlock.items.map(point => point.y).filter(__WEBPACK_IMPORTED_MODULE_5__unique__["a" /* default */])
            .filter(y => this.rowIsFilled(y));
        if (toRemove.length) {
            return this.removeRowsAndDropAbove(toRemove);
        }
    }
    rowIsFilled(y) {
        return this.store.getModel().fields.reduce((isFilled, column) => {
            return isFilled && column[y].hasBlock;
        }, true);
    }
    removeRowsAndDropAbove(rows) {
        return __awaiter(this, void 0, void 0, function* () {
            const { store } = this;
            const model = store.getModel();
            const fields = model.cloneFields();
            const firstRowToRemove = min(...rows);
            rows.forEach(y => {
                fields.forEach((field, x) => {
                    fields[x][y] = fields[x][y].clone({ hasBlock: false });
                });
            });
            store.pushState(model.clone({ fields }));
            yield this.view.gameBoard.removeRows(rows);
            this.move(new __WEBPACK_IMPORTED_MODULE_1__model_block__["a" /* default */]({
                items: fields.reduce((items, column) => {
                    return [
                        ...items,
                        ...column.slice(0, firstRowToRemove).filter(field => field.hasBlock)
                    ];
                }, [])
            }), new __WEBPACK_IMPORTED_MODULE_2__model_point__["a" /* default */]({ x: 0, y: rows.length }));
        });
    }
    insertFallingBlock() {
        const model = this.store.getModel();
        const { fields } = model;
        const fallingBlock = Object(__WEBPACK_IMPORTED_MODULE_1__model_block__["b" /* getRandomBlock */])().move(new __WEBPACK_IMPORTED_MODULE_2__model_point__["a" /* default */]({ x: floor(fields.length / 2) - 1, y: 0 }));
        if (this.insertBlock(fallingBlock)) {
            this.fallingBlock = fallingBlock;
            this.interval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                if (!this.moveDownFallingBlock()) {
                    clearInterval(this.interval);
                    yield this.removeFilledRows();
                    this.insertFallingBlock();
                }
            }), 1000);
        }
        else {
            this.view.endGame();
        }
    }
    ;
    stopFallingBlock() {
        clearInterval(this.interval);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameController;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__field__ = __webpack_require__(5);

class Model {
    constructor({ width, height, fields }) {
        this.width = width;
        this.height = height;
        this.fields = fields || new Array(width).fill(0).map((v, x) => {
            return new Array(height).fill(0).map((v, y) => new __WEBPACK_IMPORTED_MODULE_0__field__["a" /* default */]({
                x,
                y,
                hasBlock: false,
            }));
        });
    }
    clone(params = {}) {
        return new Model(Object.assign({}, this, params));
    }
    cloneFields() {
        return [...this.fields].map(column => ([...column]));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Model;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__point__ = __webpack_require__(1);

class Field extends __WEBPACK_IMPORTED_MODULE_0__point__["a" /* default */] {
    constructor(params) {
        super(params);
        this.hasBlock = params.hasBlock;
    }
    clone(params = {}) {
        return new Field(Object.assign({}, this, params));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Field;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__point__ = __webpack_require__(1);

const { floor, random } = Math;
class Block {
    constructor({ items }) {
        this.items = items || [];
    }
    move(vector) {
        return new Block({
            items: this.items.map(({ x, y }) => new __WEBPACK_IMPORTED_MODULE_0__point__["a" /* default */]({
                x: x + vector.x,
                y: y + vector.y,
            }))
        });
    }
    diff(block) {
        return new Block({
            items: this.items.filter(point => !block.containsPoint(point))
        });
    }
    rotate(angle, origin) {
        return new Block({
            items: this.items.map(point => point.rotate(angle, origin))
        });
    }
    containsPoint(point) {
        return !!this.items.find(({ x, y }) => point.x === x && point.y === y);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Block;

;
const getRandomBlock = () => blocks[floor(random() * blocks.length)];
/* harmony export (immutable) */ __webpack_exports__["b"] = getRandomBlock;

const blocks = [
    [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }],
    [{ x: 0, y: 0 },
        { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
    [{ x: 2, y: 0 },
        { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
    [{ x: 0, y: 0 }, { x: 1, y: 0 },
        { x: 0, y: 1 }, { x: 1, y: 1 }],
    [{ x: 1, y: 0 }, { x: 2, y: 0 },
        { x: 0, y: 1 }, { x: 1, y: 1 }],
    [{ x: 1, y: 0 },
        { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
    [{ x: 0, y: 0 }, { x: 1, y: 0 },
        { x: 1, y: 1 }, { x: 2, y: 1 }],
].map(items => new Block({ items: items.map(point => new __WEBPACK_IMPORTED_MODULE_0__point__["a" /* default */](point)) }));


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas_index__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_board__ = __webpack_require__(12);


const { min } = Math;
class View extends __WEBPACK_IMPORTED_MODULE_0__canvas_index__["a" /* default */] {
    constructor(model) {
        super(canvasSize());
        this.render = this.render.bind(this);
        this.render();
        this.gameBoard = new __WEBPACK_IMPORTED_MODULE_1__game_board__["a" /* default */](Object.assign({}, canvasSize(), { model }));
        this.addLayers([this.gameBoard]);
        window.addEventListener('resize', () => this.resize());
    }
    resize() {
        const { width, height } = canvasSize();
        this.setDimensions(width, height);
        this.render();
    }
    render() {
        super.render();
        requestAnimationFrame(this.render);
    }
    endGame() {
        alert('Game over!');
    }
    pause() {
        alert('Game paused. Press "OK" to resume.');
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = View;

const canvasSize = () => ({
    width: min(innerWidth, innerHeight) / 2,
    height: min(innerWidth, innerHeight),
});


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__animations__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__layer__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__path__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__circle__ = __webpack_require__(11);




class Canvas extends __WEBPACK_IMPORTED_MODULE_1__layer__["a" /* default */] {
    constructor({ width = innerWidth, height = innerHeight }) {
        super({ width, height });
        this.layers = [];
        this.animations = new __WEBPACK_IMPORTED_MODULE_0__animations__["a" /* default */]({
            onChange: () => {
                this.clear();
                this.draw();
            }
        });
        this.translateX = 0;
        this.translateY = 0;
        this.element = document.createElement('canvas');
        this.element.width = width;
        this.element.height = height;
        this.ctx = this.element.getContext("2d");
    }
    setDimensions(width, height) {
        const { element } = this;
        const widthRatio = width / element.width;
        const heightRatio = height / element.height;
        element.width = width;
        element.height = height;
        this.getLayersRecursive().forEach(layer => {
            layer.width *= widthRatio;
            layer.height *= heightRatio;
            layer.translateX *= widthRatio;
            layer.translateY *= heightRatio;
        });
    }
    containsLayer(layer) {
        return this.layers.indexOf(layer) > -1;
    }
    addAnimations(animations) {
        this.animations.add(animations);
    }
    addLayers(layers) {
        layers.forEach(layer => {
            if (!this.containsLayer(layer)) {
                this.layers.push(layer);
            }
        });
    }
    removeLayers(layers) {
        layers.forEach(layer => {
            if (this.containsLayer(layer)) {
                this.layers.splice(this.layers.indexOf(layer), 1);
            }
        });
    }
    clearLayers() {
        this.layers.length = 0;
    }
    setLayers(layers) {
        this.layers = layers;
    }
    render() {
        this.clear();
        this.draw();
    }
    getLayersRecursive() {
        return getLayersRecursive(this);
    }
    applyPathMask(path = new __WEBPACK_IMPORTED_MODULE_2__path__["a" /* default */]([])) {
        const { ctx } = this;
        const { points } = path;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        points.slice(1).forEach(point => ctx.lineTo(point.x, point.y));
        ctx.closePath();
        ctx.clip();
    }
    applyCircleMask({ circle = new __WEBPACK_IMPORTED_MODULE_3__circle__["a" /* default */]({}), translateX = 0, translateY = 0 }) {
        const { ctx } = this;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(translateX + circle.translateX, translateY + circle.translateY);
        ctx.arc(translateX + circle.translateX, translateY + circle.translateY, circle.radius, circle.startAngle, circle.endAngle);
        ctx.closePath();
        ctx.clip();
    }
    drawPath({ path = new __WEBPACK_IMPORTED_MODULE_2__path__["a" /* default */]([]), translateX = 0, translateY = 0 }) {
        const { ctx } = this;
        const { points } = path;
        ctx.fillStyle = path.fillStyle;
        ctx.beginPath();
        ctx.moveTo(points[0].x + translateX, points[0].y + translateY);
        points.slice(1).forEach(point => ctx.lineTo(point.x + translateX, point.y + translateY));
        ctx.closePath();
        ctx.fill();
    }
    draw() {
        this.drawLayer({ layer: this });
    }
    drawLayer({ layer = new __WEBPACK_IMPORTED_MODULE_1__layer__["a" /* default */]({}), translateX = 0, translateY = 0 }) {
        const { ctx } = this;
        translateX += layer.translateX;
        translateY += layer.translateY;
        ctx.globalAlpha = layer.alpha;
        if (layer.mask instanceof __WEBPACK_IMPORTED_MODULE_2__path__["a" /* default */]) {
            this.applyPathMask(layer.mask);
        }
        else if (layer.mask instanceof __WEBPACK_IMPORTED_MODULE_3__circle__["a" /* default */]) {
            this.applyCircleMask({ circle: layer.mask, translateX, translateY });
        }
        if (layer instanceof __WEBPACK_IMPORTED_MODULE_2__path__["a" /* default */]) {
            this.drawPath({ path: layer, translateX, translateY });
        }
        else if (layer.fillStyle) {
            ctx.fillStyle = layer.fillStyle;
            ctx.fillRect(translateX, translateY, layer.width, layer.height);
        }
        if (layer.mask) {
            ctx.restore();
        }
        layer.layers.forEach(layer => this.drawLayer({ layer, translateX, translateY }));
    }
    clear() {
        this.ctx.clearRect(0, 0, innerWidth, innerHeight);
    }
}
const getLayersRecursive = (layer) => {
    return [...layer.layers, ...layer.layers.reduce((layers, layer) => {
            return [...layers, ...getLayersRecursive(layer)];
        }, [])];
};
/* harmony default export */ __webpack_exports__["a"] = (Canvas);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Animations {
    constructor({ onChange }) {
        this.items = [];
        this.onChange = onChange;
        this.goToNextFrames = this.goToNextFrames.bind(this);
    }
    play() {
        if (!this.rendering) {
            this.goToNextFrames();
        }
    }
    add(animations) {
        this.items.push(...animations);
        this.play();
    }
    remove(animation) {
        const { items } = this;
        const index = items.indexOf(animation);
        if (index > -1) {
            items.splice(index, 1);
        }
    }
    count() {
        return this.items.length;
    }
    cancelAll() {
        this.items.forEach(animation => animation.cancel());
    }
    clear() {
        this.items.length = 0;
    }
    goToNextFrames() {
        this.rendering = true;
        this.items.forEach(animation => animation.goToNextFrame());
        this.onChange();
        this.removeCompleted();
        if (this.count()) {
            requestAnimationFrame(this.goToNextFrames);
        }
        else {
            this.rendering = false;
        }
    }
    getCompleted() {
        return this.items.filter(animation => animation.completed);
    }
    removeCompleted() {
        this.getCompleted().forEach(animation => this.remove(animation));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Animations;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layer__ = __webpack_require__(0);

class Path extends __WEBPACK_IMPORTED_MODULE_0__layer__["a" /* default */] {
    constructor(points) {
        super({});
        this.points = points;
    }
    clone() {
        return new Path(this.points.map(point => point.clone()));
    }
    move(vector) {
        this.points.forEach(point => point.move(vector));
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Path);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layer__ = __webpack_require__(0);

const { PI } = Math;
class Circle extends __WEBPACK_IMPORTED_MODULE_0__layer__["a" /* default */] {
    constructor({ translateX = 0, translateY = 0, radius = 0, startAngle = 0, endAngle = 2 * PI }) {
        super({ translateX, translateY });
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Circle;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas_layer__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__animation__ = __webpack_require__(13);


const { floor } = Math;
class GameBoard extends __WEBPACK_IMPORTED_MODULE_0__canvas_layer__["a" /* default */] {
    constructor({ width, height, model }) {
        const rows = model.fields;
        super({});
        this.columns = rows.length;
        this.rows = rows[0].length;
        const fieldWidth = floor(width / this.columns);
        const fieldHeight = floor(height / this.rows);
        this.width = fieldWidth * this.columns;
        this.height = fieldHeight * this.rows;
        this.fillStyle = '#333333';
        this.blocks = [];
    }
    fieldWidth() {
        return this.width / this.columns;
    }
    fieldHeight() {
        return this.height / this.rows;
    }
    insertBlock(block) {
        const width = this.fieldWidth();
        const height = this.fieldHeight();
        block.items.forEach(({ x, y }) => {
            const layer = new __WEBPACK_IMPORTED_MODULE_0__canvas_layer__["a" /* default */]({
                width: width - 2,
                height: height - 2,
                translateX: x * width + 1,
                translateY: y * height + 1,
                fillStyle: 'white',
            });
            this.add(layer);
            this.blocks[x] = this.blocks[x] || [];
            this.blocks[x][y] = layer;
        });
    }
    removeRows(rows) {
        return new Promise(resolve => {
            const toRemove = rows.reduce((blocks, y) => {
                return [...blocks, ...this.blocks.map((column, x) => this.blocks[x][y])];
            }, []);
            (new __WEBPACK_IMPORTED_MODULE_1__animation__["a" /* default */]({
                initialValue: 1,
                finalValue: 0,
                onChange: opacity => toRemove.forEach(layer => layer.alpha = opacity),
                onComplete: () => {
                    rows.forEach(y => {
                        this.blocks.forEach((column, x) => {
                            this.remove(column[y]);
                            this.blocks[x][y] = undefined;
                        });
                    });
                    resolve();
                }
            })).start();
        });
    }
    rotateBlock(block, angle, newBlock) {
        block.items.forEach(({ x, y }) => {
            this.remove(this.blocks[x][y]);
            this.blocks[x][y] = undefined;
        });
        this.insertBlock(newBlock);
    }
    moveBlock(block, vector) {
        const layers = block.items.map(({ x, y }) => ({ x, y, layer: this.blocks[x][y] }));
        block.items.forEach(({ x, y }) => this.blocks[x][y] = undefined);
        layers.forEach(({ x, y, layer }) => {
            this.blocks[x + vector.x] = this.blocks[x + vector.x] || [];
            this.blocks[x + vector.x][y + vector.y] = layer;
            (new __WEBPACK_IMPORTED_MODULE_1__animation__["a" /* default */]({
                initialValue: y,
                finalValue: y + vector.y,
                onChange: y => layer.translateY = y * this.fieldHeight()
            })).start();
            (new __WEBPACK_IMPORTED_MODULE_1__animation__["a" /* default */]({
                initialValue: x,
                finalValue: x + vector.x,
                onChange: x => layer.translateX = x * this.fieldWidth()
            })).start();
        });
    }
    clear() {
        this.blocks.length = 0;
        this.layers.length = 0;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameBoard;



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Animation {
    constructor({ initialValue = 0, finalValue = 0, onChange = () => { }, onComplete = () => { }, duration = 1000, easingFunction = t => 1 + (--t) * t * t * t * t }) {
        this.initialValue = initialValue;
        this.currentValue = initialValue;
        this.finalValue = finalValue;
        this.duration = duration;
        this.easingFunction = easingFunction;
        this.onComplete = onComplete;
        this.currentTime = 0;
        this.onChange = onChange;
        this.completed = false;
        this.start = this.start.bind(this);
    }
    start() {
        this.goToNextFrame();
        if (!this.completed) {
            this.animationFrame = requestAnimationFrame(this.start);
        }
    }
    pause() {
        cancelAnimationFrame(this.animationFrame);
    }
    setValue(value) {
        this.currentValue = value;
    }
    reset() {
        this.pause();
        this.currentTime = 0;
        this.currentValue = this.initialValue;
        this.completed = false;
    }
    goToNextFrame() {
        this.currentTime += 16 / this.duration;
        this.currentValue = this.initialValue + (this.finalValue - this.initialValue) * this.easingFunction(this.currentTime);
        if (this.currentTime < 1) {
            this.onChange(this.currentValue);
        }
        else {
            this.currentValue = this.finalValue;
            this.onChange(this.currentValue);
            this.completed = true;
            this.onComplete();
        }
    }
    addCompleteListener(fn) {
        const { onComplete } = this;
        this.onComplete = () => {
            onComplete();
            fn();
        };
    }
    cancel() {
        this.goToNextFrame = () => { };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Animation;



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Store {
    constructor(model) {
        this.states = [model];
        this.listeners = [];
    }
    dispatch(action) {
        this.states.push(action(this.getModel(), this));
        this.listeners.forEach(listener => listener());
    }
    pushState(model) {
        this.states.push(model);
    }
    goToPrevState() {
        this.states.splice(this.states.length - 1, 1);
    }
    getModel() {
        return this.states[this.states.length - 1];
    }
    subscribe(listener) {
        this.listeners.push(listener);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Store;



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const unique = (value, index, self) => {
    return self.indexOf(value) === index;
};
/* harmony default export */ __webpack_exports__["a"] = (unique);


/***/ })
/******/ ]);
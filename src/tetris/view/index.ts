import Canvas from '../../canvas/index';
import Model from '../model/index';
import GameBoard from './game-board';

const { min } = Math;

export default class View extends Canvas {
    readonly gameBoard: GameBoard;

    constructor(model: Model) {
        super(canvasSize());
        this.render = this.render.bind(this);
        this.render();
        this.gameBoard = new GameBoard({...canvasSize(), model })
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


const canvasSize = () => ({
    width: min(innerWidth, innerHeight)/2,
    height: min(innerWidth, innerHeight),
});
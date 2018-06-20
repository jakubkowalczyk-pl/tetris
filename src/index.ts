import Game from "./tetris/index";

const game = new Game();

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
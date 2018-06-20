import Model from './model/index';
import Block, {getRandomBlock} from './model/block';
import Point from './model/point';
import GameView from './view/index';
import Store from '../store';
import unique from '../unique';

const { floor, PI, min } = Math;

export default class GameController {
    readonly view: GameView;
    private store: Store<Model>;
    private fallingBlock: Block;
    private interval: number;

    constructor() {
        this.store = new Store(new Model({ width: 16, height: 32 }));
        this.view = new GameView(this.store.getModel());
        this.insertFallingBlock();
    }

    pauseToggle() {
        this.view.pause();
    }

    rotateLeft() {
        this.rotate(PI/2);
    }

    rotateRight() {
        this.rotate(-PI/2);
    }

    moveLeftFallingBlock() {
        this.fallingBlock = this.moveLeft(this.fallingBlock) || this.fallingBlock;
    }

    moveRightFallingBlock() {
        this.fallingBlock = this.moveRight(this.fallingBlock) || this.fallingBlock;
    }

    moveDownFallingBlock(): boolean {
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
        this.view.gameBoard.insertBlock(
            new Block({
                items: this.store.getModel().fields
                    .reduce((items, column) => [...items, ...column], [])
                    .filter(field => field.hasBlock)
            })
        );
    }

    private moveLeft(block: Block) {
        return this.move(block, new Point({ x: -1, y: 0 }));
    }

    private moveRight(block: Block) {
        return this.move(block, new Point({ x: 1, y: 0 }));
    }

    private moveDown(block: Block) {
        return this.move(block, new Point({ x: 0, y: 1 }));
    }

    private move(block: Block, vector: Point): Block | undefined {
        const newBlock = block.move(vector);

        if (this.replace(block, newBlock)) {
            this.view.gameBoard.moveBlock(block, vector);

            return newBlock;
        }
    }

    private rotate(angle: number) {
        const block = this.fallingBlock;
        const newBlock = block.rotate(angle, block.items[0]);

        if (this.replace(block, newBlock)) {
            this.fallingBlock = newBlock;
            this.view.gameBoard.rotateBlock(block, angle, newBlock);
        }
    }

    private replace(block: Block, newBlock: Block): boolean {
        const { store } = this;
        const fields = store.getModel().cloneFields();

        if (this.canReplace(block, newBlock)) {
            block.items.forEach(({ x, y }) => {
                fields[x][y] = fields[x][y].clone({ hasBlock: false });
            });

            newBlock.items.forEach(({ x, y }) => {
                fields[x][y] = fields[x][y].clone({ hasBlock: true });
            });

            store.pushState(store.getModel().clone({fields}));

            return true;
        }
        else {
            return false;
        }
    }

    private canReplace(block: Block, newBlock: Block): boolean {
        return this.canInsertBlock(newBlock.diff(block));
    }

    private canInsertBlock(block: Block): boolean {
        const {fields} = this.store.getModel();

        return block.items.reduce((canInsert, point) => {
            const field = fields[point.x] ? fields[point.x][point.y] : null;

            return field && !field.hasBlock && canInsert;
        }, true);
    }

    private insertBlock(block: Block): boolean {
        const { store } = this;
        const fields = store.getModel().cloneFields();

        if (this.canInsertBlock(block)) {
            this.view.gameBoard.insertBlock(block);
            block.items.forEach(({x, y}) => fields[x][y] = fields[x][y].clone({ hasBlock: true }));
            store.pushState(store.getModel().clone({ fields }));

            return true;
        }
        else {
            return false;
        }
    }

    private removeFilledRows() {
        const toRemove = this.fallingBlock.items.map(point => point.y).filter(unique)
                .filter(y => this.rowIsFilled(y));

        if (toRemove.length) {
            return this.removeRowsAndDropAbove(toRemove);
        }
    }

    private rowIsFilled(y: number): boolean {
        return this.store.getModel().fields.reduce((isFilled, column) => {
            return isFilled && column[y].hasBlock;
        }, true);
    }

    private async removeRowsAndDropAbove(rows: Array<number>) {
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
        await this.view.gameBoard.removeRows(rows);

        this.move(
            new Block({
                items: fields.reduce((items, column) => {
                    return [
                        ...items,
                        ...column.slice(0, firstRowToRemove).filter(field => field.hasBlock)
                    ]
                }, [])
            }),
            new Point({ x: 0, y: rows.length }),
        );
    }

    private insertFallingBlock() {
        const model = this.store.getModel();
        const { fields } = model;
        const fallingBlock = getRandomBlock().move(new Point({ x: floor(fields.length/2)-1, y: 0 }));

        if (this.insertBlock(fallingBlock)) {
            this.fallingBlock = fallingBlock;

            this.interval = setInterval(async () => {
                if (!this.moveDownFallingBlock()) {
                    clearInterval(this.interval);
                    await this.removeFilledRows();
                    this.insertFallingBlock();
                }
            }, 1000);
        }
        else {
            this.view.endGame();
        }
    };

    private stopFallingBlock() {
        clearInterval(this.interval);
    }
}
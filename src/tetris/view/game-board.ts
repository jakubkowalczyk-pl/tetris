import Layer from '../../canvas/layer';
import Animation from '../../animation';
import Point from '../model/point';
import Block from '../model/block';
import Model from '../model/index';

const { floor } = Math;

interface Params {
    width: number;
    height: number;
    model: Model;
}

export default class GameBoard extends Layer {
    readonly blocks: Array<Array<Layer>>;
    readonly columns: number;
    readonly rows: number;

    constructor({ width, height, model }: Params) {
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

    insertBlock(block: Block) {
        const width = this.fieldWidth();
        const height = this.fieldHeight();

        block.items.forEach(({ x, y }) => {
            const layer = new Layer({
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

    removeRows(rows: Array<number>) {
        return new Promise(resolve => {
            const toRemove: Array<Layer> = rows.reduce((blocks, y) => {
                return [...blocks, ...this.blocks.map((column, x) => this.blocks[x][y])];
            }, []);

            (new Animation({
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

    rotateBlock(block: Block, angle: number, newBlock: Block) {
        block.items.forEach(({ x, y }) => {
            this.remove(this.blocks[x][y]);
            this.blocks[x][y] = undefined;
        });

        this.insertBlock(newBlock);
    }

    moveBlock(block: Block, vector: Point) {
        const layers = block.items.map(({ x, y }) => ({ x, y, layer: this.blocks[x][y] }));

        block.items.forEach(({ x, y }) => this.blocks[x][y] = undefined);

        layers.forEach(({x, y, layer}) => {
            this.blocks[x + vector.x] = this.blocks[x + vector.x] || [];
            this.blocks[x + vector.x][y + vector.y] = layer;

            (new Animation({
                initialValue: y,
                finalValue: y + vector.y,
                onChange: y => layer.translateY = y * this.fieldHeight()
            })).start();

            (new Animation({
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
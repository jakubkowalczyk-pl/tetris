import Point from './point';

const { floor, random } = Math;

interface Params {
    items: Array<Point>;
}

export default class Block {
    readonly items: Array<Point>;

    constructor({ items }: Params) {
        this.items = items || [];
    }

    move(vector: Point) {
        return new Block({
            items: this.items.map(({ x, y }) => new Point({
                x: x + vector.x,
                y: y + vector.y,
            }))
        });
    }

    diff(block: Block) {
        return new Block({
            items: this.items.filter(point => !block.containsPoint(point))
        });
    }

    rotate(angle: number, origin: Point) {
        return new Block({
            items: this.items.map(point => point.rotate(angle, origin))
        });
    }

    containsPoint(point: Point): boolean {
        return !!this.items.find(({ x, y }) => point.x === x && point.y === y);
    }
};

export const getRandomBlock = () => blocks[floor(random() * blocks.length)];

const blocks: Array<Block> = [
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
].map(items => new Block({ items: items.map(point => new Point(point)) }));
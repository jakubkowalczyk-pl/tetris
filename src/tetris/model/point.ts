const { sin, cos } = Math;

export interface Params {
    x: number;
    y: number;
}

export default class Point {
    readonly x: number;
    readonly y: number;

    constructor({ x, y }: Params) {
        this.x = x;
        this.y = y;
    }

    rotate(angle: number, origin: Point): Point {
        const { x, y } = this;

        return new Point({
            x: cos(angle) * (x-origin.x) - sin(angle) * (y-origin.y) + origin.x,
            y: sin(angle) * (x-origin.x) + cos(angle) * (y-origin.y) + origin.y,
        });
    }
}

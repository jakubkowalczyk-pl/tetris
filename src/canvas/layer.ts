export interface Params {
    width?: number;
    height?: number;
    translateX?: number;
    translateY?: number;
    fillStyle?: string;
    alpha?: number;
    children?: Layer[];
}

export default class Layer {
    width: number;
    height: number;
    translateX: number;
    translateY: number;
    fillStyle: string;
    alpha: number;
    mask: Layer;
    layers: Layer[];

    constructor({ width = 0, height = 0, translateX = 0, translateY = 0, fillStyle = '', alpha = 1, children = [] }: Params) {
        this.width = width;
        this.height = height;
        this.translateX = translateX;
        this.translateY = translateY;
        this.fillStyle = fillStyle;
        this.alpha = alpha;
        this.layers = children;
    }

    add(layer: Layer): void {
        this.layers.push(layer);
    }

    remove(layer: Layer): void {
        const { layers } = this;
        const index = layers.indexOf(layer);

        if (index > -1) {
            layers.splice(index, 1);
        }
    }

    clearLayers(): void {
        this.layers.length = 0;
    }
}
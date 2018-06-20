import Field from './field';

interface Params {
    width: number;
    height: number;
    fields?: Array<Array<Field>>;
}

export default class Model {
    readonly fields: Array<Array<Field>>;
    readonly width: number;
    readonly height: number;

    constructor({ width, height, fields }: Params) {
        this.width = width;
        this.height = height;
        this.fields = fields || new Array(width).fill(0).map((v,x) => {
            return new Array(height).fill(0).map((v,y) => new Field({
                x,
                y,
                hasBlock: false,
            }));
        });
    }

    clone(params: Partial<Params> = {}): Model {
        return new Model(Object.assign({}, this, params));
    }

    cloneFields(): Field[][] {
        return [...this.fields].map(column => ([...column]));
    }
}
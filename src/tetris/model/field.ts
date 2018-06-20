import Point, {Params as PointParams} from './point';

interface Params extends PointParams {
    hasBlock: boolean;
}

export default class Field extends Point {
    readonly hasBlock: boolean;

    constructor(params: Params) {
        super(params);
        this.hasBlock = params.hasBlock;
    }

    clone(params: Partial<Params> = {}): Field {
        return new Field(Object.assign({}, this, params));
    }
}

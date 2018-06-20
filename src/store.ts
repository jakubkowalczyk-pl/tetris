export default class Store<Model> {
    private states: Array<Model>;
    private listeners: Array<Function>;

    constructor(model: Model) {
        this.states = [model];
        this.listeners = [];
    }

    dispatch(action: (m: Model, s: Store<Model>) => Model) {
        this.states.push(action(this.getModel(), this));
        this.listeners.forEach(listener => listener());
    }

    pushState(model: Model) {
        this.states.push(model);
    }

    goToPrevState() {
        this.states.splice(this.states.length-1, 1);
    }

    getModel(): Model {
        return this.states[this.states.length-1];
    }

    subscribe(listener: Function) {
        this.listeners.push(listener);
    }
}
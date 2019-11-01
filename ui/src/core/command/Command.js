export default class Command {
    constructor(entity, dt) {
        this._entity = entity;
        this._dt = dt;
    }

    execute() {
        throw new Error('execute - Метод является абстрактным, нужно реализовать.')
    }

    undo() {
        throw new Error('undo - Метод является абстрактным, нужно реализовать.')
    }
}

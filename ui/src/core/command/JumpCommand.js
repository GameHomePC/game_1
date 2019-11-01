import Command from "./Command";

export default class MoveCommand extends Command {
    constructor(entity, dt, use) {
        super(entity, dt);

        this._use = use;
        this._maxJump = 100;
    }

    execute() {
        if (this._use) {

        }
    }
}

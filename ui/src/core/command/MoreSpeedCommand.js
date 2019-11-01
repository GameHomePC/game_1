import Command from "./Command";

export default class MoreSpeedCommand extends Command {
    constructor(entity, dt, use) {
        super(entity, dt);

        this._use = use;
        this.input = entity.game.input;
        this.startCommand = true;
    }

    execute() {
        let { speed } = this._entity;

        if (this._use) {
            this._entity.speed = 5;
            this.startCommand = true;
        } else {
            if (this.startCommand) {
                this._entity.speed = 2;
                this.startCommand = false
            }
        }
    }
}

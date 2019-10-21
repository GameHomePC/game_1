import Command from "./Command";

export default class MoveCommand extends Command {
    constructor(entity, dt, direction) {
        super(entity, dt);

        this._direction = direction;
        this.input = entity.game.input;
        this.visual = entity.visual;
    }

    execute() {
        const {
            speed,
            body,
            physics: {
                Body
            },
            animation
        } = this._entity;
        const { hasDown } = this.input;

        if (this._direction === 'left') {
            Body.translate(body, { x: -(speed * this._dt), y: 0});

            if (!hasDown('space')) {
                animation.setAnimation('Run', 'left', this.visual);
            }
        }

        if (this._direction === 'right') {
            Body.translate(body, { x: speed * this._dt, y: 0});

            if (!hasDown('space')) {
                animation.setAnimation('Run', 'right', this.visual);
            }
        }
    }
}

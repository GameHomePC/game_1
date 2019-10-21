import Command from "./Command";

export default class MoveCommand extends Command {
    constructor(entity, dt, direction) {
        super(entity, dt);

        this._direction = direction;
        this.input = entity.game.input;
    }

    execute() {
        const {
            speed,
            body,
            physics: {
                Body
            },
            animation,
            checkObservable
        } = this._entity;
        const { hasDown } = this.input;

        if (this._direction === 'left') {
            Body.translate(body, { x: -(speed * this._dt), y: 0});

            checkObservable();

            if (!hasDown('space')) {
                animation.setAnimation('Run', 'left');
            }
        }

        if (this._direction === 'right') {
            Body.translate(body, { x: speed * this._dt, y: 0});

            checkObservable();

            if (!hasDown('space')) {
                animation.setAnimation('Run', 'right');
            }
        }
    }
}

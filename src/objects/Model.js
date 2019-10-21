import * as PIXI from "pixi.js";

export default class Model extends PIXI.Container {
    constructor(object) {
        super();

        const {
            game,
            position,
            width,
            height,
            enablePhysics = true
        } = object;

        this.game = game;
        this.physics = this.game.physics;
        this.params = {
            width: width || 0,
            height: height || 0,
            enablePhysics: enablePhysics
        };

        if (position) {
            this.position.set(position.x, position.y);
        }
    }

    destroy() {
        this.game.app.stage.removeChild(this.bunny);
        this.game.objects.delete(this);
    }

    start() {}

    setState(name, value) {
        this.state[name] = value;
    }

    update(dt) {}
}

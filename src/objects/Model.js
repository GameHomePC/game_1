import * as PIXI from "pixi.js";

export default class Model extends PIXI.DisplayObject {
    constructor(scene, options) {
        super();

        const {
            position,
            width,
            height,
            enablePhysics = true
        } = options;
        const {
            game
        } = scene;

        this.game = game;
        this.app = game.app;
        this.scene = scene;
        this.stage = scene.viewport;
        this.objects = game.objects;
        this.subject = game.subject;
        this.assets = game.assets;
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
        this.app.stage.removeChild(this.visual);
        this.objects.delete(this);
    }

    start() {}

    setState(name, value) {
        this.state[name] = value;
    }

    update(dt) {}
}

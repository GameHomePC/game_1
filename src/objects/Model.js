import * as PIXI from "pixi.js";

export default class Model extends PIXI.DisplayObject {
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
        this.app = game.app;
        this.scene = game.activeScene;
        this.stage = game.activeScene.viewport;
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

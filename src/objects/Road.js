import * as PIXI from 'pixi.js';
import Model from './Model';

export default class Road extends Model {
    constructor(object) {
        super(object);

        this.start();
        this.update();
    }

    start() {
        const { Bodies, World, world } = this.physics;
        const { width, height } = this.params;

        this.visual = new PIXI.Graphics();
        this.visual.position.set(
            this.position.x,
            this.position.y
        );

        this.visual.pivot.set(
            width / 2,
            height / 2
        );

        this.game.app.stage.addChild(this.visual);
        this.game.objects.set(this, this);

        this.body = Bodies.rectangle(
            this.position.x + width / 2,
            this.position.y + height / 2,
            width,
            height,
            {
                isStatic: true
            }
        );

        World.add(world, [this.body]);
    }

    destroy() {
        this.app.stage.removeChild(this.bunny);
        this.game.objects.delete(this);
    }
}

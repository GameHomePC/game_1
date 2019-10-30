import * as PIXI from 'pixi.js';
import Model from './Model';

export default class Road extends Model {
    constructor(scene, options) {
        super(scene, options);

        this.start();
        this.update();
    }

    start() {
        const { Bodies, World, world } = this.physics;
        const { width, height } = this.params;

        this.visual = new PIXI.Graphics();
        this.visual.beginFill(0xDE3249);
        this.visual.drawRect(
            0,
            0,
            width,
            height
        );
        this.visual.endFill();

        this.visual.position.set(
            this.position.x,
            this.position.y
        );

        this.stage.addChild(this.visual);
        this.objects.set(this, this);

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

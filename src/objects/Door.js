import * as PIXI from 'pixi.js';
import Model from './Model';

export default class Door extends Model {
    constructor(object) {
        super(object);

        this.toTarget = null;

        this.start();
        this.observer();
    }

    observer() {
        const { engine, Events } = this.physics;

        Events.on(engine, 'collisionStart', event => {
            const { pairs } = event;

            pairs.forEach(pair => {
                const { bodyA, bodyB } = pair;

                if ([bodyA, bodyB].includes(this.body)) {
                    this.subject.next({
                        action: 'collisionStartDoor',
                        target: this
                    });
                }
            });
        });

        Events.on(engine, 'collisionEnd', event => {
            const pairs = event.pairs;

            pairs.forEach(pair => {
                const { bodyA, bodyB } = pair;

                if ([bodyA, bodyB].includes(this.body)) {
                    this.subject.next({
                        action: 'collisionEndDoor',
                        target: this
                    });
                }
            });
        });
    }

    handleOpenDoor = player => {
        const { door_open } = this.assets;

        this.changeTexture(door_open);
        player.nearDoor = true;
        player.activeDoor = this;
    };

    handleLockedOrUnlockedDoor = player => {
        const { door_locked } = this.assets;

        this.changeTexture(door_locked);
        player.nearDoor = false;
        player.activeDoor = null;
    };

    changeTexture(resurse) {
        this.visual.texture = new PIXI.Texture(resurse.texture);
    }

    goToNextDoor(player) {
        const { Body } = this.physics;
        const { x, y } = this.toTarget.position;

        Body.setPosition(player.body, { x: x, y: y + 80 });

        console.log(this.name);

        player.activeDoor = this;
        player.nearDoor = true;
    }

    setToTarget(object) {
        this.toTarget = object;
    }

    start() {
        const { Bodies, World, world } = this.physics;
        const { width, height, enablePhysics } = this.params;
        const {
            assets: {
                door_locked
            }
        } = this.game;

        this.visual = new PIXI.Sprite(door_locked.texture);
        this.visual.zIndex = 0;
        this.visual.position.set(
            this.position.x,
            this.position.y
        );

        this.visual.width = width;
        this.visual.height = height;
        this.visual.anchor.set(0.5);

        this.stage.addChild(this.visual);
        this.objects.set(this, this);

        if (enablePhysics) {
            this.body = Bodies.rectangle(
                this.position.x,
                this.position.y,
                width,
                height,
                {
                    isStatic: true,
                    isSensor: true
                }
            );
            this.body.model = this;

            World.add(world, [this.body])
        }
    }

    update(dt) {}
}

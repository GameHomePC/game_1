import * as PIXI from 'pixi.js';
import Model from './Model';
import { Observable } from 'rxjs';
import Vector2 from './../utils/Vector2';

export default class Door extends Model {
    constructor(object) {
        super(object);

        this.state = {
            open: false,
            active: false
        };

        this.observable = new Observable(observer => {
            const {
                visual,
                game,
                width
            } = this;
            const player = game.activeScene.player;
            const doorPosition = new Vector2(
                visual.position.x - width / 2,
                visual.position.y
            );
            const playerPosition = new Vector2(
                player.visual.position.x - player.width / 2,
                player.visual.position.y - player.height / 2
            );
            const distance = doorPosition.distanceTo(playerPosition);

            if (distance <= 100) {
                if (!this.state.active) {
                    this.setState('active', true);
                    return observer.next({
                        action: 'active',
                        data: this
                    });
                }
            } else {
                if (this.state.active) {
                    this.setState('active', false);
                    return observer.next({
                        action: 'not-active',
                        data: this
                    });
                }
            }

            if (distance <= 200) {
                if (!this.state.open) {
                    this.setState('open', true);
                    observer.next({
                        action: 'open',
                        data: this
                    });
                }
            } else {
                if (this.state.open) {
                    this.setState('open', false);
                    observer.next({
                        action: 'close',
                        data: this
                    });
                }
            }
        });

        this.start();
    }

    handleChangeLight = () => {
        const {
            assets: {
                door_locked,
                door_unlocked
            }
        } = this.game;

        if (this.state.open) {
            this.visual.texture = new PIXI.Texture(door_unlocked.texture);
        } else {
            this.visual.texture = new PIXI.Texture(door_locked.texture);
        }
    };

    handleOpenDoor = () => {
        const {
            assets: {
                door_unlocked,
                door_open
            }
        } = this.game;

        if (this.state.active) {
            this.visual.texture = new PIXI.Texture(door_open.texture);
        } else {
            this.visual.texture = new PIXI.Texture(door_unlocked.texture);
        }
    };

    start() {
        const { Bodies, World, world } = this.physics;
        const { width, height, enablePhysics } = this.params;
        const {
            assets: {
                door_locked
            }
        } = this.game;

        this.visual = new PIXI.Sprite(door_locked.texture);

        this.visual.position.set(
            this.position.x,
            this.position.y
        );

        this.visual.width = width;
        this.visual.height = height;
        this.visual.anchor.set(0.5);

        this.game.app.stage.addChild(this.visual);
        this.game.objects.set(this, this);

        if (enablePhysics) {
            this.body = Bodies.rectangle(
                this.position.x,
                this.position.y,
                width,
                height,
                {
                    isStatic: true
                }
            );

            World.add(world, [this.body])
        }
    }

    update(dt) {}
}

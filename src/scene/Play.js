import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import Player from "../objects/Player";
import Door from "../objects/Door";
import Road from "../objects/Road";

export default class Play {
    constructor(game) {
        this.game = game;
        this.app = this.game.app;
        this.physics = this.game.app.physics;
        this.viewport = new Viewport();
        this.viewport.sortableChildren = true;

        this.viewport.nameScene = 'Play';
    }

    start() {
        this.createWorld();

        this.player = new Player({
            game: this.game,
            position: {
                x: 220,
                y: 800
            },
            width: 26 * 2,
            height: 37 * 2
        });

        this.door1 = new Door({
            game: this.game,
            position: {
                x: 500,
                y: 820
            },
            width: 280 / 2,
            height: 464 / 2
        });
        this.door1.name = 'door 1';

        this.door2 = new Door({
            game: this.game,
            position: {
                x: 500,
                y: 185
            },
            width: 280 / 2,
            height: 464 / 2
        });
        this.door2.name = 'door 2';

        this.door1.setToTarget(this.door2);
        this.door2.setToTarget(this.door1);
    }

    createBG = () => {
        const {
            assets: {
                bg_1
            }
        } = this.game;

        const bg = new PIXI.Sprite(bg_1.texture);

        bg.width = window.innerWidth;
        bg.height = window.innerHeight;

        this.app.stage.addChild(bg);
    };

    createWorld = () => {
        // init bg
        // this.createBG();

        new Road({
            game: this.game,
            position: {
                x: 0,
                y: window.innerHeight - 50
            },
            width: window.innerWidth,
            height: 50
        });

        new Road({
            game: this.game,
            position: {
                x: 300,
                y: 300
            },
            width: 600,
            height: 50
        });
    };

    update(dt) {

    }
}

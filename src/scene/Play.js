import * as PIXI from 'pixi.js';
import Player from "../objects/Player";
import Door from "../objects/Door";
import Road from "../objects/Road";

export default class Play {
    constructor(game) {
        this.game = game;
        this.app = this.game.app;
        this.physics = this.game.app.physics;
        this.stage = new PIXI.Container();

        this.stage.nameScene = 'Play';
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

        this.door = new Door({
            game: this.game,
            position: {
                x: 500,
                y: 850
            },
            width: 280 / 2,
            height: 464 / 2,
            enablePhysics: false
        });
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

        this.road = new Road({
            game: this.game,
            position: {
                x: 0,
                y: window.innerHeight - 50
            },
            width: window.innerWidth,
            height: 50
        });
    };

    update(dt) {

    }
}

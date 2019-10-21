import * as PIXI from 'pixi.js';

import Player from './objects/Player';
import Input from './core/Input';
import Physics from './core/Physics';
import Scene from './scene/index'

class Game {
    constructor() {
        this.activeScene = null;
        this.objects = new Map();
        this.input = new Input();
        this.physics = new Physics();
        this.allScene = Scene;
        this.assets = {};

        this.start();
    }

    start() {
        // init
        this.init();

        // init update
        this.update();
    }

    init() {
        this.app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight
        });

        // init scene
        this.changeScene('boot');

        this.stage = this.app.stage;

        // append to html element
        document.getElementById('root').append(this.app.view);
    }

    changeScene(name) {
        this.activeScene = new this.allScene[name](this);

        this.app.stage = this.activeScene.stage;

        this.activeScene.start();
    }

    update() {
        this.app.ticker.add(dt => {
            this.objects.forEach((e) => {
                e.update(dt);
            });

            if (this.activeScene) {
                this.activeScene.update(dt);
            }
        });
    }
}

const app = new Game();

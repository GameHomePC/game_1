import * as PIXI from 'pixi.js';
import { Subject } from 'rxjs';

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
        this.subject = new Subject();

        this.start();
    }

    start() {
        this.app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight
        });

        // init scene
        this.changeScene('boot');

        // append to html element
        document.getElementById('root').append(this.app.view);

        // init update
        this.update();
    }

    changeScene(name) {
        this.activeScene = new this.allScene[name](this);

        this.app.stage.addChild(this.activeScene.viewport);

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

const app = window.app = new Game();

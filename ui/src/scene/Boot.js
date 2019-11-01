import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport';

export default class Boot {
    constructor(game) {
        this.game = game;
        this.app = game.app;
        this.viewport = new Viewport();
        this.elementProgressParent = document.querySelector('.loading');
        this.elementProgress = document.querySelector('.loading__progress');

        this.viewport.nameScene = 'Boot';
    }

    start() {
        this.loadingAssets()
            .then(() => {
                this.game.changeScene('play');
                this.elementProgressParent.style.display = 'none';
            });
    }

    loadingAssets() {
        const { loader } = this.app;

        loader.onProgress.add(loader => {
            this.elementProgress.style.width = `${loader.progress}%`;
        });

        return new Promise(resolve => {
            loader
                .add('door_open', 'assets/freescifiplatform/png/Objects/DoorOpen.png')
                .add('door_locked', 'assets/freescifiplatform/png/Objects/DoorLocked.png')
                .add('door_unlocked', 'assets/freescifiplatform/png/Objects/DoorUnlocked.png')
                .add('bg_1', 'assets/bg_1.jpg')
                .add('ninja', 'assets/ninjaadventurenew-sprites.json');

            loader.load((loader, resources) => {
                this.game.assets = resources;

                resolve();
            });
        });
    }

    update(dt) {}
}

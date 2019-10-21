import * as PIXI from 'pixi.js';

// Доступные варианты анимации
// Attack_
// Climb
// Dead_
// Glide
// Idle_
// Jump_
// Jump_Attack_
// Jump_Throw_
// Run_
// Slide_
// Throw_

export default class Ninja {
    constructor(object) {
        this.game = object.game;
    }

    useAnimation = (name, speed = 0.5) => {
        if (this.hasAnimation(name)) return;

        const textures = this.getTextures(name);

        let visual = new PIXI.AnimatedSprite(textures);
        visual.name = name;
        visual.animationSpeed = speed;
        visual.play();

        return visual;
    };

    getTextures = (name) => {
        const {
            assets: {
                ninja
            }
        } = this.game;

        const animations = Object.entries(ninja.spritesheet.animations);

        return animations.find(([key, value]) => {
            if (!name) return false;

            return key.toLowerCase().indexOf(name.toLowerCase()) !== -1;
        })[1];
    };

    setAnimation = (name, direction, visual) => {
        if (direction === 'left') {
            visual.scale.x = -Math.abs(visual.scale.x);
        }

        if (direction === 'right') {
            visual.scale.x = Math.abs(visual.scale.x);
        }

        if (this.hasAnimation(name, visual)) return;

        visual.textures = this.getTextures(name);
        visual.name = name;
        visual.updateTexture();
        visual.play();
    };

    hasAnimation(name, visual) {
        return visual && visual.name === name;
    }
}

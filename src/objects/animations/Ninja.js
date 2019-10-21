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
        this.visual = object.visual;
    }

    useAnimation = (name, speed = 0.5) => {
        if (this.hasAnimation(name)) return;

        const textures = this.getTextures(name);

        this.visual = new PIXI.AnimatedSprite(textures);
        this.visual.name = name;
        this.visual.animationSpeed = speed;
        this.visual.play();

        return this.visual;
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

    setAnimation = (name, direction) => {
        if (direction === 'left') {
            this.visual.scale.x = -Math.abs(this.visual.scale.x);
        }

        if (direction === 'right') {
            this.visual.scale.x = Math.abs(this.visual.scale.x);
        }

        if (this.hasAnimation(name)) return;

        this.visual.textures = this.getTextures(name);
        this.visual.name = name;
        this.visual.updateTexture();
        this.visual.play();
    };

    hasAnimation(name) {
        return this.visual && this.visual.name === name;
    }
}

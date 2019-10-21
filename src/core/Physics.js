import * as Matter from 'matter-js';

export default class Physics {
    constructor() {
        this.start();
        this.update();
    }

    start() {
        this.Engine = Matter.Engine;
        this.Render = Matter.Render;
        this.Runner = Matter.Runner;
        this.Composites = Matter.Composites;
        this.Common = Matter.Common;
        this.MouseConstraint = Matter.MouseConstraint;
        this.Mouse = Matter.Mouse;
        this.World = Matter.World;
        this.Bodies = Matter.Bodies;
        this.Body = Matter.Body;
        this.Vector = Matter.Vector;
        this.Events = Matter.Events;

        // create engine
        this.engine = this.Engine.create();
        this.world = this.engine.world;

        // create renderer
        this.render = this.Render.create({
            element: document.body,
            engine: this.engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                showAngleIndicator: true,
            }
        });

        document.getElementById('debug').append(this.render.canvas);

        this.Render.run(this.render);

        // create runner
        this.runner = this.Runner.create();
        this.Runner.run(this.runner, this.engine);

        this.Render.lookAt(this.render, {
            min: { x: 0, y: 0 },
            max: { x: window.innerWidth, y: window.innerHeight }
        });
    }

    get info() {
        return {
            engine: this.engine,
            runner: this.runner,
            render: this.render,
            canvas: this.render.canvas,
            stop: function() {
                this.Render.stop(this.render);
                this.Runner.stop(this.runner);
            }
        }
    }

    update() {

    }
}

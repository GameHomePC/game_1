import Model from './Model';
import Ninja from './animations/Ninja';

// Command
import MoveCommand from '../core/command/MoveCommand';
import MoreSpeedCommand from '../core/command/MoreSpeedCommand';
import JumpCommand from '../core/command/JumpCommand';

// components
import CommandProcessor from '../core/components/CommandProcessor';
import InputReader from '../core/components/InputReader';

export default class Player extends Model {
    constructor(object) {
        super(object);

        this.inputReader = new InputReader(this);
        this.commandProcessor = new CommandProcessor();

        this.animation = new Ninja(this);

        this.speed = 2;

        this.start();
    }

    checkObservable = () => {
        this.game.activeScene.door.observable.subscribe(object => {
            const { action, data } = object;

            if (action === 'open') {
                data.handleChangeLight();
            }

            if (action === 'close') {
                data.handleChangeLight();
            }

            if (action === 'active') {
                data.handleOpenDoor(this.inputReader);
            }

            if (action === 'not-active') {
                data.handleOpenDoor(this.inputReader);
            }

            console.log(action);
        });
    };

    start() {
        const { Bodies, World, world } = this.physics;
        const { width, height } = this.params;

        this.visual = this.animation.useAnimation('Idle', 0.3);

        this.visual.position.set(
            this.position.x,
            this.position.y
        );

        this.visual.width = width;
        this.visual.height = height;
        this.visual.anchor.set(0.5);

        this.game.app.stage.addChild(this.visual);
        this.game.objects.set(this, this);
        this.body = Bodies.rectangle(
            this.position.x,
            this.position.y,
            width,
            height,
            {
                isStatic: false
            }
        );

        World.add(world, [this.body])
    }

    update(dt) {
        const direction = this.inputReader.readInput();
        const checkDownKey = this.inputReader.checkDownKey();
        const trySpeed = this.inputReader.readSpeed();
        const tryJump = this.inputReader.readJump();

        if (direction) {
            this.commandProcessor.executeCommand(
                new MoveCommand(this, dt, direction)
            );
        }

        this.commandProcessor.executeCommand(
            new MoreSpeedCommand(this, dt, trySpeed)
        );

        this.commandProcessor.executeCommand(
            new JumpCommand(this, dt, tryJump)
        );

        if (checkDownKey) {
            this.animation.setAnimation('Idle');
        }

        this.visual.rotation = this.body.angle;
        this.visual.position.set(
            this.body.position.x,
            this.body.position.y
        );
    }
}

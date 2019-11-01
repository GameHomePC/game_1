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
    constructor(scene, options) {
        super(scene, options);

        this.inputReader = new InputReader(this);
        this.commandProcessor = new CommandProcessor();
        this.animation = new Ninja(this);
        this.speed = 15;
        this.nearDoor = false;
        this.activeDoor = null;

        this.start();
        this.subscribe();
    }

    subscribe() {
        this.subject.subscribe(data => {
            const { action, target } = data;

            if (action === 'collisionStartDoor') {
                target.handleOpenDoor(this);
            }

            if (action === 'collisionEndDoor') {
                target.handleLockedOrUnlockedDoor(this);
            }
        });
    }

    start() {
        const { Bodies, World, world } = this.physics;
        const { width, height } = this.params;

        this.visual = this.animation.useAnimation('Idle', 0.3);
        this.visual.zIndex = 1;
        this.visual.position.set(
            this.position.x,
            this.position.y
        );

        this.visual.width = width;
        this.visual.height = height;
        this.visual.anchor.set(0.5);

        this.stage.addChild(this.visual);
        this.objects.set(this, this);
        this.body = Bodies.rectangle(
            this.position.x,
            this.position.y,
            width,
            height,
            {
                isStatic: false
            }
        );
        this.body.model = this;

        World.add(world, [this.body])
    }

    update(dt) {
        const direction = this.inputReader.readInput();
        const checkDownKey = this.inputReader.checkDownKey();
        const trySpeed = this.inputReader.readSpeed();
        const tryJump = this.inputReader.readJump();
        const goInTheDoor = this.inputReader.goInTheDoor();

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
            this.animation.setAnimation('Idle', null, this.visual);
        }

        if (this.nearDoor && goInTheDoor) {
            this.activeDoor.goToNextDoor(this);
        }

        this.visual.rotation = this.body.angle;
        this.visual.position.set(
            this.body.position.x,
            this.body.position.y
        );
    }
}

export default class InputReader {
    constructor(entity) {
        this.input = entity.game.input;
        this.downInput = false;
    }

    readInput() {
        const { hasDown } = this.input;
        let x = 0;

        if (hasDown('A') || hasDown('left')) {
            this.downInput = true;

            return 'left';
        }

        if (hasDown('D') || hasDown('right')) {
            this.downInput = true;

            return 'right';
        }

        return false;
    }

    readSpeed() {
        const { hasDown } = this.input;

        return hasDown('shift');
    }

    readJump() {
        const { hasDown } = this.input;

        return hasDown('space');
    }

    checkDownKey() {
        const { hasDownGlobal } = this.input;

        if (!hasDownGlobal && this.downInput) {
            this.downInput = false;

            return true;
        }

        return false;
    }
}

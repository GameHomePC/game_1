export default class InputReader {
    constructor(entity) {
        this.input = entity.game.input;
        this.downInput = false;
    }

    readInput() {
        const { hasDown } = this.input;
        let x = 0;

        if (hasDown('A') || hasDown('left') || hasDown('button_14')) {
            this.downInput = true;

            return 'left';
        }

        if (hasDown('D') || hasDown('right') || hasDown('button_15')) {
            this.downInput = true;

            return 'right';
        }

        return false;
    }

    readSpeed() {
        const { hasDown } = this.input;

        return hasDown('shift') || hasDown('button_7');
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

    goInTheDoor() {
        const { hasDown } = this.input;

        return hasDown('e') || hasDown('button_0');
    }
}

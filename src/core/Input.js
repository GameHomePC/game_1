import keycode from 'keycode';

export default class Input {
    constructor() {
        this.keys = new Map();

        this.start();
    }

    start = () => {
        window.addEventListener('keydown', e => {
            const key = keycode(e);

            this.keys.set(key, true);
        });

        window.addEventListener('keyup', e => {
            const key = keycode(e);

            this.keys.set(key, false);
        });
    };

    hasDown = key => {
        const lowerCaseKey = key.toLowerCase();

        const value = this.keys.get(lowerCaseKey);

        return Boolean(value);
    };

    get hasDownGlobal() {
        let status = false;

        this.keys.forEach(item => {
            if (item) {
                status = true;
            }
        });

        return status;
    }
}

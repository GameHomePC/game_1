const socket = require('./socket');

module.exports = io => {
    class Store {
        constructor(io) {
            this.io = io;
            this.socket = socket(this);
            this.objects = new Map();

            this.init();
        }

        init() {
            // start socket
            this.socket.init();
        }

        add(key, value) {
            this.objects.set(key, value);
        }

        delete(key) {
            this.objects.delete(key);
        }
    }

    return new Store(io);
};

const socket = require('./socket');

module.exports = io => {
    class Store {
        constructor(io) {
            this.io = io;
            this.socket = socket(this);
            this.objects = new Map();

            this.init();

            setInterval(() => {
                console.log(this.players);
            }, 2000);
        }

        get players() {
            const players = [];

            this.objects.forEach((object) => {
                if (object.constructor.name !== 'Player') return;

                players.push(object);
            });

            return players;
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

        values() {
            const data = [];

            this.objects.forEach(object => {
                data.push(JSON.parse(object.values()));
            });

            return JSON.stringify(data);
        }
    }

    return new Store(io);
};

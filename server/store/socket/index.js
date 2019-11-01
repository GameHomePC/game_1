const log4js = require('log4js');
const logger = log4js.getLogger();
const Player = require('./../../models/Player')();

console.log(Player);

module.exports = store => {
    class Socket {
        constructor(store) {
            this.store = store;
            this.io = store.io;
        }

        init() {
            this.io.on('connection', socket => {
                const name = socket.id;
                const player = new Player(this, socket);

                this.store.add(name, player);

                socket.on('disconnect', () => {
                    this.store.delete(name);
                });

                socket.broadcast.emit('all', this.store.objects);
            });
        }
    }

    return new Socket(store);
};

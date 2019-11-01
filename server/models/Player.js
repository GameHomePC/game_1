module.exports = () => {
    class Player {
        constructor(store, socket) {
            this.id = socket.id;
            this.x = 200;
            this.y = 0;
        }

        values() {
            return JSON.stringify({
                id: this.id,
                x: this.x,
                y: this.y
            });
        }
    }

    return Player;
};

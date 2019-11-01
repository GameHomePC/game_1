import Player from "../objects/Player";


export default class Socket {
    constructor(game) {
        this.game = game;
        this.socket = null;
    }

    start = () => {
        const { activeScene, players } = this.game;

        this.socket = io('ws://localhost:4000');
        this.socket.on('all', data => {
            // console.log(data);
        });

        this.socket.on('newUser', player => {
            const { id, x, y } = JSON.parse(player);

            new Player(activeScene, {
                id: id,
                position: {
                    x: x,
                    y: y
                },
                width: 26 * 2,
                height: 37 * 2
            });
        });
    }
}

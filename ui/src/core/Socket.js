export default class Socket {
    constructor() {
        this.socket = null;
    }

    start() {
        this.socket = io('ws://localhost:4000');
        this.socket.on('all', data => {
            console.log(data);
            console.log(this.socket);
        });
    }
}

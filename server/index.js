require('dotenv').config();

const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

io.on('connection', function(socket){
    console.log(socket);
    console.log('a user connected');
});

http.listen(process.env.SERVER_PORT, () => {
    console.log(`listening on *:${process.env.SERVER_PORT}`);
});

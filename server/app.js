const express = require('express');
const server = require('http').Server(express);
const io = require('socket.io')(server);
const Game = require('./game.js');

server.listen(8080, () => console.log('Server listening on port 8080'));

let newGame = new Game();

io.on('connection', function (socket) {
  socket.emit('news', { hans: 'is cool' });
  newGame.addPlayer();
});

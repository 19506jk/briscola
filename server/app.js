const express = require('express');
const server = require('http').Server(express);
const io = require('socket.io')(server);
const Game = require('./game.js');

// eslint-disable-next-line no-console
server.listen(8080, () => console.log('Server listening on port 8080'));

const newGame = new Game();

io.on('connection', (socket) => {
  socket.emit('news', { hans: 'is cool' });
  newGame.addPlayer();
});

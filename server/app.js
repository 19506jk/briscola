const express = require('express');
const server = require('http').Server(express);
const io = require('socket.io')(server);

server.listen(8080, () => console.log('Server listening on port 8080'));

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
});
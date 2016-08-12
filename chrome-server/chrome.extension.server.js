// plan to make server https
var http = require('http');
var app = require('express')();
var chalk = require('chalk');

var server = http.createServer(app)
var io = require('socket.io')(server)

io.on('connection', function (socket){

	socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });

})



server.listen(9999, 'localhost')

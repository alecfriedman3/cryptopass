// plan to make server https
var http = require('http');
var app = require('express')();
var chalk = require('chalk');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

var server = http.createServer(app)
var io = require('socket.io')(server)

io.on('connection', function (socket){
  socket.on('addFromChrome', function (data) {
  	// get the encrypted data from chrome extension and write it to the fs
  	fs.writeFileAsync(__dirname + '/../utilities/data.txt', data.data)
  	.then(function (){
  		// emmit message to electron telling it to update the local data in app
    	socket.emit('chromeAdd')
  	}).catch(console.error.bind(console))
  });

  socket.on('addFromElectron', function (data){
  	// get the encrypted data from electron app and write it to the fs
  	fs.writeFileAsync(__dirname + '/../utilities/data.txt', data.data)
  	.then(function (){
  		// read the newly encrypted file
  		return fs.readFileAsync(__dirname + '/../utilities/data.txt')
  	})
  	.then(function (file){
  		// send the newly encrypted file back to chrome extension
    	socket.emit('electronAdd', file.toString())
  	}).catch(console.error.bind(console))
  })

})



server.listen(9999, 'localhost')

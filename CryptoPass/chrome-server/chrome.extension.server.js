// plan to make server https
var http = require('http');
var app = require('express')();
var chalk = require('chalk');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

var server = http.createServer(app)
var io = require('socket.io')(server)
io.on('connection', function (socket){

	io.emit('connect')

  socket.on('addFromChrome', function (data) {
  	// get the encrypted data from chrome extension and write it to the fs
  	fs.writeFileAsync(__dirname + '/../utilities/data.txt', data.data)
    .then(() => {
  		return settings.get('dropboxPath')
  	})
  	.then(val => {
  		if(val) {
  			return fs.writeFileAsync(val + '/Apps/CryptoPass/data.txt', encrypted);
  		}
  	})
  	.then(() => {
  		// emmit message to electron telling it to update the local data in app
    	socket.emit('chromeAdd')
  	}).catch(console.error.bind(console))
  });

  socket.on('addFromElectron', function (data){
  	// get the encrypted data from electron app and write it to the fs
  	fs.writeFileAsync(__dirname + '/../utilities/data.txt', data.data)
    .then(() => {
  		return settings.get('dropboxPath')
  	})
  	.then(val => {
  		if(val) {
  			return fs.writeFileAsync(val + '/Apps/CryptoPass/data.txt', encrypted);
  		}
  	})
  	.then(() => {
  		// read the newly encrypted file
  		return fs.readFileAsync(__dirname + '/../utilities/data.txt')
  	})
  	.then(file => {
  		// send the newly encrypted file back to chrome extension
    	socket.emit('electronAdd', file.toString())
  	}).catch(console.error.bind(console))
  })


  socket.on('chromeValidate', function (){
  	fs.readFileAsync(__dirname + '/../utilities/data.txt')
  	.then(data => {
  		data = data.toString()
  		socket.emit('responseChromeValidated', {data: data})
  	}).catch(console.error.bind(error))
  })

  socket.on('chromeToValidate', function (data){
  	console.log('chrome to validate')
  	// io.emit('secretToChrome', {data: 'hello'})
  	// return

  	fs.readFileAsync(__dirname + '/../utilities/secret2.txt')
  	.then(data => {
  		data = data.toString()
  		socket.emit('secretToChrome', {data: data})
  	}).catch(console.error.bind(error))
  })


})


server.listen(9999, 'localhost')
console.log(chalk.cyan('child server connected'))

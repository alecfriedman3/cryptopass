// plan to make server https
var http = require('http');
var app = require('express')();
var chalk = require('chalk');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var fsSettingsPath;

var username = require('username')

// var settings = require('electron-settings');


var server = http.createServer(app)

app.get('/secret', function (req, res, next){
		console.log('requested secret')
  	Promise.all([fs.readFileAsync(fsSettingsPath + '/secret2.txt'), fs.readFileAsync(__dirname + '/../utilities/secret1.txt')])
  	.spread((enSecretData, secretData) => {
  		res.send({data: enSecretData.toString(), check: secretData.toString()})
  	}).catch(console.error.bind(console))
})

app.get('/username', function (req, res, next){
  username()
  .then(function (name){
    res.send(name)
  })
})

var io = require('socket.io')(server)
io.on('connection', function (socket){

	io.emit('connect')
	socket.on('fsSettingsPath', function(data){
		fsSettingsPath = data.fsSettingsPath;
	})

  socket.on('addFromChrome', function (data) {
  	// get the encrypted data from chrome extension and write it to the fs
  	fs.writeFileAsync(fsSettingsPath + '/data.txt', data.data)
    .then(() => {
      // return settings.get('dropboxPath')
      io.emit('chromeAdd')
    })
    .catch(console.error.bind(console))

  });

  socket.on('addFromElectron', function (data){
  	// get the encrypted data from electron app and write it to the fs
  	fs.writeFileAsync(data.fsSettingsPath + '/data.txt', data.data)
  	.then(() => {
  		// read the newly encrypted file
  		return fs.readFileAsync(data.fsSettingsPath + '/data.txt')
  	})
  	.then(file => {
  		// send the newly encrypted file back to chrome extension
    	io.emit('electronAdd', {data: file.toString()})
    	// encrypt to dropbox
  		if(data.dropboxPath){
	  		return fs.writeFileAsync(data.dropboxPath + '/Apps/CryptoPass/data.txt', data.data);
			}
  	})
  	.catch(console.log.bind(console))
  })


  socket.on('chromeValidate', function (){
  	fs.readFileAsync(fsSettingsPath + '/data.txt')
  	.then(data => {
  		data = data.toString()
  		socket.emit('responseChromeValidated', {data: data})
  	}).catch(console.error.bind(console))
  })

  socket.on('electronNewMaster', function (){
    io.emit('chromeClearData')
  })

})


server.listen(9999, 'localhost')
console.log(chalk.cyan('child server connected'))
module.exports = io

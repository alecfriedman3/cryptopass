// plan to make server https
var http = require('http');
var app = require('express')();
var chalk = require('chalk');

var server = http.createServer(app)

app.get('/', function (req, res, next){
	console.log(chalk.green('hello'))
	res.send('hello')
})

server.listen(9999, 'localhost')

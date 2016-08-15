// var io = require('socket.io-client'),
// socket = io.connect('http://localhost:9999', {reconnect: true});

var firstHref = $("a[href^='http']").eq(0).attr("href");

console.log(firstHref);
// alert("Hello from your Chrome extension!")

var EventListener = require('../event.listener')

var socket = io.connect('http://localhost:9999', { reconnect: true });
var angular = require('angular');
var app = angular.module('cryptoPass', [ /*, require('angular-animate'), 'ui.slider'*/ ])

var eventListener = new EventListener();

// document.addEventListener('DOMContentLoaded', function () {
//     var links = document.getElementsByTagName("a");
//     for (var i = 0; i < links.length; i++) {
//         (function () {
//             var ln = links[i];
//             var location = ln.href;
//             ln.onclick = function () {
//                 chrome.tabs.create({active: true, url: location});
//             };
//         })();
//     }
// });

app.controller('cryptoCtrl', function($scope, $rootScope) {
  console.log('started angular')
  $scope.authenticate = false;

  $scope.authenticatePassword = function() {
    // need to validate password from chrome
    chrome.extension.sendMessage({master: $scope.master, eventName: 'authentication'})
    eventListener.on('validation', function (data) {
      $scope.authenticate = data.valid;
      $scope.$digest();
    })
    // socket.emit('chromeToValidate')
  }

  eventListener.on('accountInfo', function (data) {
    $scope.accounts = data.data
  })

})

chrome.extension.onMessage.addListener(function (req, sender, sendRes) {
  if (!eventListener[req.eventName]) return
  eventListener.emit(req.eventName, req);
})


$(document).ready(function() {
  console.log('ready');

window.addEventListener('click',function(e){
  if(e.target.href!==undefined){
    chrome.tabs.create({url:e.target.href})
  }
})


})

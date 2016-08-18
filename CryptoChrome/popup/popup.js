var EventListener = require('../event.listener')
var io = require('socket.io-client');
var $ = require('jQuery');
var socket = io.connect('http://localhost:9999', { reconnect: true });
var angular = require('angular');
var app = angular.module('cryptoPass', [ /*, require('angular-animate'), 'ui.slider'*/ ])

var eventListener = new EventListener();

app.controller('cryptoCtrl', function($scope, $rootScope) {
  console.log('started angular')
  $scope.authenticate = false;

  $scope.authenticatePassword = function() {
    // need to validate password from chrome
    console.log($scope.master, socket)
    chrome.extension.sendMessage({master: $scope.master, eventName: 'authentication'})
    eventListener.on('validation', function (data) {
      $scope.authenticate = data.valid;
      $scope.$digest();
    })
    // socket.emit('chromeToValidate')
  }
})

chrome.extension.onMessage.addListener(function (req, sender, sendRes) {
  eventListener.emit(req.eventName);
})




$(document).ready(function() {
  console.log('ready');




})

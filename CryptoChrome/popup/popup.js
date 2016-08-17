
var socket = io('http://localhost:9999', { reconnect: true });

var app = angular.module('cryptoPass', [ /*, require('angular-animate'), 'ui.slider'*/ ])

app.controller('cryptoCtrl', function($scope, $rootScope) {
  console.log('started angular')
  $scope.authenticate = false;

  $scope.authenticatePassword = function() {
    // need to validate password from chrome
    console.log($scope.master, socket)
    chrome.extension.sendMessage({master: $scope.master}, function (res){
    	console.log(res)
    	if (res.valid) $scope.authenticate = true;
    	$scope.master = null
    	$scope.$digest()
    })
    // socket.emit('chromeToValidate')
  }
})






$(document).ready(function() {
  console.log('ready');




})

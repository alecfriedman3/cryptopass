
var socket = io('http://localhost:9999', { reconnect: true });
var masterObj, masterPass;
var app = angular.module('cryptoPass', [ /*, require('angular-animate'), 'ui.slider'*/ ])

app.controller('cryptoCtrl', function($scope, $rootScope) {
  console.log('started angular')
  $scope.authenticate = true;

  $scope.authenticatePassword = function() {
    // need to validate password from chrome
    console.log($scope.master, socket)
    masterPass = $scope.master
    console.log(masterPass)
    socket.emit('chromeToValidate')
  }
})

  socket.on('connect', function() {
    console.log('chrome connected');
  })

  socket.on('electronAdd', function() {
    console.log('electronAdd socket fired and caught');
  })

  socket.on('responseChromeValidated', function(data) {
    console.log('masterObj', data)
    masterObj = JSON.parse(decrypt(data.data, masterPass))
  })

  $('button').on('click', function() {
    console.log('clicked');
    socket.emit('chromeToValidate', { data: 'lollll' })
    console.log(masterPass)
  })

  socket.on('secretToChrome', function(data) {
    console.log('secret ', data)
    try {
        // try decrypting, if success emit success, otherwise reset master
      var decrypted = decrypt(data.data, masterPass)
      var test = encrypt('hello world', masterPass)
      var detest = decrypt(test.toString(), masterPass)
      console.log('decrypting secret', detest)
      // socket.emit('chromeValidated');
    } catch (err) {
      console.error(err)
    }
  })




$(document).ready(function() {
  console.log('ready');




})

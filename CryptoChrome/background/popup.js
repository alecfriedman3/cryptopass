

// var app = angular.module('cryptoPass', [ /*, require('angular-animate'), 'ui.slider'*/ ])

// app.controller('cryptoCtrl', function($scope, $rootScope) {
//   console.log('started angular')
//   $scope.authenticate = true;

//   $scope.authenticatePassword = function() {
//     // need to validate password from chrome
//     console.log($scope.master, socket)
//     masterPass = $scope.master
//     console.log(masterPass)
//     socket.emit('chromeToValidate')
//   }
// })



$(document).ready(function() {
  console.log('ready');
  socket.on('electronAdd', function() {
    console.log('electronAdd socket fired and caught');
  })

  socket.on('responseChromeValidated', function(data) {
    console.log('masterObj', data)
    masterObj = JSON.parse(decrypt(data.data, masterPass))
  })


  socket.on('secretToChrome', function(data) {
    console.log('secret ', data)
    try {
      console.log('decrypting secret')
        // try decrypting, if success emit success, otherwise reset master
      decrypt(data.data, masterPass);
      socket.emit('chromeValidated');
    } catch (err) {
      console.error(err)
    }
  })

  socket.on('connect', function() {
    console.log('chrome connected');
  })


  $('button').on('click', function() {
    console.log('clicked');
    socket.emit('addFromChrome', { data: 'lollll' })
  })

})

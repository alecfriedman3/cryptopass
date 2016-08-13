// var dropboxUtilities = require('./dropbox.utilities.js')
var settings = require('electron-settings');
var remote = require('electron').remote;
var dialog = remote.dialog;
console.log(dialog);


app.controller('dropboxController', function($scope){
  // dropboxUtilities.checkForAuthenticatedUser()
  // .then(token => $scope.dropboxAuthenticated = "Disconnect From Dropbox")
  // .catch(err => $scope.dropboxAuthenticated = "Connect To Dropbox")

  settings.get('dropboxPath').then(val => {
    val ? $scope.dropboxAuthenticated = "Disconnect From Dropbox" : $scope.dropboxAuthenticated = "Connect To Dropbox"
    $scope.$evalAsync()
  })


  $scope.dropboxAuth = function(){
    dialog.showOpenDialog({properties: ['openDirectory']})
    // if($scope.dropboxAuthenticated === "Disconnect From Dropbox"){
    //   window.localStorage.removeItem('dropboxAuthToken')
    //   $scope.dropboxAuthenticated = "Connect To Dropbox"
    // } else {
    //   dropboxUtilities.authenticateUser()
    //   .then(token => {
    //     $scope.dropboxAuthenticated = "Disconnect From Dropbox"
    //     $scope.$digest()
    //   })
    //   .catch(err => console.error(err))
    // }
  }
})

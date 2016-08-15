var settings = require('electron-settings');
var remote = require('electron').remote;
var dialog = remote.dialog;

app.controller('dropboxController', function($scope){
  function setScope(){
    settings.get('dropboxPath').then(val => {
      if(val){
        $scope.dropboxAuthenticated = true;
        $scope.buttonText = "Disconnect From Dropbox"
      } else {
        $scope.dropboxAuthenticated = false
        $scope.buttonText = "Select Dropbox Folder"
      }
      $scope.$evalAsync()
    })
  }
  setScope()

  $scope.dropboxAuth = function(){
    if($scope.dropboxAuthenticated){
      settings.delete('dropboxPath').then(() => setScope())
    } else {
      let dropboxPath = dialog.showOpenDialog({title: 'Please select your Dropbox folder', properties: ['openDirectory']})
      settings.set('dropboxPath', dropboxPath[0]).then(() => {
        setScope();
        encryptFile(masterObj, masterPass)
      })
    }
  }
})

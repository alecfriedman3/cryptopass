// var dropboxUtilities = require('./dropbox.utilities.js')


app.controller('dropboxController', function($scope){
  dropboxUtilities.checkForAuthenticatedUser()
  .then(token => $scope.dropboxAuthenticated = "Disconnect From Dropbox")
  .catch(err => $scope.dropboxAuthenticated = "Connect To Dropbox")

  dropboxUtilities.getFileData()
  .then(res => console.log(res))
  .catch(err => console.error(err))

  $scope.dropboxAuth = function(){
    if($scope.dropboxAuthenticated === "Disconnect From Dropbox"){
      window.localStorage.removeItem('dropboxAuthToken')
      $scope.dropboxAuthenticated = "Connect To Dropbox"
    } else {
      dropboxUtilities.authenticateUser()
      .then(token => {
        $scope.dropboxAuthenticated = "Disconnect From Dropbox"
        $scope.$digest()
      })
      .catch(err => console.error(err))
    }
  }
})

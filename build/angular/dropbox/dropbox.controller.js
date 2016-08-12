// var dropboxUtilities = require('./dropbox.utilities.js')


app.controller('dropboxController', function($scope){

  $scope.dropboxAuth = function(){
    dropboxUtilities.authenticateUser()
    .catch(err => console.error(err))
  }
})

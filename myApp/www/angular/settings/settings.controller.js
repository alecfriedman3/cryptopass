app.controller('settingsController', function($scope, $cordovaOauth, $localStorage){
  var dropbox = require('dropbox');

  function setScope(){
    var token = window.localStorage.getItem('dropboxAuth')
      if(token){
        $scope.dropboxAuthenticated = true;
        $scope.buttonText = "Disconnect From Dropbox"
      } else {
        $scope.dropboxAuthenticated = false
        $scope.buttonText = "Connect To Dropbox"
      }
      $scope.$evalAsync()
  }
  setScope()


  $scope.dropboxAuth = function(){

    if($scope.dropboxAuthenticated){
      window.localStorage.removeItem('dropboxAuth');
      setScope()
    } else {
      $cordovaOauth.dropbox('pg8nt8sn9h5yidb')
      .then(function(res){
        return window.localStorage.setItem('dropboxAuth', res.access_token)
      })
      .then(function(){
        setScope()
      })
    }


  };
})

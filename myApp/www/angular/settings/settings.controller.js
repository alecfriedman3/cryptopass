app.controller('settingsController', function($scope, $cordovaOauth){
  var dropboxUtils = require('../angular/utilities/dropbox.utility.js')

  function setScope(){
    var token = window.localStorage.getItem('dropboxAuth')
      if(token){
        $scope.dropboxAuthenticated = true;
        $scope.buttonText = "Disconnect From Dropbox";
      } else {
        $scope.dropboxAuthenticated = false;
        $scope.buttonText = "Connect To Dropbox";
      }
      $scope.$evalAsync();
  }
  setScope();


  $scope.dropboxAuth = function(){
    var dropboxPathForCrypto;
    if($scope.dropboxAuthenticated){
      window.localStorage.removeItem('dropboxAuth');
      setScope()
    } else {
      $cordovaOauth.dropbox('pg8nt8sn9h5yidb')
      .then(function(res){
        return window.localStorage.setItem('dropboxAuth', res.access_token)
      })
      .then(function(){
        return dropboxUtils.getDropboxFilePath()
      })
      .then(function(matches){
        if(matches){
          dropboxPathForCrypto = matches.metadata.path_display
          window.localStorage.setItem('dropboxPath', dropboxPathForCrypto)
          setScope()
          return dropboxUtils.getDataObjectFromDropbox(dropboxPathForCrypto, '/data.txt')
        } else{
          cantFindCryptoPass()
        }
      })
      .then(function(dataObj){
        window.localStorage.setItem('masterObj', dataObj)
        return dropboxUtils.getDataObjectFromDropbox(dropboxPathForCrypto, '/secret2.txt')
      })
      .then(function(secret2){
        window.localStorage.setItem('secret2', secret2);
        $scope.error = null;
      })
    }
  };


  function cantFindCryptoPass(){
    $scope.error = "We can't find your CryptoPass folder.  Please make sure it's in your Dropbox Account"
  }
})

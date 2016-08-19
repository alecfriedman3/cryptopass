app.controller('settingsController', function($scope, $cordovaOauth, $cordovaTouchID, $timeout){
  var dropboxUtils = require('../angular/utilities/dropbox.utility.js');
  var classifiedUtils = require('../angular/utilities/classified/hashingBackup.js');
  var touchIdBackup = window.localStorage.getItem('touchIdBackup');
  touchIdBackup ? $scope.touchIdBackup = true : $scope.touchIdBackup = false;

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

  $scope.touchIdEnableDisable = function(){
    if(!$scope.touchIdBackup){
      document.addEventListener("deviceready", function () {
        $cordovaTouchID.checkSupport().then(function() {
    			$cordovaTouchID.authenticate("text").then(function() {
    			  window.localStorage.setItem('touchIdBackup', 'true');
            $scope.touchIdBackup = true;
            console.log('about to get to utils');
            classifiedUtils.backupHash()
    			}, function () {
    				alert('Please Try Again');
            $scope.touchIdBackup = false;
    			});
    	  }, function (error) {
    	    alert('You need TouchID for this feature :(');
          window.localStorage.removeItem('touchIdBackup');
          $scope.touchIdBackup = false;
    	  });
      }, false);
    } else {
      window.localStorage.removeItem('touchIdBackup');
      $scope.touchIdBackup = false;
    }
  }
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

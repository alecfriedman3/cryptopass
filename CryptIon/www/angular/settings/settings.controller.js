app.controller('settingsController', function($scope, $cordovaOauth, $cordovaTouchID, $timeout){
  var dropboxUtils = require('../angular/utilities/dropbox.utility.js');
  var classifiedUtils = require('../angular/utilities/classified/hashingBackup.js');


  var encryptUtil = require('../angular/utilities/encrypt.utility.js');

  $scope.$on('$ionicView.enter', function() {
    console.log(device.platform); // eslint-disable-line
  });

  function setScope(){
    var touchIdBackup = window.localStorage.getItem('touchIdBackup');
    console.log(touchIdBackup, 'touchIdBackup');
    var token = window.localStorage.getItem('dropboxAuth')
    touchIdBackup ? $scope.touchIdBackup = true : $scope.touchIdBackup = false;
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
        if(device.platform.toLowerCase() === 'android'){ // eslint-disable-line
          androidTouchId()
        }
        else if(device.platform.toLowerCase() === 'ios') // eslint-disable-line
          iOSTouchId();
      })
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
          return dropboxUtils.getDataObjectFromDropbox(dropboxPathForCrypto, '/mobileData.txt')
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

  function androidTouchId(){
    console.log(FingerprintAuth); // eslint-disable-line
    FingerprintAuth.isAvailable( // eslint-disable-line
      function isAvailableSuccess(result) {
          console.log("FingerprintAuth available: " + JSON.stringify(result));
          if (result.isAvailable) {
              FingerprintAuth.show({ // eslint-disable-line
                  clientId: "CryptoPass",
                  clientSecret: "secretekey"
              }, function(){
                //success handler
                window.localStorage.setItem('touchIdBackup', true)
                var hash = classifiedUtils.backupHash();
                // var hash = '4aee3459aa2f31093d2de2458'
                console.log(hash);
                encryptAndWriteBackUp(hash)
              }, function(){
                //error handler - access denied
                console.log('denied');
              });
          }
      }, function(){console.log('log not available for FingerprintAu');});
  }

  function iOSTouchId(){
    $cordovaTouchID.checkSupport().then(function() {
      $cordovaTouchID.authenticate("Enable Backups").then(function() {
        window.localStorage.setItem('touchIdBackup', 'true');
        $scope.touchIdBackup = true;
        console.log('about to get to utils');
        var hash = classifiedUtils.backupHash()
        encryptAndWriteBackUp(hash)
      }, function () {
        alert('Please Try Again');
        $scope.touchIdBackup = false;
      }, function (error) {
        alert('You need TouchID for this feature :(');
        window.localStorage.removeItem('touchIdBackup');
        $scope.touchIdBackup = false;
      })
    }, false)
  }

  function encryptAndWriteBackUp(hash){
    console.log(hash, 'in encrypt and write func');
    console.log(masterObj); //eslint-disable-line
    var encryptedBackup = encryptUtil.encrypt(JSON.stringify(masterObj), hash); //eslint-disable-line
    console.log('decryptBackupData', encryptUtil.decrypt(encryptedBackup, hash));
    dropboxUtils.fileUpload(encryptedBackup, '/dataBackup.txt')
    .then(function(data){
      console.log(data, 'uploaded');

    })
    .catch(function(err){console.log(err);})
  }


  function cantFindCryptoPass(){
    $scope.error = "We can't find your CryptoPass folder.  Please make sure it's in your Dropbox Account"
  }
})

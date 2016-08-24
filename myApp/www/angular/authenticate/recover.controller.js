app.controller('recoverController', function($scope, $ionicModal, $cordovaTouchID){
  var classifiedUtils = require('../angular/utilities/classified/hashingBackup.js');
  var dropboxUtils = require('../angular/utilities/dropbox.utility.js');
  var encryptUtil = require('../angular/utilities/encrypt.utility.js');

  $scope.recoverBackup = function(){
    window.localStorage.getItem('touchIdBackup') ? null : null //aler here if they didn't back up

    document.addEventListener("deviceready", function () {
      if(device.platform.toLowerCase() === 'android'){ // eslint-disable-line
        androidTouchId()
      }
      else if(device.platform.toLowerCase() === 'ios') // eslint-disable-line
        iOSTouchId();
    })
  }

  $scope.changePassword = function(master1, master2, master3){
    if(master1.length < 8) return alert('Password must be 8 characters')
    if(master1 === master2 && master1 === master2 && master2 === master3){
      updateSecret2(master1)
    } else {
      return alert('Passwords do not match')
    }
  }




  function androidTouchId(){
    console.log(FingerprintAuth); // eslint-disable-line
    FingerprintAuth.isAvailable( // eslint-disable-line
      function isAvailableSuccess(result) {
          if (result.isAvailable) {
              FingerprintAuth.show({ // eslint-disable-line
                  clientId: "CryptoPass",
                  clientSecret: "secretekey"
              }, function(){
                //success handler
                var hash = classifiedUtils.backupHash();
                startRecoverProcess(hash)
              }, function(){
                //error handler - access denied
                alert('denied');
              });
          }
      }, function(){console.log('log not available for FingerprintAu');});
  }

  function iOSTouchId(){
    $cordovaTouchID.checkSupport().then(function() {
      $cordovaTouchID.authenticate("text").then(function() {
        var hash = classifiedUtils.backupHash();
        startRecoverProcess(hash)
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

  function startRecoverProcess(hash){
    //pull backup file down
    var dropboxPath = window.localStorage.getItem('dropboxPath');
    console.log(dropboxPath);
    dropboxUtils.getDataObjectFromDropbox(dropboxPath, '/dataBackup.txt')
    .then(function(dataObj){
      console.log(dataObj, 'dataObj in start');
      decryptBackupData(dataObj, hash)
    })
  }

  function decryptBackupData(encryptedData, hash){
    var decryptedBackupData = encryptUtil.decrypt(encryptedData, hash);
    console.log(decryptedBackupData, 'decryptedBackupData');
    masterObj = JSON.parse(decryptedBackupData);
    console.log(masterObj, 'decrypted from backup');
    $ionicModal.fromTemplateUrl('angular/authenticate/resetPassword.view.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show()
    });
  }

  function updateSecret2(newPassword){
    var secret1 = encryptUtil.secret1;
    var secret2 = encryptUtil.encrypt(secret1, newPassword);
    dropboxUtils.fileUpload(secret2, '/secret2.txt')
    .then(function(successObj){
      encryptMasterObjectWithNewPassword(newPassword)
      $scope.modal.hide()
    })
    .catch(function(){
      console.log(err);
    })
  }

  function encryptMasterObjectWithNewPassword(newPassword){
    var encryptedData = encryptUtil.encrypt(JSON.stringify(masterObj), newPassword)
    return Promise.all([dropboxUtils.fileUpload(encryptedData, '/mobileData.txt'), dropboxUtils.fileUpload(encryptedData, '/data.txt')])
    .then(function(arr){
      console.log('success', arr);
    })
    .catch(function(err){
      console.log(err);
    })
  }



})

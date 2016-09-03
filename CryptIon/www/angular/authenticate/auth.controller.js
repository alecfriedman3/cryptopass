
app.controller('authController', function($scope, $state, $cordovaOauth){
	var Dropbox = require('dropbox');
	var Promise = require('bluebird');
	var utils = require('../angular/utilities/encrypt.utility.js');
	var dropboxUtils = require('../angular/utilities/dropbox.utility.js');
  var compareAndUpdate = require('../angular/utilities/object.compare.js').compareAndUpdate;
  var encryptUtil = require('../angular/utilities/encrypt.utility.js');
  window.localStorage.clear()
	var token = window.localStorage.getItem('dropboxAuth');
	var backupEnabled = window.localStorage.getItem('touchIdBackup');

	backupEnabled ? $scope.showLostPasword = true : $scope.showLostPasword = false;
	$scope.displayPasswordField = true;
	$scope.loading = false;
	$scope.dropboxAuthButton = false;
	$scope.justLinked = false;
  $scope.firstLogin = null;
  token ? null : noDropboxError();
	// $state.go('app.creditCardAdd')



	$scope.checkMaster = function(master){

		$scope.loading = true;
		if($scope.justLinked){
			var encryptedMasterObj = window.localStorage.getItem('masterObj');
			console.log(encryptedMasterObj);
			$scope.error = null;
			var masterCorrect = utils.validate(master)
			masterCorrect ? accessGranted(encryptedMasterObj, encryptedMasterObj, master) : accessDenied();
		} else {
			if(token){
				var dropboxPathForCrypto;
				getDropboxData()
	      .then(function(secret2){
					console.log(secret2);
	        window.localStorage.setItem('secret2', secret2);
					var encryptedMobileObj = window.localStorage.getItem('masterObj');
          var encryptedDesktopObj = window.localStorage.getItem('desktopMasterObj');
          return Promise.all([encryptedMobileObj, encryptedDesktopObj])
        })
        .then(function (arr){
					var mobileDataEncrypted = arr[0]
					var desktopEncrytped = arr[1]
	        $scope.error = null;
					var masterCorrect = utils.validate(master)
					masterCorrect ? accessGranted(desktopEncrytped, mobileDataEncrypted, master) : accessDenied();
        })
			} else {
				noDropboxError()
			}
		}

	};

	$scope.linkDropbox = function(){
		var dropboxPathForCrypto;
		$scope.loading = true;
		$cordovaOauth.dropbox('pg8nt8sn9h5yidb')
		.then(function(res){
			window.localStorage.setItem('dropboxAuth', res.access_token)
      return dropboxUtils.getAndSetAccessToken(res.access_token)
		})
		.then(function(){
			return getDropboxData(true)
		})
		.then(function(secret2){
			window.localStorage.setItem('secret2', secret2);
			$scope.error = null;
			$scope.loading = false;
			$scope.justLinked = true;
			$scope.dropboxAuthButton = false;
			$scope.displayPasswordField = true;
			$scope.$evalAsync()
		})
    .catch(function (err){
      console.error(err)
      $scope.error = "We can't find your CryptoPass folder. If this is your first time using CryptoPass on any device, enter a new password. If you have used this app before on your computer, make sure your CryptoPass folder is backed up to your Dropbox account!"
      if (err.message == 'Cannot Find CryptoPass'){
        window.localStorage.setItem('dropboxPath', '/Apps/CryptoPass')
        $scope.firstLogin = true;
        $scope.dropboxAuthButton = false;
        $scope.loading = false;
      }
      return
    })
	}

  $scope.setPassword = function(master1, master2, master3){
    if (!window.localStorage.getItem('dropboxPath')) window.localStorage.setItem('dropboxPath', '/Apps/CryptoPass');

    $scope.loading = true
    if(master1.length < 8) return alert('Password must be 8 characters')
    if(master1 === master2 && master1 === master2 && master2 === master3){
      updateSecret2(master1)
      .then(function (successObj){
        masterObj = {login: [], creditCard: [], identity: [], note: []}
        var encryptedData = encryptUtil.encrypt(JSON.stringify(masterObj), master1)
        return Promise.all([encryptedData, dropboxUtils.fileUpload(encryptedData, '/mobileData.txt'), dropboxUtils.fileUpload(encryptedData, '/data.txt')])
      })
      .then(function (arr){
        var encryptedData = arr[0];
        globalMasterPass = master1
        $scope.loading = false;
        $state.go('app.home')
      })
    } else {
      return alert('Passwords do not match')
    }
  }

  // NEEDS TO GO IN A PASSWORD FACTORY
  function updateSecret2(newPassword){
    var secret1 = encryptUtil.secret1;
    var secret2 = encryptUtil.encrypt(secret1, newPassword);
    return dropboxUtils.fileUpload(secret2, '/secret2.txt')
  }

  // EVERYTHING FROM HERE DOWN MUST GO IN A DROPBOX FACTORY
	function getDropboxData(bool){
		return dropboxUtils.getDropboxFilePath()
		.then(function(matches){
			console.log('outside if matches', matches);
			if(matches){
				dropboxPathForCrypto = matches.metadata.path_display // eslint-disable-line
				// dropboxPathForCrypto = matches
				console.log(dropboxPathForCrypto, 'this is db path');
				window.localStorage.setItem('dropboxPath', dropboxPathForCrypto)// eslint-disable-line
				var ownDataFileExist = bool ? dropboxUtils.getDataObjectFromDropbox(dropboxPathForCrypto, '/data.txt') : dropboxUtils.getDataObjectFromDropbox(dropboxPathForCrypto, '/mobileData.txt')
				return Promise.all([ownDataFileExist, dropboxUtils.getDataObjectFromDropbox(dropboxPathForCrypto, '/data.txt')])// eslint-disable-line
			} else{
        window.localStorage.setItem('dropboxPath', '/Apps/CryptoPass')
        // window.localStorage.setItem('initializing', 'true')
				console.log('we hit the else', matches);
				// throw new Error('Can\'t find CryptoPass')
        return Promise.all(['', '', true])
			}
		})
		.then(function(arr){
			console.log(arr);
      if (arr[2]) return ''
      window.localStorage.setItem('desktopMasterObj', arr[1])
			window.localStorage.setItem('masterObj', arr[0])
			return dropboxUtils.getDataObjectFromDropbox(dropboxPathForCrypto, '/secret2.txt'); // eslint-disable-line
		})
		// .catch(function(err){console.log(err);})
	}

	function noDropboxError(){
		$scope.error = "Please link your Dropbox Account To Use The Mobile App";
		$scope.dropboxAuthButton = true;
		$scope.displayPasswordField = false;
		$scope.$evalAsync()
	}
	function accessGranted(desktopEncrypted, mobileDataEncrypted, masterPass){
		$scope.$evalAsync();
		globalMasterPass = masterPass; // eslint-disable-line
		var desktopMasterObj = JSON.parse(utils.decrypt(desktopEncrypted, masterPass));// eslint-disable-line
    var mobileMasterObj = JSON.parse(utils.decrypt(mobileDataEncrypted, masterPass));// eslint-disable-line
    masterObj = compareAndUpdate(desktopMasterObj, mobileMasterObj);
		dropboxUtils.fileUpload(utils.encrypt(JSON.stringify(masterObj), masterPass), '/mobileData.txt')
		.then(function(){
			console.log('backupenabled!!!!!!!!!', backupEnabled);
      var hash = require('../angular/utilities/classified/hashingBackup.js').backupHash()
			return Promise.all([backupEnabled ? dropboxUtils.fileUpload(utils.encrypt(JSON.stringify(masterObj), hash), '/dataBackup.txt') : null])
		})
		.then(function(){
			console.log('access granted and mobileData updated');
			$scope.loading = false;
			$state.go('app.home')
		})
		.catch(function(err){console.log(err)})
	}

	function accessDenied(){
		$scope.loading = false;
		$scope.$evalAsync()
		$scope.error = 'Incorrect Password'
	}

	function cantFindCryptoPass(){
    $scope.error = "We can't find your CryptoPass folder.  Please make sure it's in your Dropbox Account"
  }
})

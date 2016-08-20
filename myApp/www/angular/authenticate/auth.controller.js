
app.controller('authController', function($scope, $state, $cordovaOauth){
	var Dropbox = require('dropbox');
	var Promise = require('bluebird');
	var utils = require('../angular/utilities/encrypt.utility.js');
	var dropboxUtils = require('../angular/utilities/dropbox.utility.js');
  var compareAndUpdate = require('../angular/utilities/object.compare.js');
	var token = window.localStorage.getItem('dropboxAuth');

	$scope.displayPasswordField = true;
	$scope.loading = false;
	$scope.dropboxAuthButton = false;
	$scope.justLinked = false;
  token ? null : noDropboxError();



	$scope.checkMaster = function(master){
		$scope.loading = true;
		if($scope.justLinked){
			var encryptedMasterObj = window.localStorage.getItem('masterObj');
			console.log(encryptedMasterObj);
			$scope.error = null;
			var masterCorrect = utils.validate(master)
			masterCorrect ? accessGranted(encryptedMasterObj, master) : accessDenied();
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
        .spread(function (mobileDataEncrypted, desktopEncrytped){
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
			return window.localStorage.setItem('dropboxAuth', res.access_token)
		})
		.then(function(){
			return getDropboxData()
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
      $scope.error = "We can't find your CryptoPass folder.  Please make sure it's in your Dropbox Account"
    })
	}

	function getDropboxData(){
		return dropboxUtils.getDropboxFilePath()
		.then(function(matches){
			if(matches){
				dropboxPathForCrypto = matches.metadata.path_display // eslint-disable-line
				window.localStorage.setItem('dropboxPath', dropboxPathForCrypto)// eslint-disable-line
				return Promise.all([dropboxUtils.getDataObjectFromDropbox(dropboxPathForCrypto, '/mobileData.txt'), dropboxUtils.getDataObjectFromDropbox(dropboxPathForCrypto, '/data.txt')])// eslint-disable-line
			} else{
				throw new Error('Can\'t find CryptoPass')
			}
		})
		.spread(function(mobileDataObj, desktopDataObj){
      window.localStorage.setItem('desktopMasterObj', desktopDataObj)
			window.localStorage.setItem('masterObj', mobileDataObj)
			return dropboxUtils.getDataObjectFromDropbox(dropboxPathForCrypto, '/secret2.txt'); // eslint-disable-line
		})
	}

	function noDropboxError(){
		$scope.error = "Please link your Dropbox Account To Use The Mobile App";
		$scope.dropboxAuthButton = true;
		$scope.displayPasswordField = false;
		$scope.$evalAsync()
	}
	function accessGranted(desktopEncrytped, mobileDataEncrypted, masterPass){
		$scope.loading = false;
		$scope.$evalAsync();
		globalMasterPass = masterPass; // eslint-disable-line
		var desktopMasterObj = JSON.parse(utils.decrypt(desktopEncrytped, masterPass));// eslint-disable-line
    var mobileMasterObj = JSON.parse(utils.decrypt(mobileDataEncrypted, masterPass));// eslint-disable-line
    masterObj = compareAndUpdate(desktopMasterObj, mobileMasterObj)
		console.log(masterObj);// eslint-disable-line
		console.log('access granted');
		$state.go('app.home')
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

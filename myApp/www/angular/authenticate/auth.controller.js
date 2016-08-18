app.controller('authController', function($scope, $state, $cordovaOauth){
	var Dropbox = require('dropbox');
	var Promise = require('bluebird');
	var utils = require('../angular/utilities/encrypt.utility.js');
	var dropboxUtils = require('../angular/utilities/dropbox.utility.js');
	var token = window.localStorage.getItem('dropboxAuth');

	$scope.displayPasswordField = true;
	$scope.loading = false;
	$scope.dropboxAuthButton = false;
  token ? null : noDropboxError()

	$scope.checkMaster = function(master){
		$scope.loading = true;

		if(token){
			var dropboxPathForCrypto;
			dropboxUtils.getDropboxFilePath()
			.then(function(matches){
        if(matches){
          dropboxPathForCrypto = matches.metadata.path_display
          window.localStorage.setItem('dropboxPath', dropboxPathForCrypto)
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
				var masterCorrect = utils.validate(master)
				masterCorrect ? accessGranted() : accessDenied();
      })
		} else {
			noDropboxError()
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
			return dropboxUtils.getDropboxFilePath()
		})
		.then(function(matches){
			if(matches){
				dropboxPathForCrypto = matches.metadata.path_display
				window.localStorage.setItem('dropboxPath', dropboxPathForCrypto)
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
			$scope.loading = false;
			$scope.dropboxAuthButton = false;
			$scope.displayPasswordField = true;
			$scope.$evalAsync()
		})
	}

	function noDropboxError(){
		$scope.error = "Please link your Dropbox Account To Use The Mobile App";
		$scope.dropboxAuthButton = true;
		$scope.displayPasswordField = false;
		$scope.$evalAsync()
	}
	function accessGranted(){
		$scope.loading = false;
		$scope.$evalAsync()
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

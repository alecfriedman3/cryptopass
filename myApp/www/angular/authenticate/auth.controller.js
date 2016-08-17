app.controller('authController', function($scope, $state){
	var Dropbox = require('dropbox');
	var Promise = require('bluebird')
	var dbx = new Dropbox({ clientId: 'pg8nt8sn9h5yidb' });
	var token = window.localStorage.getItem('dropboxAuth')
	$scope.loading = false;

	token ? dbx.setAccessToken(token) : null;
	$scope.checkMaster = function(master){
		$scope.loading = true;
		var dropboxPathForCrypto;
		getDropboxFilePath()
		.then(function(matches){
			if(matches){
				dropboxPathForCrypto = matches.metadata.path_display
				window.localStorage.setItem('dropboxPath', dropboxPathForCrypto)
				return getDataObjectFromDropbox(dropboxPathForCrypto, '/data.txt')

			} else{
				cantFindCryptoPass()
			}
		})
		.then(function(dataObj){
			console.log(dataObj);
			window.localStorage.setItem('masterObj', dataObj)
			return getDataObjectFromDropbox(dropboxPathForCrypto, '/secret2.txt')
		})
		.then(function(secret2){
			window.localStorage.setItem('secret2', secret2)
			$scope.loading = false;
			$scope.$evalAsync()
		})
		// $state.go('app.home');
	}

	function getDataObjectFromDropbox(cryptoPath, file){
		return new Promise(function(resolve, reject){
      dbx.filesGetTemporaryLink({path: cryptoPath + file})
      .then(function(linkObj){
        var xhr = new XMLHttpRequest();
        xhr.open("GET", linkObj.link, true);
        xhr.onreadystatechange = function(e) {
          if (xhr.readyState === 4 && xhr.statusText === "OK"){
						console.log(xhr.responseText);
            resolve(xhr.responseText.replace(/"/g, ''))
          }
        }
        xhr.send(null)
      })
      .catch(function(err){reject(err)})
    })
	}

	function getDropboxFilePath(){
		console.log('in here');
		return dbx.filesSearch({path: '/Apps', query: 'CryptoPass'})
		.then(function(res){
			return res.matches[0];
		})
		.catch(function(err){console.log('w have an error', err)})
	}

	function cantFindCryptoPass(){
		$scope.error = "We can't find your CryptoPass folder.  Please make sure it's in your Dropbox Account"
	}
})

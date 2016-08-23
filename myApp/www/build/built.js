// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var app = angular.module('cryptoPass', ['ionic', 'ngCordova', 'ngCordovaOauth', 'ngStorage', 'ui.slider'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })


  .state('auth', {
      url: '/auth',
      views: {
        'auth': {
          templateUrl: 'angular/authenticate/auth.view.html',
          controller: 'authController'
        }
      }
    })
  //   .state('auth.firstLogin', {
  //   url: '/auth/firstlogin',
  //   views: {
  //     'firstlogin': {
  //       templateUrl: 'build/angular/authenticate/firstlogin.view.html',
  //       controller: 'firstLoginController'
  //     }
  //   }

  // })
  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'angular/home/home.view.html',
        controller: 'homeController'
      }
    }
  })

  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'angular/login/login.view.html',
        controller: 'loginController'
      }
    }
  })
  .state('app.loginSingle', {
    url: '/login/:id',
    params: {accountData: null},
    views: {
      'menuContent': {
        templateUrl: 'angular/login/login.single.html',
        controller: 'loginSingleController'
      }
    }
  })


  .state('app.loginAdd', {
    url: '/login/add',
    views: {
      'menuContent': {
        templateUrl: 'angular/login/login.add.view.html',
        controller: 'addLoginController'
      }
    }

})
  .state('app.creditCard', {
    url: '/creditCard',
    views: {
      'menuContent': {
        templateUrl: 'angular/creditCard/creditCards.all.view.html',
        controller: 'creditCardController'
      }
    }
  })
  .state('app.creditCardSingle', {
    url: '/creditCard/:id',
    params: {accountData: null},
    views: {
      'menuContent': {
        templateUrl: 'angular/creditCard/creditCard.single.html',
        controller: 'creditCardSingleController'
      }
    }
  })

  .state('app.creditCardAdd', {
    url: '/creditCard/add',
    views: {
      'menuContent': {
        templateUrl: 'angular/creditCard/creditCard.add.view.html',
        controller: 'addcreditCardController'
      }
    }

})
  .state('app.identity', {
      url: '/identity',
      views: {
        'menuContent': {
          templateUrl: 'angular/identity/identity.all.view.html',
          controller: 'identityController'
        }
      }
    })

    .state('app.identitySingle', {
    url: '/identity/:id',
    params: {accountData: null},
    views: {
      'menuContent': {
        templateUrl: 'angular/identity/identity.single.html',
        controller: 'identitySingleController'
      }
    }
  })
      .state('app.identityAdd', {
    url: '/identity/add',
    views: {
      'menuContent': {
        templateUrl: 'angular/identity/identity.add.view.html',
        controller: 'addIdentityController'
      }
    }

})
    .state('app.note', {
      url: '/note',
      views: {
        'menuContent': {
          templateUrl: 'angular/note/note.view.html',
          controller: 'noteController'
        }
      }
    })

  .state('app.noteSingle', {
      url: '/note/:id',
       params: {accountData: null},
      views: {
        'menuContent': {
          templateUrl: 'angular/note/note.single.html',
          controller: 'noteSingleController'
        }
      }
    })

   .state('app.noteAdd', {
    url: '/note/add',
     views: {
      'menuContent': {
        templateUrl: 'angular/note/note.add.view.html',
         controller: 'addNoteController'
       }
    }

 })
  .state('app.settings', {
    url: '/settings',
    views: {
      'menuContent': {
        templateUrl: 'angular/settings/settings.view.html',
        controller: 'settingsController'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/auth');
})
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})


app.controller('authController', function($scope, $state, $cordovaOauth){
	var Dropbox = require('dropbox');
	var Promise = require('bluebird');
	var utils = require('../angular/utilities/encrypt.utility.js');
	var dropboxUtils = require('../angular/utilities/dropbox.utility.js');
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
					var encryptedMasterObj = window.localStorage.getItem('masterObj');
					console.log(encryptedMasterObj);
	        $scope.error = null;
					var masterCorrect = utils.validate(master)
					masterCorrect ? accessGranted(encryptedMasterObj, master) : accessDenied();
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
	}

	function getDropboxData(){
		return dropboxUtils.getDropboxFilePath()
		.then(function(matches){
			if(matches){
				dropboxPathForCrypto = matches.metadata.path_display // eslint-disable-line
				window.localStorage.setItem('dropboxPath', dropboxPathForCrypto)// eslint-disable-line
				return dropboxUtils.getDataObjectFromDropbox(dropboxPathForCrypto, '/data.txt')// eslint-disable-line
			} else{
				cantFindCryptoPass()
			}
		})
		.then(function(dataObj){
			window.localStorage.setItem('masterObj', dataObj)
			return dropboxUtils.getDataObjectFromDropbox(dropboxPathForCrypto, '/secret2.txt'); // eslint-disable-line
		})
	}

	function noDropboxError(){
		$scope.error = "Please link your Dropbox Account To Use The Mobile App";
		$scope.dropboxAuthButton = true;
		$scope.displayPasswordField = false;
		$scope.$evalAsync()
	}
	function accessGranted(encryptedMasterObject, masterPass){
		$scope.loading = false;
		$scope.$evalAsync();
		globalMasterPass = masterPass; // eslint-disable-line
		masterObj = JSON.parse(utils.decrypt(encryptedMasterObject, masterPass));// eslint-disable-line
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

// var Promise = require('bluebird');
// var fs = Promise.promisifyAll(require('fs'));

// app.controller('firstLoginController', function($scope, $state, $rootScope){
//     var dropboxUtilities = require('../../utilities/dropbox/dropbox.utilities.js')
//      var utils = require('../../utilities/encrypt.file.js');
//      var utilities = require('../../utilities/encrypt.utility.js');
//      var validate = utils.validate;
//      var decryptFile = utils.decryptFile;
//        var encryptFile = utils.encryptFile;
//        var encrypt = utilities.encrypt;
//        var decryptData = utilities.decrypt;
//        var getDataEncrypted = utils.getDataEncrypted
//        var createRandom = require('../../utilities/password-utilities/pass.gen').createRandom
//        var generateSecret = utils.generateSecret;
//   $scope.master = null;

//   $scope.setPassword = function (master){
//     if ($scope.master === $scope.master2 && $scope.master2 === $scope.master3) {
//       utils.generateSecret(master);
//       utils.encryptFile({login: [], creditCard: [], identity: [], note: [] }, master);
//       settings.set('user', true).then(() => {
//         masterPass = master;
//         masterObj = {login: [], creditCard: [], identity: [], note: [] };
//         $rootScope.validated = true;
//         $rootScope.$evalAsync()
//         $state.go('home')
//       })
//     } else {
//       alert ("Your Passwords Do Not Match!");
//     }
//   }

//   $scope.username;

//   username().then(username => {
//     $scope.username = username;
//     $scope.$evalAsync()
//   })

//   $scope.dropboxImport = function () {

//     dialog.showMessageBox({type: 'info', buttons: ['Cancel', 'OK' ], message: "Please select the CryptoPass folder in your Dropbox"}, function (result) {
//         if (result) {
//           let dropboxPath = dialog.showOpenDialog({title: 'Please select your Dropbox folder', properties: ['openDirectory']})

//           confirmDropboxPath(dropboxPath[0])
//             .then(function (resultArr) {
//               if (resultArr.length === 2) {
//                 readAndWriteRecovery(dropboxPath[0], resultArr)
//                 .then(() => $state.go('auth'));
//               }
//               else alert("We can't find CryptoPass in the selected folder. Please try again.")
//             })
//         }
//     })
//   }

//   function confirmDropboxPath (path) {
//     return fs.readdirAsync(path)
//       .then(function (result) {
//         return result.filter(function (filename) {
//           if (filename === 'data.txt' || filename === 'secret2.txt') return filename;
//           });
//       })
//   }

//   function readAndWriteRecovery (path, arr) {

//     return fs.readFileAsync(path + '/' + arr[0])
//       .then(filedata => fs.writeFileAsync(__dirname + "/utilities/" + arr[0], filedata))
//       .then(() => fs.readFileAsync(path+'/'+arr[1]))
//       .then(filedata => fs.writeFileAsync(__dirname+'/utilities/'+arr[1], filedata));
//   }

// });

app.controller('creditCardController', function($scope){
  $scope.accounts = masterObj.creditCard;
})

app.controller('creditCardSingleController', function($scope, $stateParams){
  console.log($stateParams);
  $scope.account = $stateParams.accountData;
})


app.controller('addcreditCardController', function($scope, $state, $stateParams, $rootScope){
	   // var dropboxUtilities = require('../../utilities/dropbox/dropbox.utilities.js')
	   var utils = require('../../utilities/encrypt.file.js');
	   var utilities = require('../../utilities/encrypt.utility.js');
	   var validate = utils.validate;
	   var decryptFile = utils.decryptFile;
       var encryptFile = utils.encryptFile;
       var encrypt = utilities.encrypt;
       var decryptData = utilities.decrypt;
       var getDataEncrypted = utils.getDataEncrypted
       var createRandom = require('../../utilities/password-utilities/pass.gen').createRandom
       var generateSecret = utils.generateSecret;

  $scope.creditCard = {
    name: null,
    cardNumber: null,
    ccv: null,
    expiration: null,
    firstName: null,
    lastName: null,
    type: null,
  }

  $scope.createCard = function() {
    var newId = masterObj.creditCard.length ? masterObj.creditCard[masterObj.creditCard.length - 1].id + 1 : 1;
    $scope.creditCard.id = newId
    if ($scope.creditCard) masterObj.creditCard.push($scope.creditCard)
    var encrypted = encrypt(JSON.stringify(masterObj), masterPass)
    socket.emit('addFromElectron', { data: encrypted })
    $rootScope.$evalAsync()
    $state.go('creditCard.single', { id: newId }, { reload: true })
  }

})
app.controller('identityController', function($scope){
  $scope.accounts = masterObj.identity;
})


app.controller('identitySingleController', function($stateParams, $scope, $state){
  console.log($stateParams);
  console.log('in singleCont');
  $scope.account = $stateParams.accountData
  console.log(($state));
})

app.controller('addIdentityController', function($scope, $state, $stateParams, $rootScope) {

  $scope.identity = {
  	name: null,
  	data: null
  }

  // $scope.createId = function() {
  //   var newId = masterObj.identity.length ? masterObj.identity[masterObj.identity.length - 1].id + 1 : 1
  //   $scope.identity.id = newId
  //   if ($scope.identity) masterObj.identity.push($scope.identity)
  //   var encrypted = encrypt(JSON.stringify(masterObj), masterPass)
  //   socket.emit('addFromElectron', { data: encrypted })
  //   $rootScope.$evalAsync()
  //   $state.go('identity.single', { id: newId }, {reload: true})
  // }

})
app.controller('homeController', function($scope){
	
})
app.controller('loginController', function($scope, $state){
  $scope.accounts = masterObj.login;

})

app.controller('loginSingleController', function($stateParams, $scope, $state){
  console.log($stateParams);
  console.log('in singleCont');
  $scope.account = $stateParams.accountData
  console.log(($state));
})

 // var dropboxUtilities = require('./utilities/dropbox/dropbox.utilities.js')

app.controller('addLoginController', function($scope, $state, $stateParams, $rootScope){
	    var dropboxUtilities = require('../../utilities/dropbox/dropbox.utilities.js')
	   var utils = require('../../utilities/encrypt.file.js');
	   var utilities = require('../../utilities/encrypt.utility.js');
	   var validate = utils.validate;
	   var decryptFile = utils.decryptFile;
       var encryptFile = utils.encryptFile;
       var encrypt = utilities.encrypt;
       var decryptData = utilities.decrypt;
       var getDataEncrypted = utils.getDataEncrypted
       var createRandom = require('../../utilities/password-utilities/pass.gen').createRandom
       var generateSecret = utils.generateSecret;

		$scope.login = {
		name: null,
		username: null,
		password: null
	}
	$scope.gen = null

	$scope.generate = function (){
		$scope.gen = !$scope.gen
	}

	$scope.generatePassword = function (leng, syms, nums){
		$scope.login.password = createRandom(+leng, +syms, +nums)
	}

	$scope.createLogin = function (){
		console.log('hellooooooooooooo',$scope.login.password)
		var newId = masterObj.login.length ? masterObj.login[masterObj.login.length - 1].id + 1 : 1;
		$scope.login.id = newId
		masterObj.login.push($scope.login)
		var encrypted = encrypt(JSON.stringify(masterObj), masterPass)
		socket.emit('addFromElectron', {data: encrypted})
		$rootScope.$evalAsync()
		$state.go('app.loginSingle', {id: newId}, {reload: true})
	}

})
app.controller('noteController', function($scope){
  $scope.accounts = masterObj.note;
})

app.controller('noteSingleController', function($stateParams, $scope, $state){
  console.log($stateParams);
  console.log('in singleCont');
  $scope.account = $stateParams.accountData
  console.log(($state));
 })
  


app.controller('addNoteController', function($scope, $state, $stateParams, $rootScope) {
  var utils = require('../../utilities/encrypt.file.js');
	   var utilities = require('../../utilities/encrypt.utility.js');
	   // var validate = utils.validate;
	   // var decryptFile = utils.decryptFile;
    //    var encryptFile = utils.encryptFile;
    //    var encrypt = utilities.encrypt;
    //    var decryptData = utilities.decrypt;
    //    var getDataEncrypted = utils.getDataEncrypted
       var createRandom = require('../../utilities/password-utilities/pass.gen').createRandom
       // var generateSecret = utils.generateSecret;
   $scope.note = {
  	name: null,
  	data: null
  }

  $scope.createNote = function() {
    var newId = masterObj.note.length ? masterObj.note[masterObj.note.length - 1].id + 1 : 1;
    $scope.note.id = newId
    if ($scope.note) masterObj.note.push($scope.note)
    var encrypted = encrypt(JSON.stringify(masterObj), masterPass)
    socket.emit('addFromElectron', { data: encrypted })
    $rootScope.$evalAsync()
    $state.go('note.single', { id: newId }, {reload: true})
  }
 })
app.controller('settingsController', function($scope, $cordovaOauth, $cordovaTouchID, $timeout){
  var dropboxUtils = require('../angular/utilities/dropbox.utility.js');
  var classifiedUtils = require('../angular/utilities/classified/hashingBackup.js');
  var touchIdBackup = window.localStorage.getItem('touchIdBackup');
  touchIdBackup ? $scope.touchIdBackup = true : $scope.touchIdBackup = false;
  $scope.$on('$ionicView.enter', function() {
    console.log(device.platform);
  });

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
        if(device.platform.toLowerCase() === 'android'){
          androidTouchId()
        }
        else if(device.platform.toLowerCase() === 'ios')
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

  function androidTouchId(){
    console.log('hello');
  }

  function iOSTouchId(){
    $cordovaTouchID.checkSupport().then(function() {
      $cordovaTouchID.authenticate("text").then(function() {
        window.localStorage.setItem('touchIdBackup', 'true');
        $scope.touchIdBackup = true;
        console.log('about to get to utils');
        classifiedUtils.backupHash()
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


  function cantFindCryptoPass(){
    $scope.error = "We can't find your CryptoPass folder.  Please make sure it's in your Dropbox Account"
  }
})

var Dropbox = require('dropbox');
var dbx = new Dropbox({ clientId: 'pg8nt8sn9h5yidb' });
module.exports = {
  getAndSetAccessToken: function(){
    var token = window.localStorage.getItem('dropboxAuth');
    dbx.setAccessToken(token)
  },
  getDropboxFilePath: function(){
    this.getAndSetAccessToken()
    console.log('in here');
    return dbx.filesSearch({path: '/Apps', query: 'CryptoPass'})
    .then(function(res){
      console.log('matches', res.matches);
      return res.matches[0];
    })
    .catch(function(err){console.log('w have an error', err)})
  },
  getDataObjectFromDropbox: function(cryptoPath, file){
    this.getAndSetAccessToken()
    console.log('in get data obj');
    return new Promise(function(resolve, reject){
      dbx.filesGetTemporaryLink({path: cryptoPath + file})
      .then(function(linkObj){
        console.log(linkObj, 'linkObj');
        var xhr = new XMLHttpRequest();
        xhr.open("GET", linkObj.link, true);
        xhr.onreadystatechange = function(e) {
          if (xhr.readyState === 4){
            console.log(xhr.responseText);
            resolve(xhr.responseText.replace(/"/g, ''))
          }else{
            console.log(xhr);
          }
        }
        xhr.send(null)
      })
      .catch(function(err){reject(err)})
    })
  },

}

app.factory('DropboxSync', function(){
  var dropboxUtils = require('../angular/utilities/dropbox.utility.js')
  var utils = require('../angular/utilities/encrypt.utility.js')
  return {
    sync: function(){
      var dropboxPathForCrypto;

      return dropboxUtils.getDropboxFilePath()
        .then(function(matches){
          if(matches){
            dropboxPathForCrypto = matches.metadata.path_display
            window.localStorage.setItem('dropboxPath', dropboxPathForCrypto)
            return dropboxUtils.getDataObjectFromDropbox(dropboxPathForCrypto, '/data.txt')
          } else{
            throw new Error('Can\'t find Dropbox Path :(')
          }
        })
        .then(function(dataObj){
          console.log('in last then');
          window.localStorage.setItem('masterObjEncrypted', dataObj)
          var encryptedMasterObj = window.localStorage.getItem('masterObjEncrypted')
          console.log('globalmaster', globalMasterPass);
          masterObj = JSON.parse(utils.decrypt(encryptedMasterObj, globalMasterPass));
          console.dir(masterObj);
          // return dropboxUtils.getDataObjectFromDropbox(dropboxPathForCrypto, '/secret2.txt')
        })
    }
  }
})

var crypto = require('crypto-js');

//changed from aes192 to aes256

module.exports = {
	encrypt: function (data, password){
		var cipher = crypto.AES.encrypt(data, password);
		return cipher.toString()
	},
	decrypt: function (enData, password){
		var bytes = crypto.AES.decrypt(enData.toString(), password);
		var plaintext = bytes.toString(crypto.enc.Utf8);
		return plaintext
	},
	validate: function (masterPw) {
		var secret = 'HelloIAmDogIDoge?'
		var enSecret = window.localStorage.getItem('secret2');
	  try {
			//adds new line randomly? have to trim()
	    var check = this.decrypt(enSecret, masterPw).trim();
	  } catch (error) {
	    return false;
	  }
	  return check === secret;
	}
}

module.exports = {
  uuid: function(){
    return device.uuid
  },
  serial: function(){
    return device.serial
  },
  backupHash: function(){
    console.log(this.uuid);
    console.log(this.serial);
  }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImF1dGhlbnRpY2F0ZS9hdXRoLmNvbnRyb2xsZXIuanMiLCJhdXRoZW50aWNhdGUvZmlyc3Rsb2dpbi5jb250cm9sbGVyLmpzIiwiY3JlZGl0Q2FyZC9jcmVkaXRDYXJkLmNvbnRyb2xsZXIuanMiLCJpZGVudGl0eS9pZGVudGl0eS5jb250cm9sbGVyLmpzIiwiaG9tZS9ob21lLmNvbnRyb2xsZXIuanMiLCJsb2dpbi9sb2dpbi5jb250cm9sbGVyLmpzIiwibm90ZS9ub3RlLmNvbnRyb2xsZXIuanMiLCJzZXR0aW5ncy9zZXR0aW5ncy5jb250cm9sbGVyLmpzIiwidXRpbGl0aWVzL2Ryb3Bib3gudXRpbGl0eS5qcyIsInV0aWxpdGllcy9kcm9wYm94U3luYy5mYWN0b3J5LmpzIiwidXRpbGl0aWVzL2VuY3J5cHQudXRpbGl0eS5qcyIsInV0aWxpdGllcy9jbGFzc2lmaWVkL2hhc2hpbmdCYWNrdXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1aWx0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW9uaWMgU3RhcnRlciBBcHBcblxuLy8gYW5ndWxhci5tb2R1bGUgaXMgYSBnbG9iYWwgcGxhY2UgZm9yIGNyZWF0aW5nLCByZWdpc3RlcmluZyBhbmQgcmV0cmlldmluZyBBbmd1bGFyIG1vZHVsZXNcbi8vICdzdGFydGVyJyBpcyB0aGUgbmFtZSBvZiB0aGlzIGFuZ3VsYXIgbW9kdWxlIGV4YW1wbGUgKGFsc28gc2V0IGluIGEgPGJvZHk+IGF0dHJpYnV0ZSBpbiBpbmRleC5odG1sKVxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xuLy8gJ3N0YXJ0ZXIuY29udHJvbGxlcnMnIGlzIGZvdW5kIGluIGNvbnRyb2xsZXJzLmpzXG5cbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnY3J5cHRvUGFzcycsIFsnaW9uaWMnLCAnbmdDb3Jkb3ZhJywgJ25nQ29yZG92YU9hdXRoJywgJ25nU3RvcmFnZScsICd1aS5zbGlkZXInXSlcblxuXG4ucnVuKGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtKSB7XG4gICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIC8vIEhpZGUgdGhlIGFjY2Vzc29yeSBiYXIgYnkgZGVmYXVsdCAocmVtb3ZlIHRoaXMgdG8gc2hvdyB0aGUgYWNjZXNzb3J5IGJhciBhYm92ZSB0aGUga2V5Ym9hcmRcbiAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgaWYgKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcbiAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XG4gICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuZGlzYWJsZVNjcm9sbCh0cnVlKTtcblxuICAgIH1cbiAgICBpZiAod2luZG93LlN0YXR1c0Jhcikge1xuICAgICAgLy8gb3JnLmFwYWNoZS5jb3Jkb3ZhLnN0YXR1c2JhciByZXF1aXJlZFxuICAgICAgU3RhdHVzQmFyLnN0eWxlRGVmYXVsdCgpO1xuICAgIH1cbiAgfSk7XG59KVxuXG4uY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XG4gICRzdGF0ZVByb3ZpZGVyXG5cbiAgICAuc3RhdGUoJ2FwcCcsIHtcbiAgICB1cmw6ICcvYXBwJyxcbiAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9tZW51Lmh0bWwnLFxuICAgIGNvbnRyb2xsZXI6ICdBcHBDdHJsJ1xuICB9KVxuXG5cbiAgLnN0YXRlKCdhdXRoJywge1xuICAgICAgdXJsOiAnL2F1dGgnLFxuICAgICAgdmlld3M6IHtcbiAgICAgICAgJ2F1dGgnOiB7XG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdhbmd1bGFyL2F1dGhlbnRpY2F0ZS9hdXRoLnZpZXcuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ2F1dGhDb250cm9sbGVyJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgLy8gICAuc3RhdGUoJ2F1dGguZmlyc3RMb2dpbicsIHtcbiAgLy8gICB1cmw6ICcvYXV0aC9maXJzdGxvZ2luJyxcbiAgLy8gICB2aWV3czoge1xuICAvLyAgICAgJ2ZpcnN0bG9naW4nOiB7XG4gIC8vICAgICAgIHRlbXBsYXRlVXJsOiAnYnVpbGQvYW5ndWxhci9hdXRoZW50aWNhdGUvZmlyc3Rsb2dpbi52aWV3Lmh0bWwnLFxuICAvLyAgICAgICBjb250cm9sbGVyOiAnZmlyc3RMb2dpbkNvbnRyb2xsZXInXG4gIC8vICAgICB9XG4gIC8vICAgfVxuXG4gIC8vIH0pXG4gIC5zdGF0ZSgnYXBwLmhvbWUnLCB7XG4gICAgdXJsOiAnL2hvbWUnLFxuICAgIHZpZXdzOiB7XG4gICAgICAnbWVudUNvbnRlbnQnOiB7XG4gICAgICAgIHRlbXBsYXRlVXJsOiAnYW5ndWxhci9ob21lL2hvbWUudmlldy5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ2hvbWVDb250cm9sbGVyJ1xuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICAuc3RhdGUoJ2FwcC5sb2dpbicsIHtcbiAgICB1cmw6ICcvbG9naW4nLFxuICAgIHZpZXdzOiB7XG4gICAgICAnbWVudUNvbnRlbnQnOiB7XG4gICAgICAgIHRlbXBsYXRlVXJsOiAnYW5ndWxhci9sb2dpbi9sb2dpbi52aWV3Lmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnbG9naW5Db250cm9sbGVyJ1xuICAgICAgfVxuICAgIH1cbiAgfSlcbiAgLnN0YXRlKCdhcHAubG9naW5TaW5nbGUnLCB7XG4gICAgdXJsOiAnL2xvZ2luLzppZCcsXG4gICAgcGFyYW1zOiB7YWNjb3VudERhdGE6IG51bGx9LFxuICAgIHZpZXdzOiB7XG4gICAgICAnbWVudUNvbnRlbnQnOiB7XG4gICAgICAgIHRlbXBsYXRlVXJsOiAnYW5ndWxhci9sb2dpbi9sb2dpbi5zaW5nbGUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdsb2dpblNpbmdsZUNvbnRyb2xsZXInXG4gICAgICB9XG4gICAgfVxuICB9KVxuXG5cbiAgLnN0YXRlKCdhcHAubG9naW5BZGQnLCB7XG4gICAgdXJsOiAnL2xvZ2luL2FkZCcsXG4gICAgdmlld3M6IHtcbiAgICAgICdtZW51Q29udGVudCc6IHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdhbmd1bGFyL2xvZ2luL2xvZ2luLmFkZC52aWV3Lmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnYWRkTG9naW5Db250cm9sbGVyJ1xuICAgICAgfVxuICAgIH1cblxufSlcbiAgLnN0YXRlKCdhcHAuY3JlZGl0Q2FyZCcsIHtcbiAgICB1cmw6ICcvY3JlZGl0Q2FyZCcsXG4gICAgdmlld3M6IHtcbiAgICAgICdtZW51Q29udGVudCc6IHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdhbmd1bGFyL2NyZWRpdENhcmQvY3JlZGl0Q2FyZHMuYWxsLnZpZXcuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdjcmVkaXRDYXJkQ29udHJvbGxlcidcbiAgICAgIH1cbiAgICB9XG4gIH0pXG4gIC5zdGF0ZSgnYXBwLmNyZWRpdENhcmRTaW5nbGUnLCB7XG4gICAgdXJsOiAnL2NyZWRpdENhcmQvOmlkJyxcbiAgICBwYXJhbXM6IHthY2NvdW50RGF0YTogbnVsbH0sXG4gICAgdmlld3M6IHtcbiAgICAgICdtZW51Q29udGVudCc6IHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdhbmd1bGFyL2NyZWRpdENhcmQvY3JlZGl0Q2FyZC5zaW5nbGUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdjcmVkaXRDYXJkU2luZ2xlQ29udHJvbGxlcidcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgLnN0YXRlKCdhcHAuY3JlZGl0Q2FyZEFkZCcsIHtcbiAgICB1cmw6ICcvY3JlZGl0Q2FyZC9hZGQnLFxuICAgIHZpZXdzOiB7XG4gICAgICAnbWVudUNvbnRlbnQnOiB7XG4gICAgICAgIHRlbXBsYXRlVXJsOiAnYW5ndWxhci9jcmVkaXRDYXJkL2NyZWRpdENhcmQuYWRkLnZpZXcuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdhZGRjcmVkaXRDYXJkQ29udHJvbGxlcidcbiAgICAgIH1cbiAgICB9XG5cbn0pXG4gIC5zdGF0ZSgnYXBwLmlkZW50aXR5Jywge1xuICAgICAgdXJsOiAnL2lkZW50aXR5JyxcbiAgICAgIHZpZXdzOiB7XG4gICAgICAgICdtZW51Q29udGVudCc6IHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FuZ3VsYXIvaWRlbnRpdHkvaWRlbnRpdHkuYWxsLnZpZXcuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ2lkZW50aXR5Q29udHJvbGxlcidcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgICAuc3RhdGUoJ2FwcC5pZGVudGl0eVNpbmdsZScsIHtcbiAgICB1cmw6ICcvaWRlbnRpdHkvOmlkJyxcbiAgICBwYXJhbXM6IHthY2NvdW50RGF0YTogbnVsbH0sXG4gICAgdmlld3M6IHtcbiAgICAgICdtZW51Q29udGVudCc6IHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdhbmd1bGFyL2lkZW50aXR5L2lkZW50aXR5LnNpbmdsZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ2lkZW50aXR5U2luZ2xlQ29udHJvbGxlcidcbiAgICAgIH1cbiAgICB9XG4gIH0pXG4gICAgICAuc3RhdGUoJ2FwcC5pZGVudGl0eUFkZCcsIHtcbiAgICB1cmw6ICcvaWRlbnRpdHkvYWRkJyxcbiAgICB2aWV3czoge1xuICAgICAgJ21lbnVDb250ZW50Jzoge1xuICAgICAgICB0ZW1wbGF0ZVVybDogJ2FuZ3VsYXIvaWRlbnRpdHkvaWRlbnRpdHkuYWRkLnZpZXcuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdhZGRJZGVudGl0eUNvbnRyb2xsZXInXG4gICAgICB9XG4gICAgfVxuXG59KVxuICAgIC5zdGF0ZSgnYXBwLm5vdGUnLCB7XG4gICAgICB1cmw6ICcvbm90ZScsXG4gICAgICB2aWV3czoge1xuICAgICAgICAnbWVudUNvbnRlbnQnOiB7XG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdhbmd1bGFyL25vdGUvbm90ZS52aWV3Lmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdub3RlQ29udHJvbGxlcidcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgLnN0YXRlKCdhcHAubm90ZVNpbmdsZScsIHtcbiAgICAgIHVybDogJy9ub3RlLzppZCcsXG4gICAgICAgcGFyYW1zOiB7YWNjb3VudERhdGE6IG51bGx9LFxuICAgICAgdmlld3M6IHtcbiAgICAgICAgJ21lbnVDb250ZW50Jzoge1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYW5ndWxhci9ub3RlL25vdGUuc2luZ2xlLmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdub3RlU2luZ2xlQ29udHJvbGxlcidcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgIC5zdGF0ZSgnYXBwLm5vdGVBZGQnLCB7XG4gICAgdXJsOiAnL25vdGUvYWRkJyxcbiAgICAgdmlld3M6IHtcbiAgICAgICdtZW51Q29udGVudCc6IHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdhbmd1bGFyL25vdGUvbm90ZS5hZGQudmlldy5odG1sJyxcbiAgICAgICAgIGNvbnRyb2xsZXI6ICdhZGROb3RlQ29udHJvbGxlcidcbiAgICAgICB9XG4gICAgfVxuXG4gfSlcbiAgLnN0YXRlKCdhcHAuc2V0dGluZ3MnLCB7XG4gICAgdXJsOiAnL3NldHRpbmdzJyxcbiAgICB2aWV3czoge1xuICAgICAgJ21lbnVDb250ZW50Jzoge1xuICAgICAgICB0ZW1wbGF0ZVVybDogJ2FuZ3VsYXIvc2V0dGluZ3Mvc2V0dGluZ3Mudmlldy5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ3NldHRpbmdzQ29udHJvbGxlcidcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICAvLyBpZiBub25lIG9mIHRoZSBhYm92ZSBzdGF0ZXMgYXJlIG1hdGNoZWQsIHVzZSB0aGlzIGFzIHRoZSBmYWxsYmFja1xuICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvYXV0aCcpO1xufSlcbi5jb250cm9sbGVyKCdBcHBDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCwgJHRpbWVvdXQpIHtcblxuICAvLyBXaXRoIHRoZSBuZXcgdmlldyBjYWNoaW5nIGluIElvbmljLCBDb250cm9sbGVycyBhcmUgb25seSBjYWxsZWRcbiAgLy8gd2hlbiB0aGV5IGFyZSByZWNyZWF0ZWQgb3Igb24gYXBwIHN0YXJ0LCBpbnN0ZWFkIG9mIGV2ZXJ5IHBhZ2UgY2hhbmdlLlxuICAvLyBUbyBsaXN0ZW4gZm9yIHdoZW4gdGhpcyBwYWdlIGlzIGFjdGl2ZSAoZm9yIGV4YW1wbGUsIHRvIHJlZnJlc2ggZGF0YSksXG4gIC8vIGxpc3RlbiBmb3IgdGhlICRpb25pY1ZpZXcuZW50ZXIgZXZlbnQ6XG4gIC8vJHNjb3BlLiRvbignJGlvbmljVmlldy5lbnRlcicsIGZ1bmN0aW9uKGUpIHtcbiAgLy99KTtcblxuICAvLyBGb3JtIGRhdGEgZm9yIHRoZSBsb2dpbiBtb2RhbFxuICAkc2NvcGUubG9naW5EYXRhID0ge307XG5cbiAgLy8gQ3JlYXRlIHRoZSBsb2dpbiBtb2RhbCB0aGF0IHdlIHdpbGwgdXNlIGxhdGVyXG4gICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCgndGVtcGxhdGVzL2xvZ2luLmh0bWwnLCB7XG4gICAgc2NvcGU6ICRzY29wZVxuICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgJHNjb3BlLm1vZGFsID0gbW9kYWw7XG4gIH0pO1xuXG4gIC8vIFRyaWdnZXJlZCBpbiB0aGUgbG9naW4gbW9kYWwgdG8gY2xvc2UgaXRcbiAgJHNjb3BlLmNsb3NlTG9naW4gPSBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwuaGlkZSgpO1xuICB9O1xuXG4gIC8vIE9wZW4gdGhlIGxvZ2luIG1vZGFsXG4gICRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5zaG93KCk7XG4gIH07XG5cbiAgLy8gUGVyZm9ybSB0aGUgbG9naW4gYWN0aW9uIHdoZW4gdGhlIHVzZXIgc3VibWl0cyB0aGUgbG9naW4gZm9ybVxuICAkc2NvcGUuZG9Mb2dpbiA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKCdEb2luZyBsb2dpbicsICRzY29wZS5sb2dpbkRhdGEpO1xuXG4gICAgLy8gU2ltdWxhdGUgYSBsb2dpbiBkZWxheS4gUmVtb3ZlIHRoaXMgYW5kIHJlcGxhY2Ugd2l0aCB5b3VyIGxvZ2luXG4gICAgLy8gY29kZSBpZiB1c2luZyBhIGxvZ2luIHN5c3RlbVxuICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgJHNjb3BlLmNsb3NlTG9naW4oKTtcbiAgICB9LCAxMDAwKTtcbiAgfTtcbn0pXG4iLCJcbmFwcC5jb250cm9sbGVyKCdhdXRoQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCAkY29yZG92YU9hdXRoKXtcblx0dmFyIERyb3Bib3ggPSByZXF1aXJlKCdkcm9wYm94Jyk7XG5cdHZhciBQcm9taXNlID0gcmVxdWlyZSgnYmx1ZWJpcmQnKTtcblx0dmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vYW5ndWxhci91dGlsaXRpZXMvZW5jcnlwdC51dGlsaXR5LmpzJyk7XG5cdHZhciBkcm9wYm94VXRpbHMgPSByZXF1aXJlKCcuLi9hbmd1bGFyL3V0aWxpdGllcy9kcm9wYm94LnV0aWxpdHkuanMnKTtcblx0dmFyIHRva2VuID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkcm9wYm94QXV0aCcpO1xuXG5cdCRzY29wZS5kaXNwbGF5UGFzc3dvcmRGaWVsZCA9IHRydWU7XG5cdCRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG5cdCRzY29wZS5kcm9wYm94QXV0aEJ1dHRvbiA9IGZhbHNlO1xuXHQkc2NvcGUuanVzdExpbmtlZCA9IGZhbHNlO1xuICB0b2tlbiA/IG51bGwgOiBub0Ryb3Bib3hFcnJvcigpO1xuXG5cblxuXHQkc2NvcGUuY2hlY2tNYXN0ZXIgPSBmdW5jdGlvbihtYXN0ZXIpe1xuXHRcdCRzY29wZS5sb2FkaW5nID0gdHJ1ZTtcblx0XHRpZigkc2NvcGUuanVzdExpbmtlZCl7XG5cdFx0XHR2YXIgZW5jcnlwdGVkTWFzdGVyT2JqID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdtYXN0ZXJPYmonKTtcblx0XHRcdGNvbnNvbGUubG9nKGVuY3J5cHRlZE1hc3Rlck9iaik7XG5cdFx0XHQkc2NvcGUuZXJyb3IgPSBudWxsO1xuXHRcdFx0dmFyIG1hc3RlckNvcnJlY3QgPSB1dGlscy52YWxpZGF0ZShtYXN0ZXIpXG5cdFx0XHRtYXN0ZXJDb3JyZWN0ID8gYWNjZXNzR3JhbnRlZChlbmNyeXB0ZWRNYXN0ZXJPYmosIG1hc3RlcikgOiBhY2Nlc3NEZW5pZWQoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYodG9rZW4pe1xuXHRcdFx0XHR2YXIgZHJvcGJveFBhdGhGb3JDcnlwdG87XG5cdFx0XHRcdGdldERyb3Bib3hEYXRhKClcblx0ICAgICAgLnRoZW4oZnVuY3Rpb24oc2VjcmV0Mil7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coc2VjcmV0Mik7XG5cdCAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzZWNyZXQyJywgc2VjcmV0Mik7XG5cdFx0XHRcdFx0dmFyIGVuY3J5cHRlZE1hc3Rlck9iaiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbWFzdGVyT2JqJyk7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coZW5jcnlwdGVkTWFzdGVyT2JqKTtcblx0ICAgICAgICAkc2NvcGUuZXJyb3IgPSBudWxsO1xuXHRcdFx0XHRcdHZhciBtYXN0ZXJDb3JyZWN0ID0gdXRpbHMudmFsaWRhdGUobWFzdGVyKVxuXHRcdFx0XHRcdG1hc3RlckNvcnJlY3QgPyBhY2Nlc3NHcmFudGVkKGVuY3J5cHRlZE1hc3Rlck9iaiwgbWFzdGVyKSA6IGFjY2Vzc0RlbmllZCgpO1xuXHQgICAgICB9KVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bm9Ecm9wYm94RXJyb3IoKVxuXHRcdFx0fVxuXHRcdH1cblxuXHR9O1xuXG5cdCRzY29wZS5saW5rRHJvcGJveCA9IGZ1bmN0aW9uKCl7XG5cdFx0dmFyIGRyb3Bib3hQYXRoRm9yQ3J5cHRvO1xuXHRcdCRzY29wZS5sb2FkaW5nID0gdHJ1ZTtcblx0XHQkY29yZG92YU9hdXRoLmRyb3Bib3goJ3BnOG50OHNuOWg1eWlkYicpXG5cdFx0LnRoZW4oZnVuY3Rpb24ocmVzKXtcblx0XHRcdHJldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Ryb3Bib3hBdXRoJywgcmVzLmFjY2Vzc190b2tlbilcblx0XHR9KVxuXHRcdC50aGVuKGZ1bmN0aW9uKCl7XG5cdFx0XHRyZXR1cm4gZ2V0RHJvcGJveERhdGEoKVxuXHRcdH0pXG5cdFx0LnRoZW4oZnVuY3Rpb24oc2VjcmV0Mil7XG5cdFx0XHR3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3NlY3JldDInLCBzZWNyZXQyKTtcblx0XHRcdCRzY29wZS5lcnJvciA9IG51bGw7XG5cdFx0XHQkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuXHRcdFx0JHNjb3BlLmp1c3RMaW5rZWQgPSB0cnVlO1xuXHRcdFx0JHNjb3BlLmRyb3Bib3hBdXRoQnV0dG9uID0gZmFsc2U7XG5cdFx0XHQkc2NvcGUuZGlzcGxheVBhc3N3b3JkRmllbGQgPSB0cnVlO1xuXHRcdFx0JHNjb3BlLiRldmFsQXN5bmMoKVxuXHRcdH0pXG5cdH1cblxuXHRmdW5jdGlvbiBnZXREcm9wYm94RGF0YSgpe1xuXHRcdHJldHVybiBkcm9wYm94VXRpbHMuZ2V0RHJvcGJveEZpbGVQYXRoKClcblx0XHQudGhlbihmdW5jdGlvbihtYXRjaGVzKXtcblx0XHRcdGlmKG1hdGNoZXMpe1xuXHRcdFx0XHRkcm9wYm94UGF0aEZvckNyeXB0byA9IG1hdGNoZXMubWV0YWRhdGEucGF0aF9kaXNwbGF5IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblx0XHRcdFx0d2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkcm9wYm94UGF0aCcsIGRyb3Bib3hQYXRoRm9yQ3J5cHRvKS8vIGVzbGludC1kaXNhYmxlLWxpbmVcblx0XHRcdFx0cmV0dXJuIGRyb3Bib3hVdGlscy5nZXREYXRhT2JqZWN0RnJvbURyb3Bib3goZHJvcGJveFBhdGhGb3JDcnlwdG8sICcvZGF0YS50eHQnKS8vIGVzbGludC1kaXNhYmxlLWxpbmVcblx0XHRcdH0gZWxzZXtcblx0XHRcdFx0Y2FudEZpbmRDcnlwdG9QYXNzKClcblx0XHRcdH1cblx0XHR9KVxuXHRcdC50aGVuKGZ1bmN0aW9uKGRhdGFPYmope1xuXHRcdFx0d2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdtYXN0ZXJPYmonLCBkYXRhT2JqKVxuXHRcdFx0cmV0dXJuIGRyb3Bib3hVdGlscy5nZXREYXRhT2JqZWN0RnJvbURyb3Bib3goZHJvcGJveFBhdGhGb3JDcnlwdG8sICcvc2VjcmV0Mi50eHQnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXHRcdH0pXG5cdH1cblxuXHRmdW5jdGlvbiBub0Ryb3Bib3hFcnJvcigpe1xuXHRcdCRzY29wZS5lcnJvciA9IFwiUGxlYXNlIGxpbmsgeW91ciBEcm9wYm94IEFjY291bnQgVG8gVXNlIFRoZSBNb2JpbGUgQXBwXCI7XG5cdFx0JHNjb3BlLmRyb3Bib3hBdXRoQnV0dG9uID0gdHJ1ZTtcblx0XHQkc2NvcGUuZGlzcGxheVBhc3N3b3JkRmllbGQgPSBmYWxzZTtcblx0XHQkc2NvcGUuJGV2YWxBc3luYygpXG5cdH1cblx0ZnVuY3Rpb24gYWNjZXNzR3JhbnRlZChlbmNyeXB0ZWRNYXN0ZXJPYmplY3QsIG1hc3RlclBhc3Mpe1xuXHRcdCRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG5cdFx0JHNjb3BlLiRldmFsQXN5bmMoKTtcblx0XHRnbG9iYWxNYXN0ZXJQYXNzID0gbWFzdGVyUGFzczsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXHRcdG1hc3Rlck9iaiA9IEpTT04ucGFyc2UodXRpbHMuZGVjcnlwdChlbmNyeXB0ZWRNYXN0ZXJPYmplY3QsIG1hc3RlclBhc3MpKTsvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cdFx0Y29uc29sZS5sb2cobWFzdGVyT2JqKTsvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cdFx0Y29uc29sZS5sb2coJ2FjY2VzcyBncmFudGVkJyk7XG5cdFx0JHN0YXRlLmdvKCdhcHAuaG9tZScpXG5cdH1cblxuXHRmdW5jdGlvbiBhY2Nlc3NEZW5pZWQoKXtcblx0XHQkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuXHRcdCRzY29wZS4kZXZhbEFzeW5jKClcblx0XHQkc2NvcGUuZXJyb3IgPSAnSW5jb3JyZWN0IFBhc3N3b3JkJ1xuXHR9XG5cblx0ZnVuY3Rpb24gY2FudEZpbmRDcnlwdG9QYXNzKCl7XG4gICAgJHNjb3BlLmVycm9yID0gXCJXZSBjYW4ndCBmaW5kIHlvdXIgQ3J5cHRvUGFzcyBmb2xkZXIuICBQbGVhc2UgbWFrZSBzdXJlIGl0J3MgaW4geW91ciBEcm9wYm94IEFjY291bnRcIlxuICB9XG59KVxuIiwiLy8gdmFyIFByb21pc2UgPSByZXF1aXJlKCdibHVlYmlyZCcpO1xuLy8gdmFyIGZzID0gUHJvbWlzZS5wcm9taXNpZnlBbGwocmVxdWlyZSgnZnMnKSk7XG5cbi8vIGFwcC5jb250cm9sbGVyKCdmaXJzdExvZ2luQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCAkcm9vdFNjb3BlKXtcbi8vICAgICB2YXIgZHJvcGJveFV0aWxpdGllcyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxpdGllcy9kcm9wYm94L2Ryb3Bib3gudXRpbGl0aWVzLmpzJylcbi8vICAgICAgdmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vLi4vdXRpbGl0aWVzL2VuY3J5cHQuZmlsZS5qcycpO1xuLy8gICAgICB2YXIgdXRpbGl0aWVzID0gcmVxdWlyZSgnLi4vLi4vdXRpbGl0aWVzL2VuY3J5cHQudXRpbGl0eS5qcycpO1xuLy8gICAgICB2YXIgdmFsaWRhdGUgPSB1dGlscy52YWxpZGF0ZTtcbi8vICAgICAgdmFyIGRlY3J5cHRGaWxlID0gdXRpbHMuZGVjcnlwdEZpbGU7XG4vLyAgICAgICAgdmFyIGVuY3J5cHRGaWxlID0gdXRpbHMuZW5jcnlwdEZpbGU7XG4vLyAgICAgICAgdmFyIGVuY3J5cHQgPSB1dGlsaXRpZXMuZW5jcnlwdDtcbi8vICAgICAgICB2YXIgZGVjcnlwdERhdGEgPSB1dGlsaXRpZXMuZGVjcnlwdDtcbi8vICAgICAgICB2YXIgZ2V0RGF0YUVuY3J5cHRlZCA9IHV0aWxzLmdldERhdGFFbmNyeXB0ZWRcbi8vICAgICAgICB2YXIgY3JlYXRlUmFuZG9tID0gcmVxdWlyZSgnLi4vLi4vdXRpbGl0aWVzL3Bhc3N3b3JkLXV0aWxpdGllcy9wYXNzLmdlbicpLmNyZWF0ZVJhbmRvbVxuLy8gICAgICAgIHZhciBnZW5lcmF0ZVNlY3JldCA9IHV0aWxzLmdlbmVyYXRlU2VjcmV0O1xuLy8gICAkc2NvcGUubWFzdGVyID0gbnVsbDtcblxuLy8gICAkc2NvcGUuc2V0UGFzc3dvcmQgPSBmdW5jdGlvbiAobWFzdGVyKXtcbi8vICAgICBpZiAoJHNjb3BlLm1hc3RlciA9PT0gJHNjb3BlLm1hc3RlcjIgJiYgJHNjb3BlLm1hc3RlcjIgPT09ICRzY29wZS5tYXN0ZXIzKSB7XG4vLyAgICAgICB1dGlscy5nZW5lcmF0ZVNlY3JldChtYXN0ZXIpO1xuLy8gICAgICAgdXRpbHMuZW5jcnlwdEZpbGUoe2xvZ2luOiBbXSwgY3JlZGl0Q2FyZDogW10sIGlkZW50aXR5OiBbXSwgbm90ZTogW10gfSwgbWFzdGVyKTtcbi8vICAgICAgIHNldHRpbmdzLnNldCgndXNlcicsIHRydWUpLnRoZW4oKCkgPT4ge1xuLy8gICAgICAgICBtYXN0ZXJQYXNzID0gbWFzdGVyO1xuLy8gICAgICAgICBtYXN0ZXJPYmogPSB7bG9naW46IFtdLCBjcmVkaXRDYXJkOiBbXSwgaWRlbnRpdHk6IFtdLCBub3RlOiBbXSB9O1xuLy8gICAgICAgICAkcm9vdFNjb3BlLnZhbGlkYXRlZCA9IHRydWU7XG4vLyAgICAgICAgICRyb290U2NvcGUuJGV2YWxBc3luYygpXG4vLyAgICAgICAgICRzdGF0ZS5nbygnaG9tZScpXG4vLyAgICAgICB9KVxuLy8gICAgIH0gZWxzZSB7XG4vLyAgICAgICBhbGVydCAoXCJZb3VyIFBhc3N3b3JkcyBEbyBOb3QgTWF0Y2ghXCIpO1xuLy8gICAgIH1cbi8vICAgfVxuXG4vLyAgICRzY29wZS51c2VybmFtZTtcblxuLy8gICB1c2VybmFtZSgpLnRoZW4odXNlcm5hbWUgPT4ge1xuLy8gICAgICRzY29wZS51c2VybmFtZSA9IHVzZXJuYW1lO1xuLy8gICAgICRzY29wZS4kZXZhbEFzeW5jKClcbi8vICAgfSlcblxuLy8gICAkc2NvcGUuZHJvcGJveEltcG9ydCA9IGZ1bmN0aW9uICgpIHtcblxuLy8gICAgIGRpYWxvZy5zaG93TWVzc2FnZUJveCh7dHlwZTogJ2luZm8nLCBidXR0b25zOiBbJ0NhbmNlbCcsICdPSycgXSwgbWVzc2FnZTogXCJQbGVhc2Ugc2VsZWN0IHRoZSBDcnlwdG9QYXNzIGZvbGRlciBpbiB5b3VyIERyb3Bib3hcIn0sIGZ1bmN0aW9uIChyZXN1bHQpIHtcbi8vICAgICAgICAgaWYgKHJlc3VsdCkge1xuLy8gICAgICAgICAgIGxldCBkcm9wYm94UGF0aCA9IGRpYWxvZy5zaG93T3BlbkRpYWxvZyh7dGl0bGU6ICdQbGVhc2Ugc2VsZWN0IHlvdXIgRHJvcGJveCBmb2xkZXInLCBwcm9wZXJ0aWVzOiBbJ29wZW5EaXJlY3RvcnknXX0pXG5cbi8vICAgICAgICAgICBjb25maXJtRHJvcGJveFBhdGgoZHJvcGJveFBhdGhbMF0pXG4vLyAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0QXJyKSB7XG4vLyAgICAgICAgICAgICAgIGlmIChyZXN1bHRBcnIubGVuZ3RoID09PSAyKSB7XG4vLyAgICAgICAgICAgICAgICAgcmVhZEFuZFdyaXRlUmVjb3ZlcnkoZHJvcGJveFBhdGhbMF0sIHJlc3VsdEFycilcbi8vICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiAkc3RhdGUuZ28oJ2F1dGgnKSk7XG4vLyAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgZWxzZSBhbGVydChcIldlIGNhbid0IGZpbmQgQ3J5cHRvUGFzcyBpbiB0aGUgc2VsZWN0ZWQgZm9sZGVyLiBQbGVhc2UgdHJ5IGFnYWluLlwiKVxuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgfVxuLy8gICAgIH0pXG4vLyAgIH1cblxuLy8gICBmdW5jdGlvbiBjb25maXJtRHJvcGJveFBhdGggKHBhdGgpIHtcbi8vICAgICByZXR1cm4gZnMucmVhZGRpckFzeW5jKHBhdGgpXG4vLyAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4vLyAgICAgICAgIHJldHVybiByZXN1bHQuZmlsdGVyKGZ1bmN0aW9uIChmaWxlbmFtZSkge1xuLy8gICAgICAgICAgIGlmIChmaWxlbmFtZSA9PT0gJ2RhdGEudHh0JyB8fCBmaWxlbmFtZSA9PT0gJ3NlY3JldDIudHh0JykgcmV0dXJuIGZpbGVuYW1lO1xuLy8gICAgICAgICAgIH0pO1xuLy8gICAgICAgfSlcbi8vICAgfVxuXG4vLyAgIGZ1bmN0aW9uIHJlYWRBbmRXcml0ZVJlY292ZXJ5IChwYXRoLCBhcnIpIHtcblxuLy8gICAgIHJldHVybiBmcy5yZWFkRmlsZUFzeW5jKHBhdGggKyAnLycgKyBhcnJbMF0pXG4vLyAgICAgICAudGhlbihmaWxlZGF0YSA9PiBmcy53cml0ZUZpbGVBc3luYyhfX2Rpcm5hbWUgKyBcIi91dGlsaXRpZXMvXCIgKyBhcnJbMF0sIGZpbGVkYXRhKSlcbi8vICAgICAgIC50aGVuKCgpID0+IGZzLnJlYWRGaWxlQXN5bmMocGF0aCsnLycrYXJyWzFdKSlcbi8vICAgICAgIC50aGVuKGZpbGVkYXRhID0+IGZzLndyaXRlRmlsZUFzeW5jKF9fZGlybmFtZSsnL3V0aWxpdGllcy8nK2FyclsxXSwgZmlsZWRhdGEpKTtcbi8vICAgfVxuXG4vLyB9KTtcbiIsImFwcC5jb250cm9sbGVyKCdjcmVkaXRDYXJkQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICRzY29wZS5hY2NvdW50cyA9IG1hc3Rlck9iai5jcmVkaXRDYXJkO1xufSlcblxuYXBwLmNvbnRyb2xsZXIoJ2NyZWRpdENhcmRTaW5nbGVDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGVQYXJhbXMpe1xuICBjb25zb2xlLmxvZygkc3RhdGVQYXJhbXMpO1xuICAkc2NvcGUuYWNjb3VudCA9ICRzdGF0ZVBhcmFtcy5hY2NvdW50RGF0YTtcbn0pXG5cblxuYXBwLmNvbnRyb2xsZXIoJ2FkZGNyZWRpdENhcmRDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJHJvb3RTY29wZSl7XG5cdCAgIC8vIHZhciBkcm9wYm94VXRpbGl0aWVzID0gcmVxdWlyZSgnLi4vLi4vdXRpbGl0aWVzL2Ryb3Bib3gvZHJvcGJveC51dGlsaXRpZXMuanMnKVxuXHQgICB2YXIgdXRpbHMgPSByZXF1aXJlKCcuLi8uLi91dGlsaXRpZXMvZW5jcnlwdC5maWxlLmpzJyk7XG5cdCAgIHZhciB1dGlsaXRpZXMgPSByZXF1aXJlKCcuLi8uLi91dGlsaXRpZXMvZW5jcnlwdC51dGlsaXR5LmpzJyk7XG5cdCAgIHZhciB2YWxpZGF0ZSA9IHV0aWxzLnZhbGlkYXRlO1xuXHQgICB2YXIgZGVjcnlwdEZpbGUgPSB1dGlscy5kZWNyeXB0RmlsZTtcbiAgICAgICB2YXIgZW5jcnlwdEZpbGUgPSB1dGlscy5lbmNyeXB0RmlsZTtcbiAgICAgICB2YXIgZW5jcnlwdCA9IHV0aWxpdGllcy5lbmNyeXB0O1xuICAgICAgIHZhciBkZWNyeXB0RGF0YSA9IHV0aWxpdGllcy5kZWNyeXB0O1xuICAgICAgIHZhciBnZXREYXRhRW5jcnlwdGVkID0gdXRpbHMuZ2V0RGF0YUVuY3J5cHRlZFxuICAgICAgIHZhciBjcmVhdGVSYW5kb20gPSByZXF1aXJlKCcuLi8uLi91dGlsaXRpZXMvcGFzc3dvcmQtdXRpbGl0aWVzL3Bhc3MuZ2VuJykuY3JlYXRlUmFuZG9tXG4gICAgICAgdmFyIGdlbmVyYXRlU2VjcmV0ID0gdXRpbHMuZ2VuZXJhdGVTZWNyZXQ7XG5cbiAgJHNjb3BlLmNyZWRpdENhcmQgPSB7XG4gICAgbmFtZTogbnVsbCxcbiAgICBjYXJkTnVtYmVyOiBudWxsLFxuICAgIGNjdjogbnVsbCxcbiAgICBleHBpcmF0aW9uOiBudWxsLFxuICAgIGZpcnN0TmFtZTogbnVsbCxcbiAgICBsYXN0TmFtZTogbnVsbCxcbiAgICB0eXBlOiBudWxsLFxuICB9XG5cbiAgJHNjb3BlLmNyZWF0ZUNhcmQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbmV3SWQgPSBtYXN0ZXJPYmouY3JlZGl0Q2FyZC5sZW5ndGggPyBtYXN0ZXJPYmouY3JlZGl0Q2FyZFttYXN0ZXJPYmouY3JlZGl0Q2FyZC5sZW5ndGggLSAxXS5pZCArIDEgOiAxO1xuICAgICRzY29wZS5jcmVkaXRDYXJkLmlkID0gbmV3SWRcbiAgICBpZiAoJHNjb3BlLmNyZWRpdENhcmQpIG1hc3Rlck9iai5jcmVkaXRDYXJkLnB1c2goJHNjb3BlLmNyZWRpdENhcmQpXG4gICAgdmFyIGVuY3J5cHRlZCA9IGVuY3J5cHQoSlNPTi5zdHJpbmdpZnkobWFzdGVyT2JqKSwgbWFzdGVyUGFzcylcbiAgICBzb2NrZXQuZW1pdCgnYWRkRnJvbUVsZWN0cm9uJywgeyBkYXRhOiBlbmNyeXB0ZWQgfSlcbiAgICAkcm9vdFNjb3BlLiRldmFsQXN5bmMoKVxuICAgICRzdGF0ZS5nbygnY3JlZGl0Q2FyZC5zaW5nbGUnLCB7IGlkOiBuZXdJZCB9LCB7IHJlbG9hZDogdHJ1ZSB9KVxuICB9XG5cbn0pIiwiYXBwLmNvbnRyb2xsZXIoJ2lkZW50aXR5Q29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICRzY29wZS5hY2NvdW50cyA9IG1hc3Rlck9iai5pZGVudGl0eTtcbn0pXG5cblxuYXBwLmNvbnRyb2xsZXIoJ2lkZW50aXR5U2luZ2xlQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzdGF0ZVBhcmFtcywgJHNjb3BlLCAkc3RhdGUpe1xuICBjb25zb2xlLmxvZygkc3RhdGVQYXJhbXMpO1xuICBjb25zb2xlLmxvZygnaW4gc2luZ2xlQ29udCcpO1xuICAkc2NvcGUuYWNjb3VudCA9ICRzdGF0ZVBhcmFtcy5hY2NvdW50RGF0YVxuICBjb25zb2xlLmxvZygoJHN0YXRlKSk7XG59KVxuXG5hcHAuY29udHJvbGxlcignYWRkSWRlbnRpdHlDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJHJvb3RTY29wZSkge1xuXG4gICRzY29wZS5pZGVudGl0eSA9IHtcbiAgXHRuYW1lOiBudWxsLFxuICBcdGRhdGE6IG51bGxcbiAgfVxuXG4gIC8vICRzY29wZS5jcmVhdGVJZCA9IGZ1bmN0aW9uKCkge1xuICAvLyAgIHZhciBuZXdJZCA9IG1hc3Rlck9iai5pZGVudGl0eS5sZW5ndGggPyBtYXN0ZXJPYmouaWRlbnRpdHlbbWFzdGVyT2JqLmlkZW50aXR5Lmxlbmd0aCAtIDFdLmlkICsgMSA6IDFcbiAgLy8gICAkc2NvcGUuaWRlbnRpdHkuaWQgPSBuZXdJZFxuICAvLyAgIGlmICgkc2NvcGUuaWRlbnRpdHkpIG1hc3Rlck9iai5pZGVudGl0eS5wdXNoKCRzY29wZS5pZGVudGl0eSlcbiAgLy8gICB2YXIgZW5jcnlwdGVkID0gZW5jcnlwdChKU09OLnN0cmluZ2lmeShtYXN0ZXJPYmopLCBtYXN0ZXJQYXNzKVxuICAvLyAgIHNvY2tldC5lbWl0KCdhZGRGcm9tRWxlY3Ryb24nLCB7IGRhdGE6IGVuY3J5cHRlZCB9KVxuICAvLyAgICRyb290U2NvcGUuJGV2YWxBc3luYygpXG4gIC8vICAgJHN0YXRlLmdvKCdpZGVudGl0eS5zaW5nbGUnLCB7IGlkOiBuZXdJZCB9LCB7cmVsb2FkOiB0cnVlfSlcbiAgLy8gfVxuXG59KSIsImFwcC5jb250cm9sbGVyKCdob21lQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSl7XG5cdFxufSkiLCJhcHAuY29udHJvbGxlcignbG9naW5Db250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUpe1xuICAkc2NvcGUuYWNjb3VudHMgPSBtYXN0ZXJPYmoubG9naW47XG5cbn0pXG5cbmFwcC5jb250cm9sbGVyKCdsb2dpblNpbmdsZUNvbnRyb2xsZXInLCBmdW5jdGlvbigkc3RhdGVQYXJhbXMsICRzY29wZSwgJHN0YXRlKXtcbiAgY29uc29sZS5sb2coJHN0YXRlUGFyYW1zKTtcbiAgY29uc29sZS5sb2coJ2luIHNpbmdsZUNvbnQnKTtcbiAgJHNjb3BlLmFjY291bnQgPSAkc3RhdGVQYXJhbXMuYWNjb3VudERhdGFcbiAgY29uc29sZS5sb2coKCRzdGF0ZSkpO1xufSlcblxuIC8vIHZhciBkcm9wYm94VXRpbGl0aWVzID0gcmVxdWlyZSgnLi91dGlsaXRpZXMvZHJvcGJveC9kcm9wYm94LnV0aWxpdGllcy5qcycpXG5cbmFwcC5jb250cm9sbGVyKCdhZGRMb2dpbkNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkcm9vdFNjb3BlKXtcblx0ICAgIHZhciBkcm9wYm94VXRpbGl0aWVzID0gcmVxdWlyZSgnLi4vLi4vdXRpbGl0aWVzL2Ryb3Bib3gvZHJvcGJveC51dGlsaXRpZXMuanMnKVxuXHQgICB2YXIgdXRpbHMgPSByZXF1aXJlKCcuLi8uLi91dGlsaXRpZXMvZW5jcnlwdC5maWxlLmpzJyk7XG5cdCAgIHZhciB1dGlsaXRpZXMgPSByZXF1aXJlKCcuLi8uLi91dGlsaXRpZXMvZW5jcnlwdC51dGlsaXR5LmpzJyk7XG5cdCAgIHZhciB2YWxpZGF0ZSA9IHV0aWxzLnZhbGlkYXRlO1xuXHQgICB2YXIgZGVjcnlwdEZpbGUgPSB1dGlscy5kZWNyeXB0RmlsZTtcbiAgICAgICB2YXIgZW5jcnlwdEZpbGUgPSB1dGlscy5lbmNyeXB0RmlsZTtcbiAgICAgICB2YXIgZW5jcnlwdCA9IHV0aWxpdGllcy5lbmNyeXB0O1xuICAgICAgIHZhciBkZWNyeXB0RGF0YSA9IHV0aWxpdGllcy5kZWNyeXB0O1xuICAgICAgIHZhciBnZXREYXRhRW5jcnlwdGVkID0gdXRpbHMuZ2V0RGF0YUVuY3J5cHRlZFxuICAgICAgIHZhciBjcmVhdGVSYW5kb20gPSByZXF1aXJlKCcuLi8uLi91dGlsaXRpZXMvcGFzc3dvcmQtdXRpbGl0aWVzL3Bhc3MuZ2VuJykuY3JlYXRlUmFuZG9tXG4gICAgICAgdmFyIGdlbmVyYXRlU2VjcmV0ID0gdXRpbHMuZ2VuZXJhdGVTZWNyZXQ7XG5cblx0XHQkc2NvcGUubG9naW4gPSB7XG5cdFx0bmFtZTogbnVsbCxcblx0XHR1c2VybmFtZTogbnVsbCxcblx0XHRwYXNzd29yZDogbnVsbFxuXHR9XG5cdCRzY29wZS5nZW4gPSBudWxsXG5cblx0JHNjb3BlLmdlbmVyYXRlID0gZnVuY3Rpb24gKCl7XG5cdFx0JHNjb3BlLmdlbiA9ICEkc2NvcGUuZ2VuXG5cdH1cblxuXHQkc2NvcGUuZ2VuZXJhdGVQYXNzd29yZCA9IGZ1bmN0aW9uIChsZW5nLCBzeW1zLCBudW1zKXtcblx0XHQkc2NvcGUubG9naW4ucGFzc3dvcmQgPSBjcmVhdGVSYW5kb20oK2xlbmcsICtzeW1zLCArbnVtcylcblx0fVxuXG5cdCRzY29wZS5jcmVhdGVMb2dpbiA9IGZ1bmN0aW9uICgpe1xuXHRcdGNvbnNvbGUubG9nKCdoZWxsb29vb29vb29vb29vbycsJHNjb3BlLmxvZ2luLnBhc3N3b3JkKVxuXHRcdHZhciBuZXdJZCA9IG1hc3Rlck9iai5sb2dpbi5sZW5ndGggPyBtYXN0ZXJPYmoubG9naW5bbWFzdGVyT2JqLmxvZ2luLmxlbmd0aCAtIDFdLmlkICsgMSA6IDE7XG5cdFx0JHNjb3BlLmxvZ2luLmlkID0gbmV3SWRcblx0XHRtYXN0ZXJPYmoubG9naW4ucHVzaCgkc2NvcGUubG9naW4pXG5cdFx0dmFyIGVuY3J5cHRlZCA9IGVuY3J5cHQoSlNPTi5zdHJpbmdpZnkobWFzdGVyT2JqKSwgbWFzdGVyUGFzcylcblx0XHRzb2NrZXQuZW1pdCgnYWRkRnJvbUVsZWN0cm9uJywge2RhdGE6IGVuY3J5cHRlZH0pXG5cdFx0JHJvb3RTY29wZS4kZXZhbEFzeW5jKClcblx0XHQkc3RhdGUuZ28oJ2FwcC5sb2dpblNpbmdsZScsIHtpZDogbmV3SWR9LCB7cmVsb2FkOiB0cnVlfSlcblx0fVxuXG59KSIsImFwcC5jb250cm9sbGVyKCdub3RlQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICRzY29wZS5hY2NvdW50cyA9IG1hc3Rlck9iai5ub3RlO1xufSlcblxuYXBwLmNvbnRyb2xsZXIoJ25vdGVTaW5nbGVDb250cm9sbGVyJywgZnVuY3Rpb24oJHN0YXRlUGFyYW1zLCAkc2NvcGUsICRzdGF0ZSl7XG4gIGNvbnNvbGUubG9nKCRzdGF0ZVBhcmFtcyk7XG4gIGNvbnNvbGUubG9nKCdpbiBzaW5nbGVDb250Jyk7XG4gICRzY29wZS5hY2NvdW50ID0gJHN0YXRlUGFyYW1zLmFjY291bnREYXRhXG4gIGNvbnNvbGUubG9nKCgkc3RhdGUpKTtcbiB9KVxuICBcblxuXG5hcHAuY29udHJvbGxlcignYWRkTm90ZUNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkcm9vdFNjb3BlKSB7XG4gIHZhciB1dGlscyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxpdGllcy9lbmNyeXB0LmZpbGUuanMnKTtcblx0ICAgdmFyIHV0aWxpdGllcyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxpdGllcy9lbmNyeXB0LnV0aWxpdHkuanMnKTtcblx0ICAgLy8gdmFyIHZhbGlkYXRlID0gdXRpbHMudmFsaWRhdGU7XG5cdCAgIC8vIHZhciBkZWNyeXB0RmlsZSA9IHV0aWxzLmRlY3J5cHRGaWxlO1xuICAgIC8vICAgIHZhciBlbmNyeXB0RmlsZSA9IHV0aWxzLmVuY3J5cHRGaWxlO1xuICAgIC8vICAgIHZhciBlbmNyeXB0ID0gdXRpbGl0aWVzLmVuY3J5cHQ7XG4gICAgLy8gICAgdmFyIGRlY3J5cHREYXRhID0gdXRpbGl0aWVzLmRlY3J5cHQ7XG4gICAgLy8gICAgdmFyIGdldERhdGFFbmNyeXB0ZWQgPSB1dGlscy5nZXREYXRhRW5jcnlwdGVkXG4gICAgICAgdmFyIGNyZWF0ZVJhbmRvbSA9IHJlcXVpcmUoJy4uLy4uL3V0aWxpdGllcy9wYXNzd29yZC11dGlsaXRpZXMvcGFzcy5nZW4nKS5jcmVhdGVSYW5kb21cbiAgICAgICAvLyB2YXIgZ2VuZXJhdGVTZWNyZXQgPSB1dGlscy5nZW5lcmF0ZVNlY3JldDtcbiAgICRzY29wZS5ub3RlID0ge1xuICBcdG5hbWU6IG51bGwsXG4gIFx0ZGF0YTogbnVsbFxuICB9XG5cbiAgJHNjb3BlLmNyZWF0ZU5vdGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbmV3SWQgPSBtYXN0ZXJPYmoubm90ZS5sZW5ndGggPyBtYXN0ZXJPYmoubm90ZVttYXN0ZXJPYmoubm90ZS5sZW5ndGggLSAxXS5pZCArIDEgOiAxO1xuICAgICRzY29wZS5ub3RlLmlkID0gbmV3SWRcbiAgICBpZiAoJHNjb3BlLm5vdGUpIG1hc3Rlck9iai5ub3RlLnB1c2goJHNjb3BlLm5vdGUpXG4gICAgdmFyIGVuY3J5cHRlZCA9IGVuY3J5cHQoSlNPTi5zdHJpbmdpZnkobWFzdGVyT2JqKSwgbWFzdGVyUGFzcylcbiAgICBzb2NrZXQuZW1pdCgnYWRkRnJvbUVsZWN0cm9uJywgeyBkYXRhOiBlbmNyeXB0ZWQgfSlcbiAgICAkcm9vdFNjb3BlLiRldmFsQXN5bmMoKVxuICAgICRzdGF0ZS5nbygnbm90ZS5zaW5nbGUnLCB7IGlkOiBuZXdJZCB9LCB7cmVsb2FkOiB0cnVlfSlcbiAgfVxuIH0pIiwiYXBwLmNvbnRyb2xsZXIoJ3NldHRpbmdzQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgJGNvcmRvdmFPYXV0aCwgJGNvcmRvdmFUb3VjaElELCAkdGltZW91dCl7XG4gIHZhciBkcm9wYm94VXRpbHMgPSByZXF1aXJlKCcuLi9hbmd1bGFyL3V0aWxpdGllcy9kcm9wYm94LnV0aWxpdHkuanMnKTtcbiAgdmFyIGNsYXNzaWZpZWRVdGlscyA9IHJlcXVpcmUoJy4uL2FuZ3VsYXIvdXRpbGl0aWVzL2NsYXNzaWZpZWQvaGFzaGluZ0JhY2t1cC5qcycpO1xuICB2YXIgdG91Y2hJZEJhY2t1cCA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG91Y2hJZEJhY2t1cCcpO1xuICB0b3VjaElkQmFja3VwID8gJHNjb3BlLnRvdWNoSWRCYWNrdXAgPSB0cnVlIDogJHNjb3BlLnRvdWNoSWRCYWNrdXAgPSBmYWxzZTtcbiAgJHNjb3BlLiRvbignJGlvbmljVmlldy5lbnRlcicsIGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKGRldmljZS5wbGF0Zm9ybSk7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHNldFNjb3BlKCl7XG4gICAgdmFyIHRva2VuID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkcm9wYm94QXV0aCcpXG4gICAgICBpZih0b2tlbil7XG4gICAgICAgICRzY29wZS5kcm9wYm94QXV0aGVudGljYXRlZCA9IHRydWU7XG4gICAgICAgICRzY29wZS5idXR0b25UZXh0ID0gXCJEaXNjb25uZWN0IEZyb20gRHJvcGJveFwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHNjb3BlLmRyb3Bib3hBdXRoZW50aWNhdGVkID0gZmFsc2U7XG4gICAgICAgICRzY29wZS5idXR0b25UZXh0ID0gXCJDb25uZWN0IFRvIERyb3Bib3hcIjtcbiAgICAgIH1cbiAgICAgICRzY29wZS4kZXZhbEFzeW5jKCk7XG4gIH1cbiAgc2V0U2NvcGUoKTtcblxuICAkc2NvcGUudG91Y2hJZEVuYWJsZURpc2FibGUgPSBmdW5jdGlvbigpe1xuICAgIGlmKCEkc2NvcGUudG91Y2hJZEJhY2t1cCl7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZGV2aWNlcmVhZHlcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZihkZXZpY2UucGxhdGZvcm0udG9Mb3dlckNhc2UoKSA9PT0gJ2FuZHJvaWQnKXtcbiAgICAgICAgICBhbmRyb2lkVG91Y2hJZCgpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihkZXZpY2UucGxhdGZvcm0udG9Mb3dlckNhc2UoKSA9PT0gJ2lvcycpXG4gICAgICAgIGlPU1RvdWNoSWQoKTtcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndG91Y2hJZEJhY2t1cCcpO1xuICAgICAgJHNjb3BlLnRvdWNoSWRCYWNrdXAgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuXG4gICRzY29wZS5kcm9wYm94QXV0aCA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyIGRyb3Bib3hQYXRoRm9yQ3J5cHRvO1xuICAgIGlmKCRzY29wZS5kcm9wYm94QXV0aGVudGljYXRlZCl7XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2Ryb3Bib3hBdXRoJyk7XG4gICAgICBzZXRTY29wZSgpXG4gICAgfSBlbHNlIHtcbiAgICAgICRjb3Jkb3ZhT2F1dGguZHJvcGJveCgncGc4bnQ4c245aDV5aWRiJylcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgIHJldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Ryb3Bib3hBdXRoJywgcmVzLmFjY2Vzc190b2tlbilcbiAgICAgIH0pXG4gICAgICAudGhlbihmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gZHJvcGJveFV0aWxzLmdldERyb3Bib3hGaWxlUGF0aCgpXG4gICAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24obWF0Y2hlcyl7XG4gICAgICAgIGlmKG1hdGNoZXMpe1xuICAgICAgICAgIGRyb3Bib3hQYXRoRm9yQ3J5cHRvID0gbWF0Y2hlcy5tZXRhZGF0YS5wYXRoX2Rpc3BsYXlcbiAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Ryb3Bib3hQYXRoJywgZHJvcGJveFBhdGhGb3JDcnlwdG8pXG4gICAgICAgICAgc2V0U2NvcGUoKVxuICAgICAgICAgIHJldHVybiBkcm9wYm94VXRpbHMuZ2V0RGF0YU9iamVjdEZyb21Ecm9wYm94KGRyb3Bib3hQYXRoRm9yQ3J5cHRvLCAnL2RhdGEudHh0JylcbiAgICAgICAgfSBlbHNle1xuICAgICAgICAgIGNhbnRGaW5kQ3J5cHRvUGFzcygpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAudGhlbihmdW5jdGlvbihkYXRhT2JqKXtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdtYXN0ZXJPYmonLCBkYXRhT2JqKVxuICAgICAgICByZXR1cm4gZHJvcGJveFV0aWxzLmdldERhdGFPYmplY3RGcm9tRHJvcGJveChkcm9wYm94UGF0aEZvckNyeXB0bywgJy9zZWNyZXQyLnR4dCcpXG4gICAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24oc2VjcmV0Mil7XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc2VjcmV0MicsIHNlY3JldDIpO1xuICAgICAgICAkc2NvcGUuZXJyb3IgPSBudWxsO1xuICAgICAgfSlcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gYW5kcm9pZFRvdWNoSWQoKXtcbiAgICBjb25zb2xlLmxvZygnaGVsbG8nKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlPU1RvdWNoSWQoKXtcbiAgICAkY29yZG92YVRvdWNoSUQuY2hlY2tTdXBwb3J0KCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICRjb3Jkb3ZhVG91Y2hJRC5hdXRoZW50aWNhdGUoXCJ0ZXh0XCIpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG91Y2hJZEJhY2t1cCcsICd0cnVlJyk7XG4gICAgICAgICRzY29wZS50b3VjaElkQmFja3VwID0gdHJ1ZTtcbiAgICAgICAgY29uc29sZS5sb2coJ2Fib3V0IHRvIGdldCB0byB1dGlscycpO1xuICAgICAgICBjbGFzc2lmaWVkVXRpbHMuYmFja3VwSGFzaCgpXG4gICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGFsZXJ0KCdQbGVhc2UgVHJ5IEFnYWluJyk7XG4gICAgICAgICRzY29wZS50b3VjaElkQmFja3VwID0gZmFsc2U7XG4gICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICBhbGVydCgnWW91IG5lZWQgVG91Y2hJRCBmb3IgdGhpcyBmZWF0dXJlIDooJyk7XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3RvdWNoSWRCYWNrdXAnKTtcbiAgICAgICRzY29wZS50b3VjaElkQmFja3VwID0gZmFsc2U7XG4gICAgfSlcbiAgfSwgZmFsc2UpXG59XG5cblxuICBmdW5jdGlvbiBjYW50RmluZENyeXB0b1Bhc3MoKXtcbiAgICAkc2NvcGUuZXJyb3IgPSBcIldlIGNhbid0IGZpbmQgeW91ciBDcnlwdG9QYXNzIGZvbGRlci4gIFBsZWFzZSBtYWtlIHN1cmUgaXQncyBpbiB5b3VyIERyb3Bib3ggQWNjb3VudFwiXG4gIH1cbn0pXG4iLCJ2YXIgRHJvcGJveCA9IHJlcXVpcmUoJ2Ryb3Bib3gnKTtcbnZhciBkYnggPSBuZXcgRHJvcGJveCh7IGNsaWVudElkOiAncGc4bnQ4c245aDV5aWRiJyB9KTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRBbmRTZXRBY2Nlc3NUb2tlbjogZnVuY3Rpb24oKXtcbiAgICB2YXIgdG9rZW4gPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Ryb3Bib3hBdXRoJyk7XG4gICAgZGJ4LnNldEFjY2Vzc1Rva2VuKHRva2VuKVxuICB9LFxuICBnZXREcm9wYm94RmlsZVBhdGg6IGZ1bmN0aW9uKCl7XG4gICAgdGhpcy5nZXRBbmRTZXRBY2Nlc3NUb2tlbigpXG4gICAgY29uc29sZS5sb2coJ2luIGhlcmUnKTtcbiAgICByZXR1cm4gZGJ4LmZpbGVzU2VhcmNoKHtwYXRoOiAnL0FwcHMnLCBxdWVyeTogJ0NyeXB0b1Bhc3MnfSlcbiAgICAudGhlbihmdW5jdGlvbihyZXMpe1xuICAgICAgY29uc29sZS5sb2coJ21hdGNoZXMnLCByZXMubWF0Y2hlcyk7XG4gICAgICByZXR1cm4gcmVzLm1hdGNoZXNbMF07XG4gICAgfSlcbiAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKXtjb25zb2xlLmxvZygndyBoYXZlIGFuIGVycm9yJywgZXJyKX0pXG4gIH0sXG4gIGdldERhdGFPYmplY3RGcm9tRHJvcGJveDogZnVuY3Rpb24oY3J5cHRvUGF0aCwgZmlsZSl7XG4gICAgdGhpcy5nZXRBbmRTZXRBY2Nlc3NUb2tlbigpXG4gICAgY29uc29sZS5sb2coJ2luIGdldCBkYXRhIG9iaicpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgICAgZGJ4LmZpbGVzR2V0VGVtcG9yYXJ5TGluayh7cGF0aDogY3J5cHRvUGF0aCArIGZpbGV9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24obGlua09iail7XG4gICAgICAgIGNvbnNvbGUubG9nKGxpbmtPYmosICdsaW5rT2JqJyk7XG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgeGhyLm9wZW4oXCJHRVRcIiwgbGlua09iai5saW5rLCB0cnVlKTtcbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICByZXNvbHZlKHhoci5yZXNwb25zZVRleHQucmVwbGFjZSgvXCIvZywgJycpKVxuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY29uc29sZS5sb2coeGhyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgeGhyLnNlbmQobnVsbClcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKXtyZWplY3QoZXJyKX0pXG4gICAgfSlcbiAgfSxcblxufVxuIiwiYXBwLmZhY3RvcnkoJ0Ryb3Bib3hTeW5jJywgZnVuY3Rpb24oKXtcbiAgdmFyIGRyb3Bib3hVdGlscyA9IHJlcXVpcmUoJy4uL2FuZ3VsYXIvdXRpbGl0aWVzL2Ryb3Bib3gudXRpbGl0eS5qcycpXG4gIHZhciB1dGlscyA9IHJlcXVpcmUoJy4uL2FuZ3VsYXIvdXRpbGl0aWVzL2VuY3J5cHQudXRpbGl0eS5qcycpXG4gIHJldHVybiB7XG4gICAgc3luYzogZnVuY3Rpb24oKXtcbiAgICAgIHZhciBkcm9wYm94UGF0aEZvckNyeXB0bztcblxuICAgICAgcmV0dXJuIGRyb3Bib3hVdGlscy5nZXREcm9wYm94RmlsZVBhdGgoKVxuICAgICAgICAudGhlbihmdW5jdGlvbihtYXRjaGVzKXtcbiAgICAgICAgICBpZihtYXRjaGVzKXtcbiAgICAgICAgICAgIGRyb3Bib3hQYXRoRm9yQ3J5cHRvID0gbWF0Y2hlcy5tZXRhZGF0YS5wYXRoX2Rpc3BsYXlcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZHJvcGJveFBhdGgnLCBkcm9wYm94UGF0aEZvckNyeXB0bylcbiAgICAgICAgICAgIHJldHVybiBkcm9wYm94VXRpbHMuZ2V0RGF0YU9iamVjdEZyb21Ecm9wYm94KGRyb3Bib3hQYXRoRm9yQ3J5cHRvLCAnL2RhdGEudHh0JylcbiAgICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhblxcJ3QgZmluZCBEcm9wYm94IFBhdGggOignKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGF0YU9iail7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2luIGxhc3QgdGhlbicpO1xuICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbWFzdGVyT2JqRW5jcnlwdGVkJywgZGF0YU9iailcbiAgICAgICAgICB2YXIgZW5jcnlwdGVkTWFzdGVyT2JqID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdtYXN0ZXJPYmpFbmNyeXB0ZWQnKVxuICAgICAgICAgIGNvbnNvbGUubG9nKCdnbG9iYWxtYXN0ZXInLCBnbG9iYWxNYXN0ZXJQYXNzKTtcbiAgICAgICAgICBtYXN0ZXJPYmogPSBKU09OLnBhcnNlKHV0aWxzLmRlY3J5cHQoZW5jcnlwdGVkTWFzdGVyT2JqLCBnbG9iYWxNYXN0ZXJQYXNzKSk7XG4gICAgICAgICAgY29uc29sZS5kaXIobWFzdGVyT2JqKTtcbiAgICAgICAgICAvLyByZXR1cm4gZHJvcGJveFV0aWxzLmdldERhdGFPYmplY3RGcm9tRHJvcGJveChkcm9wYm94UGF0aEZvckNyeXB0bywgJy9zZWNyZXQyLnR4dCcpXG4gICAgICAgIH0pXG4gICAgfVxuICB9XG59KVxuIiwidmFyIGNyeXB0byA9IHJlcXVpcmUoJ2NyeXB0by1qcycpO1xuXG4vL2NoYW5nZWQgZnJvbSBhZXMxOTIgdG8gYWVzMjU2XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRlbmNyeXB0OiBmdW5jdGlvbiAoZGF0YSwgcGFzc3dvcmQpe1xuXHRcdHZhciBjaXBoZXIgPSBjcnlwdG8uQUVTLmVuY3J5cHQoZGF0YSwgcGFzc3dvcmQpO1xuXHRcdHJldHVybiBjaXBoZXIudG9TdHJpbmcoKVxuXHR9LFxuXHRkZWNyeXB0OiBmdW5jdGlvbiAoZW5EYXRhLCBwYXNzd29yZCl7XG5cdFx0dmFyIGJ5dGVzID0gY3J5cHRvLkFFUy5kZWNyeXB0KGVuRGF0YS50b1N0cmluZygpLCBwYXNzd29yZCk7XG5cdFx0dmFyIHBsYWludGV4dCA9IGJ5dGVzLnRvU3RyaW5nKGNyeXB0by5lbmMuVXRmOCk7XG5cdFx0cmV0dXJuIHBsYWludGV4dFxuXHR9LFxuXHR2YWxpZGF0ZTogZnVuY3Rpb24gKG1hc3RlclB3KSB7XG5cdFx0dmFyIHNlY3JldCA9ICdIZWxsb0lBbURvZ0lEb2dlPydcblx0XHR2YXIgZW5TZWNyZXQgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NlY3JldDInKTtcblx0ICB0cnkge1xuXHRcdFx0Ly9hZGRzIG5ldyBsaW5lIHJhbmRvbWx5PyBoYXZlIHRvIHRyaW0oKVxuXHQgICAgdmFyIGNoZWNrID0gdGhpcy5kZWNyeXB0KGVuU2VjcmV0LCBtYXN0ZXJQdykudHJpbSgpO1xuXHQgIH0gY2F0Y2ggKGVycm9yKSB7XG5cdCAgICByZXR1cm4gZmFsc2U7XG5cdCAgfVxuXHQgIHJldHVybiBjaGVjayA9PT0gc2VjcmV0O1xuXHR9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgdXVpZDogZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gZGV2aWNlLnV1aWRcbiAgfSxcbiAgc2VyaWFsOiBmdW5jdGlvbigpe1xuICAgIHJldHVybiBkZXZpY2Uuc2VyaWFsXG4gIH0sXG4gIGJhY2t1cEhhc2g6IGZ1bmN0aW9uKCl7XG4gICAgY29uc29sZS5sb2codGhpcy51dWlkKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnNlcmlhbCk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

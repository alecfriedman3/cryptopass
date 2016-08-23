
// reminder of functions and utilities available throughout application
// var utils = require('../../utilities/encrypt.file.js')
// var validate = utils.validate;
// var decryptFile = utils.decryptFile
// var encryptFile = utils.encryptFile
// var masterObj;

app.controller('authController', function($scope, $state, $rootScope){
	$rootScope.validated = false;
	$scope.master = null;

	$scope.authenticatePassword = function (master){
		validate(master)
		.then(function (isValid){
			if (!isValid) {
				$scope.master = null
				return
			} else if (isValid){
				return decryptFile(master)
			}
		})
		.then(function (obj){
			if (!obj) return
			masterObj = obj;
			masterPass = master;
			$rootScope.validated = true;
			$rootScope.$evalAsync()
			$state.go('home')
		})
		.catch(function (err){
			console.error(err)
		})
	}
});

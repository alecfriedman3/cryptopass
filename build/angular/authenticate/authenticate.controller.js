
// reminder of functions and utilities available throughout application
// var utils = require('../../utilities/encrypt.file.js')
// var validate = utils.validate;
// var decryptFile = utils.decryptFile
// var encryptFile = utils.encryptFile
// var masterObj;

app.controller('authController', function($scope, $state, $rootScope){

	$scope.master = null;

	$scope.authenticatePassword = function (master){
		var isValid = validate(master)
		if (!isValid) {
			console.log('invalid master password')
			$scope.master = null
			return
		} else if (isValid){
			masterObj = decryptFile(master);
			console.log(masterObj);
			masterPass = master;
			$rootScope.validated = true;
			$rootScope.$evalAsync()
			$state.go('home')
		}
	}
});

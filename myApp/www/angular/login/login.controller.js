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
  var idGenerator = require('../angular/utilities/hash.utility.js').idGenerator;
  var dropboxUtils = require('../angular/utilities/dropbox.utility.js');
  var utilities = require('../angular/utilities/encrypt.utility.js');
  var encrypt = utilities.encrypt;
  var decryptData = utilities.decrypt;
  var createRandom = require('../angular/utilities/password-utilities/pass.gen').createRandom


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
    var newId = idGenerator($scope.login);
    $scope.login.id = newId
    if ($scope.login) masterObj.login.push($scope.login)
    var encrypted = encrypt(JSON.stringify(masterObj), globalMasterPass)
    dropboxUtils.fileUpload(encrypted, '/mobileData.txt')
    .then(function(){
      $rootScope.$evalAsync()
      $state.go('app.login')
    })
    .catch(function(err){
      console.log(err);
    })
	}

})

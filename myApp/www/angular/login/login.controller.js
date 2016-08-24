app.controller('loginController', function($scope, $state){
  $scope.accounts = masterObj.login;

})


////////// single view
app.controller('loginSingleController', function($stateParams, $scope, $state){
  console.log($stateParams);
  console.log('in singleCont');
  $scope.account = $stateParams.accountData
  console.log(($state));

$scope.account = masterObj.login.filter(info => info.id == $stateParams.id)[0]
  $scope.updateInfo = false;
  $scope.newAccount = angular.copy($scope.account)

  // $scope.getImg = getImg;

  $scope.showForm = function () {
  	console.log("helloooooooo")
    $scope.updateInfo = !$scope.updateInfo;
  }

  $scope.changeInfo=function(){
  	if ($scope.password1 !== $scope.password2) {
  		$scope.error = true;
      setTimeout(function (){
        $scope.error = null
        $scope.$digest()
      }, 5000)
  		return;
  	}
  	$scope.error = null;
  	masterObj.login.forEach(account =>{
  		if (account.id===$scope.account.id) {
        account.username = $scope.newAccount.username
        account.website = $scope.newAccount.website
        if (account.website.search(/http/) == -1) account.website = 'http://'+account.website
  			account.password = $scope.password1 || account.password;
        account.lastUpdated = moment().format('MMMM Do YYYY, h:mm:ss a');
  		}
  	})
  	var encrypted=encrypt(JSON.stringify(masterObj),masterPass);
  	socket.emit('addFromElectron',{data:encrypted});
  	$state.reload();
  }
  $scope.generatePassword = function (len, syms, nums){
		$scope.password1 = $scope.password2 = createRandom(+len, +syms, +nums)

	}
		$scope.gen = null
	$scope.generate = function (){
		$scope.gen = !$scope.gen
	}

  // $scope.copyText = function(text){
  //   console.log('clicked in controller');
  //   Clipboard.copy(text)
  // }

})


 // var dropboxUtilities = require('./utilities/dropbox/dropbox.utilities.js')
//adding login
app.controller('addLoginController', function($scope, $state, $stateParams, $rootScope){

  var idGenerator = require('../angular/utilities/hash.utility.js').idGenerator;
  var dropboxUtils = require('../angular/utilities/dropbox.utility.js');
  var utilities = require('../angular/utilities/encrypt.utility.js');
  var encrypt = utilities.encrypt;
  var decryptData = utilities.decrypt;
  var createRandom = require('../angular/utilities/password-utilities/pass.gen').createRandom
  var moment = require('moment')

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
    $scope.login.id = newId;
    $scope.login.createdAt = moment().format('MMMM Do YYYY, h:mm:ss a');
    $scope.login.lastUpdated = moment().format('MMMM Do YYYY, h:mm:ss a');
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

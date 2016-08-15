app.controller('loginController', function($scope){
  console.log('in logins controller');
  $scope.accounts = masterObj.login;
})

app.controller('singleLoginController', function($scope, $stateParams){
  $scope.account = masterObj.login.filter(info => info.id == $stateParams.id)[0]
  $scope.updateInfo = false;
  $scope.showForm = function () {
    $scope.updateInfo = !$scope.updateInfo;
  }
})


app.controller('addLoginController', function($scope, $state, $stateParams, $rootScope){

	$scope.login = {
		name: null,
		username: null,
		password: null
	}
	$scope.gen = null

	$scope.generate = function (){
		$scope.gen = !$scope.gen
	}

	$scope.generatePassword = function (len, syms, nums){
		$scope.login.password = createRandom(+len, +syms, +nums)

	}

	$scope.createLogin = function (){
		var newId = masterObj.login[masterObj.login.length - 1].id + 1
		$scope.login.id = newId
		masterObj.login.push($scope.login)
		var encrypted = encrypt(JSON.stringify(masterObj), masterPass)
		socket.emit('addFromElectron', {data: encrypted})
		$rootScope.$evalAsync()
		$state.go('login.single', {id: newId})
	}

})

app.controller('loginController', function($scope, $state){
  $scope.accounts = masterObj.login;

})

app.controller('loginSingleController', function($stateParams, $scope, $state){
  console.log($stateParams);
  console.log('in singleCont');
  $scope.account = $stateParams.accountData
  console.log(($state));
})


app.controller('addLoginController', function($scope, $state){
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
		var newId = masterObj.login.length ? masterObj.login[masterObj.login.length - 1].id + 1 : 1;
		$scope.login.id = newId
		masterObj.login.push($scope.login)
		var encrypted = encrypt(JSON.stringify(masterObj), masterPass)
		socket.emit('addFromElectron', {data: encrypted})
		$rootScope.$evalAsync()
		$state.go('login.single', {id: newId}, {reload: true})
	}

})
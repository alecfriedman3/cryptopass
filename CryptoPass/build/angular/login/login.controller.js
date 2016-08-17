app.controller('loginController', function($scope){
  $scope.accounts = masterObj.login;
})

app.controller('singleLoginController', function($scope, $stateParams, $state){
  $scope.account = masterObj.login.filter(info => info.id == $stateParams.id)[0]
  $scope.updateInfo = false;
  $scope.showForm = function () {
    $scope.updateInfo = !$scope.updateInfo;
  }
  $scope.changeInfo=function(){
  	if ($scope.password1 !== $scope.password2) {
  		$scope.error=true;
  		return;
  	}
  	$scope.error=null;
  	masterObj.login.forEach(account =>{
  		if (account.id===$scope.account.id) {
  			account.password=$scope.password1 || account.password;
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
})


app.controller('addLoginController', function($scope, $state, $stateParams, $rootScope){
	//Let's also add a website field
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

app.controller('loginController', function($scope){
  $scope.accounts = masterObj.login;
})


app.controller('singleLoginController', function($scope, $stateParams, Clipboard, $state){

  $scope.account = masterObj.login.filter(info => info.id == $stateParams.id)[0]
  $scope.updateInfo = false;
  $scope.newAccount = angular.copy($scope.account)

  $scope.getImg = getImg;

  $scope.showForm = function () {
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
  			account.password = $scope.password1 || account.password;
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

  $scope.copyText = function(text){
    console.log('clicked in controller');
    Clipboard.copy(text)
  }

})


app.controller('addLoginController', function($scope, $state, $stateParams, $rootScope){
	//Let's also add a website field
	$scope.login = {
		name: null,
		username: null,
		password: null,
    website: null
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

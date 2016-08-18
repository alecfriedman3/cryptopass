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

	$scope.generatePassword = function (leng, syms, nums){
		// $scope.login.password = createRandom(+len, +syms, +nums)

 $scope.login.password =function createRandom (leng, syms, nums){
		var chars = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ"
		var syms = "!@#$%^&*()_-+={[}]|\"';:.>,</?"
		var nums = "0123456789"
		var pass = new Array(length).fill('');
		while (symTotal > 0){
			var ind = random.integer(0, length)
			if (!pass[ind]){
				pass[ind] = syms[random.integer(0, syms.length - 1)]
				symTotal --
			}
		}
		while (numTotal > 0){
			var ind = random.integer(0, length)
			if (!pass[ind] && pass[ind] !== 0){
				pass[ind] = nums[random.integer(0, nums.length - 1)]
				numTotal --
			}
		}
		return pass.map(char => char && char !== 0? char : chars[random.integer(0, chars.length - 1)]).join('')
	}


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
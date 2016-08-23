app.controller('loginController', function($scope){
  $scope.accounts = masterObj.login;
})


app.controller('singleLoginController', function($scope, $stateParams, Clipboard, $state){

  $scope.account = masterObj.login.filter(info => info.id == $stateParams.id)[0]
  $scope.updateInfo = false;
  $scope.newAccount = angular.copy($scope.account)
  $scope.syms = '0'
  $scope.nums = '0'
  $scope.leng = "8"
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
        if ($scope.newAccount.website && account.website.search(/http/) == -1) account.website = 'http://'+account.website
  			account.password = $scope.password1 || account.password;
        account.lastUpdated = moment().format('MMMM Do YYYY, h:mm:ss a');
  		}
  	})
  	var encrypted=encrypt(JSON.stringify(masterObj),masterPass);
  	socket.emit('addFromElectron',{data:encrypted});
  	$state.reload();
  }
  $scope.generatePassword = function (len, syms, nums){
    if (+syms + +nums > +len){
      $scope.syms = '0';
      $scope.nums = '0';
      return
    }
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
    $scope.syms = '0'
  $scope.nums = '0'
  $scope.leng = '8'
  var settings = require('electron-settings');
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
    if (+syms + +nums > +len){
      $scope.syms = '0';
      $scope.nums = '0';
      return
    }
		$scope.login.password = createRandom(+len, +syms, +nums)
    $scope.login.password2 = $scope.login.password
	}

	$scope.createLogin = function (){
    if ($scope.login.password !== $scope.login.password2) {
      alert("Passwords do not match!");
    } else {
      var newId = idGenerator($scope.login)
      $scope.login.createdAt = moment().format('MMMM Do YYYY, h:mm:ss a');
      $scope.login.lastUpdated = moment().format('MMMM Do YYYY, h:mm:ss a');
  		$scope.login.id = newId
      if ($scope.login.website && $scope.login.website.search(/http/) == -1) $scope.login.website = 'http://'+$scope.login.website
  		masterObj.login.push($scope.login)
      settings.get('dropboxPath')
      .then(path => {
        var encrypted = encrypt(JSON.stringify(masterObj), masterPass)
        socket.emit('addFromElectron', {data: encrypted, dropboxPath: path})
        $rootScope.$evalAsync()
        $state.go('login.single', {id: newId}, {reload: true})
      })
    }
	}

})

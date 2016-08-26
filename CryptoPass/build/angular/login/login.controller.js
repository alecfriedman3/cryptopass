app.controller('loginController', function($scope){
  $scope.accounts = masterObj.login;
})


app.controller('singleLoginController', function($scope, $stateParams, Clipboard, $state, $timeout){

  $scope.account = masterObj.login.filter(info => info.id == $stateParams.id)[0]
  $scope.updateInfo = false;
  $scope.newAccount = angular.copy($scope.account)

  $scope.syms = '0'
  $scope.nums = '0'
  $scope.leng = "8"

  $scope.type = 'password'
  $scope.reveal = function (){
    if ($scope.type == 'password') $scope.type = 'text';
    else $scope.type = 'password'
  }

  $scope.isActive = null;


  $scope.getImg = getImg;

  $scope.showForm = function () {
    $scope.updateInfo = !$scope.updateInfo;
  }

  $scope.changeInfo=function(){
  	if ($scope.password1 !== $scope.password2) {
    	alert("Passwords do not match.")
  		return;
  	}
  	masterObj.login.forEach(account =>{
  		if (account.id==$scope.newAccount.id) {
        account.username = $scope.newAccount.username
        account.website = $scope.newAccount.website
        if ($scope.newAccount.website && account.website.search(/http/) == -1) account.website = 'http://'+account.website
  			account.password = $scope.password1 || account.password;
        account.lastUpdated = moment().format('MMMM Do YYYY, h:mm:ss a');
  		}
  	})
    settings.get('dropboxPath')
      .then(val => {
        var encrypted = encrypt(JSON.stringify(masterObj), masterPass)
        socket.emit('addFromElectron', {data: encrypted, dropboxPath: val, fsSettingsPath: fsSettingsPath})
        $state.reload()
      })
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
    if ($scope.gen){
      $scope.type = 'text'
    }
	}

  $scope.copyText = function(text, className){
    $scope.isActive = className;
    Clipboard.copy(text);
    $timeout(function(){
      // $scope.isActive = !$scope.isActive;
     $scope.isActive = null
  }, 2000);
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
    if ($scope.gen){
      $scope.type = 'text'
    }
	}

    $scope.type = 'password'
  $scope.reveal = function (){
    if ($scope.type == 'password') $scope.type = 'text';
    else $scope.type = 'password'
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
      .then(val => {
        var encrypted = encrypt(JSON.stringify(masterObj), masterPass)
        socket.emit('addFromElectron', {data: encrypted, dropboxPath: val, fsSettingsPath: fsSettingsPath})
        $rootScope.$evalAsync()
        $state.go('login.single', {id: newId}, {reload: true})
      })
    }
	}

})

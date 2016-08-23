app.controller('identityController', function($scope){
  $scope.accounts = masterObj.identity;
})


app.controller('identitySingleController', function($stateParams, $scope, $state){
  console.log($stateParams);
  console.log('in singleCont');
  $scope.account = $stateParams.accountData
  console.log(($state));

  $scope.account = masterObj.login.filter(info => info.id == $stateParams.id)[0]
  $scope.updateInfo = false;
  $scope.newAccount = angular.copy($scope.account)

  // $scope.getImg = getImg;

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
        if (account.website.search(/http/) == -1) account.website = 'http://'+account.website
        account.password = $scope.password1 || account.password;
        account.lastUpdated = moment().format('MMMM Do YYYY, h:mm:ss a');
      }
    })
    var encrypted=encrypt(JSON.stringify(masterObj),masterPass);
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

app.controller('addIdentityController', function($scope, $state, $stateParams, $rootScope) {
// var settings = require('electron-settings')
   var utilities = require('../angular/utilities/encrypt.utility.js');
     var encrypt = utilities.encrypt;
     var decryptData = utilities.decrypt;
     
  $scope.identity = {
  	name: null,
  	data: null
  }

$scope.createId = function() {
    var newId = idGenerator($scope.identity)
    $scope.identity.id = newId
    // $scope.identity.createdAt = moment().format('MMMM Do YYYY, h:mm:ss a');
    // $scope.identity.lastUpdated = moment().format('MMMM Do YYYY, h:mm:ss a');
    if ($scope.identity) masterObj.identity.push($scope.identity)
    // settings.get('dropboxPath')
    // .then(path => {
      var encrypted = encrypt(JSON.stringify(masterObj), masterPass)
      $rootScope.$evalAsync()
      $state.go('identity.single', { id: newId }, {reload: true})
    })
  }


})
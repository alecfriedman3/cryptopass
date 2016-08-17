app.controller('loginController', function($scope, $state){
  $scope.accounts = masterObj.login;
  $scope.goToSingle = function(stateId){
    console.log('clicked');
    $state.go('app.loginSingle')
  }

})

app.controller('loginSingleController', function($stateParams, $scope, $state){
  console.log($stateParams);
  console.log('in singleCont');
  $scope.account = $stateParams.accountData
  console.log(($state));
})

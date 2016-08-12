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

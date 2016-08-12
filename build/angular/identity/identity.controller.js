app.controller('identityController', function ($scope) {
  $scope.identity = masterObj.identity;
})

app.controller('singleIdentityController', function($scope, $stateParams){
  $scope.identity = masterObj.identity.filter(info => info.id == $stateParams.id)[0]
})

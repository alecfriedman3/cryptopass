app.controller('creditCardController', function ($scope) {
  $scope.accounts = masterObj.creditCard;
})

app.controller('singleCreditCardController', function($scope, $stateParams){
  $scope.account = masterObj.creditCard.filter(info => info.id == $stateParams.id)[0]
  $scope.updateInfo = false;
  $scope.showForm = function () {
    $scope.updateInfo = !$scope.updateInfo;
  }
})

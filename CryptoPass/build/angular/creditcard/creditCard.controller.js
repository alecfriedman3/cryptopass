app.controller('creditCardController', function($scope) {
  $scope.accounts = masterObj.creditCard;
})


app.controller('singleCreditCardController', function($scope, $stateParams, Clipboard, $state) {
  $scope.account = masterObj.creditCard.filter(info => info.id == $stateParams.id)[0]
  $scope.updateInfo = false;
  var fullName = $scope.account.firstName + ' ' + $scope.account.lastName;
  $scope.fullName = fullName;
  $scope.updateCard = 'Select Card Type'
  $scope.newAccount = angular.copy($scope.account)

  $scope.showForm = function() {
    $scope.updateInfo = !$scope.updateInfo;
  }

  $scope.changeInfo = function() {
    for (var key in $scope.newAccount){
      if ($scope.account[key] !== $scope.newAccount[key]){
        $scope.account[key] = $scope.newAccount[key];
      }
    }
    if ($scope.fullName !== fullName){
      var name = $scope.fullName.split(' ')
      $scope.account.firstName = name[0]
      $scope.account.lastName = name[1]
    }
    if ($scope.updateCard !== 'Select Card Type'){
      $scope.account.type = $scope.updateCard
    }
    var encrypted = encrypt(JSON.stringify(masterObj), masterPass);
    socket.emit('addFromElectron', { data: encrypted });
    $state.reload();
  }

  $scope.copyText = function(text){
    Clipboard.copy(text)
  }
})


app.controller('addCreditCardController', function($scope, $state, $stateParams, $rootScope) {

  $scope.creditCard = {
    name: null,
    cardNumber: null,
    ccv: null,
    expiration: null,
    firstName: null,
    lastName: null,
    type: null,
  }

  $scope.createCard = function() {
    var newId = masterObj.creditCard.length ? masterObj.creditCard[masterObj.creditCard.length - 1].id + 1 : 1;
    $scope.creditCard.id = newId
    if ($scope.creditCard) masterObj.creditCard.push($scope.creditCard)
    var encrypted = encrypt(JSON.stringify(masterObj), masterPass)
    socket.emit('addFromElectron', { data: encrypted })
    $rootScope.$evalAsync()
    $state.go('creditCard.single', { id: newId }, { reload: true })
  }

})

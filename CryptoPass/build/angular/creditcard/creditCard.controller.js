app.controller('creditCardController', function($scope) {
  $scope.accounts = masterObj.creditCard;
})


app.controller('singleCreditCardController', function($scope, $stateParams, Clipboard, $state, $timeout) {
  $scope.account = masterObj.creditCard.filter(info => info.id == $stateParams.id)[0]
  $scope.updateInfo = false;
  var fullName = $scope.account.firstName + ' ' + $scope.account.lastName;
  $scope.fullName = fullName;
  $scope.updateCard = 'Select Card Type'
  $scope.newAccount = angular.copy($scope.account)

  $scope.getImg = getImg;

  $scope.isActive = null

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
    $scope.account.lastUpdated = moment().format('MMMM Do YYYY, h:mm:ss a');
    encryptFile(masterObj, masterPass)
    .then(()=>{
      return settings.get('dropboxPath')
    })
    .then(val => {
      var encrypted = encrypt(JSON.stringify(masterObj), masterPass)
      socket.emit('addFromElectron', {data: encrypted, dropboxPath: val, fsSettingsPath: fsSettingsPath})
      $state.reload()
    })
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
    var newId = idGenerator($scope.creditCard)
    $scope.creditCard.id = newId
    $scope.creditCard.createdAt = moment().format('MMMM Do YYYY, h:mm:ss a');
    $scope.creditCard.lastUpdated = moment().format('MMMM Do YYYY, h:mm:ss a');
    if(!$scope.creditCard.cardNumber){
      alert('Please enter a Card Number')
      return;
    }
    if ($scope.creditCard) masterObj.creditCard.push($scope.creditCard)
    encryptFile(masterObj, masterPass)
    .then(()=>{
      return settings.get('dropboxPath')
    })
    .then(path => {
      var encrypted = encrypt(JSON.stringify(masterObj), masterPass)
      socket.emit('addFromElectron', { data: encrypted, dropboxPath: path, fsSettingsPath: fsSettingsPath })
      $rootScope.$evalAsync()
      $state.go('creditCard.single', { id: newId }, { reload: true })
    })
  }

})

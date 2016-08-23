app.controller('creditCardController', function($scope){
  $scope.accounts = masterObj.creditCard;
})

app.controller('creditCardSingleController', function($scope, $stateParams){
  console.log($stateParams);
  $scope.account = $stateParams.accountData;

  $scope.account = masterObj.creditCard.filter(info => info.id == $stateParams.id)[0]
  $scope.updateInfo = false;
  var fullName = $scope.account.firstName + ' ' + $scope.account.lastName;
  $scope.fullName = fullName;
  $scope.updateCard = 'Select Card Type'
  $scope.newAccount = angular.copy($scope.account)

  // $scope.getImg = getImg;

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
    var encrypted = encrypt(JSON.stringify(masterObj), masterPass);
    socket.emit('addFromElectron', { data: encrypted });
    $state.reload();
  }

  // $scope.copyText = function(text){
  //   Clipboard.copy(text)
  // }
})


app.controller('addcreditCardController', function($scope, $state, $stateParams, $rootScope){
	   var utilities = require('../angular/utilities/encrypt.utility.js');
     var encrypt = utilities.encrypt;
     var decryptData = utilities.decrypt;
     var dropboxUtils = require('../angular/utilities/dropbox.utility.js');
     var idGenerator = require('../angular/utilities/hash.utility.js').idGenerator;

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
    var newId = idGenerator($scope.creditCard);
    $scope.creditCard.id = newId
    if ($scope.creditCard) masterObj.creditCard.push($scope.creditCard)
    var encrypted = encrypt(JSON.stringify(masterObj), globalMasterPass)
    dropboxUtils.fileUpload(encrypted, '/mobileData.txt')
    .then(function(){
      $rootScope.$evalAsync()
      $state.go('creditCard.single', { id: newId }, { reload: true })
    })
    .catch(function(err){
      console.log(err);
    })
  }

})

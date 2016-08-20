app.controller('creditCardController', function($scope){
  $scope.accounts = masterObj.creditCard;
})

app.controller('creditCardSingleController', function($scope, $stateParams){
  console.log($stateParams);
  $scope.account = $stateParams.accountData;
})


app.controller('addcreditCardController', function($scope, $state, $stateParams, $rootScope){
	   // var dropboxUtilities = require('../../utilities/dropbox/dropbox.utilities.js')
	   var utils = require('../../utilities/encrypt.file.js');
	   var utilities = require('../../utilities/encrypt.utility.js');
	   var validate = utils.validate;
	   var decryptFile = utils.decryptFile;
       var encryptFile = utils.encryptFile;
       var encrypt = utilities.encrypt;
       var decryptData = utilities.decrypt;
       var getDataEncrypted = utils.getDataEncrypted
       var createRandom = require('../../utilities/password-utilities/pass.gen').createRandom
       var generateSecret = utils.generateSecret;

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
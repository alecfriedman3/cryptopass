app.controller('identityController', function($scope){
  $scope.accounts = masterObj.identity;
})


app.controller('identitySingleController', function($stateParams, $scope, $state){
  console.log($stateParams);
  console.log('in singleCont');
  $scope.account = $stateParams.accountData
  console.log(($state));
})

app.controller('addIdentityController', function($scope, $state, $stateParams, $rootScope) {
  var utilities = require('../angular/utilities/encrypt.utility.js');
  var encrypt = utilities.encrypt;
  var decryptData = utilities.decrypt;
  var idGenerator = require('../angular/utilities/hash.utility.js').idGenerator;
  var dropboxUtils = require('../angular/utilities/dropbox.utility.js');
  var moment = require('moment')

  $scope.identity = {
  	name: null,
  	data: null
  }

  $scope.createId = function() {
    var newId = idGenerator($scope.identity);
    $scope.identity.id = newId
    $scope.identity.createdAt = moment().format('MMMM Do YYYY, h:mm:ss a');
    $scope.identity.lastUpdated = moment().format('MMMM Do YYYY, h:mm:ss a');
    if ($scope.identity) masterObj.identity.push($scope.identity)
    var encrypted = encrypt(JSON.stringify(masterObj), globalMasterPass)
    dropboxUtils.fileUpload(encrypted, '/mobileData.txt')
    .then(function(){
      $rootScope.$evalAsync()
      $state.go('app.identity')
    })
    .catch(function(err){
      console.log(err);
    })
  }

})

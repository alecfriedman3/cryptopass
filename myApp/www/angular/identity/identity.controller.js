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

  $scope.identity = {
  	name: null,
  	data: null
  }

  // $scope.createId = function() {
  //   var newId = masterObj.identity.length ? masterObj.identity[masterObj.identity.length - 1].id + 1 : 1
  //   $scope.identity.id = newId
  //   if ($scope.identity) masterObj.identity.push($scope.identity)
  //   var encrypted = encrypt(JSON.stringify(masterObj), masterPass)
  //   socket.emit('addFromElectron', { data: encrypted })
  //   $rootScope.$evalAsync()
  //   $state.go('identity.single', { id: newId }, {reload: true})
  // }

})
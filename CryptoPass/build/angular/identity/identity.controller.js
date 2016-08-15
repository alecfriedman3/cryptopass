app.controller('identityController', function ($scope) {
  $scope.identity = masterObj.identity;
})

app.controller('singleIdentityController', function($scope, $stateParams){
  $scope.identity = masterObj.identity.filter(info => info.id == $stateParams.id)[0]
  $scope.updateInfo = false;
  $scope.showForm = function () {
    $scope.updateInfo = !$scope.updateInfo;
  }
})

app.controller('addIdentityController', function($scope, $state, $stateParams, $rootScope) {

  $scope.identity = {
  	name: null,
  	data: null
  }

  $scope.createId = function() {
    var newId = masterObj.identity[masterObj.identity.length - 1].id + 1
    $scope.identity.id = newId
    if ($scope.identity) masterObj.identity.push($scope.identity)
    var encrypted = encrypt(JSON.stringify(masterObj), masterPass)
    socket.emit('addFromElectron', { data: encrypted })
    $rootScope.$evalAsync()
    $state.go('identity.single', { id: newId })
  }

})

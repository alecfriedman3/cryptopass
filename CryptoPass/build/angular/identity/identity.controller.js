app.controller('identityController', function ($scope) {
  $scope.identity = masterObj.identity;
})

app.controller('singleIdentityController', function($scope, $stateParams, $state){
  $scope.identity = masterObj.identity.filter(info => info.id == $stateParams.id)[0]
  $scope.updateInfo = false;
  $scope.newAccount = angular.copy($scope.identity)

  $scope.getImg = getImg

  $scope.showForm = function () {
    $scope.updateInfo = !$scope.updateInfo;
  }

  $scope.changeInfo = function (){
    for (var key in $scope.newAccount){
      if ($scope.identity[key] !== $scope.newAccount[key]){
        $scope.identity[key] = $scope.newAccount[key]
      }
    }
    var encrypted = encrypt(JSON.stringify(masterObj), masterPass);
    socket.emit('addFromElectron', { data: encrypted });
    $state.reload();
  }

})

app.controller('addIdentityController', function($scope, $state, $stateParams, $rootScope) {

  $scope.identity = {
  	name: null,
  	data: null
  }

  $scope.createId = function() {
    var newId = masterObj.identity.length ? masterObj.identity[masterObj.identity.length - 1].id + 1 : 1
    $scope.identity.id = newId
    if ($scope.identity) masterObj.identity.push($scope.identity)
    var encrypted = encrypt(JSON.stringify(masterObj), masterPass)
    socket.emit('addFromElectron', { data: encrypted })
    $rootScope.$evalAsync()
    $state.go('identity.single', { id: newId }, {reload: true})
  }

})

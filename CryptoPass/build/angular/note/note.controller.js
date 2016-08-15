app.controller('noteController', function ($scope) {
  $scope.notes = masterObj.note;
})

app.controller('singleNoteController', function($scope, $stateParams){
  $scope.note = masterObj.note.filter(info => info.id == $stateParams.id)[0]
  $scope.updateInfo = false;
  $scope.showForm = function () {
    $scope.updateInfo = !$scope.updateInfo;
  }
})

app.controller('addNoteController', function($scope, $state, $stateParams, $rootScope) {

  $scope.note = {
  	name: null,
  	data: null
  }

  $scope.createNote = function() {
    var newId = masterObj.note[masterObj.note.length - 1].id + 1
    $scope.note.id = newId
    if ($scope.note) masterObj.note.push($scope.note)
    var encrypted = encrypt(JSON.stringify(masterObj), masterPass)
    socket.emit('addFromElectron', { data: encrypted })
    $rootScope.$evalAsync()
    $state.go('note.single', { id: newId })
  }

})

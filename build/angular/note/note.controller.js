app.controller('noteController', function ($scope) {
  $scope.notes = masterObj.note;
})

app.controller('singleNoteController', function($scope, $stateParams){
  $scope.note = masterObj.note.filter(info => info.id == $stateParams.id)[0]
})

app.controller('noteController', function ($scope) {
  $scope.notes = masterObj.note;
})

app.controller('singleNoteController', function($scope, $stateParams, $state){
  $scope.note = masterObj.note.filter(info => info.id == $stateParams.id)[0]
  $scope.updateInfo = false;
  $scope.newNote = angular.copy($scope.note)

  $scope.getImg = getImg

  $scope.showForm = function () {
    $scope.updateInfo = !$scope.updateInfo;
  }

  $scope.changeInfo = function (){
    for (var key in $scope.newNote){
      if ($scope.note[key] !== $scope.newNote[key]){
        $scope.note[key] = $scope.newNote[key]
      }
    }
    $scope.note.lastUpdated = moment().format('MMMM Do YYYY, h:mm:ss a');
    var encrypted = encrypt(JSON.stringify(masterObj), masterPass);
    socket.emit('addFromElectron', { data: encrypted });
    $state.reload();
  }

})

app.controller('addNoteController', function($scope, $state, $stateParams, $rootScope) {
  var settings = require('electron-settings');
  $scope.note = {
  	name: null,
  	data: null
  }

  $scope.createNote = function() {
    var newId = masterObj.note.length ? masterObj.note[masterObj.note.length - 1].id + 1 : 1;
    $scope.note.id = newId
    $scope.note.createdAt = moment().format('MMMM Do YYYY, h:mm:ss a');
    $scope.note.lastUpdated = moment().format('MMMM Do YYYY, h:mm:ss a');
    if ($scope.note) masterObj.note.push($scope.note)
    settings.get('dropboxPath')
    .then(path => {
      var encrypted = encrypt(JSON.stringify(masterObj), masterPass)
      socket.emit('addFromElectron', { data: encrypted, dropboxPath: path })
      $rootScope.$evalAsync()
      $state.go('note.single', { id: newId }, {reload: true})
    })
  }

})

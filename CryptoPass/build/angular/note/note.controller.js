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

})

app.controller('addNoteController', function($scope, $state, $stateParams, $rootScope) {
  var settings = require('electron-settings');
  $scope.note = {
  	name: null,
  	data: null
  }

  $scope.createNote = function() {
    var newId = idGenerator($scope.note);
    $scope.note.id = newId
    $scope.note.createdAt = moment().format('MMMM Do YYYY, h:mm:ss a');
    $scope.note.lastUpdated = moment().format('MMMM Do YYYY, h:mm:ss a');
    if ($scope.note) masterObj.note.push($scope.note)

    encryptFile(masterObj, masterPass)
    .then(()=>{
      return settings.get('dropboxPath')
    })
    .then(path => {
      var encrypted = encrypt(JSON.stringify(masterObj), masterPass)
      socket.emit('addFromElectron', { data: encrypted, dropboxPath: path, fsSettingsPath: fsSettingsPath })
      $rootScope.$evalAsync()
      $state.go('note.single', { id: newId }, {reload: true})
    })
  }

})

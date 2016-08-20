app.controller('noteController', function($scope){
  $scope.accounts = masterObj.note;
})

app.controller('noteSingleController', function($stateParams, $scope, $state){
  console.log($stateParams);
  console.log('in singleCont');
  $scope.account = $stateParams.accountData
  console.log(($state));
 })



app.controller('addNoteController', function($scope, $state, $stateParams, $rootScope) {
	   var utilities = require('../angular/utilities/encrypt.utility.js');
     var encrypt = utilities.encrypt;
     var decryptData = utilities.decrypt;

   $scope.note = {
  	name: null,
  	data: null
  }

  $scope.createNote = function() {
    var newId = masterObj.note.length ? masterObj.note[masterObj.note.length - 1].id + 1 : 1;
    $scope.note.id = newId
    if ($scope.note) masterObj.note.push($scope.note)
    var encrypted = encrypt(JSON.stringify(masterObj), masterPass)
    socket.emit('addFromElectron', { data: encrypted })
    $rootScope.$evalAsync()
    $state.go('note.single', { id: newId }, {reload: true})
  }
 })

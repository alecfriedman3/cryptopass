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
  var utils = require('../../utilities/encrypt.file.js');
	   var utilities = require('../../utilities/encrypt.utility.js');
	   // var validate = utils.validate;
	   // var decryptFile = utils.decryptFile;
    //    var encryptFile = utils.encryptFile;
    //    var encrypt = utilities.encrypt;
    //    var decryptData = utilities.decrypt;
    //    var getDataEncrypted = utils.getDataEncrypted
       var createRandom = require('../../utilities/password-utilities/pass.gen').createRandom
       // var generateSecret = utils.generateSecret;
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
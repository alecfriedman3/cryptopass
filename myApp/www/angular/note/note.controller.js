app.controller('noteController', function($scope){
  $scope.accounts = masterObj.note;
})

app.controller('noteSingleController', function($stateParams, $scope, $state){
  console.log($stateParams);
  console.log('in singleCont');
  $scope.account = $stateParams.accountData
  console.log(($state));

  $scope.note = masterObj.note.filter(info => info.id == $stateParams.id)[0]
  $scope.updateInfo = false;
  $scope.newNote = angular.copy($scope.note)

  // $scope.getImg = getImg

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
    $state.reload();
  }
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
    $rootScope.$evalAsync()
    $state.go('note.single', { id: newId }, {reload: true})
  }
 })

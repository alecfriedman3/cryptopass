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
     var idGenerator = require('../angular/utilities/hash.utility.js').idGenerator;
     var dropboxUtils = require('../angular/utilities/dropbox.utility.js');
     var moment = require('moment')

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
    var encrypted = encrypt(JSON.stringify(masterObj), globalMasterPass)
    dropboxUtils.fileUpload(encrypted, '/mobileData.txt')
    .then(function(){
      $rootScope.$evalAsync()
      $state.go('app.note')
    })
    .catch(function(err){
      console.log(err);
    })
  }
 })

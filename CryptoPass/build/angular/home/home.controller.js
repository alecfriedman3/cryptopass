app.controller('homeController', function($scope, $state, $rootScope){

  $scope.addItem = function (item) {
    $state.go(item);
  }
  var tempMasterObj = {}
  for (var key in masterObj){
    tempMasterObj[key] = masterObj[key].filter(obj => !obj.deleted)
  }
  if (tempMasterObj.login.length) {
    $state.go('login.single', {id: tempMasterObj.login[0].id})
  } else if (tempMasterObj.creditCard.length) {
    $state.go('creditCard.single', {id: tempMasterObj.creditCard[0].id})
  } else if (tempMasterObj.identity.length) {
    $state.go('identity.single', {id: tempMasterObj.identity[0].id})
  } else if (tempMasterObj.note.length) {
    $state.go('note.single', {id: tempMasterObj.note[0].id})
  } else {
    console.log("you've got an empty master object");
  }

});

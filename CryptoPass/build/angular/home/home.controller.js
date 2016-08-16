app.controller('homeController', function($scope, $state, $rootScope){

  $scope.addItem = function (item) {
    $state.go(item);
  }

  if (masterObj.login.length) {
    console.log('fuck')
    $state.go('login.single', {id: masterObj.login[0].id})
  } else if (masterObj.creditCard.length) {
    $state.go('creditCard.single', {id: masterObj.creditCard[0].id})
  } else if (masterObj.identity.length) {
    $state.go('identity.single', {id: masterObj.identity[0].id})
  } else if (masterObj.note.length) {
    $state.go('note.single', {id: masterObj.note[0].id})
  } else {
    console.log("you've got an empty master object");
  }

});

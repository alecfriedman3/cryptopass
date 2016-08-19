app.controller('openController', function($scope, $state, $rootScope){

  settings.get('user1').then(val => {
    if (val) {
      $state.go('auth');
    } else {
      $state.go('firstLogin');
    }
  })

});

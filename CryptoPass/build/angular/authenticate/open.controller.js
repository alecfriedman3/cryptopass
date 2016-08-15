app.controller('openController', function($scope, $state, $rootScope){

  settings.get('usser').then(val => {
    if (val) {
      $state.go('auth');
    } else {
      $state.go('firstLogin');
    }
  })

});

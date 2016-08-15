app.controller('openController', function($scope, $state, $rootScope){

  settings.get('userds').then(val => {
    if (val) {
      // console.log(val);
      $state.go('auth');
    } else {
      $state.go('firstLogin');
    }
  })

});

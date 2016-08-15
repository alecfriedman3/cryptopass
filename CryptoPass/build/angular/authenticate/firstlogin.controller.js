// var username = require('username')
// var settings = require('electron-settings');

app.controller('firstLoginController', function($scope, $state, $rootScope){

  $scope.master = null;

  $scope.setPassword = function (master){
    if ($scope.master === $scope.master2) {
      utils.generateSecret(master);
      utils.encryptFile({}, master);
      settings.set('user', true).then(() => {
        $rootScope.validated = true;
        $rootScope.$evalAsync()
        $state.go('home')
      })
    } else {
      alert ("Your Passwords Do Not Match!");
    }
  }

  $scope.username;

  username().then(username => {
    $scope.username = username;
    $scope.$evalAsync()
  })

});

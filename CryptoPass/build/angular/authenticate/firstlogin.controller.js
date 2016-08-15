let username = require('username')
let settings = require('electron-settings');

app.controller('firstLoginController', function($scope, $state, $rootScope){

  $scope.master = null;

  $scope.setPassword = function (master){
    utils.generateSecret(master);
    settings.set('user', {
      exists: true
    })
      .then(function () {
        $rootScope.validated = true;
        $rootScope.$evalAsync()
        $state.go('home')
      })
  }

  $scope.username;

  username().then(username => {
    $scope.username = username;
    $scope.$evalAsync()
  })

});

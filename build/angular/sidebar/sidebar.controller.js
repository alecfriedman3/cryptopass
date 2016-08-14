let username = require('username')
app.controller('sidebarController', function($rootScope, $scope){
  $scope.masterObj = masterObj;
  $scope.username;

  username().then(username => {
    $scope.username = username;
    console.log(username);
    $scope.$evalAsync()
  })
});

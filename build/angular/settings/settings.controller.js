app.controller('settingsController', function($scope, $stateParams){
  console.log($stateParams);
  $scope.sidebar = $stateParams.currentSidebar;

})

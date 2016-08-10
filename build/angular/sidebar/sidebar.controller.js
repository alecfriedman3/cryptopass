app.controller('sidebarController', function($rootScope, $scope){
  $scope.shown = false;
  $rootScope.$on('showSidebar', function(things, args){
    console.log('got the broadcast');
    $scope.shown = !$scope.shown;
  })
  $scope.items = [
    {
      title: 'Facebook.com',
      secondaryTitle: 'elliottmcnary@gmail.com'
    },
    {
      title: 'WellsFargo.com',
      secondaryTitle: 'wellsfargoemail@gmail.com'
    },
    {
      title: 'twitter.com',
      secondaryTitle: 'twitterEl@gmail.com'
    },
    {
      title: 'Chase',
      secondaryTitle: 'elliottmcnary@gmail.com'
    },
  ]
  $scope.active = "Login"
})

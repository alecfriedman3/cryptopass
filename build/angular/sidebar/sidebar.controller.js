app.controller('sidebarController', function($rootScope, $scope){
  $scope.shown = false;
  // I believe this could just be $scope.$on, and not $rootscope. Broadcasts can be heard by all child scopes
  $rootScope.$on('showSidebar', function(things, args){
    console.log('got the broadcast');
    // should also set a $scope.active in here with a message from the broadcast
    $scope.shown = !$scope.shown;
  })
	// now we can grab items from our decrypted object based on which set of items we want
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

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('tabsController.cryptoPass', {
    url: '/home',
    views: {
      'tab1': {
        templateUrl: 'templates/cryptoPass.html',
        controller: 'cryptoPassCtrl'
      }
    }
  })
})
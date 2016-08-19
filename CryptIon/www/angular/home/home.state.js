app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('home', {
    url: '/home',
    views: {
      'tab1': {
        templateUrl: 'angular/home/home.view.html',
        controller: 'cryptoPassCtrl'
      }
    }
  })

})
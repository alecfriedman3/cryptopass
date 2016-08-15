app.config(function($stateProvider) {
  $stateProvider.state('auth', {
    url: '/',
    templateUrl: 'build/angular/authenticate/authenticate.view.html',
    controller: 'authController'
  })

})

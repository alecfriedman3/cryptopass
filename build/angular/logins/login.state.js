app.config(function($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'build/angular/logins/logins.view.html',
    controller: 'loginController'
  })
})

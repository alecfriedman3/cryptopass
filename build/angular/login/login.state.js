app.config(function($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'build/angular/login/login.view.html',
    controller: 'loginController'
  })
})

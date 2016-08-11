app.config(function($stateProvider) {
  $stateProvider.state('logins', {
    url: '/logins',
    templateUrl: 'build/angular/logins/logins.view.html',
    controller: 'loginsController'
  })

})

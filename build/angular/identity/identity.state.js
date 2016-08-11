app.config(function($stateProvider) {
  $stateProvider.state('identity', {
    url: '/identity',
    templateUrl: 'build/angular/identity/identity.view.html',
    controller: 'identityController'
  })
})
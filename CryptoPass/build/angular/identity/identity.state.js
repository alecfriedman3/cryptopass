app.config(function($stateProvider) {
  $stateProvider.state('identity', {
    url: '/identity',
    templateUrl: 'build/angular/identity/identity.view.html',
    controller: 'identityController'
  })
})

app.config(function($stateProvider) {
  $stateProvider.state('identity.single', {
    url: '/identity/:id',
    templateUrl: 'build/angular/identity/identity.single.view.html',
    controller: 'singleIdentityController'
  })
})

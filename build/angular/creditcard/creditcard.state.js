app.config(function($stateProvider) {
  $stateProvider.state('creditCard', {
    url: '/creditCard',
    templateUrl: 'build/angular/creditCard/creditCard.view.html',
    controller: 'creditCardController'
  })
})
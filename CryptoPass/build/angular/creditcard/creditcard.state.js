app.config(function($stateProvider) {
  $stateProvider.state('creditCard', {
    url: '/creditCard',
    templateUrl: 'build/angular/creditCard/creditCard.view.html',
    controller: 'creditCardController'
  })
})

app.config(function($stateProvider) {
  $stateProvider.state('creditCard.single', {
    url: '/creditCard/:id',
    templateUrl: 'build/angular/creditcard/creditCard.single.view.html',
    controller: 'singleCreditCardController'
  })
})

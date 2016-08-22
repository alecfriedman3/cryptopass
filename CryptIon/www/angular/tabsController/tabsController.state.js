app.config(function($stateProvider, $urlRouterProvider) {
 $stateProvider
  .state('tabsController', {
    url: '/page1',
    templateUrl: 'www/angular/tabsController/tabsController.view.html',
    abstract:true
  })
})
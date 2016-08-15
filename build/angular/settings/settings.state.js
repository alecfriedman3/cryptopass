app.config(function($stateProvider) {
  $stateProvider.state('settings', {
    url: '/settings',
    templateUrl: 'build/angular/settings/settings.view.html',
    controller: 'settingsController',
    params: {currentSidebar: null}
  })
})

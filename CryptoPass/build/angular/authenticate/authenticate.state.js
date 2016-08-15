// var settings = require('electron-settings');
app.config(function($stateProvider) {

  $stateProvider.state('open', {
    url: '/',
    templateUrl: 'build/angular/authenticate/open.view.html',
    controller: 'openController'
  })

  $stateProvider.state('auth', {
    url: '/auth',
    templateUrl: 'build/angular/authenticate/authenticate.view.html',
    controller: 'authController'
  })

  $stateProvider.state('firstLogin', {
    url: '/firstlogin',
    templateUrl: 'build/angular/authenticate/firstlogin.view.html',
    controller: 'firstLoginController'
  })
})

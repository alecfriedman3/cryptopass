var settings = require('electron-settings');
app.config(function($stateProvider) {

  if (settings.get('user.exists') === true) {
    $stateProvider.state('auth', {
      url: '/',
      templateUrl: 'build/angular/authenticate/authenticate.view.html',
      controller: 'authController'
    })
  } else {
    $stateProvider.state('firstLogin', {
      url: '/',
      templateUrl: 'build/angular/authenticate/firstlogin.view.html',
      controller: 'firstLoginController'
    })
  }
})

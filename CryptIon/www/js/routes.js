angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.cryptoPass', {
    url: '/home',
    views: {
      'tab1': {
        templateUrl: 'templates/cryptoPass.html',
        controller: 'cryptoPassCtrl'
      }
    }
  })

  .state('logIn', {
    url: '/auth',
    templateUrl: 'templates/logIn.html',
    controller: 'logInCtrl'
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('logins', {
    url: '/logins',
    templateUrl: 'templates/logins.html',
    controller: 'loginsCtrl'
  })

  .state('creditcards', {
    url: '/creditcards',
    templateUrl: 'templates/creditcards.html',
    controller: 'creditcardsCtrl'
  })

  .state('identity', {
    url: '/identity',
    templateUrl: 'templates/identity.html',
    controller: 'identityCtrl'
  })

  .state('notes', {
    url: '/notes',
    templateUrl: 'templates/notes.html',
    controller: 'notesCtrl'
  })

  .state('loginDeatails', {
    url: '/loginDeatails',
    templateUrl: 'templates/loginDeatails.html',
    controller: 'loginDeatailsCtrl'
  })

  .state('creditcardDetails', {
    url: '/creditcardDetails',
    templateUrl: 'templates/creditcardDetails.html',
    controller: 'creditcardDetailsCtrl'
  })

  .state('identityDetails', {
    url: '/identityDetails',
    templateUrl: 'templates/identityDetails.html',
    controller: 'identityDetailsCtrl'
  })

  .state('notedetails', {
    url: '/noteDetails',
    templateUrl: 'templates/notedetails.html',
    controller: 'notedetailsCtrl'
  })

  .state('tabsController.mENUE', {
    url: '/thiswillnotbeblank',
    views: {
      'tab2': {
        templateUrl: 'templates/mENUE.html',
        controller: 'mENUECtrl'
      }
    }
  })

  .state('tabsController.settings', {
    url: '/settings',
    views: {
      'tab3': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })

  .state('page', {
    url: '/filters',
    templateUrl: 'templates/page.html',
    controller: 'pageCtrl'
  })

$urlRouterProvider.otherwise('/page1/home')

  

});
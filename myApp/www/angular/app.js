// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var app = angular.module('cryptoPass', ['ionic', 'ngCordova', 'ngCordovaOauth', 'ngStorage', 'ui.slider'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })


  .state('auth', {
      url: '/auth',
      views: {
        'auth': {
          templateUrl: 'angular/authenticate/auth.view.html',
          controller: 'authController'
        }
      }
    })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'angular/home/home.view.html',
        controller: 'homeController'
      }
    }
  })

  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'angular/login/login.view.html',
        controller: 'loginController'
      }
    }
  })
  .state('app.loginSingle', {
    url: '/login/:id',
    params: {accountData: null},
    views: {
      'menuContent': {
        templateUrl: 'angular/login/login.single.html',
        controller: 'loginSingleController'
      }
    }
  })


  .state('app.loginAdd', {
    url: '/login/add',
    views: {
      'menuContent': {
        templateUrl: 'angular/login/login.add.view.html',
        controller: 'addLoginController'
      }
    }

})
  .state('app.creditCard', {
    url: '/creditCard',
    views: {
      'menuContent': {
        templateUrl: 'angular/creditCard/creditCards.all.view.html',
        controller: 'creditCardController'
      }
    }
  })
  .state('app.creditCardSingle', {
    url: '/creditCard/:id',
    params: {accountData: null},
    views: {
      'menuContent': {
        templateUrl: 'angular/creditCard/creditCard.single.html',
        controller: 'creditCardSingleController'
      }
    }
  })

  .state('app.creditCardAdd', {
    url: '/creditCard/add',
    views: {
      'menuContent': {
        templateUrl: 'angular/creditCard/creditCard.add.view.html',
        controller: 'addcreditCardController'
      }
    }

})
  .state('app.identity', {
      url: '/identity',
      views: {
        'menuContent': {
          templateUrl: 'angular/identity/identity.all.view.html',
          controller: 'identityController'
        }
      }
    })

    .state('app.identitySingle', {
    url: '/identity/:id',
    params: {accountData: null},
    views: {
      'menuContent': {
        templateUrl: 'angular/identity/identity.single.html',
        controller: 'identitySingleController'
      }
    }
  })
      .state('app.identityAdd', {
    url: '/identity/add',
    views: {
      'menuContent': {
        templateUrl: 'angular/identity/identity.add.view.html',
        controller: 'addIdentityController'
      }
    }

})
    .state('app.note', {
      url: '/note',
      views: {
        'menuContent': {
          templateUrl: 'angular/note/note.view.html',
          controller: 'noteController'
        }
      }
    })

  .state('app.noteSingle', {
      url: '/note/:id',
       params: {accountData: null},
      views: {
        'menuContent': {
          templateUrl: 'angular/note/note.single.html',
          controller: 'noteSingleController'
        }
      }
    })

   .state('app.noteAdd', {
    url: '/note/add',
     views: {
      'menuContent': {
        templateUrl: 'angular/note/note.add.view.html',
         controller: 'addNoteController'
       }
    }

 })
  .state('app.settings', {
    url: '/settings',
    views: {
      'menuContent': {
        templateUrl: 'angular/settings/settings.view.html',
        controller: 'settingsController'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/auth');
})
.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, $rootScope) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.addItem = function (){
    var category = $state.current.name.split('.')[1].replace(/Add/g, '').replace(/Single/g, '');
    console.log(category)
    if (category == 'settings' || category == 'home') return
    $state.go('app.' + category + 'Add')
  }
})

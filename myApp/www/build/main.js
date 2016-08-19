(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('cryptoPass', ['ionic', 'ngCordovaOauth'])

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
    .state('app.note', {
      url: '/note',
      views: {
        'menuContent': {
          templateUrl: 'angular/note/note.all.view.html',
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
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

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
})

app.controller('authController', function($scope, $state){
	// $scope.master = null;
	$scope.checkMaster=function(master){
		console.log(master)
		$state.go('app.home');
	}
})
app.controller('creditCardController', function($scope){
  $scope.accounts = masterObj.creditCard;
})

app.controller('creditCardSingleController', function($scope, $stateParams){
  console.log($stateParams);
  $scope.account = $stateParams.accountData;
})

app.controller('homeController', function($scope){
	
})
app.controller('identityController', function($scope){
  $scope.accounts = masterObj.identity;
})


app.controller('identitySingleController', function($stateParams, $scope, $state){
  console.log($stateParams);
  console.log('in singleCont');
  $scope.account = $stateParams.accountData
  console.log(($state));
})

app.controller('loginController', function($scope, $state){
  $scope.accounts = masterObj.login;

})

app.controller('loginSingleController', function($stateParams, $scope, $state){
  console.log($stateParams);
  console.log('in singleCont');
  $scope.account = $stateParams.accountData
  console.log(($state));
})

app.controller('noteController', function($scope){
  $scope.accounts = masterObj.note;
})

app.controller('noteSingleController', function($stateParams, $scope, $state){
  console.log($stateParams);
  console.log('in singleCont');
  $scope.account = $stateParams.accountData
  console.log(($state));
})

app.controller('settingsController', function($scope, $cordovaOauth){
  $scope.dropboxAuth = function(){
    console.log('clicked on ausdfth');
    $cordovaOauth.dropbox('pg8nt8sn9h5yidb')
    .then(function(res){
      console.dir(res);
    })
  };
})


},{}]},{},[1]);

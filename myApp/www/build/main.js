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

app.controller('homeController', function($scope){
	
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImF1dGhlbnRpY2F0ZS9hdXRoLmNvbnRyb2xsZXIuanMiLCJjcmVkaXRDYXJkL2NyZWRpdENhcmQuY29udHJvbGxlci5qcyIsImlkZW50aXR5L2lkZW50aXR5LmNvbnRyb2xsZXIuanMiLCJsb2dpbi9sb2dpbi5jb250cm9sbGVyLmpzIiwiaG9tZS9ob21lLmNvbnRyb2xsZXIuanMiLCJub3RlL25vdGUuY29udHJvbGxlci5qcyIsInNldHRpbmdzL3NldHRpbmdzLmNvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJb25pYyBTdGFydGVyIEFwcFxuXG4vLyBhbmd1bGFyLm1vZHVsZSBpcyBhIGdsb2JhbCBwbGFjZSBmb3IgY3JlYXRpbmcsIHJlZ2lzdGVyaW5nIGFuZCByZXRyaWV2aW5nIEFuZ3VsYXIgbW9kdWxlc1xuLy8gJ3N0YXJ0ZXInIGlzIHRoZSBuYW1lIG9mIHRoaXMgYW5ndWxhciBtb2R1bGUgZXhhbXBsZSAoYWxzbyBzZXQgaW4gYSA8Ym9keT4gYXR0cmlidXRlIGluIGluZGV4Lmh0bWwpXG4vLyB0aGUgMm5kIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvZiAncmVxdWlyZXMnXG4vLyAnc3RhcnRlci5jb250cm9sbGVycycgaXMgZm91bmQgaW4gY29udHJvbGxlcnMuanNcbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnY3J5cHRvUGFzcycsIFsnaW9uaWMnLCAnbmdDb3Jkb3ZhT2F1dGgnXSlcblxuLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xuICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxuICAgIGlmICh3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwodHJ1ZSk7XG5cbiAgICB9XG4gICAgaWYgKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgIC8vIG9yZy5hcGFjaGUuY29yZG92YS5zdGF0dXNiYXIgcmVxdWlyZWRcbiAgICAgIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtcbiAgICB9XG4gIH0pO1xufSlcblxuLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlcikge1xuICAkc3RhdGVQcm92aWRlclxuXG4gICAgLnN0YXRlKCdhcHAnLCB7XG4gICAgdXJsOiAnL2FwcCcsXG4gICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvbWVudS5odG1sJyxcbiAgICBjb250cm9sbGVyOiAnQXBwQ3RybCdcbiAgfSlcbiAgLnN0YXRlKCdhdXRoJywge1xuICAgICAgdXJsOiAnL2F1dGgnLFxuICAgICAgdmlld3M6IHtcbiAgICAgICAgJ2F1dGgnOiB7XG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdhbmd1bGFyL2F1dGhlbnRpY2F0ZS9hdXRoLnZpZXcuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ2F1dGhDb250cm9sbGVyJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgLnN0YXRlKCdhcHAuaG9tZScsIHtcbiAgICB1cmw6ICcvaG9tZScsXG4gICAgdmlld3M6IHtcbiAgICAgICdtZW51Q29udGVudCc6IHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdhbmd1bGFyL2hvbWUvaG9tZS52aWV3Lmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnaG9tZUNvbnRyb2xsZXInXG4gICAgICB9XG4gICAgfVxuICB9KVxuXG4gIC5zdGF0ZSgnYXBwLmxvZ2luJywge1xuICAgIHVybDogJy9sb2dpbicsXG4gICAgdmlld3M6IHtcbiAgICAgICdtZW51Q29udGVudCc6IHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdhbmd1bGFyL2xvZ2luL2xvZ2luLnZpZXcuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdsb2dpbkNvbnRyb2xsZXInXG4gICAgICB9XG4gICAgfVxuICB9KVxuICAuc3RhdGUoJ2FwcC5sb2dpblNpbmdsZScsIHtcbiAgICB1cmw6ICcvbG9naW4vOmlkJyxcbiAgICBwYXJhbXM6IHthY2NvdW50RGF0YTogbnVsbH0sXG4gICAgdmlld3M6IHtcbiAgICAgICdtZW51Q29udGVudCc6IHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdhbmd1bGFyL2xvZ2luL2xvZ2luLnNpbmdsZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ2xvZ2luU2luZ2xlQ29udHJvbGxlcidcbiAgICAgIH1cbiAgICB9XG4gIH0pXG4gIC5zdGF0ZSgnYXBwLmNyZWRpdENhcmQnLCB7XG4gICAgdXJsOiAnL2NyZWRpdENhcmQnLFxuICAgIHZpZXdzOiB7XG4gICAgICAnbWVudUNvbnRlbnQnOiB7XG4gICAgICAgIHRlbXBsYXRlVXJsOiAnYW5ndWxhci9jcmVkaXRDYXJkL2NyZWRpdENhcmRzLmFsbC52aWV3Lmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnY3JlZGl0Q2FyZENvbnRyb2xsZXInXG4gICAgICB9XG4gICAgfVxuICB9KVxuICAuc3RhdGUoJ2FwcC5jcmVkaXRDYXJkU2luZ2xlJywge1xuICAgIHVybDogJy9jcmVkaXRDYXJkLzppZCcsXG4gICAgcGFyYW1zOiB7YWNjb3VudERhdGE6IG51bGx9LFxuICAgIHZpZXdzOiB7XG4gICAgICAnbWVudUNvbnRlbnQnOiB7XG4gICAgICAgIHRlbXBsYXRlVXJsOiAnYW5ndWxhci9jcmVkaXRDYXJkL2NyZWRpdENhcmQuc2luZ2xlLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnY3JlZGl0Q2FyZFNpbmdsZUNvbnRyb2xsZXInXG4gICAgICB9XG4gICAgfVxuICB9KVxuICAuc3RhdGUoJ2FwcC5pZGVudGl0eScsIHtcbiAgICAgIHVybDogJy9pZGVudGl0eScsXG4gICAgICB2aWV3czoge1xuICAgICAgICAnbWVudUNvbnRlbnQnOiB7XG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdhbmd1bGFyL2lkZW50aXR5L2lkZW50aXR5LmFsbC52aWV3Lmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdpZGVudGl0eUNvbnRyb2xsZXInXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLnN0YXRlKCdhcHAuaWRlbnRpdHlTaW5nbGUnLCB7XG4gICAgdXJsOiAnL2lkZW50aXR5LzppZCcsXG4gICAgcGFyYW1zOiB7YWNjb3VudERhdGE6IG51bGx9LFxuICAgIHZpZXdzOiB7XG4gICAgICAnbWVudUNvbnRlbnQnOiB7XG4gICAgICAgIHRlbXBsYXRlVXJsOiAnYW5ndWxhci9pZGVudGl0eS9pZGVudGl0eS5zaW5nbGUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdpZGVudGl0eVNpbmdsZUNvbnRyb2xsZXInXG4gICAgICB9XG4gICAgfVxuICB9KVxuICAgIC5zdGF0ZSgnYXBwLm5vdGUnLCB7XG4gICAgICB1cmw6ICcvbm90ZScsXG4gICAgICB2aWV3czoge1xuICAgICAgICAnbWVudUNvbnRlbnQnOiB7XG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdhbmd1bGFyL25vdGUvbm90ZS5hbGwudmlldy5odG1sJyxcbiAgICAgICAgICBjb250cm9sbGVyOiAnbm90ZUNvbnRyb2xsZXInXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gIC5zdGF0ZSgnYXBwLm5vdGVTaW5nbGUnLCB7XG4gICAgICB1cmw6ICcvbm90ZS86aWQnLFxuICAgICAgIHBhcmFtczoge2FjY291bnREYXRhOiBudWxsfSxcbiAgICAgIHZpZXdzOiB7XG4gICAgICAgICdtZW51Q29udGVudCc6IHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FuZ3VsYXIvbm90ZS9ub3RlLnNpbmdsZS5odG1sJyxcbiAgICAgICAgICBjb250cm9sbGVyOiAnbm90ZVNpbmdsZUNvbnRyb2xsZXInXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAuc3RhdGUoJ2FwcC5zZXR0aW5ncycsIHtcbiAgICB1cmw6ICcvc2V0dGluZ3MnLFxuICAgIHZpZXdzOiB7XG4gICAgICAnbWVudUNvbnRlbnQnOiB7XG4gICAgICAgIHRlbXBsYXRlVXJsOiAnYW5ndWxhci9zZXR0aW5ncy9zZXR0aW5ncy52aWV3Lmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnc2V0dGluZ3NDb250cm9sbGVyJ1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIC8vIGlmIG5vbmUgb2YgdGhlIGFib3ZlIHN0YXRlcyBhcmUgbWF0Y2hlZCwgdXNlIHRoaXMgYXMgdGhlIGZhbGxiYWNrXG4gICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9hdXRoJyk7XG59KVxuLmNvbnRyb2xsZXIoJ0FwcEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsLCAkdGltZW91dCkge1xuXG4gIC8vIFdpdGggdGhlIG5ldyB2aWV3IGNhY2hpbmcgaW4gSW9uaWMsIENvbnRyb2xsZXJzIGFyZSBvbmx5IGNhbGxlZFxuICAvLyB3aGVuIHRoZXkgYXJlIHJlY3JlYXRlZCBvciBvbiBhcHAgc3RhcnQsIGluc3RlYWQgb2YgZXZlcnkgcGFnZSBjaGFuZ2UuXG4gIC8vIFRvIGxpc3RlbiBmb3Igd2hlbiB0aGlzIHBhZ2UgaXMgYWN0aXZlIChmb3IgZXhhbXBsZSwgdG8gcmVmcmVzaCBkYXRhKSxcbiAgLy8gbGlzdGVuIGZvciB0aGUgJGlvbmljVmlldy5lbnRlciBldmVudDpcbiAgLy8kc2NvcGUuJG9uKCckaW9uaWNWaWV3LmVudGVyJywgZnVuY3Rpb24oZSkge1xuICAvL30pO1xuXG4gIC8vIEZvcm0gZGF0YSBmb3IgdGhlIGxvZ2luIG1vZGFsXG4gICRzY29wZS5sb2dpbkRhdGEgPSB7fTtcblxuICAvLyBDcmVhdGUgdGhlIGxvZ2luIG1vZGFsIHRoYXQgd2Ugd2lsbCB1c2UgbGF0ZXJcbiAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCd0ZW1wbGF0ZXMvbG9naW4uaHRtbCcsIHtcbiAgICBzY29wZTogJHNjb3BlXG4gIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAkc2NvcGUubW9kYWwgPSBtb2RhbDtcbiAgfSk7XG5cbiAgLy8gVHJpZ2dlcmVkIGluIHRoZSBsb2dpbiBtb2RhbCB0byBjbG9zZSBpdFxuICAkc2NvcGUuY2xvc2VMb2dpbiA9IGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5oaWRlKCk7XG4gIH07XG5cbiAgLy8gT3BlbiB0aGUgbG9naW4gbW9kYWxcbiAgJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLnNob3coKTtcbiAgfTtcblxuICAvLyBQZXJmb3JtIHRoZSBsb2dpbiBhY3Rpb24gd2hlbiB0aGUgdXNlciBzdWJtaXRzIHRoZSBsb2dpbiBmb3JtXG4gICRzY29wZS5kb0xvZ2luID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coJ0RvaW5nIGxvZ2luJywgJHNjb3BlLmxvZ2luRGF0YSk7XG5cbiAgICAvLyBTaW11bGF0ZSBhIGxvZ2luIGRlbGF5LiBSZW1vdmUgdGhpcyBhbmQgcmVwbGFjZSB3aXRoIHlvdXIgbG9naW5cbiAgICAvLyBjb2RlIGlmIHVzaW5nIGEgbG9naW4gc3lzdGVtXG4gICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAkc2NvcGUuY2xvc2VMb2dpbigpO1xuICAgIH0sIDEwMDApO1xuICB9O1xufSlcbiIsImFwcC5jb250cm9sbGVyKCdhdXRoQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlKXtcblx0Ly8gJHNjb3BlLm1hc3RlciA9IG51bGw7XG5cdCRzY29wZS5jaGVja01hc3Rlcj1mdW5jdGlvbihtYXN0ZXIpe1xuXHRcdGNvbnNvbGUubG9nKG1hc3Rlcilcblx0XHQkc3RhdGUuZ28oJ2FwcC5ob21lJyk7XG5cdH1cbn0pIiwiYXBwLmNvbnRyb2xsZXIoJ2NyZWRpdENhcmRDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlKXtcbiAgJHNjb3BlLmFjY291bnRzID0gbWFzdGVyT2JqLmNyZWRpdENhcmQ7XG59KVxuXG5hcHAuY29udHJvbGxlcignY3JlZGl0Q2FyZFNpbmdsZUNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZVBhcmFtcyl7XG4gIGNvbnNvbGUubG9nKCRzdGF0ZVBhcmFtcyk7XG4gICRzY29wZS5hY2NvdW50ID0gJHN0YXRlUGFyYW1zLmFjY291bnREYXRhO1xufSlcbiIsImFwcC5jb250cm9sbGVyKCdpZGVudGl0eUNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUpe1xuICAkc2NvcGUuYWNjb3VudHMgPSBtYXN0ZXJPYmouaWRlbnRpdHk7XG59KVxuXG5cbmFwcC5jb250cm9sbGVyKCdpZGVudGl0eVNpbmdsZUNvbnRyb2xsZXInLCBmdW5jdGlvbigkc3RhdGVQYXJhbXMsICRzY29wZSwgJHN0YXRlKXtcbiAgY29uc29sZS5sb2coJHN0YXRlUGFyYW1zKTtcbiAgY29uc29sZS5sb2coJ2luIHNpbmdsZUNvbnQnKTtcbiAgJHNjb3BlLmFjY291bnQgPSAkc3RhdGVQYXJhbXMuYWNjb3VudERhdGFcbiAgY29uc29sZS5sb2coKCRzdGF0ZSkpO1xufSlcbiIsImFwcC5jb250cm9sbGVyKCdsb2dpbkNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZSl7XG4gICRzY29wZS5hY2NvdW50cyA9IG1hc3Rlck9iai5sb2dpbjtcblxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ2xvZ2luU2luZ2xlQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzdGF0ZVBhcmFtcywgJHNjb3BlLCAkc3RhdGUpe1xuICBjb25zb2xlLmxvZygkc3RhdGVQYXJhbXMpO1xuICBjb25zb2xlLmxvZygnaW4gc2luZ2xlQ29udCcpO1xuICAkc2NvcGUuYWNjb3VudCA9ICRzdGF0ZVBhcmFtcy5hY2NvdW50RGF0YVxuICBjb25zb2xlLmxvZygoJHN0YXRlKSk7XG59KVxuIiwiYXBwLmNvbnRyb2xsZXIoJ2hvbWVDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlKXtcblx0XG59KSIsImFwcC5jb250cm9sbGVyKCdub3RlQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICRzY29wZS5hY2NvdW50cyA9IG1hc3Rlck9iai5ub3RlO1xufSlcblxuYXBwLmNvbnRyb2xsZXIoJ25vdGVTaW5nbGVDb250cm9sbGVyJywgZnVuY3Rpb24oJHN0YXRlUGFyYW1zLCAkc2NvcGUsICRzdGF0ZSl7XG4gIGNvbnNvbGUubG9nKCRzdGF0ZVBhcmFtcyk7XG4gIGNvbnNvbGUubG9nKCdpbiBzaW5nbGVDb250Jyk7XG4gICRzY29wZS5hY2NvdW50ID0gJHN0YXRlUGFyYW1zLmFjY291bnREYXRhXG4gIGNvbnNvbGUubG9nKCgkc3RhdGUpKTtcbn0pXG4iLCJhcHAuY29udHJvbGxlcignc2V0dGluZ3NDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkY29yZG92YU9hdXRoKXtcbiAgJHNjb3BlLmRyb3Bib3hBdXRoID0gZnVuY3Rpb24oKXtcbiAgICBjb25zb2xlLmxvZygnY2xpY2tlZCBvbiBhdXNkZnRoJyk7XG4gICAgJGNvcmRvdmFPYXV0aC5kcm9wYm94KCdwZzhudDhzbjloNXlpZGInKVxuICAgIC50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gICAgICBjb25zb2xlLmRpcihyZXMpO1xuICAgIH0pXG4gIH07XG59KVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

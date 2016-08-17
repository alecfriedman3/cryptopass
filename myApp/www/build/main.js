// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('cryptoPass', ['ionic'])

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
      'menuContent': {
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

app.controller('settingsController', function($scope){
  $scope.dropboxAuth = function(){
    console.log('from settings! ');
  };
})

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImF1dGhlbnRpY2F0ZS9hdXRoLmNvbnRyb2xsZXIuanMiLCJjcmVkaXRDYXJkL2NyZWRpdENhcmQuY29udHJvbGxlci5qcyIsImhvbWUvaG9tZS5jb250cm9sbGVyLmpzIiwiaWRlbnRpdHkvaWRlbnRpdHkuY29udHJvbGxlci5qcyIsImxvZ2luL2xvZ2luLmNvbnRyb2xsZXIuanMiLCJub3RlL25vdGUuY29udHJvbGxlci5qcyIsInNldHRpbmdzL3NldHRpbmdzLmNvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIElvbmljIFN0YXJ0ZXIgQXBwXG5cbi8vIGFuZ3VsYXIubW9kdWxlIGlzIGEgZ2xvYmFsIHBsYWNlIGZvciBjcmVhdGluZywgcmVnaXN0ZXJpbmcgYW5kIHJldHJpZXZpbmcgQW5ndWxhciBtb2R1bGVzXG4vLyAnc3RhcnRlcicgaXMgdGhlIG5hbWUgb2YgdGhpcyBhbmd1bGFyIG1vZHVsZSBleGFtcGxlIChhbHNvIHNldCBpbiBhIDxib2R5PiBhdHRyaWJ1dGUgaW4gaW5kZXguaHRtbClcbi8vIHRoZSAybmQgcGFyYW1ldGVyIGlzIGFuIGFycmF5IG9mICdyZXF1aXJlcydcbi8vICdzdGFydGVyLmNvbnRyb2xsZXJzJyBpcyBmb3VuZCBpbiBjb250cm9sbGVycy5qc1xudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdjcnlwdG9QYXNzJywgWydpb25pYyddKVxuXG4ucnVuKGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtKSB7XG4gICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIC8vIEhpZGUgdGhlIGFjY2Vzc29yeSBiYXIgYnkgZGVmYXVsdCAocmVtb3ZlIHRoaXMgdG8gc2hvdyB0aGUgYWNjZXNzb3J5IGJhciBhYm92ZSB0aGUga2V5Ym9hcmRcbiAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgaWYgKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcbiAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XG4gICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuZGlzYWJsZVNjcm9sbCh0cnVlKTtcblxuICAgIH1cbiAgICBpZiAod2luZG93LlN0YXR1c0Jhcikge1xuICAgICAgLy8gb3JnLmFwYWNoZS5jb3Jkb3ZhLnN0YXR1c2JhciByZXF1aXJlZFxuICAgICAgU3RhdHVzQmFyLnN0eWxlRGVmYXVsdCgpO1xuICAgIH1cbiAgfSk7XG59KVxuXG4uY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XG4gICRzdGF0ZVByb3ZpZGVyXG5cbiAgICAuc3RhdGUoJ2FwcCcsIHtcbiAgICB1cmw6ICcvYXBwJyxcbiAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9tZW51Lmh0bWwnLFxuICAgIGNvbnRyb2xsZXI6ICdBcHBDdHJsJ1xuICB9KVxuLnN0YXRlKCdhdXRoJywge1xuICAgIHVybDogJy9hdXRoJyxcbiAgICB2aWV3czoge1xuICAgICAgJ21lbnVDb250ZW50Jzoge1xuICAgICAgICB0ZW1wbGF0ZVVybDogJ2FuZ3VsYXIvYXV0aGVudGljYXRlL2F1dGgudmlldy5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ2F1dGhDb250cm9sbGVyJ1xuICAgICAgfVxuICAgIH1cbiAgfSlcbiAgXG5cbiAgLnN0YXRlKCdhcHAuaG9tZScsIHtcbiAgICB1cmw6ICcvaG9tZScsXG4gICAgdmlld3M6IHtcbiAgICAgICdtZW51Q29udGVudCc6IHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdhbmd1bGFyL2hvbWUvaG9tZS52aWV3Lmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnaG9tZUNvbnRyb2xsZXInXG4gICAgICB9XG4gICAgfVxuICB9KVxuICBcbiAgLnN0YXRlKCdhcHAubG9naW4nLCB7XG4gICAgdXJsOiAnL2xvZ2luJyxcbiAgICB2aWV3czoge1xuICAgICAgJ21lbnVDb250ZW50Jzoge1xuICAgICAgICB0ZW1wbGF0ZVVybDogJ2FuZ3VsYXIvbG9naW4vbG9naW4udmlldy5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ2xvZ2luQ29udHJvbGxlcidcbiAgICAgIH1cbiAgICB9XG4gIH0pXG4gIC5zdGF0ZSgnYXBwLmxvZ2luU2luZ2xlJywge1xuICAgIHVybDogJy9sb2dpbi86aWQnLFxuICAgIHBhcmFtczoge2FjY291bnREYXRhOiBudWxsfSxcbiAgICB2aWV3czoge1xuICAgICAgJ21lbnVDb250ZW50Jzoge1xuICAgICAgICB0ZW1wbGF0ZVVybDogJ2FuZ3VsYXIvbG9naW4vbG9naW4uc2luZ2xlLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnbG9naW5TaW5nbGVDb250cm9sbGVyJ1xuICAgICAgfVxuICAgIH1cbiAgfSlcbiAgLnN0YXRlKCdhcHAuY3JlZGl0Q2FyZCcsIHtcbiAgICB1cmw6ICcvY3JlZGl0Q2FyZCcsXG4gICAgdmlld3M6IHtcbiAgICAgICdtZW51Q29udGVudCc6IHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdhbmd1bGFyL2NyZWRpdENhcmQvY3JlZGl0Q2FyZHMuYWxsLnZpZXcuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdjcmVkaXRDYXJkQ29udHJvbGxlcidcbiAgICAgIH1cbiAgICB9XG4gIH0pXG4gIC5zdGF0ZSgnYXBwLmNyZWRpdENhcmRTaW5nbGUnLCB7XG4gICAgdXJsOiAnL2NyZWRpdENhcmQvOmlkJyxcbiAgICBwYXJhbXM6IHthY2NvdW50RGF0YTogbnVsbH0sXG4gICAgdmlld3M6IHtcbiAgICAgICdtZW51Q29udGVudCc6IHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdhbmd1bGFyL2NyZWRpdENhcmQvY3JlZGl0Q2FyZC5zaW5nbGUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdjcmVkaXRDYXJkU2luZ2xlQ29udHJvbGxlcidcbiAgICAgIH1cbiAgICB9XG4gIH0pXG4gIC5zdGF0ZSgnYXBwLmlkZW50aXR5Jywge1xuICAgICAgdXJsOiAnL2lkZW50aXR5JyxcbiAgICAgIHZpZXdzOiB7XG4gICAgICAgICdtZW51Q29udGVudCc6IHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FuZ3VsYXIvaWRlbnRpdHkvaWRlbnRpdHkuYWxsLnZpZXcuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ2lkZW50aXR5Q29udHJvbGxlcidcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgICAuc3RhdGUoJ2FwcC5pZGVudGl0eVNpbmdsZScsIHtcbiAgICB1cmw6ICcvaWRlbnRpdHkvOmlkJyxcbiAgICBwYXJhbXM6IHthY2NvdW50RGF0YTogbnVsbH0sXG4gICAgdmlld3M6IHtcbiAgICAgICdtZW51Q29udGVudCc6IHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdhbmd1bGFyL2lkZW50aXR5L2lkZW50aXR5LnNpbmdsZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ2lkZW50aXR5U2luZ2xlQ29udHJvbGxlcidcbiAgICAgIH1cbiAgICB9XG4gIH0pXG4gICAgLnN0YXRlKCdhcHAubm90ZScsIHtcbiAgICAgIHVybDogJy9ub3RlJyxcbiAgICAgIHZpZXdzOiB7XG4gICAgICAgICdtZW51Q29udGVudCc6IHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FuZ3VsYXIvbm90ZS9ub3RlLmFsbC52aWV3Lmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdub3RlQ29udHJvbGxlcidcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgLnN0YXRlKCdhcHAubm90ZVNpbmdsZScsIHtcbiAgICAgIHVybDogJy9ub3RlLzppZCcsXG4gICAgICAgcGFyYW1zOiB7YWNjb3VudERhdGE6IG51bGx9LFxuICAgICAgdmlld3M6IHtcbiAgICAgICAgJ21lbnVDb250ZW50Jzoge1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYW5ndWxhci9ub3RlL25vdGUuc2luZ2xlLmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdub3RlU2luZ2xlQ29udHJvbGxlcidcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIC5zdGF0ZSgnYXBwLnNldHRpbmdzJywge1xuICAgIHVybDogJy9zZXR0aW5ncycsXG4gICAgdmlld3M6IHtcbiAgICAgICdtZW51Q29udGVudCc6IHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdhbmd1bGFyL3NldHRpbmdzL3NldHRpbmdzLnZpZXcuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdzZXR0aW5nc0NvbnRyb2xsZXInXG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgLy8gaWYgbm9uZSBvZiB0aGUgYWJvdmUgc3RhdGVzIGFyZSBtYXRjaGVkLCB1c2UgdGhpcyBhcyB0aGUgZmFsbGJhY2tcbiAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2F1dGgnKTtcbn0pXG4uY29udHJvbGxlcignQXBwQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwsICR0aW1lb3V0KSB7XG5cbiAgLy8gV2l0aCB0aGUgbmV3IHZpZXcgY2FjaGluZyBpbiBJb25pYywgQ29udHJvbGxlcnMgYXJlIG9ubHkgY2FsbGVkXG4gIC8vIHdoZW4gdGhleSBhcmUgcmVjcmVhdGVkIG9yIG9uIGFwcCBzdGFydCwgaW5zdGVhZCBvZiBldmVyeSBwYWdlIGNoYW5nZS5cbiAgLy8gVG8gbGlzdGVuIGZvciB3aGVuIHRoaXMgcGFnZSBpcyBhY3RpdmUgKGZvciBleGFtcGxlLCB0byByZWZyZXNoIGRhdGEpLFxuICAvLyBsaXN0ZW4gZm9yIHRoZSAkaW9uaWNWaWV3LmVudGVyIGV2ZW50OlxuICAvLyRzY29wZS4kb24oJyRpb25pY1ZpZXcuZW50ZXInLCBmdW5jdGlvbihlKSB7XG4gIC8vfSk7XG5cbiAgLy8gRm9ybSBkYXRhIGZvciB0aGUgbG9naW4gbW9kYWxcbiAgJHNjb3BlLmxvZ2luRGF0YSA9IHt9O1xuXG4gIC8vIENyZWF0ZSB0aGUgbG9naW4gbW9kYWwgdGhhdCB3ZSB3aWxsIHVzZSBsYXRlclxuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3RlbXBsYXRlcy9sb2dpbi5odG1sJywge1xuICAgIHNjb3BlOiAkc2NvcGVcbiAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICRzY29wZS5tb2RhbCA9IG1vZGFsO1xuICB9KTtcblxuICAvLyBUcmlnZ2VyZWQgaW4gdGhlIGxvZ2luIG1vZGFsIHRvIGNsb3NlIGl0XG4gICRzY29wZS5jbG9zZUxvZ2luID0gZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcbiAgfTtcblxuICAvLyBPcGVuIHRoZSBsb2dpbiBtb2RhbFxuICAkc2NvcGUubG9naW4gPSBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwuc2hvdygpO1xuICB9O1xuXG4gIC8vIFBlcmZvcm0gdGhlIGxvZ2luIGFjdGlvbiB3aGVuIHRoZSB1c2VyIHN1Ym1pdHMgdGhlIGxvZ2luIGZvcm1cbiAgJHNjb3BlLmRvTG9naW4gPSBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZygnRG9pbmcgbG9naW4nLCAkc2NvcGUubG9naW5EYXRhKTtcblxuICAgIC8vIFNpbXVsYXRlIGEgbG9naW4gZGVsYXkuIFJlbW92ZSB0aGlzIGFuZCByZXBsYWNlIHdpdGggeW91ciBsb2dpblxuICAgIC8vIGNvZGUgaWYgdXNpbmcgYSBsb2dpbiBzeXN0ZW1cbiAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICRzY29wZS5jbG9zZUxvZ2luKCk7XG4gICAgfSwgMTAwMCk7XG4gIH07XG59KVxuIiwiYXBwLmNvbnRyb2xsZXIoJ2F1dGhDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUpe1xuXHQvLyAkc2NvcGUubWFzdGVyID0gbnVsbDtcblx0JHNjb3BlLmNoZWNrTWFzdGVyPWZ1bmN0aW9uKG1hc3Rlcil7XG5cdFx0Y29uc29sZS5sb2cobWFzdGVyKVxuXHRcdCRzdGF0ZS5nbygnYXBwLmhvbWUnKTtcblx0fVxufSkiLCJhcHAuY29udHJvbGxlcignY3JlZGl0Q2FyZENvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUpe1xuICAkc2NvcGUuYWNjb3VudHMgPSBtYXN0ZXJPYmouY3JlZGl0Q2FyZDtcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdjcmVkaXRDYXJkU2luZ2xlQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlUGFyYW1zKXtcbiAgY29uc29sZS5sb2coJHN0YXRlUGFyYW1zKTtcbiAgJHNjb3BlLmFjY291bnQgPSAkc3RhdGVQYXJhbXMuYWNjb3VudERhdGE7XG59KVxuIiwiYXBwLmNvbnRyb2xsZXIoJ2hvbWVDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlKXtcblx0XG59KSIsImFwcC5jb250cm9sbGVyKCdpZGVudGl0eUNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUpe1xuICAkc2NvcGUuYWNjb3VudHMgPSBtYXN0ZXJPYmouaWRlbnRpdHk7XG59KVxuXG5cbmFwcC5jb250cm9sbGVyKCdpZGVudGl0eVNpbmdsZUNvbnRyb2xsZXInLCBmdW5jdGlvbigkc3RhdGVQYXJhbXMsICRzY29wZSwgJHN0YXRlKXtcbiAgY29uc29sZS5sb2coJHN0YXRlUGFyYW1zKTtcbiAgY29uc29sZS5sb2coJ2luIHNpbmdsZUNvbnQnKTtcbiAgJHNjb3BlLmFjY291bnQgPSAkc3RhdGVQYXJhbXMuYWNjb3VudERhdGFcbiAgY29uc29sZS5sb2coKCRzdGF0ZSkpO1xufSlcbiIsImFwcC5jb250cm9sbGVyKCdsb2dpbkNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZSl7XG4gICRzY29wZS5hY2NvdW50cyA9IG1hc3Rlck9iai5sb2dpbjtcblxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ2xvZ2luU2luZ2xlQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzdGF0ZVBhcmFtcywgJHNjb3BlLCAkc3RhdGUpe1xuICBjb25zb2xlLmxvZygkc3RhdGVQYXJhbXMpO1xuICBjb25zb2xlLmxvZygnaW4gc2luZ2xlQ29udCcpO1xuICAkc2NvcGUuYWNjb3VudCA9ICRzdGF0ZVBhcmFtcy5hY2NvdW50RGF0YVxuICBjb25zb2xlLmxvZygoJHN0YXRlKSk7XG59KVxuIiwiYXBwLmNvbnRyb2xsZXIoJ25vdGVDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlKXtcbiAgJHNjb3BlLmFjY291bnRzID0gbWFzdGVyT2JqLm5vdGU7XG59KVxuXG5hcHAuY29udHJvbGxlcignbm90ZVNpbmdsZUNvbnRyb2xsZXInLCBmdW5jdGlvbigkc3RhdGVQYXJhbXMsICRzY29wZSwgJHN0YXRlKXtcbiAgY29uc29sZS5sb2coJHN0YXRlUGFyYW1zKTtcbiAgY29uc29sZS5sb2coJ2luIHNpbmdsZUNvbnQnKTtcbiAgJHNjb3BlLmFjY291bnQgPSAkc3RhdGVQYXJhbXMuYWNjb3VudERhdGFcbiAgY29uc29sZS5sb2coKCRzdGF0ZSkpO1xufSlcbiIsImFwcC5jb250cm9sbGVyKCdzZXR0aW5nc0NvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUpe1xuICAkc2NvcGUuZHJvcGJveEF1dGggPSBmdW5jdGlvbigpe1xuICAgIGNvbnNvbGUubG9nKCdmcm9tIHNldHRpbmdzISAnKTtcbiAgfTtcbn0pXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

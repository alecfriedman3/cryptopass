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
    .state('app.note', {
      url: '/note',
      views: {
        'menuContent': {
          templateUrl: 'angular/note/note.all.view.html',
          controller: 'noteController'
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
  $urlRouterProvider.otherwise('/app/login');
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

app.controller('loginController', function($scope, $state){
  $scope.accounts = masterObj.login;
  $scope.goToSingle = function(stateId){
    console.log('clicked');
    $state.go('app.loginSingle')
  }

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

app.controller('settingsController', function($scope){
  $scope.dropboxAuth = function(){
    console.log('from settings! ');
  };
})

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNyZWRpdENhcmQvY3JlZGl0Q2FyZC5jb250cm9sbGVyLmpzIiwiaWRlbnRpdHkvaWRlbnRpdHkuY29udHJvbGxlci5qcyIsImxvZ2luL2xvZ2luLmNvbnRyb2xsZXIuanMiLCJub3RlL25vdGUuY29udHJvbGxlci5qcyIsInNldHRpbmdzL3NldHRpbmdzLmNvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW9uaWMgU3RhcnRlciBBcHBcblxuLy8gYW5ndWxhci5tb2R1bGUgaXMgYSBnbG9iYWwgcGxhY2UgZm9yIGNyZWF0aW5nLCByZWdpc3RlcmluZyBhbmQgcmV0cmlldmluZyBBbmd1bGFyIG1vZHVsZXNcbi8vICdzdGFydGVyJyBpcyB0aGUgbmFtZSBvZiB0aGlzIGFuZ3VsYXIgbW9kdWxlIGV4YW1wbGUgKGFsc28gc2V0IGluIGEgPGJvZHk+IGF0dHJpYnV0ZSBpbiBpbmRleC5odG1sKVxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xuLy8gJ3N0YXJ0ZXIuY29udHJvbGxlcnMnIGlzIGZvdW5kIGluIGNvbnRyb2xsZXJzLmpzXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2NyeXB0b1Bhc3MnLCBbJ2lvbmljJ10pXG5cbi5ydW4oZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0pIHtcbiAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxuICAgIC8vIGZvciBmb3JtIGlucHV0cylcbiAgICBpZiAod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcbiAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5kaXNhYmxlU2Nyb2xsKHRydWUpO1xuXG4gICAgfVxuICAgIGlmICh3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICAvLyBvcmcuYXBhY2hlLmNvcmRvdmEuc3RhdHVzYmFyIHJlcXVpcmVkXG4gICAgICBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7XG4gICAgfVxuICB9KTtcbn0pXG5cbi5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcbiAgJHN0YXRlUHJvdmlkZXJcblxuICAgIC5zdGF0ZSgnYXBwJywge1xuICAgIHVybDogJy9hcHAnLFxuICAgIGFic3RyYWN0OiB0cnVlLFxuICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL21lbnUuaHRtbCcsXG4gICAgY29udHJvbGxlcjogJ0FwcEN0cmwnXG4gIH0pXG5cbiAgLnN0YXRlKCdhcHAubG9naW4nLCB7XG4gICAgdXJsOiAnL2xvZ2luJyxcbiAgICB2aWV3czoge1xuICAgICAgJ21lbnVDb250ZW50Jzoge1xuICAgICAgICB0ZW1wbGF0ZVVybDogJ2FuZ3VsYXIvbG9naW4vbG9naW4udmlldy5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ2xvZ2luQ29udHJvbGxlcidcbiAgICAgIH1cbiAgICB9XG4gIH0pXG4gIC5zdGF0ZSgnYXBwLmxvZ2luU2luZ2xlJywge1xuICAgIHVybDogJy9sb2dpbi86aWQnLFxuICAgIHBhcmFtczoge2FjY291bnREYXRhOiBudWxsfSxcbiAgICB2aWV3czoge1xuICAgICAgJ21lbnVDb250ZW50Jzoge1xuICAgICAgICB0ZW1wbGF0ZVVybDogJ2FuZ3VsYXIvbG9naW4vbG9naW4uc2luZ2xlLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnbG9naW5TaW5nbGVDb250cm9sbGVyJ1xuICAgICAgfVxuICAgIH1cbiAgfSlcbiAgLnN0YXRlKCdhcHAuY3JlZGl0Q2FyZCcsIHtcbiAgICB1cmw6ICcvY3JlZGl0Q2FyZCcsXG4gICAgdmlld3M6IHtcbiAgICAgICdtZW51Q29udGVudCc6IHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdhbmd1bGFyL2NyZWRpdENhcmQvY3JlZGl0Q2FyZHMuYWxsLnZpZXcuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdjcmVkaXRDYXJkQ29udHJvbGxlcidcbiAgICAgIH1cbiAgICB9XG4gIH0pXG4gIC5zdGF0ZSgnYXBwLmNyZWRpdENhcmRTaW5nbGUnLCB7XG4gICAgdXJsOiAnL2NyZWRpdENhcmQvOmlkJyxcbiAgICBwYXJhbXM6IHthY2NvdW50RGF0YTogbnVsbH0sXG4gICAgdmlld3M6IHtcbiAgICAgICdtZW51Q29udGVudCc6IHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdhbmd1bGFyL2NyZWRpdENhcmQvY3JlZGl0Q2FyZC5zaW5nbGUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdjcmVkaXRDYXJkU2luZ2xlQ29udHJvbGxlcidcbiAgICAgIH1cbiAgICB9XG4gIH0pXG4gIC5zdGF0ZSgnYXBwLmlkZW50aXR5Jywge1xuICAgICAgdXJsOiAnL2lkZW50aXR5JyxcbiAgICAgIHZpZXdzOiB7XG4gICAgICAgICdtZW51Q29udGVudCc6IHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FuZ3VsYXIvaWRlbnRpdHkvaWRlbnRpdHkuYWxsLnZpZXcuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ2lkZW50aXR5Q29udHJvbGxlcidcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgLnN0YXRlKCdhcHAubm90ZScsIHtcbiAgICAgIHVybDogJy9ub3RlJyxcbiAgICAgIHZpZXdzOiB7XG4gICAgICAgICdtZW51Q29udGVudCc6IHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FuZ3VsYXIvbm90ZS9ub3RlLmFsbC52aWV3Lmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdub3RlQ29udHJvbGxlcidcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgLnN0YXRlKCdhcHAuc2V0dGluZ3MnLCB7XG4gICAgdXJsOiAnL3NldHRpbmdzJyxcbiAgICB2aWV3czoge1xuICAgICAgJ21lbnVDb250ZW50Jzoge1xuICAgICAgICB0ZW1wbGF0ZVVybDogJ2FuZ3VsYXIvc2V0dGluZ3Mvc2V0dGluZ3Mudmlldy5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ3NldHRpbmdzQ29udHJvbGxlcidcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICAvLyBpZiBub25lIG9mIHRoZSBhYm92ZSBzdGF0ZXMgYXJlIG1hdGNoZWQsIHVzZSB0aGlzIGFzIHRoZSBmYWxsYmFja1xuICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvYXBwL2xvZ2luJyk7XG59KVxuLmNvbnRyb2xsZXIoJ0FwcEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRpb25pY01vZGFsLCAkdGltZW91dCkge1xuXG4gIC8vIFdpdGggdGhlIG5ldyB2aWV3IGNhY2hpbmcgaW4gSW9uaWMsIENvbnRyb2xsZXJzIGFyZSBvbmx5IGNhbGxlZFxuICAvLyB3aGVuIHRoZXkgYXJlIHJlY3JlYXRlZCBvciBvbiBhcHAgc3RhcnQsIGluc3RlYWQgb2YgZXZlcnkgcGFnZSBjaGFuZ2UuXG4gIC8vIFRvIGxpc3RlbiBmb3Igd2hlbiB0aGlzIHBhZ2UgaXMgYWN0aXZlIChmb3IgZXhhbXBsZSwgdG8gcmVmcmVzaCBkYXRhKSxcbiAgLy8gbGlzdGVuIGZvciB0aGUgJGlvbmljVmlldy5lbnRlciBldmVudDpcbiAgLy8kc2NvcGUuJG9uKCckaW9uaWNWaWV3LmVudGVyJywgZnVuY3Rpb24oZSkge1xuICAvL30pO1xuXG4gIC8vIEZvcm0gZGF0YSBmb3IgdGhlIGxvZ2luIG1vZGFsXG4gICRzY29wZS5sb2dpbkRhdGEgPSB7fTtcblxuICAvLyBDcmVhdGUgdGhlIGxvZ2luIG1vZGFsIHRoYXQgd2Ugd2lsbCB1c2UgbGF0ZXJcbiAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCd0ZW1wbGF0ZXMvbG9naW4uaHRtbCcsIHtcbiAgICBzY29wZTogJHNjb3BlXG4gIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAkc2NvcGUubW9kYWwgPSBtb2RhbDtcbiAgfSk7XG5cbiAgLy8gVHJpZ2dlcmVkIGluIHRoZSBsb2dpbiBtb2RhbCB0byBjbG9zZSBpdFxuICAkc2NvcGUuY2xvc2VMb2dpbiA9IGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5tb2RhbC5oaWRlKCk7XG4gIH07XG5cbiAgLy8gT3BlbiB0aGUgbG9naW4gbW9kYWxcbiAgJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLnNob3coKTtcbiAgfTtcblxuICAvLyBQZXJmb3JtIHRoZSBsb2dpbiBhY3Rpb24gd2hlbiB0aGUgdXNlciBzdWJtaXRzIHRoZSBsb2dpbiBmb3JtXG4gICRzY29wZS5kb0xvZ2luID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coJ0RvaW5nIGxvZ2luJywgJHNjb3BlLmxvZ2luRGF0YSk7XG5cbiAgICAvLyBTaW11bGF0ZSBhIGxvZ2luIGRlbGF5LiBSZW1vdmUgdGhpcyBhbmQgcmVwbGFjZSB3aXRoIHlvdXIgbG9naW5cbiAgICAvLyBjb2RlIGlmIHVzaW5nIGEgbG9naW4gc3lzdGVtXG4gICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAkc2NvcGUuY2xvc2VMb2dpbigpO1xuICAgIH0sIDEwMDApO1xuICB9O1xufSlcbiIsImFwcC5jb250cm9sbGVyKCdjcmVkaXRDYXJkQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSl7XG4gICRzY29wZS5hY2NvdW50cyA9IG1hc3Rlck9iai5jcmVkaXRDYXJkO1xufSlcblxuYXBwLmNvbnRyb2xsZXIoJ2NyZWRpdENhcmRTaW5nbGVDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGVQYXJhbXMpe1xuICBjb25zb2xlLmxvZygkc3RhdGVQYXJhbXMpO1xuICAkc2NvcGUuYWNjb3VudCA9ICRzdGF0ZVBhcmFtcy5hY2NvdW50RGF0YTtcbn0pXG4iLCJhcHAuY29udHJvbGxlcignaWRlbnRpdHlDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlKXtcbiAgJHNjb3BlLmFjY291bnRzID0gbWFzdGVyT2JqLmlkZW50aXR5O1xufSlcbiIsImFwcC5jb250cm9sbGVyKCdsb2dpbkNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZSl7XG4gICRzY29wZS5hY2NvdW50cyA9IG1hc3Rlck9iai5sb2dpbjtcbiAgJHNjb3BlLmdvVG9TaW5nbGUgPSBmdW5jdGlvbihzdGF0ZUlkKXtcbiAgICBjb25zb2xlLmxvZygnY2xpY2tlZCcpO1xuICAgICRzdGF0ZS5nbygnYXBwLmxvZ2luU2luZ2xlJylcbiAgfVxuXG59KVxuXG5hcHAuY29udHJvbGxlcignbG9naW5TaW5nbGVDb250cm9sbGVyJywgZnVuY3Rpb24oJHN0YXRlUGFyYW1zLCAkc2NvcGUsICRzdGF0ZSl7XG4gIGNvbnNvbGUubG9nKCRzdGF0ZVBhcmFtcyk7XG4gIGNvbnNvbGUubG9nKCdpbiBzaW5nbGVDb250Jyk7XG4gICRzY29wZS5hY2NvdW50ID0gJHN0YXRlUGFyYW1zLmFjY291bnREYXRhXG4gIGNvbnNvbGUubG9nKCgkc3RhdGUpKTtcbn0pXG4iLCJhcHAuY29udHJvbGxlcignbm90ZUNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUpe1xuICAkc2NvcGUuYWNjb3VudHMgPSBtYXN0ZXJPYmoubm90ZTtcbn0pXG4iLCJhcHAuY29udHJvbGxlcignc2V0dGluZ3NDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlKXtcbiAgJHNjb3BlLmRyb3Bib3hBdXRoID0gZnVuY3Rpb24oKXtcbiAgICBjb25zb2xlLmxvZygnZnJvbSBzZXR0aW5ncyEgJyk7XG4gIH07XG59KVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

'use strict';

var app = angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives', 'app.services']).run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});
app.controller('cryptoPassCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {}]);
app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('tabsController.cryptoPass', {
    url: '/home',
    views: {
      'tab1': {
        templateUrl: 'templates/cryptoPass.html',
        controller: 'cryptoPassCtrl'
      }
    }
  });
});
// angular.module('app.controllers', [])
app.controller('loginsCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {
  $scope.accounts = masterObj.login;
}]);
app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('logins', {
    url: '/logins',
    templateUrl: 'templates/logins.html',
    controller: 'loginsCtrl'
  });
  $urlRouterProvider.otherwise('/page1/home');
});

app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('loginDeatails', {
    url: '/loginDeatails',
    templateUrl: 'templates/loginDeatails.html',
    controller: 'loginDeatailsCtrl'
  });
  $urlRouterProvider.otherwise('/page1/home');
});

//login add state:
// app.config(function($stateProvider, $urlRouterProvider) {
//   $stateProvider.state('logins', {
//     url: '/logins',
//     templateUrl: 'templates/logins.html',
//     controller: 'loginsCtrl'
//   })
// $urlRouterProvider.otherwise('/page1/home')

// });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImhvbWUvaG9tZS5jb250cm9sbGVyLmpzIiwiaG9tZS9ob21lLnN0YXRlLmpzIiwibG9naW4vbG9naW4uY29udHJvbGxlci5qcyIsImxvZ2luL2xvZ2luLnN0YXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBQSxNQUFBLFFBQUEsTUFBQSxDQUFBLEtBQUEsRUFBQSxDQUFBLE9BQUEsRUFBQSxpQkFBQSxFQUFBLFlBQUEsRUFBQSxnQkFBQSxFQUFBLGNBQUEsQ0FBQSxFQUVBLEdBRkEsQ0FFQSxVQUFBLGNBQUEsRUFBQTtBQUNBLGlCQUFBLEtBQUEsQ0FBQSxZQUFBO0FBQ0E7QUFDQTtBQUNBLFFBQUEsT0FBQSxPQUFBLElBQUEsT0FBQSxPQUFBLENBQUEsT0FBQSxJQUFBLE9BQUEsT0FBQSxDQUFBLE9BQUEsQ0FBQSxRQUFBLEVBQUE7QUFDQSxjQUFBLE9BQUEsQ0FBQSxRQUFBLENBQUEsd0JBQUEsQ0FBQSxJQUFBO0FBQ0EsY0FBQSxPQUFBLENBQUEsUUFBQSxDQUFBLGFBQUEsQ0FBQSxJQUFBO0FBQ0E7QUFDQSxRQUFBLE9BQUEsU0FBQSxFQUFBO0FBQ0E7QUFDQSxnQkFBQSxZQUFBO0FBQ0E7QUFDQSxHQVhBO0FBWUEsQ0FmQSxDQUFBO0FDQUEsSUFBQSxVQUFBLENBQUEsZ0JBQUEsRUFBQSxDQUFBLFFBQUEsRUFBQSxjQUFBLEVBQ0EsVUFBQSxNQUFBLEVBQUEsWUFBQSxFQUFBLENBR0EsQ0FKQSxDQUFBO0FDQUEsSUFBQSxNQUFBLENBQUEsVUFBQSxjQUFBLEVBQUEsa0JBQUEsRUFBQTtBQUNBLGlCQUFBLEtBQUEsQ0FBQSwyQkFBQSxFQUFBO0FBQ0EsU0FBQSxPQURBO0FBRUEsV0FBQTtBQUNBLGNBQUE7QUFDQSxxQkFBQSwyQkFEQTtBQUVBLG9CQUFBO0FBRkE7QUFEQTtBQUZBLEdBQUE7QUFTQSxDQVZBO0FDQUE7QUFDQSxJQUFBLFVBQUEsQ0FBQSxZQUFBLEVBQUEsQ0FBQSxRQUFBLEVBQUEsY0FBQSxFQUVBLFVBQUEsTUFBQSxFQUFBLFlBQUEsRUFBQTtBQUNBLFNBQUEsUUFBQSxHQUFBLFVBQUEsS0FBQTtBQUVBLENBTEEsQ0FBQTtBQ0RBLElBQUEsTUFBQSxDQUFBLFVBQUEsY0FBQSxFQUFBLGtCQUFBLEVBQUE7QUFDQSxpQkFBQSxLQUFBLENBQUEsUUFBQSxFQUFBO0FBQ0EsU0FBQSxTQURBO0FBRUEsaUJBQUEsdUJBRkE7QUFHQSxnQkFBQTtBQUhBLEdBQUE7QUFLQSxxQkFBQSxTQUFBLENBQUEsYUFBQTtBQUVBLENBUkE7O0FBV0EsSUFBQSxNQUFBLENBQUEsVUFBQSxjQUFBLEVBQUEsa0JBQUEsRUFBQTtBQUNBLGlCQUFBLEtBQUEsQ0FBQSxlQUFBLEVBQUE7QUFDQSxTQUFBLGdCQURBO0FBRUEsaUJBQUEsOEJBRkE7QUFHQSxnQkFBQTtBQUhBLEdBQUE7QUFLQSxxQkFBQSxTQUFBLENBQUEsYUFBQTtBQUVBLENBUkE7O0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcD1hbmd1bGFyLm1vZHVsZSgnYXBwJywgWydpb25pYycsICdhcHAuY29udHJvbGxlcnMnLCAnYXBwLnJvdXRlcycsICdhcHAuZGlyZWN0aXZlcycsJ2FwcC5zZXJ2aWNlcycsXSlcblxuLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xuICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxuICAgIGlmICh3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcbiAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XG4gICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuZGlzYWJsZVNjcm9sbCh0cnVlKTtcbiAgICB9XG4gICAgaWYgKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgIC8vIG9yZy5hcGFjaGUuY29yZG92YS5zdGF0dXNiYXIgcmVxdWlyZWRcbiAgICAgIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtcbiAgICB9XG4gIH0pO1xufSkiLCJhcHAuY29udHJvbGxlcignY3J5cHRvUGFzc0N0cmwnLCBbJyRzY29wZScsICckc3RhdGVQYXJhbXMnLCBcbmZ1bmN0aW9uICgkc2NvcGUsICRzdGF0ZVBhcmFtcykge1xuXG5cbn1dKSIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuICAkc3RhdGVQcm92aWRlci5zdGF0ZSgndGFic0NvbnRyb2xsZXIuY3J5cHRvUGFzcycsIHtcbiAgICB1cmw6ICcvaG9tZScsXG4gICAgdmlld3M6IHtcbiAgICAgICd0YWIxJzoge1xuICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9jcnlwdG9QYXNzLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnY3J5cHRvUGFzc0N0cmwnXG4gICAgICB9XG4gICAgfVxuICB9KVxufSkiLCIvLyBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJywgW10pXG5hcHAuY29udHJvbGxlcignbG9naW5zQ3RybCcsIFsnJHNjb3BlJywgJyRzdGF0ZVBhcmFtcycsIFxuXG5mdW5jdGlvbiAoJHNjb3BlLCAkc3RhdGVQYXJhbXMpIHtcbiRzY29wZS5hY2NvdW50cyA9IG1hc3Rlck9iai5sb2dpbjtcblxufV0pIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdsb2dpbnMnLCB7XG4gICAgdXJsOiAnL2xvZ2lucycsXG4gICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvbG9naW5zLmh0bWwnLFxuICAgIGNvbnRyb2xsZXI6ICdsb2dpbnNDdHJsJ1xuICB9KVxuJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL3BhZ2UxL2hvbWUnKVxuXG59KTtcblxuXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2xvZ2luRGVhdGFpbHMnLCB7XG4gICAgdXJsOiAnL2xvZ2luRGVhdGFpbHMnLFxuICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL2xvZ2luRGVhdGFpbHMuaHRtbCcsXG4gICAgY29udHJvbGxlcjogJ2xvZ2luRGVhdGFpbHNDdHJsJ1xuICB9KVxuJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL3BhZ2UxL2hvbWUnKVxuXG59KTtcblxuLy9sb2dpbiBhZGQgc3RhdGU6XG4vLyBhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbi8vICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2xvZ2lucycsIHtcbi8vICAgICB1cmw6ICcvbG9naW5zJyxcbi8vICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9sb2dpbnMuaHRtbCcsXG4vLyAgICAgY29udHJvbGxlcjogJ2xvZ2luc0N0cmwnXG4vLyAgIH0pXG4vLyAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvcGFnZTEvaG9tZScpXG5cbi8vIH0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

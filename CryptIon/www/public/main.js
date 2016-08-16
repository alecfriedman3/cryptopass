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
  $urlRouterProvider.otherwise('/page1/home');
});
// angular.module('app.controllers', [])
app.controller('loginsCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {
  $scope.accounts = masterObj.login;
}]);
app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'www/angular/login/login.view.html',
    controller: 'loginsCtrl'
  });
  $urlRouterProvider.otherwise('/page1/home');
});

//used to be loginDeatails
app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('loginDeatails', {
    // url: '/login/:id',
    // templateUrl: 'build/angular/login/login.single.view.html',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImhvbWUvaG9tZS5jb250cm9sbGVyLmpzIiwiaG9tZS9ob21lLnN0YXRlLmpzIiwibG9naW4vbG9naW4uY29udHJvbGxlci5qcyIsImxvZ2luL2xvZ2luLnN0YXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBQSxNQUFBLFFBQUEsTUFBQSxDQUFBLEtBQUEsRUFBQSxDQUFBLE9BQUEsRUFBQSxpQkFBQSxFQUFBLFlBQUEsRUFBQSxnQkFBQSxFQUFBLGNBQUEsQ0FBQSxFQUVBLEdBRkEsQ0FFQSxVQUFBLGNBQUEsRUFBQTtBQUNBLGlCQUFBLEtBQUEsQ0FBQSxZQUFBO0FBQ0E7QUFDQTtBQUNBLFFBQUEsT0FBQSxPQUFBLElBQUEsT0FBQSxPQUFBLENBQUEsT0FBQSxJQUFBLE9BQUEsT0FBQSxDQUFBLE9BQUEsQ0FBQSxRQUFBLEVBQUE7QUFDQSxjQUFBLE9BQUEsQ0FBQSxRQUFBLENBQUEsd0JBQUEsQ0FBQSxJQUFBO0FBQ0EsY0FBQSxPQUFBLENBQUEsUUFBQSxDQUFBLGFBQUEsQ0FBQSxJQUFBO0FBQ0E7QUFDQSxRQUFBLE9BQUEsU0FBQSxFQUFBO0FBQ0E7QUFDQSxnQkFBQSxZQUFBO0FBQ0E7QUFDQSxHQVhBO0FBWUEsQ0FmQSxDQUFBO0FDQUEsSUFBQSxVQUFBLENBQUEsZ0JBQUEsRUFBQSxDQUFBLFFBQUEsRUFBQSxjQUFBLEVBQ0EsVUFBQSxNQUFBLEVBQUEsWUFBQSxFQUFBLENBR0EsQ0FKQSxDQUFBO0FDQUEsSUFBQSxNQUFBLENBQUEsVUFBQSxjQUFBLEVBQUEsa0JBQUEsRUFBQTtBQUNBLGlCQUFBLEtBQUEsQ0FBQSwyQkFBQSxFQUFBO0FBQ0EsU0FBQSxPQURBO0FBRUEsV0FBQTtBQUNBLGNBQUE7QUFDQSxxQkFBQSwyQkFEQTtBQUVBLG9CQUFBO0FBRkE7QUFEQTtBQUZBLEdBQUE7QUFTQSxxQkFBQSxTQUFBLENBQUEsYUFBQTtBQUNBLENBWEE7QUNBQTtBQUNBLElBQUEsVUFBQSxDQUFBLFlBQUEsRUFBQSxDQUFBLFFBQUEsRUFBQSxjQUFBLEVBRUEsVUFBQSxNQUFBLEVBQUEsWUFBQSxFQUFBO0FBQ0EsU0FBQSxRQUFBLEdBQUEsVUFBQSxLQUFBO0FBRUEsQ0FMQSxDQUFBO0FDREEsSUFBQSxNQUFBLENBQUEsVUFBQSxjQUFBLEVBQUEsa0JBQUEsRUFBQTtBQUNBLGlCQUFBLEtBQUEsQ0FBQSxPQUFBLEVBQUE7QUFDQSxTQUFBLFFBREE7QUFFQSxpQkFBQSxtQ0FGQTtBQUdBLGdCQUFBO0FBSEEsR0FBQTtBQUtBLHFCQUFBLFNBQUEsQ0FBQSxhQUFBO0FBRUEsQ0FSQTs7QUFVQTtBQUNBLElBQUEsTUFBQSxDQUFBLFVBQUEsY0FBQSxFQUFBLGtCQUFBLEVBQUE7QUFDQSxpQkFBQSxLQUFBLENBQUEsZUFBQSxFQUFBO0FBQ0E7QUFDQTtBQUNBLFNBQUEsZ0JBSEE7QUFJQSxpQkFBQSw4QkFKQTtBQUtBLGdCQUFBO0FBTEEsR0FBQTtBQU9BLHFCQUFBLFNBQUEsQ0FBQSxhQUFBO0FBRUEsQ0FWQTs7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXBwPWFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ2lvbmljJywgJ2FwcC5jb250cm9sbGVycycsICdhcHAucm91dGVzJywgJ2FwcC5kaXJlY3RpdmVzJywnYXBwLnNlcnZpY2VzJyxdKVxuXG4ucnVuKGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtKSB7XG4gICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIC8vIEhpZGUgdGhlIGFjY2Vzc29yeSBiYXIgYnkgZGVmYXVsdCAocmVtb3ZlIHRoaXMgdG8gc2hvdyB0aGUgYWNjZXNzb3J5IGJhciBhYm92ZSB0aGUga2V5Ym9hcmRcbiAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgaWYgKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcbiAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5kaXNhYmxlU2Nyb2xsKHRydWUpO1xuICAgIH1cbiAgICBpZiAod2luZG93LlN0YXR1c0Jhcikge1xuICAgICAgLy8gb3JnLmFwYWNoZS5jb3Jkb3ZhLnN0YXR1c2JhciByZXF1aXJlZFxuICAgICAgU3RhdHVzQmFyLnN0eWxlRGVmYXVsdCgpO1xuICAgIH1cbiAgfSk7XG59KSIsImFwcC5jb250cm9sbGVyKCdjcnlwdG9QYXNzQ3RybCcsIFsnJHNjb3BlJywgJyRzdGF0ZVBhcmFtcycsIFxuZnVuY3Rpb24gKCRzY29wZSwgJHN0YXRlUGFyYW1zKSB7XG5cblxufV0pIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCd0YWJzQ29udHJvbGxlci5jcnlwdG9QYXNzJywge1xuICAgIHVybDogJy9ob21lJyxcbiAgICB2aWV3czoge1xuICAgICAgJ3RhYjEnOiB7XG4gICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL2NyeXB0b1Bhc3MuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdjcnlwdG9QYXNzQ3RybCdcbiAgICAgIH1cbiAgICB9XG4gIH0pXG4gICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9wYWdlMS9ob21lJylcbn0pIiwiLy8gYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycsIFtdKVxuYXBwLmNvbnRyb2xsZXIoJ2xvZ2luc0N0cmwnLCBbJyRzY29wZScsICckc3RhdGVQYXJhbXMnLCBcblxuZnVuY3Rpb24gKCRzY29wZSwgJHN0YXRlUGFyYW1zKSB7XG4kc2NvcGUuYWNjb3VudHMgPSBtYXN0ZXJPYmoubG9naW47XG5cbn1dKSIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnbG9naW4nLCB7XG4gICAgdXJsOiAnL2xvZ2luJyxcbiAgICB0ZW1wbGF0ZVVybDogJ3d3dy9hbmd1bGFyL2xvZ2luL2xvZ2luLnZpZXcuaHRtbCcsXG4gICAgY29udHJvbGxlcjogJ2xvZ2luc0N0cmwnXG4gIH0pXG4kdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvcGFnZTEvaG9tZScpXG5cbn0pO1xuXG4vL3VzZWQgdG8gYmUgbG9naW5EZWF0YWlsc1xuYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdsb2dpbkRlYXRhaWxzJywge1xuICAgIC8vIHVybDogJy9sb2dpbi86aWQnLFxuICAgIC8vIHRlbXBsYXRlVXJsOiAnYnVpbGQvYW5ndWxhci9sb2dpbi9sb2dpbi5zaW5nbGUudmlldy5odG1sJyxcbiAgICB1cmw6ICcvbG9naW5EZWF0YWlscycsXG4gICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvbG9naW5EZWF0YWlscy5odG1sJyxcbiAgICBjb250cm9sbGVyOiAnbG9naW5EZWF0YWlsc0N0cmwnXG4gIH0pXG4kdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvcGFnZTEvaG9tZScpXG5cbn0pO1xuXG4vL2xvZ2luIGFkZCBzdGF0ZTpcbi8vIGFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuLy8gICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnbG9naW5zJywge1xuLy8gICAgIHVybDogJy9sb2dpbnMnLFxuLy8gICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL2xvZ2lucy5odG1sJyxcbi8vICAgICBjb250cm9sbGVyOiAnbG9naW5zQ3RybCdcbi8vICAgfSlcbi8vICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9wYWdlMS9ob21lJylcblxuLy8gfSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

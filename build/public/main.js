'use strict';

var app = angular.module('cryptoPass', ['ui.router']);
app.config(function ($urlRouterProvider) {
  // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
  $urlRouterProvider.otherwise('/');
});

app.controller('loginsController', function ($scope) {
  console.log('in logins controller');
});

app.config(function ($stateProvider) {
  $stateProvider.state('logins', {
    url: '/logins',
    templateUrl: 'build/angular/logins/logins.view.html',
    controller: 'loginsController'
  });
});

app.controller('sidebarController', function ($rootScope, $scope) {
  $scope.shown = false;
  $rootScope.$on('showSidebar', function (things, args) {
    console.log('got the broadcast');
    $scope.shown = !$scope.shown;
  });
  $scope.items = [{
    title: 'Facebook.com',
    secondaryTitle: 'elliottmcnary@gmail.com'
  }, {
    title: 'WellsFargo.com',
    secondaryTitle: 'wellsfargoemail@gmail.com'
  }, {
    title: 'twitter.com',
    secondaryTitle: 'twitterEl@gmail.com'
  }, {
    title: 'Chase',
    secondaryTitle: 'elliottmcnary@gmail.com'
  }];
  $scope.active = "Login";
});

app.directive('sidebarItem', function () {
  return {
    restrict: 'E',
    scope: {
      item: '=model'
    },
    templateUrl: 'build/angular/sidebar/sidebar.item.html',
    link: function link(scope) {}
  };
});

app.directive('navBar', function ($rootScope) {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'build/angular/nav/nav.directive.html',
    link: function link(scope) {

      scope.active = null;
      scope.loginClick = function () {
        $rootScope.$broadcast('showSidebar');
        scope.active = "Login";
      };
      scope.creditCardClick = function () {
        $rootScope.$broadcast('showSidebar');
        scope.active = "Credit Card";
      };
      scope.identityClick = function () {
        $rootScope.$broadcast('showSidebar');
        scope.active = "Identity";
      };
      scope.notesClick = function () {
        $rootScope.$broadcast('showSidebar');
        scope.active = "Notes";
      };
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxvZ2lucy9sb2dpbnMuY29udHJvbGxlci5qcyIsImxvZ2lucy9sb2dpbnMuc3RhdGUuanMiLCJzaWRlYmFyL3NpZGViYXIuY29udHJvbGxlci5qcyIsInNpZGViYXIvc2lkZWJhci5kaXJlY3RpdmUuanMiLCJuYXYvbmF2LmRpcmVjdGl2ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQUEsTUFBQSxRQUFBLE1BQUEsQ0FBQSxZQUFBLEVBQUEsQ0FBQSxXQUFBLENBQUEsQ0FBQTtBQUNBLElBQUEsTUFBQSxDQUFBLFVBQUEsa0JBQUEsRUFBQTtBQUNBO0FBQ0EscUJBQUEsU0FBQSxDQUFBLEdBQUE7QUFFQSxDQUpBOztBQ0RBLElBQUEsVUFBQSxDQUFBLGtCQUFBLEVBQUEsVUFBQSxNQUFBLEVBQUE7QUFDQSxVQUFBLEdBQUEsQ0FBQSxzQkFBQTtBQUNBLENBRkE7O0FDQUEsSUFBQSxNQUFBLENBQUEsVUFBQSxjQUFBLEVBQUE7QUFDQSxpQkFBQSxLQUFBLENBQUEsUUFBQSxFQUFBO0FBQ0EsU0FBQSxTQURBO0FBRUEsaUJBQUEsdUNBRkE7QUFHQSxnQkFBQTtBQUhBLEdBQUE7QUFNQSxDQVBBOztBQ0FBLElBQUEsVUFBQSxDQUFBLG1CQUFBLEVBQUEsVUFBQSxVQUFBLEVBQUEsTUFBQSxFQUFBO0FBQ0EsU0FBQSxLQUFBLEdBQUEsS0FBQTtBQUNBLGFBQUEsR0FBQSxDQUFBLGFBQUEsRUFBQSxVQUFBLE1BQUEsRUFBQSxJQUFBLEVBQUE7QUFDQSxZQUFBLEdBQUEsQ0FBQSxtQkFBQTtBQUNBLFdBQUEsS0FBQSxHQUFBLENBQUEsT0FBQSxLQUFBO0FBQ0EsR0FIQTtBQUlBLFNBQUEsS0FBQSxHQUFBLENBQ0E7QUFDQSxXQUFBLGNBREE7QUFFQSxvQkFBQTtBQUZBLEdBREEsRUFLQTtBQUNBLFdBQUEsZ0JBREE7QUFFQSxvQkFBQTtBQUZBLEdBTEEsRUFTQTtBQUNBLFdBQUEsYUFEQTtBQUVBLG9CQUFBO0FBRkEsR0FUQSxFQWFBO0FBQ0EsV0FBQSxPQURBO0FBRUEsb0JBQUE7QUFGQSxHQWJBLENBQUE7QUFrQkEsU0FBQSxNQUFBLEdBQUEsT0FBQTtBQUNBLENBekJBOztBQ0FBLElBQUEsU0FBQSxDQUFBLGFBQUEsRUFBQSxZQUFBO0FBQ0EsU0FBQTtBQUNBLGNBQUEsR0FEQTtBQUVBLFdBQUE7QUFDQSxZQUFBO0FBREEsS0FGQTtBQUtBLGlCQUFBLHlDQUxBO0FBTUEsVUFBQSxjQUFBLEtBQUEsRUFBQSxDQUVBO0FBUkEsR0FBQTtBQVVBLENBWEE7O0FDQ0EsSUFBQSxTQUFBLENBQUEsUUFBQSxFQUFBLFVBQUEsVUFBQSxFQUFBO0FBQ0EsU0FBQTtBQUNBLGNBQUEsR0FEQTtBQUVBLFdBQUEsRUFGQTtBQUdBLGlCQUFBLHNDQUhBO0FBSUEsVUFBQSxjQUFBLEtBQUEsRUFBQTs7QUFFQSxZQUFBLE1BQUEsR0FBQSxJQUFBO0FBQ0EsWUFBQSxVQUFBLEdBQUEsWUFBQTtBQUNBLG1CQUFBLFVBQUEsQ0FBQSxhQUFBO0FBQ0EsY0FBQSxNQUFBLEdBQUEsT0FBQTtBQUNBLE9BSEE7QUFJQSxZQUFBLGVBQUEsR0FBQSxZQUFBO0FBQ0EsbUJBQUEsVUFBQSxDQUFBLGFBQUE7QUFDQSxjQUFBLE1BQUEsR0FBQSxhQUFBO0FBQ0EsT0FIQTtBQUlBLFlBQUEsYUFBQSxHQUFBLFlBQUE7QUFDQSxtQkFBQSxVQUFBLENBQUEsYUFBQTtBQUNBLGNBQUEsTUFBQSxHQUFBLFVBQUE7QUFDQSxPQUhBO0FBSUEsWUFBQSxVQUFBLEdBQUEsWUFBQTtBQUNBLG1CQUFBLFVBQUEsQ0FBQSxhQUFBO0FBQ0EsY0FBQSxNQUFBLEdBQUEsT0FBQTtBQUNBLE9BSEE7QUFJQTtBQXZCQSxHQUFBO0FBeUJBLENBMUJBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2NyeXB0b1Bhc3MnLCBbJ3VpLnJvdXRlciddKVxuYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICAgLy8gSWYgd2UgZ28gdG8gYSBVUkwgdGhhdCB1aS1yb3V0ZXIgZG9lc24ndCBoYXZlIHJlZ2lzdGVyZWQsIGdvIHRvIHRoZSBcIi9cIiB1cmwuXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuXG59KTtcbiIsImFwcC5jb250cm9sbGVyKCdsb2dpbnNDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlKXtcbiAgY29uc29sZS5sb2coJ2luIGxvZ2lucyBjb250cm9sbGVyJyk7XG59KVxuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcikge1xuICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnbG9naW5zJywge1xuICAgIHVybDogJy9sb2dpbnMnLFxuICAgIHRlbXBsYXRlVXJsOiAnYnVpbGQvYW5ndWxhci9sb2dpbnMvbG9naW5zLnZpZXcuaHRtbCcsXG4gICAgY29udHJvbGxlcjogJ2xvZ2luc0NvbnRyb2xsZXInXG4gIH0pXG5cbn0pXG4iLCJhcHAuY29udHJvbGxlcignc2lkZWJhckNvbnRyb2xsZXInLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUpe1xuICAkc2NvcGUuc2hvd24gPSBmYWxzZTtcbiAgJHJvb3RTY29wZS4kb24oJ3Nob3dTaWRlYmFyJywgZnVuY3Rpb24odGhpbmdzLCBhcmdzKXtcbiAgICBjb25zb2xlLmxvZygnZ290IHRoZSBicm9hZGNhc3QnKTtcbiAgICAkc2NvcGUuc2hvd24gPSAhJHNjb3BlLnNob3duO1xuICB9KVxuICAkc2NvcGUuaXRlbXMgPSBbXG4gICAge1xuICAgICAgdGl0bGU6ICdGYWNlYm9vay5jb20nLFxuICAgICAgc2Vjb25kYXJ5VGl0bGU6ICdlbGxpb3R0bWNuYXJ5QGdtYWlsLmNvbSdcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnV2VsbHNGYXJnby5jb20nLFxuICAgICAgc2Vjb25kYXJ5VGl0bGU6ICd3ZWxsc2ZhcmdvZW1haWxAZ21haWwuY29tJ1xuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICd0d2l0dGVyLmNvbScsXG4gICAgICBzZWNvbmRhcnlUaXRsZTogJ3R3aXR0ZXJFbEBnbWFpbC5jb20nXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ0NoYXNlJyxcbiAgICAgIHNlY29uZGFyeVRpdGxlOiAnZWxsaW90dG1jbmFyeUBnbWFpbC5jb20nXG4gICAgfSxcbiAgXVxuICAkc2NvcGUuYWN0aXZlID0gXCJMb2dpblwiXG59KVxuIiwiYXBwLmRpcmVjdGl2ZSgnc2lkZWJhckl0ZW0nLCBmdW5jdGlvbigpe1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgc2NvcGU6IHtcbiAgICAgIGl0ZW06ICc9bW9kZWwnXG4gICAgfSxcbiAgICB0ZW1wbGF0ZVVybDogJ2J1aWxkL2FuZ3VsYXIvc2lkZWJhci9zaWRlYmFyLml0ZW0uaHRtbCcsXG4gICAgbGluazogZnVuY3Rpb24oc2NvcGUpe1xuXG4gICAgfVxuICB9XG59KVxuIiwiXG5hcHAuZGlyZWN0aXZlKCduYXZCYXInLCBmdW5jdGlvbigkcm9vdFNjb3BlKXtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHNjb3BlOiB7fSxcbiAgICB0ZW1wbGF0ZVVybDogJ2J1aWxkL2FuZ3VsYXIvbmF2L25hdi5kaXJlY3RpdmUuaHRtbCcsXG4gICAgbGluazogZnVuY3Rpb24oc2NvcGUpe1xuICAgICAgXG4gICAgICBzY29wZS5hY3RpdmUgPSBudWxsO1xuICAgICAgc2NvcGUubG9naW5DbGljayA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc2hvd1NpZGViYXInKTtcbiAgICAgICAgc2NvcGUuYWN0aXZlID0gXCJMb2dpblwiXG4gICAgICB9XG4gICAgICBzY29wZS5jcmVkaXRDYXJkQ2xpY2sgPSBmdW5jdGlvbigpe1xuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3Nob3dTaWRlYmFyJyk7XG4gICAgICAgIHNjb3BlLmFjdGl2ZSA9IFwiQ3JlZGl0IENhcmRcIlxuICAgICAgfVxuICAgICAgc2NvcGUuaWRlbnRpdHlDbGljayA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc2hvd1NpZGViYXInKTtcbiAgICAgICAgc2NvcGUuYWN0aXZlID0gXCJJZGVudGl0eVwiXG4gICAgICB9XG4gICAgICBzY29wZS5ub3Rlc0NsaWNrID0gZnVuY3Rpb24oKXtcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzaG93U2lkZWJhcicpO1xuICAgICAgICBzY29wZS5hY3RpdmUgPSBcIk5vdGVzXCJcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

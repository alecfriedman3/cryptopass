'use strict';

var app = angular.module('cryptoPass', ['ui.router']);

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
    scope: {},
    templateUrl: 'build/angular/sidebar/sidebar.item.html',
    link: function link(scope) {}
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm5hdi9uYXYuZGlyZWN0aXZlLmpzIiwic2lkZWJhci9zaWRlYmFyLmNvbnRyb2xsZXIuanMiLCJzaWRlYmFyL3NpZGViYXIuZGlyZWN0aXZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBQSxNQUFBLFFBQUEsTUFBQSxDQUFBLFlBQUEsRUFBQSxDQUFBLFdBQUEsQ0FBQSxDQUFBOztBQ0NBLElBQUEsU0FBQSxDQUFBLFFBQUEsRUFBQSxVQUFBLFVBQUEsRUFBQTtBQUNBLFNBQUE7QUFDQSxjQUFBLEdBREE7QUFFQSxXQUFBLEVBRkE7QUFHQSxpQkFBQSxzQ0FIQTtBQUlBLFVBQUEsY0FBQSxLQUFBLEVBQUE7O0FBRUEsWUFBQSxNQUFBLEdBQUEsSUFBQTtBQUNBLFlBQUEsVUFBQSxHQUFBLFlBQUE7QUFDQSxtQkFBQSxVQUFBLENBQUEsYUFBQTtBQUNBLGNBQUEsTUFBQSxHQUFBLE9BQUE7QUFDQSxPQUhBO0FBSUEsWUFBQSxlQUFBLEdBQUEsWUFBQTtBQUNBLG1CQUFBLFVBQUEsQ0FBQSxhQUFBO0FBQ0EsY0FBQSxNQUFBLEdBQUEsYUFBQTtBQUNBLE9BSEE7QUFJQSxZQUFBLGFBQUEsR0FBQSxZQUFBO0FBQ0EsbUJBQUEsVUFBQSxDQUFBLGFBQUE7QUFDQSxjQUFBLE1BQUEsR0FBQSxVQUFBO0FBQ0EsT0FIQTtBQUlBLFlBQUEsVUFBQSxHQUFBLFlBQUE7QUFDQSxtQkFBQSxVQUFBLENBQUEsYUFBQTtBQUNBLGNBQUEsTUFBQSxHQUFBLE9BQUE7QUFDQSxPQUhBO0FBSUE7QUF2QkEsR0FBQTtBQXlCQSxDQTFCQTs7QUNEQSxJQUFBLFVBQUEsQ0FBQSxtQkFBQSxFQUFBLFVBQUEsVUFBQSxFQUFBLE1BQUEsRUFBQTtBQUNBLFNBQUEsS0FBQSxHQUFBLEtBQUE7QUFDQSxhQUFBLEdBQUEsQ0FBQSxhQUFBLEVBQUEsVUFBQSxNQUFBLEVBQUEsSUFBQSxFQUFBO0FBQ0EsWUFBQSxHQUFBLENBQUEsbUJBQUE7QUFDQSxXQUFBLEtBQUEsR0FBQSxDQUFBLE9BQUEsS0FBQTtBQUNBLEdBSEE7QUFJQSxTQUFBLEtBQUEsR0FBQSxDQUNBO0FBQ0EsV0FBQSxjQURBO0FBRUEsb0JBQUE7QUFGQSxHQURBLEVBS0E7QUFDQSxXQUFBLGdCQURBO0FBRUEsb0JBQUE7QUFGQSxHQUxBLEVBU0E7QUFDQSxXQUFBLGFBREE7QUFFQSxvQkFBQTtBQUZBLEdBVEEsRUFhQTtBQUNBLFdBQUEsT0FEQTtBQUVBLG9CQUFBO0FBRkEsR0FiQSxDQUFBO0FBa0JBLFNBQUEsTUFBQSxHQUFBLE9BQUE7QUFDQSxDQXpCQTs7QUNBQSxJQUFBLFNBQUEsQ0FBQSxhQUFBLEVBQUEsWUFBQTtBQUNBLFNBQUE7QUFDQSxjQUFBLEdBREE7QUFFQSxXQUFBLEVBRkE7QUFHQSxpQkFBQSx5Q0FIQTtBQUlBLFVBQUEsY0FBQSxLQUFBLEVBQUEsQ0FFQTtBQU5BLEdBQUE7QUFRQSxDQVRBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2NyeXB0b1Bhc3MnLCBbJ3VpLnJvdXRlciddKVxuIiwiXG5hcHAuZGlyZWN0aXZlKCduYXZCYXInLCBmdW5jdGlvbigkcm9vdFNjb3BlKXtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHNjb3BlOiB7fSxcbiAgICB0ZW1wbGF0ZVVybDogJ2J1aWxkL2FuZ3VsYXIvbmF2L25hdi5kaXJlY3RpdmUuaHRtbCcsXG4gICAgbGluazogZnVuY3Rpb24oc2NvcGUpe1xuICAgICAgXG4gICAgICBzY29wZS5hY3RpdmUgPSBudWxsO1xuICAgICAgc2NvcGUubG9naW5DbGljayA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc2hvd1NpZGViYXInKTtcbiAgICAgICAgc2NvcGUuYWN0aXZlID0gXCJMb2dpblwiXG4gICAgICB9XG4gICAgICBzY29wZS5jcmVkaXRDYXJkQ2xpY2sgPSBmdW5jdGlvbigpe1xuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3Nob3dTaWRlYmFyJyk7XG4gICAgICAgIHNjb3BlLmFjdGl2ZSA9IFwiQ3JlZGl0IENhcmRcIlxuICAgICAgfVxuICAgICAgc2NvcGUuaWRlbnRpdHlDbGljayA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc2hvd1NpZGViYXInKTtcbiAgICAgICAgc2NvcGUuYWN0aXZlID0gXCJJZGVudGl0eVwiXG4gICAgICB9XG4gICAgICBzY29wZS5ub3Rlc0NsaWNrID0gZnVuY3Rpb24oKXtcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzaG93U2lkZWJhcicpO1xuICAgICAgICBzY29wZS5hY3RpdmUgPSBcIk5vdGVzXCJcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pXG4iLCJhcHAuY29udHJvbGxlcignc2lkZWJhckNvbnRyb2xsZXInLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUpe1xuICAkc2NvcGUuc2hvd24gPSBmYWxzZTtcbiAgJHJvb3RTY29wZS4kb24oJ3Nob3dTaWRlYmFyJywgZnVuY3Rpb24odGhpbmdzLCBhcmdzKXtcbiAgICBjb25zb2xlLmxvZygnZ290IHRoZSBicm9hZGNhc3QnKTtcbiAgICAkc2NvcGUuc2hvd24gPSAhJHNjb3BlLnNob3duO1xuICB9KVxuICAkc2NvcGUuaXRlbXMgPSBbXG4gICAge1xuICAgICAgdGl0bGU6ICdGYWNlYm9vay5jb20nLFxuICAgICAgc2Vjb25kYXJ5VGl0bGU6ICdlbGxpb3R0bWNuYXJ5QGdtYWlsLmNvbSdcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnV2VsbHNGYXJnby5jb20nLFxuICAgICAgc2Vjb25kYXJ5VGl0bGU6ICd3ZWxsc2ZhcmdvZW1haWxAZ21haWwuY29tJ1xuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICd0d2l0dGVyLmNvbScsXG4gICAgICBzZWNvbmRhcnlUaXRsZTogJ3R3aXR0ZXJFbEBnbWFpbC5jb20nXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ0NoYXNlJyxcbiAgICAgIHNlY29uZGFyeVRpdGxlOiAnZWxsaW90dG1jbmFyeUBnbWFpbC5jb20nXG4gICAgfSxcbiAgXVxuICAkc2NvcGUuYWN0aXZlID0gXCJMb2dpblwiXG59KVxuIiwiYXBwLmRpcmVjdGl2ZSgnc2lkZWJhckl0ZW0nLCBmdW5jdGlvbigpe1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgc2NvcGU6IHt9LFxuICAgIHRlbXBsYXRlVXJsOiAnYnVpbGQvYW5ndWxhci9zaWRlYmFyL3NpZGViYXIuaXRlbS5odG1sJyxcbiAgICBsaW5rOiBmdW5jdGlvbihzY29wZSl7XG4gICAgICBcbiAgICB9XG4gIH1cbn0pXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

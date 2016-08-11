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
    scope: {
      item: '=model'
    },
    templateUrl: 'build/angular/sidebar/sidebar.item.html',
    link: function link(scope) {}
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxvZ2lucy9sb2dpbnMuY29udHJvbGxlci5qcyIsImxvZ2lucy9sb2dpbnMuc3RhdGUuanMiLCJuYXYvbmF2LmRpcmVjdGl2ZS5qcyIsInNpZGViYXIvc2lkZWJhci5jb250cm9sbGVyLmpzIiwic2lkZWJhci9zaWRlYmFyLmRpcmVjdGl2ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQUEsTUFBQSxRQUFBLE1BQUEsQ0FBQSxZQUFBLEVBQUEsQ0FBQSxXQUFBLENBQUEsQ0FBQTtBQUNBLElBQUEsTUFBQSxDQUFBLFVBQUEsa0JBQUEsRUFBQTtBQUNBO0FBQ0EscUJBQUEsU0FBQSxDQUFBLEdBQUE7QUFFQSxDQUpBOztBQ0RBLElBQUEsVUFBQSxDQUFBLGtCQUFBLEVBQUEsVUFBQSxNQUFBLEVBQUE7QUFDQSxVQUFBLEdBQUEsQ0FBQSxzQkFBQTtBQUNBLENBRkE7O0FDQUEsSUFBQSxNQUFBLENBQUEsVUFBQSxjQUFBLEVBQUE7QUFDQSxpQkFBQSxLQUFBLENBQUEsUUFBQSxFQUFBO0FBQ0EsU0FBQSxTQURBO0FBRUEsaUJBQUEsdUNBRkE7QUFHQSxnQkFBQTtBQUhBLEdBQUE7QUFNQSxDQVBBOztBQ0NBLElBQUEsU0FBQSxDQUFBLFFBQUEsRUFBQSxVQUFBLFVBQUEsRUFBQTtBQUNBLFNBQUE7QUFDQSxjQUFBLEdBREE7QUFFQSxXQUFBLEVBRkE7QUFHQSxpQkFBQSxzQ0FIQTtBQUlBLFVBQUEsY0FBQSxLQUFBLEVBQUE7O0FBRUEsWUFBQSxNQUFBLEdBQUEsSUFBQTtBQUNBLFlBQUEsVUFBQSxHQUFBLFlBQUE7QUFDQSxtQkFBQSxVQUFBLENBQUEsYUFBQTtBQUNBLGNBQUEsTUFBQSxHQUFBLE9BQUE7QUFDQSxPQUhBO0FBSUEsWUFBQSxlQUFBLEdBQUEsWUFBQTtBQUNBLG1CQUFBLFVBQUEsQ0FBQSxhQUFBO0FBQ0EsY0FBQSxNQUFBLEdBQUEsYUFBQTtBQUNBLE9BSEE7QUFJQSxZQUFBLGFBQUEsR0FBQSxZQUFBO0FBQ0EsbUJBQUEsVUFBQSxDQUFBLGFBQUE7QUFDQSxjQUFBLE1BQUEsR0FBQSxVQUFBO0FBQ0EsT0FIQTtBQUlBLFlBQUEsVUFBQSxHQUFBLFlBQUE7QUFDQSxtQkFBQSxVQUFBLENBQUEsYUFBQTtBQUNBLGNBQUEsTUFBQSxHQUFBLE9BQUE7QUFDQSxPQUhBO0FBSUE7QUF2QkEsR0FBQTtBQXlCQSxDQTFCQTs7QUNEQSxJQUFBLFVBQUEsQ0FBQSxtQkFBQSxFQUFBLFVBQUEsVUFBQSxFQUFBLE1BQUEsRUFBQTtBQUNBLFNBQUEsS0FBQSxHQUFBLEtBQUE7QUFDQSxhQUFBLEdBQUEsQ0FBQSxhQUFBLEVBQUEsVUFBQSxNQUFBLEVBQUEsSUFBQSxFQUFBO0FBQ0EsWUFBQSxHQUFBLENBQUEsbUJBQUE7QUFDQSxXQUFBLEtBQUEsR0FBQSxDQUFBLE9BQUEsS0FBQTtBQUNBLEdBSEE7QUFJQSxTQUFBLEtBQUEsR0FBQSxDQUNBO0FBQ0EsV0FBQSxjQURBO0FBRUEsb0JBQUE7QUFGQSxHQURBLEVBS0E7QUFDQSxXQUFBLGdCQURBO0FBRUEsb0JBQUE7QUFGQSxHQUxBLEVBU0E7QUFDQSxXQUFBLGFBREE7QUFFQSxvQkFBQTtBQUZBLEdBVEEsRUFhQTtBQUNBLFdBQUEsT0FEQTtBQUVBLG9CQUFBO0FBRkEsR0FiQSxDQUFBO0FBa0JBLFNBQUEsTUFBQSxHQUFBLE9BQUE7QUFDQSxDQXpCQTs7QUNBQSxJQUFBLFNBQUEsQ0FBQSxhQUFBLEVBQUEsWUFBQTtBQUNBLFNBQUE7QUFDQSxjQUFBLEdBREE7QUFFQSxXQUFBO0FBQ0EsWUFBQTtBQURBLEtBRkE7QUFLQSxpQkFBQSx5Q0FMQTtBQU1BLFVBQUEsY0FBQSxLQUFBLEVBQUEsQ0FFQTtBQVJBLEdBQUE7QUFVQSxDQVhBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2NyeXB0b1Bhc3MnLCBbJ3VpLnJvdXRlciddKVxuYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICAgLy8gSWYgd2UgZ28gdG8gYSBVUkwgdGhhdCB1aS1yb3V0ZXIgZG9lc24ndCBoYXZlIHJlZ2lzdGVyZWQsIGdvIHRvIHRoZSBcIi9cIiB1cmwuXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuXG59KTtcbiIsImFwcC5jb250cm9sbGVyKCdsb2dpbnNDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlKXtcbiAgY29uc29sZS5sb2coJ2luIGxvZ2lucyBjb250cm9sbGVyJyk7XG59KVxuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcikge1xuICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnbG9naW5zJywge1xuICAgIHVybDogJy9sb2dpbnMnLFxuICAgIHRlbXBsYXRlVXJsOiAnYnVpbGQvYW5ndWxhci9sb2dpbnMvbG9naW5zLnZpZXcuaHRtbCcsXG4gICAgY29udHJvbGxlcjogJ2xvZ2luc0NvbnRyb2xsZXInXG4gIH0pXG5cbn0pXG4iLCJcbmFwcC5kaXJlY3RpdmUoJ25hdkJhcicsIGZ1bmN0aW9uKCRyb290U2NvcGUpe1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgc2NvcGU6IHt9LFxuICAgIHRlbXBsYXRlVXJsOiAnYnVpbGQvYW5ndWxhci9uYXYvbmF2LmRpcmVjdGl2ZS5odG1sJyxcbiAgICBsaW5rOiBmdW5jdGlvbihzY29wZSl7XG4gICAgICBcbiAgICAgIHNjb3BlLmFjdGl2ZSA9IG51bGw7XG4gICAgICBzY29wZS5sb2dpbkNsaWNrID0gZnVuY3Rpb24oKXtcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzaG93U2lkZWJhcicpO1xuICAgICAgICBzY29wZS5hY3RpdmUgPSBcIkxvZ2luXCJcbiAgICAgIH1cbiAgICAgIHNjb3BlLmNyZWRpdENhcmRDbGljayA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnc2hvd1NpZGViYXInKTtcbiAgICAgICAgc2NvcGUuYWN0aXZlID0gXCJDcmVkaXQgQ2FyZFwiXG4gICAgICB9XG4gICAgICBzY29wZS5pZGVudGl0eUNsaWNrID0gZnVuY3Rpb24oKXtcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzaG93U2lkZWJhcicpO1xuICAgICAgICBzY29wZS5hY3RpdmUgPSBcIklkZW50aXR5XCJcbiAgICAgIH1cbiAgICAgIHNjb3BlLm5vdGVzQ2xpY2sgPSBmdW5jdGlvbigpe1xuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3Nob3dTaWRlYmFyJyk7XG4gICAgICAgIHNjb3BlLmFjdGl2ZSA9IFwiTm90ZXNcIlxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcbiIsImFwcC5jb250cm9sbGVyKCdzaWRlYmFyQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSl7XG4gICRzY29wZS5zaG93biA9IGZhbHNlO1xuICAkcm9vdFNjb3BlLiRvbignc2hvd1NpZGViYXInLCBmdW5jdGlvbih0aGluZ3MsIGFyZ3Mpe1xuICAgIGNvbnNvbGUubG9nKCdnb3QgdGhlIGJyb2FkY2FzdCcpO1xuICAgICRzY29wZS5zaG93biA9ICEkc2NvcGUuc2hvd247XG4gIH0pXG4gICRzY29wZS5pdGVtcyA9IFtcbiAgICB7XG4gICAgICB0aXRsZTogJ0ZhY2Vib29rLmNvbScsXG4gICAgICBzZWNvbmRhcnlUaXRsZTogJ2VsbGlvdHRtY25hcnlAZ21haWwuY29tJ1xuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICdXZWxsc0ZhcmdvLmNvbScsXG4gICAgICBzZWNvbmRhcnlUaXRsZTogJ3dlbGxzZmFyZ29lbWFpbEBnbWFpbC5jb20nXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ3R3aXR0ZXIuY29tJyxcbiAgICAgIHNlY29uZGFyeVRpdGxlOiAndHdpdHRlckVsQGdtYWlsLmNvbSdcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnQ2hhc2UnLFxuICAgICAgc2Vjb25kYXJ5VGl0bGU6ICdlbGxpb3R0bWNuYXJ5QGdtYWlsLmNvbSdcbiAgICB9LFxuICBdXG4gICRzY29wZS5hY3RpdmUgPSBcIkxvZ2luXCJcbn0pXG4iLCJhcHAuZGlyZWN0aXZlKCdzaWRlYmFySXRlbScsIGZ1bmN0aW9uKCl7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdFJyxcbiAgICBzY29wZToge1xuICAgICAgaXRlbTogJz1tb2RlbCdcbiAgICB9LFxuICAgIHRlbXBsYXRlVXJsOiAnYnVpbGQvYW5ndWxhci9zaWRlYmFyL3NpZGViYXIuaXRlbS5odG1sJyxcbiAgICBsaW5rOiBmdW5jdGlvbihzY29wZSl7XG5cbiAgICB9XG4gIH1cbn0pXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

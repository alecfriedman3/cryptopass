
app.directive('navBar', function($state){
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'build/angular/nav/nav.directive.html',
    link: function(scope){

      scope.active = null;
      scope.navClick = function(str){
        scope.active = str;
        $state.go(str)
      }
    }
  }
})

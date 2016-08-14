
app.directive('navBar', function($state){
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'build/angular/nav/nav.directive.html',
    link: function(scope){
      scope.active = null;
      scope.show = false
      scope.navClick = function(str){
        scope.active = str;
        scope.show = false;
        $state.go(str)
      }
      scope.showHideDropdown = function(){
        console.log('clicked');
        scope.show = !scope.show;
      }
    }
  }
})

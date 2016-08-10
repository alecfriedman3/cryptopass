
app.directive('navBar', function($rootScope){
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'build/angular/nav/nav.directive.html',
    link: function(scope){
      
      scope.active = null;
      scope.loginClick = function(){
        $rootScope.$broadcast('showSidebar');
        scope.active = "Login"
      }
      scope.creditCardClick = function(){
        $rootScope.$broadcast('showSidebar');
        scope.active = "Credit Card"
      }
      scope.identityClick = function(){
        $rootScope.$broadcast('showSidebar');
        scope.active = "Identity"
      }
      scope.notesClick = function(){
        $rootScope.$broadcast('showSidebar');
        scope.active = "Notes"
      }
    }
  }
})


app.directive('navBar', function($rootScope){
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'build/angular/nav/nav.directive.html',
    link: function(scope){
      
      scope.active = null;
      // we could accomplish this with one function taking an input string from our html and setting scope.active to the string
      // scope.showSidebar = function(class){
      // 	$rootScope.$broadcast('showSidebar');
      // 	scope.active = class
      // }
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

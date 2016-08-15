
app.directive('navBar', function($state, $stateParams, $rootScope){
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'build/angular/nav/nav.directive.html',
    link: function(scope){
      scope.active = null;
      scope.show = false
      scope.navClick = function(str){
      	decryptFile(masterPass)
      	.then(function (obj){
					masterObj = obj
					$rootScope.$evalAsync()
				})
      	if (str == scope.active) return
      	var storedState = JSON.stringify({name: $state.current.name, id: $stateParams.id})
        window.sessionStorage.setItem(scope.active, storedState)
      	if (window.sessionStorage[str]){
      		scope.active = str
      		var stateStr = window.sessionStorage[str]
      		var stateObj = JSON.parse(stateStr)
      		$state.go(stateObj.name, {id: stateObj.id})
      		return
      	}
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

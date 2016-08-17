
app.directive('navBar', function($state, $stateParams, $rootScope){
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'build/angular/nav/nav.directive.html',
    link: function(scope){
      scope.show = false
      scope.navClick = function(str){
        var stateParent = $state.current.name.replace(/\.single/g, '').replace(/\.add/g, '')
      	decryptFile(masterPass)
      	.then(function (obj){
					masterObj = obj
					$rootScope.$evalAsync()
				})
      	if (str == stateParent) return
      	var storedState = JSON.stringify({name: $state.current.name, id: $stateParams.id})
        window.sessionStorage.setItem(stateParent, storedState)
      	if (window.sessionStorage[str]){
      		var stateStr = window.sessionStorage[str]
      		var stateObj = JSON.parse(stateStr)
      		$state.go(stateObj.name, {id: stateObj.id}, {reload: true})
      		return
      	}
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

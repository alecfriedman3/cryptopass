app.directive('sidebarItem', function($state){
  return {
    restrict: 'E',
    scope: {
      item: '='
    },
    templateUrl: 'build/angular/sidebar/sidebar.item.html',
    link: function(scope){
      scope.secondaryProp = $state.current.name === 'login' ? scope.item.username : $state.current.name === 'creditCard' ? scope.item.cardNumber : scope.item.data
    }
  }
})

app.directive('sidebar', function($state){
  return {
    restrict: 'E',
    scope: {
      navItem: '=',
    },
    controller:'sidebarController',
    templateUrl: 'build/angular/sidebar/sidebar.html',
    link: function(scope){
    	scope.singleView = function (id){
      	if (!$state.current.name.match(/\.single$/)) $state.go($state.current.name + '.single', {id: id})
      	else $state.go($state.current.name, {id: id})
      }
    }
  }
})

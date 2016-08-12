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
    		console.log('wtf')
      	var stateParent = $state.current.name.replace(/\.single/g, '').replace(/\.add/g, '')
      	$state.go(stateParent + '.single', {id: id})
      }

    	scope.addItem = function (){
    		var stateParent = $state.current.name.replace(/\.single/g, '').replace(/\.add/g, '')
    		console.log('wtf3', stateParent)
    		$state.go(stateParent + '.add')
    	}

    }
  }
})

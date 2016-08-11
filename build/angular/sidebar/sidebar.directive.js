app.directive('sidebarItem', function(){
  return {
    restrict: 'E',
    scope: {
      item: '=',
      secondaryProp: '='
    },
    templateUrl: 'build/angular/sidebar/sidebar.item.html',
    link: function(scope){
      scope.masterObj = masterObj;
    }
  }
})

app.directive('sidebar', function(){
  return {
    restrict: 'E',
    scope: {
      navItem: '='
    },
    controller:'sidebarController',
    templateUrl: 'build/angular/sidebar/sidebar.html',
    link: function(scope){
      scope.masterObj = masterObj
    }
  }
})

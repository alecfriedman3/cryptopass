app.directive('sidebarItem', function(){
  return {
    restrict: 'E',
    scope: {
      item: '='
    },
    templateUrl: 'build/angular/sidebar/sidebar.item.html',
    link: function(scope){
    }
  }
})

app.directive('sidebar', function(){
  return {
    restrict: 'E',
    scope: {
      item: '='
    },
    controller:'sidebarController',
    templateUrl: 'build/angular/sidebar/sidebar.html',
    link: function(scope){
    }
  }
})

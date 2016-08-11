app.directive('sidebarItem', function(){
  return {
    restrict: 'E',
    scope: {
      item: '=model'
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
      item: '=model'
    },
    templateUrl: 'build/angular/sidebar/sidebar.html',
    link: function(scope){
    }
  }
})

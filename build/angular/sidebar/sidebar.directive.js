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

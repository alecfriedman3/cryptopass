var fs = require('fs');

app.directive('sidebarItem', function($state){
  return {
    restrict: 'E',
    scope: {
      item: '='
    },
    templateUrl: 'build/angular/sidebar/sidebar.item.html',
    link: function(scope){
      scope.secondaryProp = $state.current.name === 'login' ? scope.item.username : $state.current.name === 'creditCard' ? scope.item.cardNumber : scope.item.data
      scope.getImg = function(str){
        let fileNames = fs.readdirSync(__dirname +'/build/images/icons/');
        let strArr = str.toLowerCase().split(' ');
        let matches = strArr.filter(word => fileNames.indexOf(word += '.png') > -1)
        return matches.length > 0 ? 'build/images/icons/' + matches[0] + '.png' : 'build/images/icons/key.png';     
      }
      scope.delete=function(id){
        var stateParent = $state.current.name.replace(/\.single/g, '').replace(/\.add/g, '')
        masterObj[stateParent].forEach((info, i) => {
          if (info.id==id) {
            masterObj[stateParent].splice(i,1);

          }
        })
        var encrypted=encrypt(JSON.stringify(masterObj),masterPass);
        socket.emit('addFromElectron',{data:encrypted});
       $state.go(stateParent);
      }
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
      	var stateParent = $state.current.name.replace(/\.single/g, '').replace(/\.add/g, '')
      	console.log(stateParent)
      	$state.go(stateParent + '.single', {id: id})
      }

    	scope.addItem = function (){
    		var stateParent = $state.current.name.replace(/\.single/g, '').replace(/\.add/g, '')
    		$state.go(stateParent + '.add')
    	}


      scope.settingsView = function(navItem, second){
        $state.go('settings', {currentSidebar: navItem})
      }

    }
  }
})

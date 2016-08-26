var fs = require('fs');

app.directive('sidebarItem', function($state, $stateParams){
  return {
    restrict: 'E',
    scope: {
      item: '='
    },
    templateUrl: 'build/angular/sidebar/sidebar.item.html',
    link: function(scope){

      var stateParent = $state.current.name.replace(/\.single/g, '').replace(/\.add/g, '')
      scope.secondaryProp = stateParent === 'login' ? scope.item.username : stateParent === 'creditCard' ? scope.item.cardNumber : scope.item.data

      scope.getImg = getImg

      scope.delete = function(id){
         var confirmDelete=confirm("Are you sure you want to delete?");
        if (confirmDelete==true){

        var stateParent = $state.current.name.replace(/\.single/g, '').replace(/\.add/g, '')
        if (window.sessionStorage[stateParent]){
          var storedStateId = JSON.parse(window.sessionStorage[stateParent]).id
          if (storedStateId == id){
            window.sessionStorage.removeItem(stateParent)
          }
        }
        settings.get('dropboxPath')
        .then(path => {
          if (!path){
            masterObj[stateParent].forEach((info, i) => {
              if (info.id == id) {
                masterObj[stateParent].splice(i, 1);
              }
            })
          } else {
            masterObj[stateParent].forEach((info, i) => {
              if (info.id == id) {
                masterObj[stateParent][i].deleted = true;
                masterObj[stateParent][i].lastUpdated = moment().format('MMMM Do YYYY, h:mm:ss a');
              }
            })
          }
          return Promise.all([encryptFile(masterObj, masterPass), path])
        })
        .spread((file, path) => {
          var encrypted = encrypt(JSON.stringify(masterObj),masterPass);
          socket.emit('addFromElectron',{data:encrypted, dropboxPath: path});
          if (masterObj[stateParent].filter(obj => !obj.deleted).length){
            if ($stateParams.id == id){
              var minIdx = masterObj[stateParent].filter(obj => obj.id != id && !obj.deleted)[0].id
              $state.go(stateParent + '.single', {id: minIdx}, {reload: true})
              return
            } else{
              $state.go(stateParent + '.single', {id: $stateParams.id}, {reload: true})
              return
            }
          }
          // else go to the eventual state with no info
          $state.go(stateParent);
        })
      }
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

      scope.settings = null;


    	scope.singleView = function (id){
      	var stateParent = $state.current.name.replace(/\.single/g, '').replace(/\.add/g, '')
        var storedState = JSON.stringify({name: $state.current.name, id: id})
        window.sessionStorage.setItem(stateParent, storedState)
      	$state.go(stateParent + '.single', {id: id})
      }

      scope.stateName = nameFormat($state.current.name.replace(/\.single/g, '').replace(/\.add/g, ''));

      if (scope.stateName === 'Settings') scope.settings = true;


    	scope.addItem = function (){
    		var stateParent = $state.current.name.replace(/\.single/g, '').replace(/\.add/g, '') + '.add'
    		$state.go(stateParent, {reload: true, inherit: false,notify: true})
    	}


      scope.settingsView = function(navItem, second){
        $state.go('settings', {currentSidebar: navItem})
      }

    }
  }
})

function nameFormat (name) {
  if (name.toLowerCase() === "home") return "Home"
  name = name[0].toLowerCase()+name.substring(1)
  var re = /[A-Z]/g
  var capitalsArr = name.match(re);
  var wordsArr = name.split(re);
  for (var i = 1; i < wordsArr.length; i ++) {
    wordsArr[i] = capitalsArr[i-1]+wordsArr[i]
  }
  var title = wordsArr.join(" ")
  title = title[0].toUpperCase()+title.substring(1)
  if (title[title.length-1] === "y") {
    title = title.slice(0, -1)+"ies"
  } else if (name[name.length-1] !== "s"){
    title += "s"
  }
  return title
}

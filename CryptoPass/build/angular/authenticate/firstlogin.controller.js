// var username = require('username')
// var settings = require('electron-settings');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

app.controller('firstLoginController', function($scope, $state, $rootScope){

  $scope.master = null;

  $scope.setPassword = function (master){
    if ($scope.master === $scope.master2 && $scope.master2 === $scope.master3) {
      utils.generateSecret(master);
      utils.encryptFile({login: [], creditCard: [], identity: [], note: [] }, master);
      settings.set('user', true).then(() => {
        masterPass = master;
        masterObj = {login: [], creditCard: [], identity: [], note: [] };
        $rootScope.validated = true;
        $rootScope.$evalAsync()
        $state.go('home')
      })
    } else {
      alert ("Your Passwords Do Not Match!");
    }
  }

  $scope.username;

  username().then(username => {
    $scope.username = username;
    $scope.$evalAsync()
  })

  $scope.dropboxImport = function () {

    dialog.showMessageBox({type: 'info', buttons: ['Cancel', 'OK' ], message: "Please select the CryptoPass folder in your Dropbox"}, function (result) {
        if (result) {
          let dropboxPath = dialog.showOpenDialog({title: 'Please select your Dropbox folder', properties: ['openDirectory']})

          confirmDropboxPath(dropboxPath[0])
            .then(function (resultArr) {
              if (resultArr.length === 2) {
                readAndWriteRecovery(dropboxPath[0], resultArr)
                .then(() => $state.go('auth'));
              }
              else alert("We can't find CryptoPass in the selected folder. Please try again.")
            })
        }
    })
  }

  function confirmDropboxPath (path) {
    return fs.readdirAsync(path)
      .then(function (result) {
        return result.filter(function (filename) {
          if (filename === 'data.txt' || filename === 'secret2.txt') return filename;
          });
      })
  }

  function readAndWriteRecovery (path, arr) {

    return fs.readFileAsync(path + '/' + arr[0])
      .then(filedata => fs.writeFileAsync(__dirname + "/utilities/" + arr[0], filedata))
      .then(() => fs.readFileAsync(path+'/'+arr[1]))
      .then(filedata => fs.writeFileAsync(__dirname+'/utilities/'+arr[1], filedata));
  }

});

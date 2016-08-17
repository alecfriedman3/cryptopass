app.controller('settingsController', function($scope, $cordovaOauth){
  $scope.dropboxAuth = function(){
    console.log('clicked on ausdfth');
    $cordovaOauth.dropbox('pg8nt8sn9h5yidb')
    .then(function(res){
      console.dir(res);
    })
  };
})

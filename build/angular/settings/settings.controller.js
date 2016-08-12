app.controller('settingsController', function($scope, $stateParams, $timeout){

  $scope.sidebar = $stateParams.currentSidebar;
  $scope.error = null;
  $scope.changingMasterPass = false;
  $scope.success = null;

  $scope.showForm = function(){
    $scope.changingMasterPass = !$scope.changingMasterPass;
  }

  $scope.changeMasterPassword = function(currentPassword, newPassword1, newPassword2, newPassword3){
    if(currentPassword === undefined){
      $scope.changingMasterPass = false;
      return;
    }
    if(validate(currentPassword)){
      if(newPassword1.length >= 8){
        if(newPassword1 === newPassword2 && newPassword1 === newPassword3 && newPassword3 === newPassword3){
          generateSecret(newPassword1);
          encryptFile(masterObj, newPassword1)
          .then(() => decryptFile(newPassword1))
          .then(() => {
            $scope.success = "Successfully updated password!";
            $scope.changingMasterPass = false
            $scope.currentPassword = '';
            $scope.newPassword1 = '';
            $scope.newPassword2 = '';
            $scope.newPassword3 = '';
            $timeout(function(){
              $scope.success = null;
            }, 2000)
            $scope.$evalAsync()
          })
        } else {
          $scope.error = 'New passwords don\'t match!'
          $timeout(function(){
            $scope.error = null;
          }, 2000)
        }
      } else {
        $scope.error = "New password must be at least 8 characters"
        $timeout(function(){
          $scope.error = null;
        }, 2000)
      }

    } else {
      $scope.error = 'Current password doesn\'t match!'
      $timeout(function(){
        $scope.error = null;
      }, 2000)
    }
  }


})

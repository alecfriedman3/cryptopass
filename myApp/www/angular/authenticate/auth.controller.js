app.controller('authController', function($scope, $state){
	// $scope.master = null;
	$scope.checkMaster=function(master){
		console.log(master)
		$state.go('app.home');
	}
})

app.controller('cryptoCtrl', function($scope, $rootScope){
	console.log('started angular')
	$scope.authenticate = true;

	$scope.authenticatePassword = function (){
		// need to validate password from chrome
		console.log($scope.master, socket.emit)
		masterPass = $scope.master
		socket.emit('chromeToValidate')
	}

	// socket.on('secretToChrome', function (data){
	// 	console.log('secret ', data)
	// 	try{
	// 		// try decrypting, if success emit success, otherwise reset master
	// 		decrypt(data.data, $scope.master);
	// 		masterPass = $scope.master;
	// 		socket.emit('chromeValidated');
	// 		$scope.authenticate = null
	// 	} catch(err){
	// 			$scope.master = null
	// 	}
	// })
});

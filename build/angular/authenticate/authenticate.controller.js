
// reminder of functions and utilities available throughout application
// var utils = require('../../utilities/encrypt.file.js')
// var validate = utils.validate;
// var decryptFile = utils.decryptFile
// var encryptFile = utils.encryptFile
// var masterObj;

app.controller('authController', function($scope, $state, $rootScope){

	$scope.master = null;

	$scope.authenticatePassword = function (master){
		var isValid = validate(master)
		if (!isValid) {
			console.log('invalid master password')
			$scope.master = null
			return
		} else if (isValid){
			decryptFile(master)
			.then(function (obj){
				masterObj = obj
				console.log(masterObj);
				masterPass = master;
				$rootScope.validated = true;
				$rootScope.$evalAsync()
				$state.go('home')
			})
		}
	}
});

// 	var number = document.getElementsByClassName("number"),
// 	    numberSelect = document.getElementsByClassName("number_select");
//
// 	for(var i = 0; i < number.length; i++) {
// 		numberSelect[i].addEventListener("click", fnRotateLock, false);
// 	  numberSelect[i].style.marginTop = "0px";
// 	  console.log(numberSelect[i]);
// 	}
//
// 	function fnRotateLock() {
// 	  var spans = document.getElementsByClassName("numSpinner");
// 		if (parseInt(this.style.marginTop, 10) <= -612 + 153) {
// 			this.style.marginTop = "0px";
// 			for (var i = 0; i < spans.length; i++) {
// 				if(spans[i].classList.contains("top_number")) {
// 					spans[i].classList.remove("top_number");
// 			}
// 	      if(spans[i].classList.contains("bottom_number")) {
// 	        spans[i].classList.remove("bottom_number");;
// 	      }
// 	    }
// 	    spans[0].classList.add("top_number");
// 	    spans[2].classList.add("bottom_number");
// 	  }
// 	  else {
// 	    this.style.marginTop = parseInt(this.style.marginTop, 10) - 51 + "px";
// 	    for(var i = 0; i < spans.length; i++) {
// 	      if(spans[i].classList.contains("top_number")) {
// 	        spans[i].classList.remove("top_number");
// 	        console.log(spans[i+1]);
// 	        spans[i+1].classList.add("top_number");
// 	        i++;
// 	      }
// 	      if(spans[i].classList.contains("bottom_number")) {
// 	        spans[i].classList.remove("bottom_number");
// 	        spans[i+1].classList.add("bottom_number");
// 	        i += 1;
// 	      }
// 	    }
// 	  }
// 	}
// })

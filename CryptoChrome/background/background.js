var socket = io('http://localhost:9999', { reconnect: true });
socket.on('connect', function() {
  console.log('chrome connected');
})
var masterObj, masterPass, valid;

chrome.extension.onMessage.addListener(function (req, sender, sendRes){
	masterPass = req.master
	$.get('http://localhost:9999/secret')
	.then(function (data){
		try {
	    // try decrypting, if success emit success, otherwise reset master
	    var decrypted = decrypt(data.data, masterPass)
	    valid = true;
	    socket.emit('chromeValidate')
	  } catch (err) {
	    valid = false;
	  }
	  sendRes({valid: valid})
	})
	return true
})


socket.on('electronAdd', function(data) {
  console.log('electronAdd socket fired and caught');
  masterObj = JSON.parse(decrypt(data.data, masterPass))
  console.log(masterObj)
})

socket.on('responseChromeValidated', function(data) {
  masterObj = JSON.parse(decrypt(data.data, masterPass))
  console.log(masterObj)
})



var EventListener = require('../event.listener')
var socket = io('http://localhost:9999', { reconnect: true });
socket.on('connect', function() {
  console.log('chrome connected');
})
var masterObj, masterPass, valid;
var eventListener = new EventListener();

eventListener.on('authentication', function (req) {
  masterPass = req.master
  $.get('http://localhost:9999/secret')
  .then(function (data){
      // try decrypting, if success emit success, otherwise reset master
    var decrypted = decrypt(data.data, masterPass)
    valid = data.check === decrypted
    chrome.extension.sendMessage({valid: valid, eventName: 'validation'})
    if (valid){
      socket.emit('chromeValidate')
    }
  })
  .catch(function (err){
    console.error(err)
  })
})

chrome.extension.onMessage.addListener(function (req, sender, sendRes){
  if (!eventListener[req.eventName]) return
	eventListener.emit(req.eventName, req);
})

eventListener.on('logins', function (data) {
  console.log('responding');
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {eventName: 'loginRes', logins: masterObj.login})
  })
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



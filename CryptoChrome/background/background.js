var EventListener = require('../event.listener')
var socket = io('http://localhost:9999', { reconnect: true });
socket.on('connect', function() {
  console.log('chrome connected');
})
var masterObj, masterPass, valid, accountInfo = {};
var eventListener = new EventListener();
var date = new Date()
var nameFormat = require('../utilities/name.format.js')
var filterUsername = null;

eventListener.on('authentication', function (req) {
  masterPass = req.master
  $.get('http://localhost:9999/secret')
  .then(function (data){
      // try decrypting, if success emit success, otherwise reset master
    var decrypted = decrypt(data.data, masterPass)
    valid = data.check === decrypted
    // chrome.extension.sendMessage({valid: valid, eventName: 'validation'})
    if (valid){
      socket.emit('chromeValidate')
    }
  })
  .catch(function (err){
    console.error(err)
  })
})

chrome.extension.onMessage.addListener(function (req, sender, sendRes){
  updateTime()
  if (!eventListener[req.eventName]) return
	eventListener.emit(req.eventName, req);
})

eventListener.on('logins', function (data) {
  // send only login information that could match the current website.
  // Do not want to send all information every time we visit a site in case the site is malicious
  var possibleLogins = [];
  masterObj.login.forEach(function (account){
    var lowerName = account.name.split(' ').join('').toLowerCase()
    var accountRe = new RegExp(lowerName)
    if (data.currentUrl.match(accountRe) || (account.name.toLowerCase() == 'gmail' && data.currentUrl.match(/google/))){
      possibleLogins.push(account)
    }
  })
  if (filterUsername) possibleLogins = possibleLogins.filter(function (acc){ return acc.username === filterUsername})
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {eventName: 'loginRes', logins: possibleLogins})
  })
})

eventListener.on('getValid', function (data){
  chrome.extension.sendMessage({eventName: 'sendValid', valid: valid, accountInfo: accountInfo})
})

socket.on('electronAdd', function(data) {
  masterObj = JSON.parse(decrypt(data.data, masterPass))
  for (var key in masterObj){
    var currentAccount = masterObj[key];
    accountInfo[key] = accountInfo[key] || {}
    accountInfo[key].items = currentAccount.map(function (acc){
      if (key == 'login'){
        return {name: acc.name, username: acc.username, url: acc.website, deleted: acc.deleted || null}
      } else{
        return {name: acc.name, deleted: acc.deleted || null}
      }
    })
    accountInfo[key].category = nameFormat(key)
  }
  chrome.extension.sendMessage({data: accountInfo, eventName: 'accountInfo'})
})

socket.on('responseChromeValidated', function(data) {
  masterObj = JSON.parse(decrypt(data.data, masterPass))
  for (var key in masterObj){
    var currentAccount = masterObj[key];
    accountInfo[key] = accountInfo[key] || {}
    accountInfo[key].items = currentAccount.map(function (acc){
      if (key == 'login'){
        return {name: acc.name, username: acc.username, url: acc.website, deleted: acc.deleted || null}
      } else{
        return {name: acc.name, deleted: acc.deleted || null}
      }
    })
    accountInfo[key].category = nameFormat(key)
  }
  chrome.extension.sendMessage({valid: valid, eventName: 'validation'})
  setTimeout(function (){
    chrome.extension.sendMessage({data: accountInfo, eventName: 'accountInfo'})
  }, 500)
})

socket.on('chromeClearData', function (){
  masterObj = masterPass = valid = accountInfo = null;
  console.log('masterObj cleared')
})

function updateTime(){
  date = new Date()
}

//attempting to send info to
eventListener.on('backgroundToFill', function (data){
  var toLogIn = masterObj.login.filter(function (account){
    return account.name === data.name && account.username == data.username
  })[0]
  var time = 0;
  if (data.category == 'logins'){
    var autoUrl = toLogIn.website;
    if (data.name.toLowerCase() == 'gmail' || data.name.toLowerCase() == 'google'){
      autoUrl = 'https://accounts.google.com/ServiceLogin'
    }
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.update(tabs[0].id, {url: autoUrl})
    })
    time = 1000;
    filterUsername = data.username
  }

  setTimeout(function (){
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {eventName: 'autoFill', accountName: toLogIn.name.toLowerCase(), category: data.category})
    })
    filterUsername = null
  }, time)
})


// every 5 minutes check, if you have been inactive for 15 minutes clear data
setInterval(function (){
  if (new Date() - date > 900000){
    masterObj = masterPass = valid = null;
    chrome.extension.sendMessage({eventName: 'validTimeout'})
  }
}, 300000)

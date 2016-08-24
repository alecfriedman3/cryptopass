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
    console.log(decrypted, 'decryptedddddd');
    valid = data.check.trim() === decrypted.trim()
    console.log(valid, data.check, decrypted);
    // chrome.extension.sendMessage({valid: valid, eventName: 'validation'})
    if (valid){
      console.log('in this ifffff');
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
  accountInfo = formatAccounts(masterObj)
  chrome.extension.sendMessage({data: accountInfo, eventName: 'accountInfo'})
})

socket.on('responseChromeValidated', function(data) {
  masterObj = JSON.parse(decrypt(data.data, masterPass))
  accountInfo = formatAccounts(masterObj)
  chrome.extension.sendMessage({valid: valid, eventName: 'validation'})
  // setTimeout(function (){
  //   chrome.extension.sendMessage({data: accountInfo, eventName: 'accountInfo'})
  // }, 0)
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
  console.log('backgroundToFill!')
  if (data.category == 'logins'){
    var toLogIn = masterObj.login.filter(function (account){
      return account.name === data.name && account.username == data.username
    })[0]
    console.log('in category logins', toLogIn)
    var autoUrl = toLogIn.website;
    if (data.name.toLowerCase() == 'gmail' || data.name.toLowerCase() == 'google'){
      autoUrl = 'https://accounts.google.com/ServiceLogin'
    }
    filterUsername = data.username
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.update(tabs[0].id, {url: autoUrl})
        eventListener.on('tabReady', function (incoming){
          chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {eventName: 'autoFill', accountName: toLogIn.name.toLowerCase(), category: data.category})
          })
          filterUsername = null
          eventListener.clear('tabReady')
        })
    })
  } else if (data.category == 'credit cards'){
    var cardToFill = masterObj.creditCard.filter(function (account){
      return account.name === data.name
    })[0]
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
      chrome.tabs.sendMessage(tabs[0].id, {eventName: 'autoFill', cardToFill: cardToFill, category: data.category})
    })
  }
})

function formatAccounts(obj){
  var accounts = {}
  for (var key in obj){
    var currentAccount = obj[key];
    accounts[key] = accounts[key] || {}
    accounts[key].items = currentAccount.map(function (acc){
      if (key == 'login'){
        return {name: acc.name, username: acc.username, url: acc.website, deleted: acc.deleted || null}
      } else if (key == 'creditCard'){
        return {name: acc.name, cardNumber: '************' + acc.cardNumber.slice(-4), deleted: acc.deleted || null}
      } else{
        return {name: acc.name, deleted: acc.deleted || null}
      }
    })
    accounts[key].category = nameFormat(key)
  }
  return accounts
}

// every 5 minutes check, if you have been inactive for 15 minutes clear data
setInterval(function (){
  if (new Date() - date > 900000){
    masterObj = masterPass = valid = null;
    chrome.extension.sendMessage({eventName: 'validTimeout'})
  }
}, 300000)

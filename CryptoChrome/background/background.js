var EventListener = require('../event.listener')
var socket = io('http://localhost:9999', { reconnect: true });
socket.on('connect', function() {
  console.log('chrome connected');
})
socket.on('quit', function (){
  masterObj = masterPass = valid = null;
  chrome.extension.sendMessage({eventName: 'validTimeout'})
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
    valid = data.check.trim() === decrypted.trim()
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
    if (!account.deleted && data.currentUrl.match(accountRe) || (account.name.toLowerCase() == 'gmail' && data.currentUrl.match(/google/))){
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

eventListener.on('newLogin', function (data){
  masterObj.login.push(data.login)
  accountInfo = formatAccounts(masterObj)
  var encrypted = encrypt(JSON.stringify(masterObj), masterPass)
  socket.emit('addFromChrome', {data: encrypted})
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
    chrome.tabs.sendMessage(tabs[0].id, {eventName: 'loginRes', logins: [data.login]})
  })
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
})

socket.on('chromeClearData', function (){
  masterObj = masterPass = valid = accountInfo = null;
})

function updateTime(){
  date = new Date()
}

//attempting to send info to
eventListener.on('backgroundToFill', function (data){
  if (data.category == 'logins'){
    var toLogIn = masterObj.login.filter(function (account){
      return account.name === data.name && account.username == data.username
    })[0]
    var autoUrl = toLogIn.website;
    if (data.name.toLowerCase().trim() == 'gmail' || data.name.toLowerCase().trim() == 'google'){
      autoUrl = 'https://accounts.google.com/ServiceLogin'
    } else if (data.name.toLowerCase().trim() == 'amazon'){
      autoUrl = 'https://www.amazon.com/ap/signin?_encoding=UTF8&openid.assoc_handle=usflex&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com%2F%3Fref_%3Dnav_signin'
    } else if (data.name.toLowerCase().trim() == 'twitter'){
      autoUrl = 'https://twitter.com/login'
    } else if (data.name.toLowerCase().trim() == 'tumblr'){
      autoUrl = 'https://www.tumblr.com/login'
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

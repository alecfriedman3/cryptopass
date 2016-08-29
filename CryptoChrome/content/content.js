var EventListener = require('../event.listener.js')
var eventListener = new EventListener();
chrome.extension.onMessage.addListener(function(req, sender, sendRes) {
  if (!eventListener[req.eventName]) return
  eventListener.emit(req.eventName, req);
})

var fillTheDOM = require('../utilities/walk.the.dom.js').fillTheDOM
var walkTheDomAndSubmit = require('../utilities/walk.the.dom.js').walkTheDomAndSubmit

var $email = $('input[type="email"]')
var $password = $('input[type="password"]')
var $username = $('input[type="username]')
var usernameArr = []
var $usernames = $('input[type="text"]').each(function() {
  var placeholder = $(this).attr('placeholder')
  var id = $(this).is('#username') || $(this).is('#email') || $(this).hasClass('username') || $(this).hasClass('email')
  if (placeholder && placeholder.toLowerCase().match(/(username)|(email)/) || id) usernameArr.push($(this))
})


if ($email.length || $password.length) {
  chrome.extension.sendMessage({ eventName: 'logins', currentUrl: window.location.href.toLowerCase() })
}

eventListener.on('loginRes', function(data) {
  var accToFill = data.logins[0];
  fillTheDOM($('input:not(input[type="submit"])'), ['username', 'name', 'email', 'user', 'em', 'log', 'sign'/*, 'in'*/], accToFill.username)
  fillTheDOM($('input:not(input[type="submit"])'), ['password', 'pswd', 'pass', 'pwd', 'pw'], accToFill.password)
})

eventListener.on('autoFill', function(data) {
  if (data.category == 'logins') {
    eventListener.emit('loginRes', {logins: [data.account]})
    if (data.account.name == 'facebook'){
      $('#loginbutton').trigger('click')
    }
    else {
      $('input[type="submit"]').each(function() {
        $(this).trigger('click')
      })
      $('button[type="submit"]').each(function() {
        $(this).trigger('click')
      })
      // walkTheDomAndSubmit('input', ['login', 'signin', 'log', 'sign', 'submit'])
      // walkTheDomAndSubmit('button', ['login', 'signin', 'log', 'sign', 'submit'])
    }
    if (data.account.name == 'google' || data.account.name == 'gmail' || data.account.name == 'tumblr') {
      // walkTheDomAndSubmit('input', ['login', 'signin', 'log', 'sign', 'submit'])
      setTimeout(function() {
        $('input[type="submit"]').each(function() {
          console.log('second click')
          $(this).trigger('click')
        })
      }, 1000)
    }
  } else if (data.category == 'credit cards'){
    fillTheDOM($('input:not(input[type="submit"]'), ['credit', 'card'], data.cardToFill.cardNumber)
    fillTheDOM($('input:not(input[type="submit"]'), ['ccv', 'security', 'cvv'], data.cardToFill.ccv)
    fillTheDOM($('input:not(input[type="submit"]'), ['name', 'hold'], data.cardToFill.firstName + ' ' + data.cardToFill.lastName)
    fillTheDOM($('input:not(input[type="submit"]'), ['exp', 'expiration', 'year', 'yea'], data.cardToFill.expiration.split('/')[1])
    fillTheDOM($('input:not(input[type="submit"]'), ['exp', 'expiration', 'month', 'mon'], data.cardToFill.expiration.split('/')[0])
    fillTheDOM($('input:not(input[type="submit"]'), ['exp', 'expiration', 'date'], data.cardToFill.expiration)

    var year = data.cardToFill.expiration.split('/')[1]
    if (year.length == 2) year = '20' + year;
    fillTheDOM($('select'), ['year', 'yea'], year)

    var month = data.cardToFill.expiration.split('/')[0];
    if (month.length == 1) month = '0' + month;
    console.log(month)
    fillTheDOM($('select'), [ 'month', 'mon'], month)
  }

})

$(document).ready(function() {

  chrome.extension.sendMessage({eventName: 'tabReady'})

})

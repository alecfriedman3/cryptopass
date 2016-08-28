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
  fillTheDOM($('input'), ['password', 'pswd', 'pass', 'pwd', 'pw'], accToFill.password)
  fillTheDOM($('input'), ['username', 'name', 'email', 'user', 'em'], accToFill.username)
})

eventListener.on('autoFill', function(data) {
  if (data.category == 'logins') {
    eventListener.emit('loginRes', {logins: [data.account]})
    if (data.account.name == 'facebook'){
      $('#loginbutton').trigger('click')
    }
    $('input[type="submit"]').each(function() {
      $(this).trigger('click')
    })
    if (data.account.name == 'google' || data.account.name == 'gmail' || data.account.name == 'tumblr') {
      // walkTheDomAndSubmit('input', ['login', 'signin', 'log', 'sign', 'submit'])
      setTimeout(function() {
        $('input[type="submit"]').each(function() {
          console.log('second click')
          $(this).trigger('click')
        })
      }, 1000)
    } else {
      walkTheDomAndSubmit('input', ['login', 'signin', 'log', 'sign', 'submit'])
      walkTheDomAndSubmit('button', ['login', 'signin', 'log', 'sign', 'submit'])
    }
  } else if (data.category == 'credit cards'){
    fillTheDOM($('input'), ['credit', 'card'], data.cardToFill.cardNumber)
    fillTheDOM($('input'), ['ccv', 'security', 'cvv'], data.cardToFill.ccv)
    fillTheDOM($('input'), ['name', 'hold'], data.cardToFill.firstName + ' ' + data.cardToFill.lastName)
    fillTheDOM($('input'), ['exp', 'expiration', 'year', 'yea'], data.cardToFill.expiration.split('/')[1])
    fillTheDOM($('input'), ['exp', 'expiration', 'month', 'mon'], data.cardToFill.expiration.split('/')[0])
    fillTheDOM($('input'), ['exp', 'expiration', 'date'], data.cardToFill.expiration)

    var year = data.cardToFill.expiration.split('/')[1]
    if (year.length == 2) year = '20' + year;
    fillTheDOM($('select'), ['year', 'yea'], year)

    var month = data.cardToFill.expiration.split('/')[0];
    if (month.length == 1) month = '0' + month;
    console.log(month)
    fillTheDOM($('select'), [ 'month', 'mon'], month)
    // $('select').each(function (){
    //   var $this = $(this)[0]
    //   if (!$this) return
    //   if (($this.id && $this.id.toLowerCase().match(/exp/) || $this.id.toLowerCase().match(/mon/)) || ($this.className && $this.className.toLowerCase().match(/exp/) || $this.className.toLowerCase().match(/mon/) )){
    //       var mon = data.cardToFill.expiration.split('/')[0].toString();
    //       if (mon.length == 1) mon = '0' + mon;
    //       $(this).val(mon).change()
    //  }
    //   if (($this.id && $this.id.toLowerCase().match(/exp/) || $this.id.toLowerCase().match(/yea/) || $this.id.toLowerCase().match(/date/)) || ($this.className && $this.className.toLowerCase().match(/exp/) || $this.className.toLowerCase().match(/yea/) || $this.id.toLowerCase().match(/date/))){
    //       var yea = data.cardToFill.expiration.split('/')[1].toString()
    //       if (yea.length == 2) yea = '20' + yea;
    //       $(this).val(yea).change()
    //   }
    // })
  }

})

$(document).ready(function() {

  chrome.extension.sendMessage({eventName: 'tabReady'})

})

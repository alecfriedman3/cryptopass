// var io = require('socket.io-client'),


// var passwordField = $("input[type='password']").eq(0);
// var usernameField = $("input[type='email']").eq(0);

// passwordField.val('asdfasdfas')

// console.log(passwordField.val());
var eventListener = new EventListener();

chrome.extension.onMessage.addListener(function (req, sender, sendRes){
  console.log('received message', req, eventListener)
  if (!eventListener[req.eventName]) return
    console.log(req);
  eventListener.emit(req.eventName, req);
})

console.log(window.location.href);

var $email = $('input[type="email"]')
var $password = $('input[type="password"]')
var $username = $('input[type="username]')

console.log($email, $password);

if ($email.length || $password.length) {
  console.log('sending')
  chrome.extension.sendMessage({eventName: 'logins'})
}

eventListener.on('loginRes', function (data) {
  console.log('In the loginRes listener')
  data.logins.forEach(function (account) {
    console.log(account);
    var accountRe = new RegExp(account.name.toLowerCase())
    if (window.location.href.toLowerCase().match(accountRe)) {
      console.log('got a match');
      $password.val(account.password);
    }
  })
})

// if (window.location.href.toLowerCase().match(/login/))

// console.log('content running')
//   var passInput = $('input[type="password"]')
//   console.log(passInput)

// $(':submit').on('click', function (){
//   console.log('clicked')
//   passInput.val('eS8$.oO1w5y8kyP7')
// })


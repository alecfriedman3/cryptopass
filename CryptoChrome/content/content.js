var eventListener = new EventListener();
chrome.extension.onMessage.addListener(function(req, sender, sendRes) {
  if (!eventListener[req.eventName]) return
  eventListener.emit(req.eventName, req);
})

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
  data.logins.forEach(function(account) {
    if ($password.length) {
      $password.val(account.password);
    }
    if ($email.length) {
      $email.val(account.username);
    }
    if (usernameArr.length) {
      usernameArr.forEach(function(input) {
        input.val(account.username)
      })
    }
  })
})

eventListener.on('autoFill', function(data) {
  if (data.category == 'logins') {
    $('input[type="submit"]').each(function() {
      $(this).trigger('click')
    })
    if (data.accountName == 'facebook'){
      $('#loginbutton').trigger('click')
    }
    if (data.accountName == 'google' || data.accountName == 'gmail' || data.accountName == 'tumblr') {
      setTimeout(function() {
        $('input[type="submit"]').each(function() {
          $(this).trigger('click')
        })
      }, 1000)
    }
  } else if (data.category == 'credit cards'){
    $('input').each(function (){
      var $this = $(this)[0]
      if (!$this) return
      if (($this.id && $this.id.toLowerCase().match(/credit/) || $this.id.toLowerCase().match(/card/) )|| ($this.className && $this.className.toLowerCase().match(/credit/) || $this.className.toLowerCase().match(/card/))) $(this).val(data.cardToFill.cardNumber);
      if (($this.id && $this.id.toLowerCase().match(/ccv/) || $this.id.toLowerCase().match(/security/)) || ($this.className && $this.className.toLowerCase().match(/ccv/) || $this.className.toLowerCase().match(/security/) )) $(this).val(data.cardToFill.ccv);
      if (($this.id && $this.id.toLowerCase().match(/name/) || $this.id.toLowerCase().match(/hold/)) || ($this.className && $this.className.toLowerCase().match(/name/) || $this.className.toLowerCase().match(/hold/) )) $(this).val(data.cardToFill.firstName + ' ' + data.cardToFill.lastName);
      if (($this.id && $this.id.toLowerCase().match(/exp/) && $this.id.toLowerCase().match(/mon/)) || ($this.className && $this.className.toLowerCase().match(/exp/) && $this.className.toLowerCase().match(/mon/) )) $(this).val(data.cardToFill.expiration.split('/')[0]);
      if (($this.id && $this.id.toLowerCase().match(/exp/) && $this.id.toLowerCase().match(/yea/)) || ($this.className && $this.className.toLowerCase().match(/exp/) && $this.className.toLowerCase().match(/yea/) )) $(this).val(data.cardToFill.expiration.split('/')[1]);
      else if (($this.id && $this.id.toLowerCase().match(/exp/) || $this.id.toLowerCase().match(/date/)) || ($this.className && $this.className.toLowerCase().match(/exp/) || $this.className.toLowerCase().match(/date/) )) $(this).val(data.cardToFill.expiration);
    })
    $('select').each(function (){
      var $this = $(this)[0]
      if (!$this) return
      if (($this.id && $this.id.toLowerCase().match(/exp/) || $this.id.toLowerCase().match(/mon/)) || ($this.className && $this.className.toLowerCase().match(/exp/) || $this.className.toLowerCase().match(/mon/) )){
          var mon = data.cardToFill.expiration.split('/')[0].toString();
          if (mon.length == 1) mon = '0' + mon;
          $(this).val(mon).change()
     }
      if (($this.id && $this.id.toLowerCase().match(/exp/) || $this.id.toLowerCase().match(/yea/) || $this.id.toLowerCase().match(/date/)) || ($this.className && $this.className.toLowerCase().match(/exp/) || $this.className.toLowerCase().match(/yea/) || $this.id.toLowerCase().match(/date/))){
          var yea = data.cardToFill.expiration.split('/')[1].toString()
          if (yea.length == 2) yea = '20' + yea;
          $(this).val(yea).change()
      }
    })
  }

})

$(document).ready(function() {

  chrome.extension.sendMessage({eventName: 'tabReady'})

})

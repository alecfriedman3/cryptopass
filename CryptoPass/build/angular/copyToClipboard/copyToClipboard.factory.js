var remote = require('electron').remote;
var clipboard = remote.clipboard;

app.factory('Clipboard', function(){
  return {
    copy: function(text){
      clipboard.writeText(text)
    }
  }
})

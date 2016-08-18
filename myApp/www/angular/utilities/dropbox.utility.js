var Dropbox = require('dropbox');
var dbx = new Dropbox({ clientId: 'pg8nt8sn9h5yidb' });
module.exports = {
  getAndSetAccessToken: function(){
    var token = window.localStorage.getItem('dropboxAuth');
    dbx.setAccessToken(token)
  },
  getDropboxFilePath: function(){
    this.getAndSetAccessToken()
    console.log('in here');
    return dbx.filesSearch({path: '/Apps', query: 'CryptoPass'})
    .then(function(res){
      return res.matches[0];
    })
    .catch(function(err){console.log('w have an error', err)})
  },
  getDataObjectFromDropbox: function(cryptoPath, file){
    this.getAndSetAccessToken()
    return new Promise(function(resolve, reject){
      dbx.filesGetTemporaryLink({path: cryptoPath + file})
      .then(function(linkObj){
        var xhr = new XMLHttpRequest();
        xhr.open("GET", linkObj.link, true);
        xhr.onreadystatechange = function(e) {
          if (xhr.readyState === 4 && xhr.statusText === "OK"){
            console.log(xhr.responseText);
            resolve(xhr.responseText.replace(/"/g, ''))
          }
        }
        xhr.send(null)
      })
      .catch(function(err){reject(err)})
    })
  },

}

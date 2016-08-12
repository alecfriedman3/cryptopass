var Promise = require('bluebird');
var Dropbox = require('dropbox');
var dbx = new Dropbox({ clientId: 'pg8nt8sn9h5yidb' });
var electron = window.require('electron');
var remote = electron.remote;
var BrowserWindow = remote.BrowserWindow;

//Check if user is logged in and set AccessToken for all reqs if so
window.localStorage.dropboxAuthToken ? dbx.setAccessToken(window.localStorage.dropboxAuthToken) : null

module.exports = {
  getFileData: function(){
    return new Promise(function(resolve, reject){
      dbx.filesGetTemporaryLink({path:'/itWorks!.txt'})
      .then(linkObj => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", linkObj.link, false);
        xhr.onreadystatechange = function(e) {
          if (xhr.readyState === 4 && xhr.status === 200){
            resolve(xhr.responseText)
          } else {
            reject(xhr.statusText)
          }
        }
        xhr.send(null)
      })
      .catch(err => reject(err))
    })
  },
  authenticateUser: function(){
    return new Promise(function(resolve, reject){
      var authWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: true,
        webPreferences: {
          nodeIntegration: false
        }
      });
      var authUrl = dbx.getAuthenticationUrl('http://localhost:9999/dropboxAuth');
      authWindow.loadURL(authUrl);
      function handleCallback (url) {
        var accessToken = url.match(/access_token=([^&]*)/)[0].replace(/access_token=/, '')
        window.localStorage.setItem('dropboxAuthToken', accessToken)
        if(dbx.getAccessToken) {
          resolve(window.localStorage.dropboxAuthToken)
        } else {
          reject('There was an error authenticating')
        }
      }
      authWindow.webContents.on('will-navigate', function (event, url) {
        handleCallback(url);
      });
    })
  },
  fileUpload: function(){
    return new Promise(function(resolve, reject){
      encryptFile(masterObj, 'master')
      .then(getDataEncrypted)
      .then(dataEnc => {
        return dbx.filesUpload({path: '/itWorks!.txt', contents: JSON.stringify(dataEnc), mode: 'overwrite'})
      })
      .then(res => resolve(res))
      .catch(err => reject(err))
    })
  },
  checkForAuthenticatedUser: function(){
    return new Promise(function(resolve, reject){
      if(window.localStorage.dropboxAuthToken) resolve(window.localStorage.dropboxAuthToken)
      else reject('Not logged in')
    })
  }
}

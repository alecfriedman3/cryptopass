var Promise = require('bluebird');
var Dropbox = require('dropbox');
var dbx = new Dropbox({ clientId: 'pg8nt8sn9h5yidb' });
var electron = window.require('electron');
var remote = electron.remote;
var BrowserWindow = remote.BrowserWindow;

module.exports = {
  getFileData: function(){
    return new Promise(function(resolve, reject){
      dbx.filesGetTemporaryLink({path:'/itWorks!.txt'})
      .then(linkObj => {
        var oRequest = new XMLHttpRequest();
        oRequest.open("GET", linkObj, false);
        oRequest.onreadystatechange = function(oEvent) {
          if (oRequest.readyState === 4 && oRequest.status === 200){
            console.log(oRequest.responseText)
            resolve(oRequest.responseText)
          } else {
            console.error(oRequest.statusText);
            reject(oRequest.statusText)
          }
        }
        oRequest.send(null)
      })
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
          if(dbx.getAccessToken) {
            window.localStorage.setItem('dropboxAuthToken', dbx.getAccessToken())
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
      dbx.setAccessToken(window.localStorage.dropboxAuthToken)
      encryptFile(masterObj, 'master')
      .then(getDataEncrypted)
      .then(dataEnc => {
        return dbx.filesUpload({path: '/itWorks!.txt', contents: JSON.stringify(dataEnc), mode: 'overwrite'})
      })
      .then(res => console.log(res))
      .catch(err => console.error(err))
    })
  }
}

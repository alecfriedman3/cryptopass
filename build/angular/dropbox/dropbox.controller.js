var electron = window.require('electron');
var remote = electron.remote;
var BrowserWindow = remote.BrowserWindow;
var Dropbox = require('dropbox');
var dbx = new Dropbox({ clientId: 'hjj0ijz2jso76l4' });


app.controller('dropboxController', function($scope){
  if(window.localStorage.dropboxAuthToken){
    dbx.setAccessToken(window.localStorage.dropboxAuthToken);
    var masterObjEnc = encryptFile(masterObj, 'master');
    dbx.filesUpload({path: '/' + file.name, contents: JSON.stringify(masterObjEnc), mode: 'overwrite'})
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }
  $scope.dropboxAuth = function(){
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
      console.log(url);
      var accessToken = url.match(/access_token=([^&]*)/)[0].replace(/access_token=/, '')
      window.localStorage.setItem('dropboxAuthToken', dbx.getAccessToken())
    }
    authWindow.webContents.on('will-navigate', function (event, url) {
      handleCallback(url);
    });

  }
})

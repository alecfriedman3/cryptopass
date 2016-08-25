'use strict';

const electron = require('electron');
const app = electron.app;
const encryptFile = require('./utilities/encrypt.file.js').encryptFile;

var indexFile = `${__dirname}/index.html`;

let willQuitApp = false;
let window;
var idleTime=0;

app.on('ready', () => {
  window = new electron.BrowserWindow({
  		width: 1000,
  		height: 650,
  		titleBarStyle: 'hidden',
      minWidth: 850,
      minHeight: 450
  	})

  window.on('close', (e) => {
    if (willQuitApp) {
    window = null;
   } else {
      /* the user only tried to close the window */

    e.preventDefault();
    window.hide();
     // setInterval(function(){window = null;}, 10000)
   }
  });

  window.loadURL(`file:${indexFile}`); /* load your page */

});

/* 'activate' is emitted when the user clicks the Dock icon (OS X) */
app.on('activate', () => window.show());

/* 'before-quit' is emitted when Electron receives
 * the signal to exit and wants to start closing windows */
app.on('before-quit', () => {
  child.kill('SIGTERM')
  willQuitApp = true
});


var chalk = require('chalk')
const exec = require('child_process').exec;

var child = exec('node chrome-server/chrome.extension.server.js');

child.stdout.on('data', function (data){
	if (typeof data === 'string') console.log(chalk.cyan(data));
	else console.log(chalk.cyan('server data'), data)
})

app.on('before-quit', () => {
		child.kill('SIGTERM')
});


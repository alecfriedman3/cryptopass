'use strict';




// const electron = require('electron')
// const app = electron.app
// const BrowserWindow = electron.BrowserWindow;
// const encryptFile = require('./utilities/encrypt.file.js').encryptFile;


// // adds debug features like hotkeys for triggering dev tools and reload
// var indexFile = `${__dirname}/index.html`;


// // prevent window being garbage collected
// let willQuitApp = false;
// let mainWindow;

// function onClosed() {
// 	// dereference the window
// 	// for multiple windows store them in an array
// 	mainWindow = null;
// }

// function createMainWindow() {
// 	const win = new BrowserWindow({
// 		width: 1000,
// 		height: 650,
// 		titleBarStyle: 'hidden',

// 	});

// 	if (process.env['NODE_ENV'] == 'dev') {
// 		win.loadURL(`file:${indexFile}`);
// 	}

// 	win.on('close',
// // 	       (e) => {
// // 	if (willQuitApp) {
// // 		/* the user tried to quit the app */
// // 		win = null;
// // 	} else {
// // 		/* the user only tried to close the win */
// // 		e.preventDefault();
// // 		win.hide();
// // 	}
// // }
// onClosed);

// 	win.on('closed', onClosed);

// 	return win;
// }

// app.on('activate', () => mainWindow.show());

// app.on('window-all-closed', () => {
// 	// if (process.platform !== 'darwin') {
// 		app.quit();
// 	// }
// });

// app.on('activate-with-no-open-windows', () => {
// 	if (!mainWindow) {
// 		mainWindow = createMainWindow();
// 	}
// });

// app.on('ready', () => {
// 	mainWindow = createMainWindow();
// });


// const exec = require('child_process').exec;

// exec('node chrome-server/chrome.extension.server.js');




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
app.on('before-quit', () => willQuitApp = true);


const exec = require('child_process').exec;

exec('node chrome-server/chrome.extension.server.js');

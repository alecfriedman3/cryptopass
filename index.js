'use strict';
const app = require('app');
const BrowserWindow = require('browser-window');
const encryptFile = require('./utilities/encrypt.file.js').encryptFile;

// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();
var indexFile = `${__dirname}/index.html`;

// if (process.env['NODE_ENV'] == 'dev') {
// 	indexFile = "http://localhost:9999";
// }


// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new BrowserWindow({
		width: 1000,
		height: 600,
		'title-bar-style': 'hidden'
	});

	if (process.env['NODE_ENV'] == 'dev') {

		// we need to wait until browsersync is ready

	//TURNED OFF BROWSERSYNC DUE TO SECURITY ISSUE RE ACCESSING APP IN LOCALHOST
	// we need to wait until browsersync is ready

	// 	setTimeout(function() {
	// 		win.loadUrl(indexFile);
	// 	}, 5000);
	// } else {
		win.loadUrl(`file:${indexFile}`);
	}


	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate-with-no-open-windows', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});

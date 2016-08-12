'use strict';
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow;
const encryptFile = require('./utilities/encrypt.file.js').encryptFile;


// adds debug features like hotkeys for triggering dev tools and reload
var indexFile = `${__dirname}/index.html`;


// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 500,
		titleBarStyle: 'hidden'
	});

	if (process.env['NODE_ENV'] == 'dev') {
		win.loadURL(`file:${indexFile}`);
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


const exec = require('child_process').exec;

exec('node chrome-server/chrome.extension.server.js');

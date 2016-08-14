'use strict';
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow;
const encryptFile = require('./utilities/encrypt.file.js').encryptFile;


// adds debug features like hotkeys for triggering dev tools and reload
var indexFile = `${__dirname}/index.html`;


// prevent window being garbage collected
let willQuitApp = false;
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new BrowserWindow({
		width: 1000,
		height: 650,
		titleBarStyle: 'hidden',

	});

	if (process.env['NODE_ENV'] == 'dev') {
		win.loadURL(`file:${indexFile}`);
	}

	win.on('close', (e) => {
	if (willQuitApp) {
		/* the user tried to quit the app */
		win = null;
	} else {
		/* the user only tried to close the win */
		e.preventDefault();
		win.hide();
	}
});

	win.on('closed', onClosed);

	return win;
}

app.on('activate', () => mainWindow.show());

app.on('window-all-closed', () => {
	// if (process.platform !== 'darwin') {
	// 	app.quit();
	// }
});

app.on('activate-with-no-open-windows', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});

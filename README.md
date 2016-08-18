# CryptoPass

A suite of applications for your password encryption needs

## CryptoPass Desktop Application

From the main directory of the repo, `cd CryptoPass` and `npm install`.
After npm installing, if you do not have gulp, `npm install gulp -g` and run the command `gulp`, and `^c` when the build has completed.
To start the desktop app, run `npm start` and set up your master password.
DO NOT forget your master password! All of your information is encrypted locally on your machine using the master password you provide. We do not have a database or store any of your passwords or data, so if you lose the master password you will no longer have access to your data.

## CryptoChrome Google Chrome Extension

After setting up a password on the desktop app, `cd` into the `CryptoChrome` directory and `npm install`.
After npm installing, if you do not have browserify `npm install browserify -g` and run the command `npm run builder`.
Go to `chrome://extensions` in your google chrome browser and check the box at the top for `developer mode`.
Click the `load unpacked extension...` button and select the CryptoChrome directory from your filesystem.
In order for the chrome extension to work, your desktop application MUST BE RUNNING on your machine. You do not need to be logged in to the desktop application, but the application must be running.
Click on the yellow lock in your chrome extensions and sign in with your master password.


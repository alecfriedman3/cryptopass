# CryptoPass

A suite of applications for your password encryption needs. We encrypt and store your data locally, and we have no access to any of your data. We do NOT have a database, we do NOT store your master password, and we do NOT store any of your data anywhere remotely. Everything is stored on your machine only (and Dropbox if you choose to use it) and encrypted using your chosen master password.

`git clone` or download a zip to your computer to get started!

## CryptoPass Desktop Application

From the main directory of the repo,

`$ cd CryptoPass` and `$ npm install`

After npm installing, if you do not have gulp,

`$ npm install gulp -g` and run the command `gulp`

`^c` when the build has completed.

To start the desktop app, run

`$ npm start`

When the desktop app loads, it will prompt you to set up your master password.

DO NOT forget your master password! All of your information is encrypted locally on your machine using the master password you provide. We do not have a database or store any of your passwords or data, so if you lose the master password you will no longer have access to your data.

### Random Passwords

When creating login information, there is an option to generate a strong random password. The purpose of this functionality is to generate random passwords for the sites you use, which would be more secure than standard passwords, and control all of these passwords with your one master password for the application.

### Syncing with Dropbox

If you have the Dropbox application on your computer, in the settings there is an option to sync your data with dropbox.
Clicking the sync with dropbox button will prompt you to select the Dropbox folder on your machine that syncs automatically with dropbox.

## CryptoChrome Google Chrome Extension

After setting up a password on the desktop app, from the root of the repo,

`$ cd CryptoChrome` and `$ npm install`

After npm installing, if you do not have browserify
`$ npm install browserify -g` and run the command `$ npm run builder`.

Go to `chrome://extensions` in your google chrome browser and check the box at the top for `developer mode`.
Click the `load unpacked extension...` button and select the CryptoChrome directory from your filesystem.

In order for the chrome extension to work, your desktop application MUST BE RUNNING on your machine. You do not need to be logged in to the desktop application, however the application must be running.

Click on the yellow lock icon in your chrome extensions and sign in with your master password. Now you can navigate to the sites for which you have stored login information on the application and your login and password fields should be filled for you (let us know what sites, if any, this does not work on as every site sets up their forms differently).
The chrome extension and desktop application dynamically update with each other, so you will consistently have up to date information in both of them.

## CryptIon Cell Phone Application

Cell phone application to come soon!

(Since we are still in beta testing, we would advise against relying on the strong password generator to generate your passwords for applications which you do not have a backdoor to recover)

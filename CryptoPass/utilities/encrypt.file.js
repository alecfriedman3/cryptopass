'use strict'
var utils = require('./encrypt.utility.js')
var encrypt = utils.encrypt;
var decrypt = utils.decrypt;
let compareAndUpdate = require('./object.compare').compareAndUpdate;
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var fileWriter = {};
var settings = require('electron-settings');
var mkdirp = require('mkdirp-promise')
module.exports = fileWriter;


fileWriter.validate = function (masterPw) {
	var secret = fs.readFileSync(__dirname + '/secret1.txt').toString();
	var enSecret = fs.readFileSync(__dirname + '/secret2.txt').toString();
  try {
    var check = decrypt(enSecret, masterPw);
  } catch (error) {
    return false;
  }
  return check === secret;
}

fileWriter.encryptFile = function (data, masterPswd) {
	// upon exiting application, encrypt data and write to file
	var encrypted = encrypt(JSON.stringify(data), masterPswd)
	return fs.writeFileAsync(__dirname + '/data.txt', encrypted)
	.then(() => {
		return settings.get('dropboxPath')
	})
	.then(val => {
		if(val) {
			//Use Stat to check if file exists (fs.exists is deprecated)
			return fs.statAsync(val + '/Apps/CryptoPass')
			.then((stat) => {}, (err) => {
				//recursively create dir if it doesn't exist
				return mkdirp(val + '/Apps/CryptoPass')
			})
			//after we make dir write the data to dir
			.then(() => fs.writeFileAsync(val + '/Apps/CryptoPass/data.txt', encrypted))
			.then(() => fs.writeFileAsync(val + '/Apps/CryptoPass/secret2.txt', fileWriter.generateSecret(masterPswd)))
		}
	})
	// .catch(err => console.error(err))

}

fileWriter.decryptFile = function (masterPswd) {
	// validate password, then decrypt data and return an object that we can use in our application
	if (!fileWriter.validate(masterPswd)) throw new Error('Incorrect Master Password');
	return fs.readFileAsync(__dirname + '/data.txt')
	.then(function (encrypted){
		var decrypted = decrypt(encrypted.toString(), masterPswd)
		return Promise.all([JSON.parse(decrypted), settings.get('dropboxPath')])
	})
	.spread((decrypted, val) => {
		if (val){
			return Promise.all([decrypted, fs.readdirAsync(val + '/Apps/CryptoPass'), val])
		}
		return Promise.all([decrypted])
	})
	.spread((decrypted, dir, val) => {
		if (dir && dir.indexOf('mobileData.txt') != -1){
			return Promise.all([decrypted, fs.readFileAsync(val, + '/Apps/CryptoPass/mobileData.txt')])
		}
		return Promise.all([decrypted])
	})
	.spread((decrypted, encryptedMobile) => {
		if (encryptedMobile){
			var decryptedMobile = JSON.parse(decrypt(encryptedMobile.toString(), masterPswd))
			return compareAndUpdate(decryptedMobile, decrypted)
		}
		else return decrypted
	})

}

fileWriter.generateSecret = function (masterPswd) {
  var secret = fs.readFileSync(__dirname + '/secret1.txt').toString();
  var encrypted = encrypt(secret, masterPswd);
  fs.writeFileSync(__dirname+"/secret2.txt", encrypted);
	return fs.readFileSync(__dirname + '/secret2.txt').toString()
}

fileWriter.getDataEncrypted = function (){
	return fs.readFileAsync(__dirname + '/data.txt')
	.then(function (buffer){
		return buffer.toString()
	})
}

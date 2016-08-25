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
	var secret = fs.readFileSync(__dirname + '/secret1.txt').toString().trim();
	var enSecret = fs.readFileSync(__dirname + '/secret2.txt').toString();
	var bool;
	var dbPath;
  try {
    var check = decrypt(enSecret, masterPw).trim();
  } catch (error) {
    bool = false;
  }
  bool = check === secret;

	return settings.get('dropboxPath')
	.then(val => {
		if (val){
			dbPath = val;
			return fs.readFileAsync(val + '/Apps/CryptoPass/secret2.txt')
		}
	})
	.then(en2Secret => {
		if (!en2Secret) return bool
		en2Secret = en2Secret.toString()
		try {
	    var newCheck = decrypt(en2Secret, masterPw).trim();
	  } catch (error) {
	    bool = false;
	  }
		bool = newCheck === secret
		if(bool && dbPath){
			var data = fs.readFileSync(dbPath + '/Apps/CryptoPass/data.txt').toString()
			fs.writeFileSync(__dirname + '/data.txt', data)
			var secret2 = fs.readFileSync(dbPath + '/Apps/CryptoPass/secret2.txt').toString();
			fs.writeFileSync(__dirname + '/secret2.txt', secret2)
		}
	  return bool;
	})
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
			return Promise.all([decrypted, val, fs.readFileAsync(val + '/Apps/CryptoPass/mobileData.txt')])
		}
		return Promise.all([decrypted, val])
	})
	.spread((decrypted, val, encryptedMobile) => {
		if (encryptedMobile){
			var decryptedMobile = JSON.parse(decrypt(encryptedMobile.toString(), masterPswd))
			return Promise.all([compareAndUpdate(decryptedMobile, decrypted), val])
		}
		else return Promise.all([decrypted, val])
	})
	.spread((dataToWrite, val) => {
		if(val){
			var encryptedDataToWrite = encrypt(JSON.stringify(dataToWrite), masterPswd)
			return Promise.all([dataToWrite, fs.writeFileAsync(val + '/Apps/CryptoPass/data.txt', encryptedDataToWrite), fs.writeFileAsync(__dirname + '/data.txt', encryptedDataToWrite)])
		}
		else return Promise.all([dataToWrite])
	})
	.spread(dataToWrite => dataToWrite)

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

fileWriter.dropboxUpdateForIonic = function (enData){
	return settings.get('dropboxPath')
	.then(val => {
		if (val){
			return Promise.all([val, fs.readdirAsync(val + '/Apps/CryptoPass')])
		} else {
			return Promise.all([val])
		}
	})
	.spread((val, dir) => {
		if (dir.indexOf('mobileData.txt') !== -1){
			return Promise.all([fs.writeFileAsync(val + '/Apps/CryptoPass/mobileData.txt', enData), fs.writeFileAsync(val + '/Apps/CryptoPass/data.txt', enData)])
		}
		return Promise.all([fs.writeFileAsync(val + '/Apps/CryptoPass/data.txt', enData)])
	})
	.catch(err => console.error(err))
}

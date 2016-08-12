let chai = require('chai')
let expect = chai.expect;
let fileWriter = require('./encrypt.file.js');
let validate = fileWriter.validate;
let encryptFile = fileWriter.encryptFile;
let decryptFile = fileWriter.decryptFile;
let getDataEncrypted = fileWriter.getDataEncrypted;
let generateSecret = fileWriter.generateSecret;
let utils = require('./encrypt.utility.js');
let encrypt = utils.encrypt
let decrypt = utils.decrypt
let crypto = require('crypto');
let fs = require('fs');

describe('Encrypting and Decrypting Files', function (){

  describe('Master password validation', function (){
    var secret, masterPassword, falseMaster, ensecret;
    beforeEach('generate master passwords', function (){
      masterPassword = 'helloMyNameIsCrypto';
      falseMaster = "hello__?MyNameIsCrykslkfj9432to";
      secret = fs.readFileSync(__dirname + '/secret1.txt').toString()
      fs.writeFileSync(__dirname + '/secret2.txt', encrypt(secret, masterPassword));
    })

    afterEach('delete encrypted secret', function (){
    	fs.unlinkSync(__dirname + '/secret2.txt')
    })

    it('should validate the master password', function (){
      expect(validate(masterPassword)).to.be.equal(true);
    })

    it('should reject invalid master password', function (){
      expect(validate(falseMaster)).to.be.equal(false);
    })

  })

  describe('File Generation and Retrieval', function(){
  	var data, fileName, masterPswd;
  	beforeEach('write a file', function (){
  		data = {
  			Accounts: {
  				Google: {
  					username: 'IamDoge',
  					password: 'dogedogedoge'
  				}
  			}
  		}
  		fileName = 'data.txt';
  		masterPswd = "helloMyNameIsDoge"
  		secret = fs.readFileSync(__dirname + '/secret1.txt').toString()
      fs.writeFileSync(__dirname + '/secret2.txt', encrypt(secret, masterPswd));
    })

    afterEach('delete encrypted secret', function (){
    	fs.unlinkSync(__dirname + '/secret2.txt')
  		fs.unlinkSync(__dirname + '/' + fileName)
    })

  	it('should write to the filesystem', function (done){
  		encryptFile(data, masterPswd)
  		.then(function (){
  			expect(fs.readFileSync(__dirname + '/' + fileName)).to.be.ok
  			done()
  		}).catch(done)
  	})

  	it('should encrypt the information', function (done){
  		encryptFile(data, masterPswd)
  		.then(function (){
	  		var enData = fs.readFileSync(__dirname + '/' + fileName).toString()
	  		var decrypted = decrypt(enData, masterPswd);
	  		var newData = JSON.parse(decrypted);
	  		expect(newData).to.deep.equal(data)
	  		done()
  		}).catch(done)
  	})

  	it('should decrypt encrypted information', function (done){
  		encryptFile(data, masterPswd)
  		.then(function (){
	  		var newData = decryptFile(masterPswd)
	  		expect(newData).to.deep.equal(data)
	  		done()
  		}).catch(done)
  	})

  	it('should get encrypted data', function (done){
  		encryptFile(data, masterPswd)
  		.then(getDataEncrypted)
  		.then(function (retreivedData){
  			expect(retreivedData).to.be.equal(fs.readFileSync(__dirname + '/' + fileName).toString())
  			done()
  		}).catch(done)
  	})

  })

  describe('Secret Generator', function () {

    var masterPassword = "WhateverWeWant"

    afterEach('delete encrypted secret', function () {
      fs.unlinkSync(__dirname + '/secret2.txt');
    })

    it('should write to the filesystem', function () {
      generateSecret(masterPassword);
      expect(fs.readFileSync(__dirname+'/secret2.txt')).to.be.ok;
    })

    it('should encrypt the secret', function () {
      generateSecret(masterPassword);
      var encrypted = fs.readFileSync(__dirname + "/secret2.txt").toString();
      expect(decrypt(encrypted, masterPassword)).to.be.equal(fs.readFileSync(__dirname+'/secret1.txt').toString());
    })

  })

})

let chai = require('chai')
let expect = chai.expect;
let fileWriter = require('./encrypt.file.js');
let validate = fileWriter.validate;
let encryptFile = fileWriter.encryptFile;
let decryptFile = fileWriter.decryptFile;
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

  describe('File Generation', function(){
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

  	it('should write to the filesystem', function (){
  		encryptFile(data, masterPswd)
  		expect(fs.readFileSync(__dirname + '/' + fileName)).to.be.ok
  	})

  	it('should encrypt the information', function (){
  		encryptFile(data, masterPswd);
  		var enData = fs.readFileSync(__dirname + '/' + fileName).toString()
  		var decrypted = decrypt(enData, masterPswd);
  		var newData = JSON.parse(decrypted);
  		expect(newData).to.deep.equal(data)
  	})

  	it('should decrypt encrypted information', function (){
  		encryptFile(data, masterPswd);
  		var newData = decryptFile(masterPswd)
  		expect(newData).to.deep.equal(data)
  	})

  })

})

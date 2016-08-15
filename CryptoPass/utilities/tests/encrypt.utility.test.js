let chai = require('chai')
let expect = chai.expect;
let utils = require('../encrypt.utility.js');
let encrypt = utils.encrypt
let decrypt = utils.decrypt
let crypto = require('crypto');

describe('Encryption utility\'s', function (){

	describe('encrypt function', function (){
		var data, masterPassword, encrypted, decrypted;
		beforeEach('encrypt data', function (){
			masterPassword = 'helloMyNameIsCrypto';
			data = 'Hello I am Dog';
			var cipher = crypto.createCipher('aes192', masterPassword);
			encrypted = cipher.update(data, 'utf8', 'hex');
			encrypted += cipher.final('hex');
			var deCipher = crypto.createDecipher('aes192', masterPassword);
			decrypted = deCipher.update(encrypted, 'hex', 'utf8');
			decrypted += deCipher.final('utf8');
		})

		it('should encrypt a string based on master password', function (){
			expect(encrypt(data, masterPassword)).to.be.equal(encrypted)
		})

		it('should decrypt a string based on master password', function (){
			expect(decrypt(encrypted, masterPassword)).to.be.equal(data)
		})

	})

})

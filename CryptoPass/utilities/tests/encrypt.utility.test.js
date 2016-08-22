let chai = require('chai')
let expect = chai.expect;
let utils = require('../encrypt.utility.js');
let encrypt = utils.encrypt
let decrypt = utils.decrypt
let crypto = require('crypto-js');

describe('Encryption utility\'s', function (){

	describe('encrypt function', function (){
		var data, masterPassword, encrypted, decrypted;
		beforeEach('encrypt data', function (){
			masterPassword = 'helloMyNameIsCrypto';
			data = 'Hello I am Dog';
			var cipher = crypto.AES.encrypt(data, masterPassword);
			encrypted = cipher.toString()
			var deCipher = crypto.AES.decrypt(encrypted, masterPassword);
			decrypted = deCipher.toString(crypto.enc.Utf8)
		})

		it('should encrypt a string based on master password', function (){
			expect(encrypt(data, masterPassword)).to.be.not.equal(data)
		})

		it('should decrypt a string based on master password', function (){
			expect(decrypt(encrypted, masterPassword)).to.be.equal(data)
		})

	})

})

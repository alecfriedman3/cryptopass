let chai = require('chai')
let expect = chai.expect;
let fileWriter = require('./encrypt.file.js');
let validate = fileWriter.validate;
let utils = require('./encrypt.utility.js');
let encrypt = utils.encrypt
let decrypt = utils.decrypt
let crypto = require('crypto');

describe('Encrypting and Decrypting Files', function (){

  describe('Master password validation', function (){
    var secret, masterPassword, falseMaster, ensecret;
    beforeEach('generate master passwords', function (){
      masterPassword = 'helloMyNameIsCrypto';
      falseMaster = "hello__?MyNameIsCrykslkfj9432to";
      secret = "HelloIAmDogIDoge?";
      ensecret = encrypt(secret, masterPassword);
    })

    it('should validate the master password', function (){
      expect(validate(masterPassword, secret, ensecret)).to.be.equal(true);
    })

    it('should reject invalid master password', function (){
      expect(validate(falseMaster, secret, ensecret)).to.be.equal(false);
    })

  })

})

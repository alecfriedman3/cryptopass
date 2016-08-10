var utils = require('./encrypt.utility.js')
var encrypt = utils.encrypt;
var decrypt = utils.decrypt;
var fs = require('fs')
var fileWriter = {}
module.exports = fileWriter;



fileWriter.validate = function (masterPw) {
	var secret = fs.readFileSync(__dirname + '/secret1.txt').toString();
	var enSecret = fs.readFileSync(__dirname + '/secret2.txt').toString();
  try {
    var check = decrypt(enSecret, masterPw);
  } catch (error) {
  	// console.error(error)
    return false;
  }
  return check === secret;
}

fileWriter.encryptFile = function (data, fileName, masterPswd) {

	if (!fileWriter.validate(masterPswd)) throw new Error('Incorrect Master Password');
	var encrypted = encrypt(JSON.stringify(data), masterPswd)
	fs.writeFileSync(__dirname + '/' + fileName, encrypted)

}

fileWriter.decryptFile = function () {}

var utils = require('./encrypt.utility.js')
var encrypt = utils.encrypt;
var decrypt = utils.decrypt;
var fileWriter = {}
module.exports = fileWriter;

fileWriter.validate = function (masterPw, secret, enSecret) {
  try {
    var check = decrypt(enSecret, masterPw);
  } catch (error) {
    return false;
  }
  return check === secret;
}

fileWriter.encryptFile = function () {}

fileWriter.decryptFile = function () {}

var crypto = require('crypto-js');

//changed from aes192 to aes256

module.exports = {
	encrypt: function (data, password){
		var cipher = crypto.AES.encrypt(data, password);
		return cipher.toString()
	},
	decrypt: function (enData, password){
		var bytes = crypto.AES.decrypt(enData.toString(), password);
		var plaintext = bytes.toString(crypto.enc.Utf8);
		return plaintext
	}
}

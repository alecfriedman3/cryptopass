var crypto = require('crypto');

module.exports = {
	encrypt: function (data, password){
		var cipher = crypto.createCipher('aes256', password);
		var encrypted = cipher.update(data, 'utf8', 'hex')
		encrypted += cipher.final('hex')
		return encrypted
	},
	decrypt: function (enData, password){
		var cipher = crypto.createDecipher('aes256', password);
		var decrypted = cipher.update(enData, 'hex', 'utf8')
		decrypted += cipher.final('utf8')
		return decrypted
	}
}

		var socket = io.connect('http://localhost:9999', { reconnect: true });
		var masterObj, masterPass;

		var encrypt = function(data, password) {
			var cipher = crypto.createCipher('aes192', password);
			var encrypted = cipher.update(data, 'utf8', 'hex')
			encrypted += cipher.final('hex')
			return encrypted
		}
		var decrypt = function(enData, password) {
			var cipher = crypto.createDecipher('aes192', password);
			var decrypted = cipher.update(enData, 'hex', 'utf8')
			decrypted += cipher.final('utf8')
			return decrypted
		}

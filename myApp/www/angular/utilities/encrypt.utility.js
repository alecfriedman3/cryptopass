var crypto = require('crypto-js');

//changed from aes192 to aes256

module.exports = {
	encrypt: function (data, password){
		console.log('in utils encrypt');
		var cipher = crypto.AES.encrypt(data, password);
		console.log(cipher, 'this is cipher');
		return cipher.toString()
	},
	decrypt: function (enData, password){
		var bytes = crypto.AES.decrypt(enData.toString(), password);
		var plaintext = bytes.toString(crypto.enc.Utf8);
		return plaintext
	},
	validate: function (masterPw) {
		var secret = 'HelloIAmDogIDoge?'
		var enSecret = window.localStorage.getItem('secret2');
	  try {
			//adds new line randomly? have to trim()
	    var check = this.decrypt(enSecret, masterPw).trim();
	  } catch (error) {
	    return false;
	  }
	  return check === secret;
	}
}

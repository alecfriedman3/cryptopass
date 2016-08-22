var crypto = require('crypto-js/');

module.exports = {
  scramble: function(){
    let uuid = device.uuid.split(''); //eslint-disable-line
    let serial = device.serial.split(''); //eslint-disable-line
    let array = uuid.concat(serial);
    let key = '';
    array.forEach(function(str){
      if(parseInt(str)) str = str * 3;
  	  else str += 'c'
      key += str
    })
    return key
  },
  backupHash: function(){
    return crypto.SHA256(this.scramble()).toString()
  }
}

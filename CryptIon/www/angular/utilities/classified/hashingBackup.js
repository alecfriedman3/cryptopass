var crypto = require('crypto-js/');

module.exports = {
  scramble: function(){
    var uuid = device.uuid.split(''); //eslint-disable-line
    var serial = device.serial.split(''); //eslint-disable-line
    var array = uuid.concat(serial);
    var key = '';
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

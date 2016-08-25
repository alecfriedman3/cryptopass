var crypto = require('crypto-js');

module.exports = {
  idGenerator: function(obj){
    var str = '';
    for(var key in obj){
      str += obj[key]
    }
    str += Date.now();
    return crypto.SHA256(str).toString();
  }
}

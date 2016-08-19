module.exports = {
  uuid: function(){
    return device.uuid
  },
  serial: function(){
    return device.serial
  },
  backupHash: function(){
    console.log(this.uuid);
    console.log(this.serial);
  }
}

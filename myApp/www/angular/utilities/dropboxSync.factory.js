app.factory('DropboxSync', function(){
  var dropboxUtils = require('../angular/utilities/dropbox.utility.js')
  var utils = require('../angular/utilities/encrypt.utility.js')
  return {
    sync: function(){
      var dropboxPathForCrypto;

      return dropboxUtils.getDropboxFilePath()
        .then(function(matches){
          if(matches){
            dropboxPathForCrypto = matches.metadata.path_display
            window.localStorage.setItem('dropboxPath', dropboxPathForCrypto)
            return dropboxUtils.getDataObjectFromDropbox(dropboxPathForCrypto, '/mobileData.txt')
          } else{
            throw new Error('Can\'t find Dropbox Path :(')
          }
        })
        .then(function(dataObj){
          console.log('in last then');
          window.localStorage.setItem('masterObjEncrypted', dataObj)
          var encryptedMasterObj = window.localStorage.getItem('masterObjEncrypted')
          console.log('globalmaster', globalMasterPass);
          masterObj = JSON.parse(utils.decrypt(encryptedMasterObj, globalMasterPass));
          console.dir(masterObj);
          // return dropboxUtils.getDataObjectFromDropbox(dropboxPathForCrypto, '/secret2.txt')
        })
    }
  }
})

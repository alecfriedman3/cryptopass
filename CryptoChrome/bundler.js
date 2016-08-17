var exec = require('child_process').exec;
var child = exec('browserify popup/popup.js popup/vars.js -o utils.js')


child.stdout.on('data', function (data){
  console.log(data)
})

var exec = require('child_process').exec;
var child = exec('browserify background/background.js background/vars.js -o background/utils.js')


child.stdout.on('data', function (data){
  console.log(data)
})

var child2 = exec('browserify popup/popup.js -o popup/utils.js')

child2.stdout.on('data', function (data){
  console.log(data)
})

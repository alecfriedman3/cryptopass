var exec = require('child_process').exec;
var child = exec('browserify background/background.js background/vars.js -o utils.js')


child.stdout.on('data', function (data){
  console.log(data)
})

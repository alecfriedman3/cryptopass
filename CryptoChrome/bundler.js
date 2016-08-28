var exec = require('child_process').exec;
var child = exec('browserify background/background.js background/vars.js -o background/utils.js')


child.stdout.on('data', function (data){
  console.log(data)
})

child.stderr.on('data', function (data){
  console.error(data.toString())
})

var child2 = exec('browserify popup/popup.js -o popup/utils.js')

child2.stdout.on('data', function (data){
  console.log(data)
})

child2.stderr.on('data', function (data){
  console.error(data.toString())
})

var child3 = exec('browserify content/content.js -o content/utils.js')

child3.stdout.on('data', function (data){
  console.log(data)
})

child3.stderr.on('data', function (data){
  console.error(data.toString())
})

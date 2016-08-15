var socket = io.connect('http://localhost:9999', {reconnect: true});

$(document).ready(function(){
  console.log('ready');
  socket.on('connect', function(){
    console.log('chrome connected');
  })

  socket.on('electronAdd', function(){
    console.log('electronAdd socket fired and caught');
  })

  $('button').on('click', function(){
    console.log('clicked');
    socket.emit('addFromChrome', {data: 'lollll'})
  })
})

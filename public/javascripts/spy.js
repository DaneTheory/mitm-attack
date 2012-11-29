var spy = io.connect('http://localhost/spy');
  
spy.on('connect', function () {
  chat.emit('hi!');
});

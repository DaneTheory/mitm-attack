var spy = io.connect('http://localhost/spy');
  
spy.on('connect', function () {
  console.log("ASDASD");
});

spy.on('a message', function(data){
  console.log(data);
})

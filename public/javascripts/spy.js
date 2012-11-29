var spy = io.connect('http://localhost/spy');
  
spy.on('connect', function(){
  console.log("Spy Client Connected");
});

spy.on('data', function(data){
  console.log(JSON.stringify(data));
});

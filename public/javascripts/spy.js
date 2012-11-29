var spy = io.connect('http://localhost/spy')
  , parser = function(data){
    console.log("HTTP VERSION: " + data.httpVersion);
    console.log("REQUEST TYPE: " + data.type);
    console.log("REQUEST URL: " + data.url);
    console.log("REQUEST IP: " + data.ip);
    console.log("REQUEST HEADER: " + /*JSON.stringify(*/data.header/*)*/);
  };

// Socket io events
  
spy.on('connect', function(){
  console.log("Spy Client Connected");
});

spy.on('entering', function(data){
  console.log("Page visit");
  //parser(data);
});

spy.on('leaving', function(data){
  console.log("Page exit");
  parser(data);
});

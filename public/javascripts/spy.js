var spy = io.connect('http://localhost/spy')
  , parser = function(data){
    console.log("Http version: " + data.httpVersion);
    console.log("Request Type: " + data.type);
    console.log("Request Url: " + data.url);
    console.log("Request Ip: " + data.ip);
    console.log("Total Visitors: " + data.total);
    console.log("Request Header: " + /*JSON.stringify(*/data.header/*)*/);
  };

// Socket io events

spy.on('connect', function(){
  console.log("Spy Client Connected");
});

spy.on('entering', function(data){
  console.log("Page visit");
  parser(data);
});

spy.on('leaving', function(data){
  console.log("Page exit");
  parser(data);
});

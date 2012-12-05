var spy = io.connect('http://localhost/spy');
  

var parser = function (data) {
  console.log("pasrser")
  console.log("Http version: " + data.httpVersion);
  console.log("Request Type: " + data.type);
  console.log("Request Url: " + data.url);
  console.log("Request Ip: " + data.ip);
  console.log("Request Header: " + /*JSON.stringify(*/data.header/*)*/);
  console.log("Destination: " + data.destination);
  console.log("Search Value: " + data.searchValue);
  console.log("data: ", data);
  $("#logsTmpl").tmpl(data).hide().prependTo("#container").fadeIn(3000);
  console.log("data.total: ", data.total);
  $("#totalVisitors").html(data.total);
  // $(newElement).hide().prependTo("#container").fadeIn(5000);

};

// Socket io events

spy.on('connect', function () {
  console.log("Spy Client Connected");
});

spy.on('entering', function (data) {
  console.log("Page visit");
  parser(data);
});

spy.on('leaving', function (data) {
  console.log("Page exit");
  parser(data);
});



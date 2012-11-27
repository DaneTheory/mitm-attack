var jsdom   = require('jsdom')
  , request = require('request')
  , url     = require('url');

// Loads home page of victims
exports.iframe = function(req, res){
  console.log("iframe route");
  request({uri: 'http://google.ca'}, function(err, response, body){
    //Just a basic error check
    if (err && response.statusCode !== 200) {
      console.log('Request error.');
    }
    res.render('iframe-spoof', {
      title: 'Iframe',
      data: body
    });
  });
};


// Navigation route
exports.xss = function(req, res){
  console.log("xss route");
  var target = req.query["destination"];
  console.log("target: ", target);
  request({uri: target}, function(err, response, body){
    console.log("err: ", err);
    // console.log("response: ", response);
    // console.log("body: ", body);
    //Just a basic error check
    if (err && response.statusCode !== 200) {
      console.log('Request error.');
    }

    res.render('iframe-spoof', {
      title: 'Iframe',
      data: body
    });

    //Send the body param as the HTML code we will parse in jsdom
    //also tell jsdom to attach jQuery in the scripts and loaded from jQuery.com
    // jsdom.env({
    //   html: body,
    //   scripts: ['http://code.jquery.com/jquery-1.6.min.js']
    //   }, function (err, window) {
    //   //Use jQuery just as in a regular HTML page
    //   var $ = window.jQuery;
    //   // var $body = $("body");
    //   // console.log("\n\nbody*************************\n\n");
    //   // console.log($body);
    //   // res.render('iframe-spoof', {
    //   //   title: 'Iframe',
    //   //   data: $body
    //   // });
    // });

  });
};
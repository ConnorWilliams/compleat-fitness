"use strict";

// An express-based server demonstrating content negotiation.  The built-in
// 'static' middleware is used to deliver static files.  'Static' has an option
// to provide a function to set custom response headers.  That function is not
// passed the request as an argument, so you can't do content negotiation at
// that point.  Instead, content negotiation is split into two steps.
//
// First, the 'negotiate' function is installed as middleware, to be called on
// every request before 'static'.  It checks whether the browser accepts XHTML,
// and if so adds a flag to the response object.  It is not a good idea to check
// whether the request is for a '.html' file at that point, because the URL
// hasn't yet been processed.  Second, the 'deliverXHTML' function is installed
// as an option, so that 'static' calls it when it is ready to deliver the file.
// It checks that the file is html, and checks the 'accepts XHTML' flag and, if
// both are true, it sets the content type.

var express = require('express');
var app = express();
var path = require('path');

app.use(negotiate);
app.use(express.static(path.join(__dirname, '/public'), { setHeaders: deliverXHTML } ));
app.use(validate);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/packages', function(req, res) {
    res.sendFile(__dirname + '/views/packages.html');
});

app.get('/nutrition', function(req, res) {
	res.sendFile(__dirname + '/views/nutrition.html');
});

app.get('/contact', function(req, res) {
    res.sendFile(__dirname + '/views/contact.html');
});

app.listen(8081, function() {
	console.log('Express started on port 8081');
});

// Check whether the browser accepts XHTML, and record it in the response.
function negotiate(req, res, next) {
    var accepts = req.headers.accept.split(",");
    if (accepts.indexOf("application/xhtml+xml") >= 0) res.acceptsXHTML = true;
    next();
}

// Called by express.static.  Delivers response as XHTML when appropriate.
function deliverXHTML(res, path, stat) {
    if (ends(path, '.html') && res.acceptsXHTML) {
        res.header("Content-Type", "application/xhtml+xml");
    }
}

function validate(req, res, next) {
    var url = req.originalUrl;
    var valid = true;
    if (ends(url, "/")) valid = true;
    if (!starts(url, "/")) valid = false;
    if (url.indexOf("//") >= 0) valid = false;
    if (url.indexOf("/.") >= 0) valid = false;
    // if (url.lastIndexOf(".") < url.lastIndexOf("/")) valid = false;
    if (ends(url, "..")) valid = false;
    console.log(url, valid);
    if (valid==false) res.redirect('/');
    next();
}
// Check whether a string starts with a prefix, or ends with a suffix.  (The
// starts function uses a well-known efficiency trick.)
function starts(s, x) { return s.lastIndexOf(x, 0) == 0; }
function ends(s, x) { return s.indexOf(x, s.length-x.length) >= 0; }


var nodemailer = require('nodemailer');
app.post('/contact', function (req, res) {
  var mailOpts, smtpTrans;
  //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
  smtpTrans = nodemailer.createTransport('SMTP', {
      service: 'Gmail',
      auth: {
          user: "me@gmail.com",
          pass: "application-specific-password"
      }
  });
  //Mail options
  mailOpts = {
      from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
      to: 'me@gmail.com',
      subject: 'Website contact form',
      text: req.body.message
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
      //Email not sent
      if (error) {
          res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Error occured, message not sent.', err: true, page: 'contact' })
      }
      //Yay!! Email sent
      else {
          res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Message sent! Thank you.', err: false, page: 'contact' })
      }
  });
});

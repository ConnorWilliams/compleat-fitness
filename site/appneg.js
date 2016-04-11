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
// app.use(validate);
app.use(negotiate);
app.use(express.static('.', {setHeaders:deliverXHTML}));
app.listen(8080, 'localhost');

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
    if (url.lastIndexOf(".") < url.lastIndexOf("/")) valid = false;
    next();
}
// Check whether a string starts with a prefix, or ends with a suffix.  (The
// starts function uses a well-known efficiency trick.)
function starts(s, x) { return s.lastIndexOf(x, 0) == 0; }
function ends(s, x) { return s.indexOf(x, s.length-x.length) >= 0; }

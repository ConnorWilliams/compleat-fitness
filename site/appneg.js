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
var path = require('path');
var nodemailer = require("nodemailer");
var bodyParser = require('body-parser');
var validator = require("email-validator");
var app = express();

// MongoDB integration
var mongojs = require('mongojs');
var db = mongojs('commentlist', ['commentlist']);
var db_img = mongojs('imgrefs', ['imgrefs']);

// Multer integration
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './public/uploads');
    },
    filename: function(req, file, callback) {
        var name = file.fieldname + '-' + Date.now() + '.jpg';
        callback(null, name);
        var refname = 'uploads/' + name;
        db_img.imgrefs.insert({ imgref: refname });
    }
});
var upload = multer({ storage: storage }).single('userPhoto');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://cojwilliams%40gmail.com:webtechisgr8@smtp.gmail.com');

app.use(negotiate);
app.use(express.static(path.join(__dirname, '/public'), { setHeaders: deliverXHTML }));
app.use(validate);
app.use(bodyParser());

/*-------------------------*/
/*-------- Routing --------*/
/*-------------------------*/

// Homepage

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

// Packages page

app.get('/packages', function(req, res) {
    res.sendFile(__dirname + '/views/packages.html');
});

// Nutrition page

app.get('/nutrition', function(req, res) {
    res.sendFile(__dirname + '/views/nutrition.html');
});

app.get('/postcomment', function(req, res) {
    console.log('I receieved a GET request');
    db.commentlist.find(function(err, docs) {
        console.log(docs);
        res.json(docs);
    });
});

app.post('/nutrition', function(req, res) {
    console.log(req.body);
    db.commentlist.insert(req.body, function(err, doc) {
        res.json(doc);
    });
});

// Gallery Page

app.get('/gallery', function(req, res) {
    res.sendFile(__dirname + '/views/gallery.html');
});

app.get('/fetchsource', function(req, res) {
    console.log('I received a GET request');
    db_img.imgrefs.find(function(err, docs) {
        console.log(docs);
        res.json(docs);
    });
});

app.post('/gallery', function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            console,log(err);
            // return res.end("Error uploading file.");
        }
        // res.end("File is uploaded.");
    });
});

// Contact page

app.get('/contact', function(req, res) {
    res.sendFile(__dirname + '/views/contact.html');
});

app.post('/send_mail', function(req, res) {
    var send = true;
    if (req.body.spamcatcher) {
        send = false;
    }

    if (!req.body.firstname || !req.body.lastname || !req.body.message) {
        res.end('{"resp": "Please fill in all fields!"}');
        send = false;
    }

    if (!validator.validate(req.body.email)) {
        res.end('{"resp": "Email address invalid."}');
        send = false;
    }

    if (send == true) {
        var mailOptions = {
            from: '"' + req.body.firstname + ' ' + req.body.lastname + '" ' + req.body.email, // sender address
            to: 'connor_williams@msn.com', // list of receivers
            subject: 'Message from ' + req.body.email, // Subject line
            text: req.body.message, // plaintext body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                return console.log(error);
            }
            res.end('{"resp": "Message sent!", "success":"true"}');
        });
    }
});

// 404 page

app.get('/404', function(req, res) {
    res.sendFile(__dirname + '/views/404.html');
});

/*---------------------------*/
/*-------- Functions --------*/
/*---------------------------*/
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
    if (valid == false) res.redirect('/404');
    next();
}
// Check whether a string starts with a prefix, or ends with a suffix.  (The
// starts function uses a well-known efficiency trick.)
function starts(s, x) {
    return s.lastIndexOf(x, 0) == 0;
}

function ends(s, x) {
    return s.indexOf(x, s.length - x.length) >= 0;
}

/*---------------------------*/
/*-------- Listening --------*/
/*---------------------------*/

app.listen(8081, function() {
    console.log('Express started on port 8081');
});
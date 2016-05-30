"use strict";
// An express server using Ian's method for content negotiation.

var express = require('express'); // For the server.
var path = require('path'); // TODO For ROUTING??
var nodemailer = require("nodemailer"); // For sending emails from the contact form
var bodyParser = require('body-parser'); // For extracting fields from JSON objects/
var validator = require("email-validator"); // For validating the email address left on the contact form.

var app = express();
app.use(express.static(path.join(__dirname, '/public'), { setHeaders: deliverXHTML }));
app.use(bodyParser());
app.use(negotiate);
app.use(validate);
app.use(checkSafe);

// MongoDB integration variables.
var mongojs = require('mongojs');
var db = mongojs('commentlist', ['commentlist']);
var db_img = mongojs('imgrefs', ['imgrefs']);
var db_emails = mongojs('emaillist', ['emaillist']);

// Multer integration variables.
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

// Reusable transporter object using Google's SMTP server for sending emails.
var transporter = nodemailer.createTransport('smtps://cojwilliams%40gmail.com:webtechisgr8@smtp.gmail.com');

/*---------------------------------------*/
/*--------------- Routing ---------------*/
/*---------------------------------------*/
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
    db.commentlist.find(function(err, docs) {
        res.json(docs);
    });
});

app.post('/nutrition', function(req, res) {
    db.commentlist.insert(req.body, function(err, doc) {
        res.json(doc);
    });
});

// Gallery Page
app.get('/gallery', function(req, res) {
    res.sendFile(__dirname + '/views/gallery.html');
});

app.get('/fetchsource', function(req, res) {
    db_img.imgrefs.find(function(err, docs) {
        res.json(docs);
    });
});

app.post('/gallery', function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            return res.json("Error uploading file.");
        }
        return res.json("Image uploaded!");
        // res.sendFile(__dirname + '/views/gallery.html');
    });
});

// Contact page
app.get('/contact', function(req, res) {
    res.sendFile(__dirname + '/views/contact.html');
});

// Post request for sending emails through the contact form.
app.post('/send_mail', function(req, res) {
    var send = true;

    // Checks for the spamcatcher being filled in by a spam bot.
    if (req.body.spamcatcher) {
        send = false;
    }

    // Check all necessary fields are filled in. If any are empty, let the client know.
    if (!req.body.firstname || !req.body.lastname || !req.body.message) {
        res.end('{"resp": "Please fill in all fields!"}');
        send = false;
    }

    // Validate the email address. If invalid let the client know.
    if (!validator.validate(req.body.email)) {
        res.end('{"resp": "Email address invalid."}');
        send = false;
    }

    // If everything is valid then send the email and a success message to the client.
    if (send == true) {
        var mailOptions = {
            from: '"' + req.body.firstname + ' ' + req.body.lastname + '" ' + req.body.email, // Sender address
            to: 'connor_williams@msn.com', // List of receivers
            subject: 'Message from ' + req.body.email, // Subject line
            text: req.body.message, // Plaintext body, can also use HTML.
        };

        // Check if they have ticked the subscribe box, if yes then add their email address to a subscriber database.
        if (req.body.subscribe == "true") {
            db_emails.emaillist.find({ emailaddr: req.body.email }).count(function(err, docs) {
                if (docs > 0) {
                    console.log("Email " + req.body.email + " already in database!");
                } else {
                    db_emails.emaillist.insert({ emailaddr: req.body.email }, function(err, docs) {});
                    console.log("Email " + req.body.email + " added to database!");
                }
            });
        }

        // Send email with previously defined transport object.
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

/*---------------------------------*/
/*-------- Other Functions --------*/
/*---------------------------------*/
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

// Validate the URL.  It must start with / and not contain /. or // so
// that /../ and /./ and file or folder names starting with dot are excluded.
// Also a final name with no extension is rejected.
function validate(req, res, next) {
    var url = req.originalUrl.toLowerCase();
    req.originalUrl = url;
    var valid = true;
    if (ends(url, "/")) valid = true;
    if (!starts(url, "/")) valid = false;
    if (url.indexOf("//") >= 0) valid = false;
    if (url.indexOf("/.") >= 0) valid = false;
    if (ends(url, "..")) valid = false;
    if (!valid) res.redirect('/404');
    next();
}

// Restrict the url to visible ascii characters, excluding control characters,
// spaces, and unicode characters beyond ascii.  Such characters aren't
// technically illegal, but (a) need to be escaped which causes confusion for
// users and (b) can be a security risk.
function checkSafe(req, res, next) {
    var url = req.originalUrl;
    var safe = true;
    var spaceCode = 32;
    var deleteCode = 127;

    if (url.length > 1000) safe = false;

    for (var i = 0; i < url.length; i++) {
        var code = url.charCodeAt(i);
        if (code < spaceCode || code > deleteCode) {
            safe = false;
            break;
        }
    }

    if (!safe) res.redirect('/404');
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
    console.log('Visit http://localhost:8081');
});
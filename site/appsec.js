// An express-based server demonstrating a security loophole.  Run it in a
// directory containing index.html and admin.html. The page admin.html is
// 'protected' by a fake function to authenticate the user.  The function just
// prints a message.  If you visit localhost:8080/admin.html you should see the
// message.  But if you visit localhost:8080//admin.html you can bypass the
// security and see the admin.html page with no password check message.

var express = require('express');
var app = express();
app.use("/admin.html", auth);
app.use(express.static('.'));
app.listen(8080, 'localhost');

function auth(req, res, next) {
	console.log("Would check password here.");
	next();
}
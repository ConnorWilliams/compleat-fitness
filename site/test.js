// test.js

var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/contact', function(req, res) {
	res.sendFile(__dirname + '/views/contact.html');
});

app.get('/nutrition', function(req, res) {
	res.sendFile(__dirname + '/views/nutrition.html');
});

app.get('/packages', function(req, res) {
	res.sendFile(__dirname + '/views/packages.html');
});

app.listen(8081, function() {
	console.log('Express started on port 8081');
});
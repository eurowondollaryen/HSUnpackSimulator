var http = require('http');
var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();

var filename = 'index.html';
app.use(express.static(path.join(__dirname, 'public')));
app.all("*", (req, res, next) => {
	res.writeHead(200, {'Content-Type' : 'text/html'});
	next();
});

app.get("/", (req, res) => {
	res.end(fs.readFileSync(filename, 'utf8'));
});
/*
app.get("*", (req, res) => {
	res.end('<head><title>404</title></head><body><h1>404 Error</h1></body>');
});
*/
http.createServer(app).listen(3000, '127.0.0.1');
console.log("Server running on 3000");
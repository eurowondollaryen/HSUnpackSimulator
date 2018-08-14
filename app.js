var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
const port = process.env.PORT || 3000;

var filename = 'index.html';

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
	console.log('Server running on port 3000');
});

app.get("/", (req, res) => {
	fs.readFile(filename, (err, data) => {
		if(err) {
			console.log(err);
		}
		else {
			res.writeHead(200, {'Content-Type' : 'text/html'});
			res.end(data);
		}
	});
});
/*
app.get("*", (req, res) => {
	res.end('<head><title>404</title></head><body><h1>404 Error</h1></body>');
});
*/
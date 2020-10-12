var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
const port = process.env.PORT || 3000;

var filename = 'index.html';

//ejs init
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

//use public directory
app.use(express.static(path.join(__dirname, 'public')));

//run server
app.listen(port, function(){
	console.log('Server is running on port ' + port);
});

//index page
app.get("/", (req, res) => {
	res.render("index", {
		data : "hello"
	});
});

app.get("*", (req, res) => {
	res.end('<head><title>404</title></head><body><h1>404 Error!</h1></body>');
});

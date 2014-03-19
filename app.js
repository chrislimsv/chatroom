var express = require("express");
var app = express();

function start(port) {	
	
	// set up add
	app.set('port', port);
	app.use(express.favicon());
	app.use(express.urlencoded());
	app.use(app.router);

	// init static
	app.use(express.static(__dirname + '/css'));

	// init server
	var server = app.listen(port);
	return server;
}

exports.start = start;
exports.app = app;

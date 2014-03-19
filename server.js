var http = require("http");
var url = require("url");
var sys = require("sys");


function start(app) {

	var server = http.createServer(app).listen(app.get('port'));
	sys.puts("Server has started.");

	return server;
}

exports.start = start;

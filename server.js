var http = require("http");
var url = require("url");
var sys = require("sys");

function start(portnumber, route, handle) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		route(handle, pathname, response, request);
	}

	var server = http.createServer(onRequest).listen(portnumber);
	sys.puts("Server has started.");

	return server;
}

exports.start = start;

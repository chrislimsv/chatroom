var fs = require("fs");

function start(response) {
	fs.readFile("client.html", 'utf-8', function (error, data) {
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(data);
		response.end();
	});
}

exports.start = start;

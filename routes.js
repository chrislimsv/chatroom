var fs = require("fs");

function start(req, res) {
	fs.readFile("client.html", 'utf-8', function (error, data) {
		res.writeHead(200, {"Content-Type": "text/html"});
		res.write(data);
		res.end();
	});
}

exports.start = start;

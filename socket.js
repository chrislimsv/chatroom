var io = require("socket.io");
var score = 0;


function start(s) {
	// start the socket
	io = io.listen(s);

	// listen for stuff
	io.sockets.on('connection', function(socket) {
		socket.emit("message_to_client", {message: score.toString()});

		socket.on('message_to_server', function(data) {
			score++;
			io.sockets.emit("message_to_client", {message: score.toString()});
		});
	});

}

exports.start = start;

var io = require("socket.io");
var result = "";


function start(s) {
	// start the socket
	io = io.listen(s);

	// listen for stuff
	io.sockets.on('connection', function(socket) {
		socket.emit("message_to_client", {message: result}); 

		socket.on('message_to_server', function(data) {
			result += "\n" + data["message"];
			io.sockets.emit("message_to_client", {message: result});
		});
	});

}

exports.start = start;

var io = require("socket.io");
var result = "";
var online = 0;

function start(s) {
	// start the socket
	io = io.listen(s);

	// listen for stuff
	io.sockets.on('connection', function(socket) {
		online++;

		socket.emit("message_to_client", {message: result}); 
		io.sockets.emit('message_online', {message: "There are " + online +
			" people online!"});

		socket.on('message_to_server', function(data) {
			result += "\n" + data["message"];
			io.sockets.emit("message_to_client", {message: result});
		});

		socket.on('disconnect', function () {
			online--;
			io.sockets.emit('message_online', {message: "There are " + online +
				" people online!"});
			
		});

	});


}

exports.start = start;

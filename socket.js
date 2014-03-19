var io = require("socket.io");
var online = 0;
var clients = [];
var global_msg = "";

function onlineMessage() {
	return "There are <b>" + clients.length + "</b> people online.";
}


function start(s) {
	// start the socket
	io = io.listen(s);

	// set timeouts
	io.set("close timeout", 2);
	io.set("heartbeat interval", 1);

	// listen for stuff
	io.sockets.on('connection', function(socket) {
		// update clients
		clients.push(socket);

		// update online count
		io.sockets.emit('message_online', {message: onlineMessage()}); 
		
		// send out global message to user

		socket.emit("update_global_msg", {message: global_msg});

		// new user message
		var new_user = "<i>A new user signed in.</i>";
		io.sockets.emit('send_chat', {message: new_user}); 

		// listen to messages
		socket.on('message_to_server', function(data) {
			// add timestamp to message			
			var date = new Date();
			var msg = "<b>User:</b> " + data["message"];
			// parse message to send back appropriate data
			io.sockets.emit("send_chat", {message: msg});

			// check if it's a command
			var index = msg.toLowerCase().search("write");
			if (index != -1) 
			{
				var global_msg = msg.substring(index+5,msg.length);
				io.sockets.emit("update_global_msg", {message: global_msg});
			}
		});

		// disconnect
		socket.on('disconnect', function () {
			//update eclients
			var i = clients.indexOf(socket);
			clients.splice(i,1);

			io.sockets.emit('message_online', {message: onlineMessage()}); 
			io.sockets.emit('send_chat', {message: "<i>A user signed out.</i>"});
		});


	});


}

exports.start = start;

var io = require("socket.io");
var commands = require("./commands.js");
var sockets_struct = require("./sockets_struct.js");
var empty_global_msg = "<i>No global message</i>";
var global_msg = empty_global_msg;
var max_id = 50000;

var sockets = new sockets_struct.Sockets(max_id);

function onlineMessage() {
	if (sockets.numOfSockets() == 1)
		return "You are the only user online.";
	else
		return "There are <b>" + sockets.numOfSockets() + "</b> people online.";
}


function start(s) {
	// start the socket
	io = io.listen(s);

	// set timeouts
//	io.set("close timeout", 2);
//	io.set("polling duration", 1);
//	io.set("heartbeat interval", 1);

	// listen for stuff
	io.sockets.on('connection', function(socket) {
		// assign id to user
		var id = sockets.addSocket(socket);

		// push userid 
		socket.emit("emit_command", {type: "userid", userid: id});
		
		// update online count
		io.sockets.emit('emit_command', {type: "online",
									 message: onlineMessage()}); 
		
		// send out global message to user
		socket.emit("emit_command", {type: "global", message: global_msg});

		// new user message
		var new_user = "<i>User " + id + " signed in.</i>";
		io.sockets.emit('emit_command', {type: "chat", message: new_user}); 

		// listen to messages
		socket.on('message_to_server', function(data) {
			var msg = data["message"];


			// check if it's a command
			var type = commands.parse_string(msg);
			if (type != false) 
			{
				if (type == "write ")
				{
					global_msg = msg.substring(type.length, msg.length);
					io.sockets.emit("emit_command", {type: "global", message: global_msg});
				}
				else if (type == "open ")
				{
					var url = msg.substring(type.length,msg.length);
					// if url doesn't start with http, add it
					if (url.indexOf("http") == -1) url = "http://" + url;
					io.sockets.emit("emit_command", {type: "open_url", url: url});
				}
				else if (type == "clear")
				{
					socket.emit("emit_command", {type: "clear"});
				}
				else if (type == "send ")
				{
					var rest = msg.substring(type.length, msg.length);
					if (rest.indexOf(" ") != -1) 
					{
						var target_id = parseInt(rest.substring(0,rest.indexOf(" ")), 10);
						var target_socket = sockets.getSocket(target_id);
						var target_msg = rest.substring(rest.indexOf(" ")+1, rest.length);
						target_msg = "From User " + id + ": " + target_msg;

						if (target_socket != null)
						{
							target_socket.emit("emit_command", {type: "popup", message:	target_msg});
							var success_msg = "<i>The message was successfully sent to <b>User " + target_id + "</b>.</i>";
							socket.emit("emit_command", {type: "chat", message: success_msg});
						}
						else
						{
							var fail_msg = "<i>Target id is invalid. Please try again.</i>";
							socket.emit("emit_command", {type: "chat", message: fail_msg});
						}	
					}
					else
					{
						var fail_msg = "<i>Invalid format. Please try again.</i>";
						socket.emit("emit_command", {type: "chat", message: fail_msg});
					}	
				}
				else if (type == "lg ") 
				{
					// add userid 
					var new_msg = "<b>User " + id + ":</b> " + msg.substring(type.length, msg.length); 

					// make text large
					new_msg = '<span style="font-size: 30pt">' + new_msg + '</span>';

					// parse message to send back appropriate data
					io.sockets.emit("emit_command", {type: "chat", message: new_msg});
				} 
				else if (type == "doge")
				{
					io.sockets.emit("emit_command", {type: "image", name: "doge", userid: id});
				}
			}
			// else send regular message
			else 
			{
				// add userid 
				var new_msg = "<b>User " + id + ":</b> " + msg; 

				// parse message to send back appropriate data
				io.sockets.emit("emit_command", {type: "chat", message: new_msg});
			}
		});

		// disconnect
		socket.on('disconnect', function () {
			//update eclients
			sockets.removeSocketById(id);

			io.sockets.emit('emit_command', {type: "online",
										 message: onlineMessage()}); 
			io.sockets.emit('emit_command', {type: "chat", message: "<i>User " + id + " signed out.</i>"});
		});


	});


}

exports.start = start;

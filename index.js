var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var socketio = require("./socket.js");
var portnumber = 1337;

var handle={};
handle["/"] = requestHandlers.start;

var s = server.start(portnumber, router.route, handle);
socketio.start(s);

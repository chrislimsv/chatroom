var routes = require("./routes.js");
var socketio = require("./socket.js");
var appjs = require("./app.js");
var express = require("express");
var port = Number(process.env.PORT || 5000);

// first, set up app, init server
var server = appjs.start(port); 
var app = appjs.app;

// set up the handles 
app.get("/", routes.start);

// set up statics
app.use("/static",express.static(__dirname + '/static'));

// start socket
socketio.start(server);

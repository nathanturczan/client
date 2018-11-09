//have to restart server in terminal to see changes

// Using express: http://expressjs.com/
var express = require('express');
// Create the app
var app = express();
const http = require('http').Server(app);
const io = require("socket.io")(http);
const port = 3333;


// This is for hosting files
// Anything in the public directory will be served
// This is just like python -m SimpleHTTPServer
// We could also add routes, but aren't doing so here
//static = no parsing, no dynamic contect
app.use(express.static('.'));

io.on('connection', (socket) => {
	console.log('the client has arrived');

	socket.on('scale_index', (msg) => {
		console.log(msg);
		io.emit("scale_index", msg);
	})


	socket.on('disconnect', () => {
		console.log('theyre gone');
	})
})

// Set up the server
// process.env.PORT is related to deploying on heroku
http.listen(port, function(){
	console.log("listening for port", "");
})



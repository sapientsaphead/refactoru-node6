
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var socketio = require('socket.io')
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//index route
app.get('/', routes.index);
 
//Create the server
var server = http.createServer(app)

//Start the web socket server
var io = socketio.listen(server);

var users = {};

//If the client just connected
io.sockets.on('connection', function(socket) {
	// console.log('The eagle has landed');
	users[socket.id] = socket.id;

	io.sockets.emit('message', socket.id+' has joined the chatroom.');
	io.sockets.emit('users', users);

	socket.on('message', function(message){
		io.sockets.emit('message', {message: message, user: users[socket.id]});
	});

	socket.on('username', function(username){
		var changeUsername = function() {
			for (var key in users){
				if (users[key] === username){
					return true;
				}
				else {
					return false;
				}
			}
		}
	
		if (changeUsername()){
			// users[socket.id] = socket.id; 
			io.sockets.emit('message', users[socket.id]+': That username is taken. Please choose another.');
		} 
		else {
			users[socket.id] = username;
			io.sockets.emit('users', users);
			io.sockets.emit('message', socket.id+' changed their username to '+users[socket.id]+'.');
		}
	});

	socket.on('error', function(error){
		io.sockets.emit('error', error);
	});

	socket.on('disconnect', function() {
		delete users[socket.id];
		io.sockets.emit('users', users);
		io.sockets.emit('disconnect', socket.id +' has left the chatroom.');
	});
});



server.listen(3000, function(){
  console.log('Express server listening on port ' + app.get('port'));
});



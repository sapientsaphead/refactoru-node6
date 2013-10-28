### Chatroom

#### Objective

Build a real-time chat application using Socket.io

#### Skills
* Socket.io
* Express
* Node.js
* jQuery
* Handlebars

#### Resources
* [socket.io](http://socket.io/)
* [socket.io quick reference](https://gist.github.com/mattnull/7131324)
* [nodejs.org](http://nodejs.org/)
* [Starter Code](https://github.com/RefactorU/exercise-starters/tree/master/nodejs/chatroom)

### Requirements

#### Part I (Get Socket.io running)

1. Download the starter code [here](https://github.com/RefactorU/exercise-starters/tree/master/nodejs/chatroom)
2. run `npm install` inside of that directory
3. Once you get your server running you should see something like

![info - socket.io started](http://fall2013.refactoru.com/public/img/screenshots/nodejs/socketio-running.png)

	`You now have socket.io running!`

#### Part II (Setup socket events on the server)

1. Now let's create an event to let the server know when a connection has been made by the client. Add a "connection" event to your app.js `io.sockets.on('connection',function(){...});`
2. Create an empty object _outside_ of your connection event to hold our users.
3. Create an event __inside__ of the connection event to receive a message

	`Note that all of our socket events on the server will go inside of the connection event`


#### Part III (Setup socket events on the client)

1. Now let's setup our client side events. The HTML has been provided for you . Create a connect statement to connect to your server `var socket = io.connect('http://localhost')`
2. Now lets create a "connect" event `socket.on('connect', function(){})`
3. Create a "message" event inside of the "connect" event's callback


#### Part IV (Send messages)

1. Write some jQuery to capture a keyup event. When enter is pressed use `socket.emit('message', 'SOME MESSAGE');` to send a message to your server
2. __On the server__ `console.log()` the message to ensure that the message has made it to the server.
3. __On the server__ in your "message" event. Send the message to the entire chatroom by doing `io.sockets.emit('message', 'my message');`
4. __On the client__ when the "message" event is fired, append the message to the div with the id "room"
5. You should be able to open two tabs in Chrome with [http://localhost:3000](http://localhost:3000/) and chat back and forth


#### Bonus I

1. Whenever someone connects to the chat room. Display a message to the room that shows that someone has connected.
2. Whenever someone disconnects, announce to teh room that someone has left.

	`Use the "disconnect" event`


#### Bonus II

1. When a user connects to the server, emit an event that shows their socket ID in the right column of that chat UI.
2. Create a feature that allows the user to change their user name.

	`Everytime someone connects or disconnects you should be updating the "users" object that we created in Part II`

`Success! Now you know how to create a real-time web app using websockets!`
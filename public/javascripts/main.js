$(function(){
	// connect the socket.io server
	var socket = io.connect('http://localhost');
	

	//define socket events
	socket.on('connect', function(id, message){
		// socket.on('id', function(id){
		// 	$('#users').val('');
		// 	$('#users').append('<div>'+id+'</div>');
		// });

		socket.on('users', function(users) {
			$('#users').empty();
			for (var key in users) {
				$('#users').append('<div>'+users[key]+'</div>');
			}
		});

		socket.on('message', function(message){
			// if there is a user then server is sending an object
	        if (message.user != undefined){
	        	$('#room').append('<div>'+message.user+': '+message.message+'</div>');
	    	}
	    	// if there is no user then server is sending a string
	    	else {
	    		$('#room').append('<div>'+message+'</div>');
	    	}
		});

		socket.on('disconnect', function(disconnect){
        	$('#room').append('<div>'+disconnect+'</div>');
		});
	});

	

	// attach events
	$('#message-input').on('keyup', function(e){
        if(e.which === 13){
            var message = $(this).val();
            socket.emit('message', message);
            $(this).val(''); 
        }
     });
	$('#set-user').on('keyup', function(e){
        if(e.which === 13){
            var username = $(this).val();
            socket.emit('username', username);
            $(this).val(''); 
        }
     });
});

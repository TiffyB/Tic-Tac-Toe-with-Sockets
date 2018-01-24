var express = require('express');
var bodyParser = require('body-parser');

//TEMP===========
var player1 = "";
var player2 = "";
//===============

//SOCKET IO
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection', function(socket){
	console.log('a user connected')
	socket.on('move', function(move){
    console.log('move: ' + move);
  });
  socket.on('username', function(username) {
  	console.log('username: ' + username);
  	if (player1 === "") {
			player1 = username;
		} else {
			player2 = username;
		}
		console.log(player1, player2)
		io.emit('players', player1, player2 || "waiting for player 2");
  })
  socket.on('move', function(move) {
  	console.log(move);
  })


	// socket.on('disconnect', function(){
	//   console.log('user disconnected');
	// });
});
server.listen(3000, function() {
	console.log('listening on port 3000')
});

//BODYPARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//REACT
app.use(express.static(__dirname + '/../react-client/dist'));


app.post('/signin', function(req, res) {
	let username = req.body.username;
	// console.log(req.body)
	if (player1 === "") {
		player1 = username;
	} else {
		player2 = username;
	}
	console.log(player1, player2)
	var responseObj = {
		player1,
		player2
	}
	res.send(responseObj)
})


// app.listen(3000, function() {
//   console.log('listening on port 3000!');
// });


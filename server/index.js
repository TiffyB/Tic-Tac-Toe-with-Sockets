const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-mysql');
const gameLogic = require('./gameLogic.js');


//SOCKET IO
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection', function(socket){
	// console.log('a user connected')
	socket.on('move', function(move){
    // console.log('move: ' + move);
  });


  socket.on('newGame', function(username) {
  	return db.addNewGame(username)
  	.then(results => {
  		let gameId = results.insertId;
  		socket.join(gameId)
  		io.to(gameId).emit('game', username, "waiting for player 2", gameId, "waiting", username);
  		return db.addNewBoard(gameId)
  	})
  	.then(results => {
  		console.log('added new board')
  	})
  })

  socket.on('move', function(gameId, symbol, move) {
  	console.log(move);
  	return gameLogic.handleMove(gameId, symbol, move)
  	.then(results => {
  		console.log(results)
  		if (results === "Invalid move") {
  			socket.emit('invalid', "invalid move");
  		} else if (results === "Tied game!") {
  			io.to(gameId).emit('move', symbol, move);
  			io.to(gameId).emit('status', "Tied game!")
  		} else if (results === "Valid move") {

  		} else {
  			//this player has won
  		}
  	})
  })

  socket.on('joinGame', function(joinGame) {
  	console.log('join game info', joinGame)
  	let gameId = Number(joinGame[0]);
  	let username = joinGame[1]
  	return gameLogic.getGameInfo(gameId, username)
  	.then(results => {
  		if (!results) {
  			socket.emit('invalid', "game id is not correct")
  		} else {
  			socket.join(gameId);
  			io.to(gameId).emit('game', results.player1, results.player2, results.gameId, "ready", results.player1);
  		}
  	})

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


// app.post('/signin', function(req, res) {
// 	let username = req.body.username;
// 	// console.log(req.body)
// 	if (player1 === "") {
// 		player1 = username;
// 	} else {
// 		player2 = username;
// 	}
// 	// console.log(player1, player2)
// 	var responseObj = {
// 		player1,
// 		player2
// 	}
// 	res.send(responseObj)
// })


// app.listen(3000, function() {
//   console.log('listening on port 3000!');
// });


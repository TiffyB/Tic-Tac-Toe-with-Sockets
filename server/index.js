const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-mysql');
const gameLogic = require('./gameLogic.js');


//SOCKET IO
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection', function(socket){

  socket.on('move', function(gameId, symbol, move, username, origGameId) {
  	return gameLogic.handleMove(gameId, symbol, move)
  	.then(results => {
  		if (results === "Invalid move") {
  			socket.emit('invalid', "invalid move");
  		} else if (results === "Tied game!") {
  			io.to(origGameId).emit('updateBoard', symbol, move, "Tied game!", username);
  		} else if (results === "Valid move") {
  			io.to(origGameId).emit('updateBoard', symbol, move, "ready", username);
  		} else {
  			return db.addWinner(gameId, username)
  			.then(results => {
	  			io.to(origGameId).emit('updateBoard', symbol, move, "Game won!", username);
  			})
  		}
  	})
  })

  socket.on('newGame', function(username) {
  	let gameId;
  	return db.addNewGame(username)
  	.then(results => {
  		gameId = results.insertId;
  		return db.addNewBoard(gameId)
  	})
  	.then(results => {
  		socket.join(gameId)
  		io.to(gameId).emit('game', username, "(waiting for Player 2)", gameId, "waiting", username);
  	})
  })

  socket.on('joinGame', function(gameId, username) {
  	gameId = Number(gameId);
  	return gameLogic.getGameInfo(gameId, username)
  	.then(results => {
  		if (!results) {
  			socket.emit('invalid', "game id is not correct")
  		} else {
  			socket.join(gameId);
  			io.to(gameId).emit('game', results.player1, results.player2, results.gameId, "ready");
  		}
  	})
  })

  socket.on('resetGame', function(player1, player2, origGameId) {
  	let gameId;
  	return db.resetGame(player1, player2)
  	.then(results => {
  		gameId = results.insertId;
  		return db.addNewBoard(gameId)
  	})
  	.then(results => {
  		io.to(origGameId).emit('reset', gameId)
  	})
  })

});
server.listen(3000, function() {
	console.log('listening on port 3000')
});

//BODYPARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//REACT
app.use(express.static(__dirname + '/../react-client/dist'));




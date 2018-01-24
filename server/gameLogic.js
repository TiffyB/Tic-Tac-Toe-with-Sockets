const db = require('../database-mysql');


var getGameInfo = (gameId, username) => {
  return db.getGame(gameId)
  .then(results => {
    if (results.length === 0) {
      return false;
    } else if (results[0].player2 !== null) {
      return false;
    } else {
      let player1 = results[0].player1
      return db.addPlayer2(gameId, username)
      .then(results => {
        if (results.affectedRows === 1) {
          return {
            player1: player1,
            player2: username,
            gameId: gameId
          }
        }
      })
    }
  })
}


//handle void moves
	// already taken spots
	// wrong turn



var checkForWin = (move) => {

}



var createNewGame = (player1) => {


  //return gameId
}

var isValidMove = (whoseTurn, player, move) => {

}


//check for a win

//check for tie (no wins, all spots taken)

//
module.exports = {
  getGameInfo,
}
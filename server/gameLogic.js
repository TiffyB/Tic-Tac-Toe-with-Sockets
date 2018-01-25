const db = require('../database-mysql');


const getGameInfo = (gameId, username) => {
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
        if (results.affectedRows === 1) { //ensures that the database was actually updated
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

const handleMove = (gameId, symbol, move) => {
  let board;
  return db.getBoard(Number(gameId))
  .then(results => {
    board = results[0]
    if (isValidMove(board, move)) {
      return db.updateBoard(gameId, symbol, move)
    } else {
      throw error;
    }
  })
  .then(results => {
    board[move] = symbol;
    console.log("hopefully updated board", board);
    if (isWinningMove(board)) {
      return `${symbol} has won!`
    } else if (isTied(board)) {
      return "Tied game!"
    } else {
      return "Valid move"
    }
  })
  .catch(error => {
    return "Invalid move"
  })

}


const checkDiagonals = (board) => {
  if (board.topleft !== null && board.topleft === board.midmid && board.midmid === board.bottomright) {
    return true;
  } else if (board.topright !== null && board.topright === board.midmid && board.midmid === board.bottomleft) {
    return true;
  } else {
    return false;
  }
}

const checkVerticals = (board) => {
  if (board.topleft !== null && board.topleft === board.midleft && board.midleft === board.bottomleft) {
    return true;
  } else if (board.topmid !== null && board.topmid === board.midmid && board.midmid === board.bottommid) {
    return true;
  } else if (board.topright !== null && board.topright === board.midright && board.midright === board.bottomright) {
    return true;
  } else {
    return false;
  }
}

const checkHorizontals = (board) => {
  if (board.topleft !== null && board.topleft === board.topmid && board.topmid === board.topright) {
    return true;
  } else if (board.midleft !== null && board.midleft === board.midmid && board.midmid === board.midright) {
    return true;
  } else if (board.bottomleft !== null && board.bottomleft === board.bottommid && board.bottommid === board.bottomright) {
    return true;
  } else {
    return false;
  }
}

var isWinningMove = (board) => {
  return checkDiagonals(board) || checkHorizontals(board) || checkVerticals(board);
}

var isTied = (board) => {
  var allLocations = Object.keys(board);
  console.log(allLocations)
  return allLocations.every(function(location) {
    return board[location] !== null;
  })
}

const isValidMove = (board, move) => {
  if (board[move] === null) {
    return true;
  }
}


module.exports = {
  getGameInfo,
  handleMove,
}
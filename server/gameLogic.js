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
  if (board.top_left !== null && board.top_left === board.mid_mid && board.mid_mid === board.bottom_right) {
    return true;
  } else if (board.top_right !== null && board.top_right === board.mid_mid && board.mid_mid === board.bottom_left) {
    return true;
  } else {
    return false;
  }
}

const checkVerticals = (board) => {
  if (board.top_left !== null && board.top_left === board.mid_left && board.mid_left === board.bottom_left) {
    return true;
  } else if (board.top_mid !== null && board.top_mid === board.mid_mid && board.mid_mid === board.bottom_mid) {
    return true;
  } else if (board.top_right !== null && board.top_right === board.mid_right && board.mid_right === board.bottom_right) {
    return true;
  } else {
    return false;
  }
}

const checkHorizontals = (board) => {
  if (board.top_left !== null && board.top_left === board.top_mid && board.top_mid === board.top_right) {
    return true;
  } else if (board.mid_left !== null && board.mid_left === board.mid_mid && board.mid_mid === board.mid_right) {
    return true;
  } else if (board.bottom_left !== null && board.bottom_left === board.bottom_mid && board.bottom_mid === board.bottom_right) {
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
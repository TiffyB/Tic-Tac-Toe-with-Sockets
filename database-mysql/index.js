var mysql = require('mysql');
const Promise = require('bluebird');

const mysqlConfig = {
  host: process.env.DBSERVER || 'localhost',
  user: process.env.DBUSER || 'root',
  password: process.env.DBPASSWORD || '',
  database: process.env.DBNAME || 'tictactoe'
};

var mysqlConnection = mysql.createConnection(mysqlConfig);

mysqlConnection.connect(function(err) {
  if (err) {
    console.log('Could not connect to database', err);
  } else {
    console.log('Connected to db');
  }
})

var connection = Promise.promisifyAll(mysqlConnection);

const addNewGame = (player1) => {
  var query = `INSERT INTO games (player1) VALUES ("${player1}")`;
  return connection.queryAsync(query);

}

const getBoard = (gameId) => {
  var query = `SELECT * FROM games WHERE gameId = ${gameId}`;
  return connection.queryAsync(query);
}


module.exports = {
  addNewGame,
}

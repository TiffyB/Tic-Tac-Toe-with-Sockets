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

const getBoard = (gameId) => {
  var query = `SELECT * FROM games WHERE gameId = ${gameId}`;
  return connection.queryAsync(query);
}



var selectAll = function(callback) {
  connection.query('SELECT * FROM items', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var getBoard = function() {

}

module.exports.selectAll = selectAll;

DROP DATABASE IF EXISTS tictactoe;

CREATE DATABASE tictactoe;

USE tictactoe;

CREATE TABLE games (
  gameId INTEGER NOT NULL AUTO_INCREMENT,
  boardId INTEGER,
  player1 VARCHAR(60),
  player2 VARCHAR(60),
  numMoves INTEGER NULL,
  winner VARCHAR (60),
  PRIMARY KEY (gameId)
);

CREATE TABLE board (
	boardId INTEGER NOT NULL,
	topLeft VARCHAR(1),
	topMid VARCHAR(1),
	topRight VARCHAR(1),
	midLeft VARCHAR(1),
	midMid VARCHAR(1),
	midRight VARCHAR(1),
	bottomLeft VARCHAR(1),
	bottomMid VARCHAR(1),
	bottomRight VARCHAR(1),
	PRIMARY KEY (boardId)
);




/*  Execute this file from the command line by typing:
 *    mysql -u root < database-mysql/schema.sql
 *  to create the database and the tables.*/

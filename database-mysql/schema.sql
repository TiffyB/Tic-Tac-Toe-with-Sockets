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

CREATE TABLE boards (
	gameId INTEGER NOT NULL,
	topleft VARCHAR(1),
	topmid VARCHAR(1),
	topright VARCHAR(1),
	midleft VARCHAR(1),
	midmid VARCHAR(1),
	midright VARCHAR(1),
	bottomleft VARCHAR(1),
	bottommid VARCHAR(1),
	bottomright VARCHAR(1),
	PRIMARY KEY (gameId)
);




/*  Execute this file from the command line by typing:
 *    mysql -u root < database-mysql/schema.sql
 *  to create the database and the tables.*/

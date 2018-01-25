DROP DATABASE IF EXISTS tictactoe;

CREATE DATABASE tictactoe;

USE tictactoe;

CREATE TABLE games (
  gameId INTEGER NOT NULL AUTO_INCREMENT,
  player1 VARCHAR(60),
  player2 VARCHAR(60),
  winner VARCHAR (60),
  PRIMARY KEY (gameId)
);

CREATE TABLE boards (
	gameId INTEGER NOT NULL,
	top_left VARCHAR(1),
	top_mid VARCHAR(1),
	top_right VARCHAR(1),
	mid_left VARCHAR(1),
	mid_mid VARCHAR(1),
	mid_right VARCHAR(1),
	bottom_left VARCHAR(1),
	bottom_mid VARCHAR(1),
	bottom_right VARCHAR(1),
	PRIMARY KEY (gameId)
);




/*  Execute this file from the command line by typing:
 *    mysql -u root < database-mysql/schema.sql
 *  to create the database and the tables.*/

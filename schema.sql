DROP DATABASE IF EXISTS tictactoe;

CREATE DATABASE tictactoe;

USE tictactoe;

CREATE TABLE games (
  id int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (ID)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

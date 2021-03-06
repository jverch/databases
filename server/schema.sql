DROP DATABASE chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  /* Describe your table here.*/
  userID int NOT NULL AUTO_INCREMENT,
  username varchar(255),
  PRIMARY KEY (userID)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  ID int NOT NULL AUTO_INCREMENT,
  userID int NOT NULL,
  text varchar(255),
  roomname varchar(255),
  PRIMARY KEY (ID),
  FOREIGN KEY (userID) REFERENCES users(userID)
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/


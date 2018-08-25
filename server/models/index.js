var db = require('../db');

module.exports = {
  messages: {
    get: function(callback) {
      db.query(`SELECT * FROM messages INNER JOIN users ON users.userID = messages.userID`, (err, result) => {
        if (err) {
          callback(err);
          return;
        }
        //db.query(`SELECT username FROM users WHERE`)
        callback(err, result);
      });
    }, // a function which produces all the messages
    post: function(messageToAdd, callback) {

      db.query(
        `SELECT userID FROM users WHERE username = '${messageToAdd.username}';`,
        (err, result) => {
          if (err) {
            callback(err);
            return;
          }
          console.log('ACTUAL RESULT', result);
          // console.log('REEEEESSSULTTTTTTTT ', messageToAdd.text);
          if (result) {
            var sql = `INSERT INTO messages (userID, text, roomname) VALUES   (${result[0].userID},
              "${messageToAdd.message}",
              "${messageToAdd.roomname}"
            );`;
            db.query(sql, (err, result) => {
              console.log('ERROR', err);
              callback(err);
            });
          } else {
            console.log('ERROR, CANNOT ADD MESSAGE, USERNAME DOESN\'T EXIST');
            callback(err);
          }
        }
      );
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function() {},
    post: function(usersToAdd, callback) {
      db.query(
        `SELECT userID FROM users WHERE username = '${usersToAdd.username}';`,
        (err, result) => {
          if (err) {
            callback(err);
          }
          if (result.length === 0) {
            var sql = `INSERT INTO users (username) VALUES ('${
              usersToAdd.username
            }');`;
            db.query(sql, (err, result) => {
              callback(err);
            });
          } else {
            callback(err);
          }
        }
      );
    }
  }
};

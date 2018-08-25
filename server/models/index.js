var db = require('../db');

module.exports = {
  messages: {
    get: function() {}, // a function which produces all the messages
    post: function(messageToAdd, callback) {

      db.query(
        `SELECT id FROM users WHERE username = '${messageToAdd.username}';`,
        (err, result) => {
          if (err) {
            callback(err);
            return;
          }
          if (result) {
            var sql = `INSERT INTO messages (userID, text, roomname) VALUES   (${result[0].id},
              "${messageToAdd.message}",
              "${messageToAdd.roomname}"
            );`;
            db.query(sql, (err, result) => {
              console.log(result);
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
        `SELECT id FROM users WHERE username = '${usersToAdd.username}';`,
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

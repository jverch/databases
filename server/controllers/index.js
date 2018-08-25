var models = require('../models');

module.exports = {
  messages: {
    get: function(req, res) {}, // a function which handles a get request for all messages
    post: function(req, res) {
      models.messages.post(req.body, err => {
        if (err) {
          throw err;
        }
        res.writeHead(201);
        res.end();
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function(req, res) {
      console.log('req in get', req.method);
    },
    post: function(req, res) {
      models.users.post(req.body, err => {
        if (err) {
          throw err;
        }
        res.writeHead(201);
        res.end();
      });
    }
  }
};

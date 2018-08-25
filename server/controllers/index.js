var models = require('../models');

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10,
  'Content-Type': 'application/json' // Seconds.
};

var objectIdCounter = 1;

module.exports = {
  messages: {
    get: function(req, res) {
      models.messages.get((err, result) => {
        if (err) {
          throw err;
        }
        res.writeHead(200, defaultCorsHeaders);
        res.end(JSON.stringify(result));
      })
    }, // a function which handles a get request for all messages
    post: function(req, res) {
      console.log('REEEEEEEEEQUEEEEEEEESTTTTTT BODY', req.body);
      models.messages.post(req.body, err => {
        if (err) {
          throw err;
        }
        res.writeHead(201, defaultCorsHeaders);
        objectIdCounter++;
        res.end(JSON.stringify({objectId: objectIdCounter}));
      });
    },
    options: function(req, res) {
      console.log('help');
      res.writeHead(200, defaultCorsHeaders);
      res.end();
    }
    // a function which handles posting a message to the database
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
        res.writeHead(201, defaultCorsHeaders);
        res.end();
      });
    }
  }
};



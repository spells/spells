module.exports = function (app, config) {
  var session = require('express-session');
  app.use(session({
      key: config.sessionKey,
      secret: config.sessionSecret
    })
  );
};
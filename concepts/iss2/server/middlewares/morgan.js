module.exports = function (app, riccardo, development) {
  var morgan = require('morgan');
  if (development) {
    app.use(morgan('dev'));
  }
  app.use(morgan({
    stream: {
      write: function (log) {
        riccardo.get('logger').log('morgan', log);
      }
    }
  }));
};
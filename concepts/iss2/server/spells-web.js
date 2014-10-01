var riccardo = require('riccardo');
var express = require('express');
var path = require('path');
var _ = require('lodash');
var app = express();
riccardo.set('riccardo', riccardo);
riccardo.set('$', riccardo.$);
riccardo.set('app', app);

var config = require('./config');
riccardo.set('config', config);
app.set('env', (config.host == '127.0.0.1') ? 'production' : 'development');
riccardo.set('development', app.get('env') == 'development');
app.enable('trust proxy');

riccardo.$(require('./middlewares/morgan'))();

app.set('views', path.join(__dirname, 'views'));
var consolidate = require('consolidate');
var jade = consolidate.jade;
if (!riccardo.get('development')) {
  var jade = function () {
    var cache = {};
    return function (key, info, callback) {
      var filter = function (err, html) {
        if (err) {
          return callback(err, html);
        }
        cache[key] = html;
        callback(null, html);
      };
      if (!_.isFunction(callback)) {
        callback = info;
        info = {};
      }
      if (cache[key]) {
        return callback(null, cache[key]);
      }
      consolidate.jade(key, info, filter);
    };
  }();
}
app.engine('jade', jade);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(require('cookie-parser')());
app.use(require('method-override')());
riccardo.$(require('./middlewares/cookie'))(['userRole', 'csrfToken']);
riccardo.$(require('./middlewares/session'))();
app.use(require('csurf')());
app.use(require('./middlewares/csrfCookie')());
app.use(require('./middlewares/jsonPrefix')());
riccardo.$(require('./passport'))();
riccardo.$(require('./middlewares/userCookie'))();

app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

riccardo.$(require('./middlewares/logger'))();
riccardo.$(require('./middlewares/accessControl'))();

riccardo.$(require('./middlewares/spells'))();

riccardo.$(require('./models'))();
riccardo.$(require('./controllers'))();

riccardo.$(require('./middlewares/errorHandler'))();

app.set('port', process.env.PORT || config.port || 8080);
var http = require('http');
var server = http.createServer(app);

var logger = riccardo.get('logger');
server.listen(app.get('port'), config.host, function () {
  var message = 'Spells 서버: ' + server.address().port + ' (C) 류형욱 2014';
  logger.log('info', message);
});

//======================================================
// express
var express = require('express');
var app = express();
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser')();
var bodyParser = require('body-parser');
var session = require('express-session');
var expressLayouts = require('express-ejs-layouts');
var sessionStore = require('sessionstore').createSessionStore();

// socket.io
var server = require('http').Server(app);
var io = require('socket.io')(server);

// mysql
var mysql = require('./modules/mysql')();

// passport facebook
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// data store
/*
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    var socketStore= new LocalStorage('./socketStore'); // socket.id로 device hash 찾기
    var deviceStore= new LocalStorage('./deviceStore'); // device hash로 socket.id 및 user session List 찾기
    // 이거 이런식으로 안쓰고있음....
}
*/
var socketStore={}; // socket.id로 device hash 찾기
var deviceStore={}; // device hash로 socket.id 및 user session List 찾기
//======================================================
server.listen(80);
console.log('Express server listening on port ' + server.address().port);
//======================================================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser);
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret  : 'spells',
    store   : sessionStore,
    proxy   : true,
    resave  : true,
    saveUninitialized: true
}));
//======================================================
require('./modules/passport')(app,passport,FacebookStrategy,GoogleStrategy,mysql,deviceStore);
//======================================================
app.use('/ajax',require('./routes/ajax')(mysql,io,sessionStore,socketStore,deviceStore));
app.use('/',require('./routes/index')(mysql,io,sessionStore,socketStore,deviceStore));
require('./routes/socket')(mysql,io,sessionStore,socketStore,deviceStore);



/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

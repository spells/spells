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

// socket.io
var server = require('http').Server(app);
var io = require('socket.io')(server);

// session socket.io
var sessionStore = new session.MemoryStore();
var sessionSockets = require('session.socket.io-express4')
var sio = new sessionSockets(io, sessionStore, cookieParser);
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
var routes = require('./routes/index');
var users = require('./routes/users');

app.use('/', routes);
app.use('/users', users);


//test
var mysql = require('mysql');
var pool  = mysql.createPool({
    host    : '172.16.100.170',
    user    : 'spells',
    password: 'tmvpf123!@#',
    database: 'spells',
    charset : 'utf8',
    multipleStatements: true,
    debug   : true
});


sio.on('connection',function (err, socket, session) {
    console.log(socket.handshake.address + " client connect!");
    socket.on('diviceConnect', function (data) {
        console.log(data);
        pool.getConnection(function (err, connection) {
            connection.query('insert into deviceConnectLog set ?,time=now()', { did: data.did, ip: socket.handshake.address}, function (err, rows) {
            // And done with the connection.
                connection.release();
            // Don't use the connection here, it has been returned to the pool.
            });
        });

    });
});







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

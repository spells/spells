module.exports=function(mysql,io,sessionStore,socketStore,deviceStore){
	var express = require('express');
	var router = express.Router();
//	var async = require("async");

	router.get('/', function(req, res) {
		//console.log(req);
		//res.send(true);
		res.render('index');
	});

	router.get('/viewSessionStore', function(req, res) {
		console.log(sessionStore);
		res.send(JSON.stringify(sessionStore));
	});
	router.get('/veiwSocketStore', function(req, res) {
		console.log(socketStore);
		res.send(JSON.stringify(socketStore));
	});
	router.get('/veiwDeviceStore', function(req, res) {
		console.log(deviceStore);
		res.send(JSON.stringify(deviceStore));
	});
	router.all('*',function(req, res, next) {
		if(req.session.login) next();
		else res.redirect('/');
	});

	return router;
}

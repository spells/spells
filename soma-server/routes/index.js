module.exports=function(mysql,sio){

	var express = require('express');
	var router = express.Router();

	router.get('/', function(req, res) {
		res.render('index',{layout:false});
	});
	router.all('*',function(req, res, next) {
		if(req.session.login) next();
		else res.redirect('/');
	});
	router.get('/main', function(req, res) {
		console.log(req.session);
		res.render('main',{passport:req.session.passport.user});
	});
	return router;
}

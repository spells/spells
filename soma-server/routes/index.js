module.exports=function(mysql,sio){

	var express = require('express');
	var router = express.Router();

	router.get('/', function(req, res) {
		res.render('index',{layout:false});
	});
	router.all('*',function(req,res,next){
		if(req.session.login) next();
		else res.status(500).send('500 error');
	});
	router.get('/main', function(req, res) {
		res.render('main');
	});
	return router;
}

module.exports = init;
function init(app,passport,FacebookStrategy,GoogleStrategy,mysql) {
	app.use(passport.initialize());
	app.use(passport.session());
	passport.serializeUser(function(user, done) {
	    done(null, user);
	});
	passport.deserializeUser(function(obj, done) {
	    done(null, obj);
	});
	passport.use(
	    new FacebookStrategy({
	        clientID: '358408264322993',
	        clientSecret: '78c836d55e612db1b8aaa617e33484e3',
	        callbackURL: "http://localhost:8080/auth/facebook/callback"
	    },
	    function(accessToken, refreshToken, profile, done){
	        console.log("==> Login : "+profile.displayName+" ("+profile.id+") - Facebook");
	        return done(null, profile);
	    }
	));

	passport.use(
		new GoogleStrategy({
			clientID: '873949101826-c6tqu55erbl8gj5s7pskujucv7f95cvt.apps.googleusercontent.com',
		    clientSecret: 'YN4uBnEUFTMkOtfAovQTHXp5',
			callbackURL: 'http://localhost:8080/auth/google/callback'
		},
	    function(accessToken, refreshToken, profile, done){
	        console.log("==> Login : "+profile.displayName+" ("+profile.id+") - Google");
	        return done(null, profile);
	    }
	));

	app.get('/auth/facebook', passport.authenticate('facebook'));
	app.get('/auth/facebook/callback', passport.authenticate('facebook', {
	    successRedirect: '/auth/login/success',
	    failureRedirect: '/auth/login/fail'
	}));
	app.get('/auth/google', passport.authenticate('google',{
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		]
	}));
	app.get('/auth/google/callback', passport.authenticate('google', {
	    successRedirect: '/auth/login/success',
	    failureRedirect: '/auth/login/fail'
	}));

	app.get('/auth/login/success',function(req,res){
		var profile=req.session.passport.user;
		try{
			mysql.queryExecute('select * from user where ?',{user_id:profile.id},function(result,status){
				if(!status.error&&!status.empty){
					mysql.queryExecute('update user set ?,login_cnt=login_cnt+1,check_cnt=if(DAY(login_date)=DAY(NOW()),check_cnt,check_cnt+1),login_date=now() where ?',[{
						user_name:profile.displayName,
						user_raw:profile._raw,
						login_ip:req.connection.remoteAddress
					},{
						user_id:profile.id
					}],function(result,status){
						res.redirect('/auth/login/success/proc');
					});
				}
				else if(!status.error){
					mysql.queryExecute('insert into user set ?,login_date=now(),join_date=now()',{
						user_id:profile.id,
						user_name:profile.displayName,
						user_raw:profile._raw,
						login_ip:req.connection.remoteAddress,
						join_ip:req.connection.remoteAddress,
						user_type:(profile.provider=='google'?1:2)
					},function(result,status){
						res.redirect('/auth/login/success/proc');
					});
				}
				else{
					throw "==> 로그인 처리중 에러 발생";
				}
			});
		}
		catch(err){
			console.log(err);
			res.status(500).send('500 error');
		}
	});
	app.get('/auth/login/success/proc', function(req, res){
		var profile=req.session.passport.user;
		mysql.queryExecute('select * from user where ?',{user_id:profile.id},function(result,status){
			req.session.login=true;
			req.session.user={};
			req.session.user.idx=result[0].idx;
			req.session.user.id=result[0].user_id;
			req.session.user.name=result[0].user_name;
			req.session.user.user_type=result[0].user_type;
			if(result[0].user_type==10)req.session.isAdmin=true;
			res.redirect('/main');
		});
	});
	app.get('/auth/login/fail', function(req, res){
	    res.redirect('/');
	});
	app.get('/logout', function(req, res){
		delete req.session.login;
		delete req.session.user;
		req.logout(); // passport 에서 지원하는 메소드		
		res.redirect('/');
	});
}
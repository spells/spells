module.exports = init;
var async = require("async");
function init(app,passport,FacebookStrategy,GoogleStrategy,mysql,deviceStore) {

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
	        callbackURL: "http://172.16.100.170/auth/facebook/callback"
//	        callbackURL: "http://172.16.101.231/auth/facebook/callback"
	    },
	    function(accessToken, refreshToken, profile, done){
	        console.log("==> Login : "+profile.displayName+" ("+profile.id+") - Facebook");
	        return done(null, profile);
	    }
	));

	passport.use(
		new GoogleStrategy({
			clientID: '873949101826-ukaiq7ip174679pn9i9tn5eep55drrnf.apps.googleusercontent.com',
		    clientSecret: 'p1b8nxnoGmh_2SMP9TtyObpw',
			callbackURL: 'http://172.16.100.170/auth/google/callback'
//			callbackURL: 'http://172.16.101.231/auth/google/callback'
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
			mysql.queryExecute('select * from user where ?',{id:profile.id},function(result,status){
				if(!status.error&&!status.empty){
					mysql.queryExecute('update user set ?,login_cnt=login_cnt+1,check_cnt=if(DAY(login_date)=DAY(NOW()),check_cnt,check_cnt+1),login_date=now() where ?',[{
						name:profile.displayName,
						raw_data:profile._raw,
						login_ip:req.connection.remoteAddress
					},{
						id:profile.id
					}],function(result,status){
						res.redirect('/auth/login/success/proc');
					});
				}
				else if(!status.error){
					mysql.queryExecute('insert into user set ?,login_date=now(),join_date=now()',{
						id:profile.id,
						name:profile.displayName,
						raw_data:profile._raw,
						login_ip:req.connection.remoteAddress,
						join_ip:req.connection.remoteAddress,
						type:(profile.provider=='google'?1:2)
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
		mysql.queryExecute('select * from user where ?',{id:profile.id},function(result,status){
			req.session.login=true;
			req.session.user={};
			req.session.user.idx=result[0].idx;
			req.session.user.id=result[0].id;
			req.session.user.name=result[0].name;
			req.session.user.type=result[0].type;
			//res.redirect('/main');

			// 이 코드 ajax 로그인 쪽에도 복사됨
			mysql.queryExecute('select idx,hash from user_device where ?',{user_idx:req.session.user.idx},function(result,status){
                if(!status.error){
                    async.each(result,function(index,callback){
                        if(!deviceStore[index.hash]){
                            deviceStore[index.hash]={};
                            deviceStore[index.hash].userList=[];
                        }
                        if(deviceStore[index.hash].userList.indexOf(req.sessionID)==-1) deviceStore[index.hash].userList.push(req.sessionID);
                        mysql.queryExecute('select hash from user_device_sub where ?',{master_idx:index.idx},function(result,status){
                            if(!status.error){
                                result.forEach(function(index){
                                    if(!deviceStore[index.hash]){
                                        deviceStore[index.hash]={};
                                        deviceStore[index.hash].userList=[];
                                    }
                                    if(deviceStore[index.hash].userList.indexOf(req.sessionID)==-1) deviceStore[index.hash].userList.push(req.sessionID);
                                });                                    
                            }
                            callback();
                        });
                    },function(err){
						res.redirect('/auth/result');
                    });
                }
                else{
                	console.log("유저 디바이스 정보 가져오기 에러");
                	res.redirect('/auth/result');
                }
            });
		});
	});
	app.get('/auth/login/fail', function(req, res){
	    //res.redirect('/');
		req.session.login=false;
	    res.redirect('/auth/result');
	});
	app.get('/logout', function(req, res){
		delete req.session.login;
		delete req.session.user;
		req.logout(); // passport 에서 지원하는 메소드		
		res.redirect('/');
	});
	app.get('/auth/result', function(req, res){
		if(req.session.login){
			res.send('<html><body>{"result":true,"user":'+JSON.stringify(req.session.user)+'}</body></html>');
		}
		else{
			res.send('<html><body>{"result":true}</body></html>');
		}
	});
}
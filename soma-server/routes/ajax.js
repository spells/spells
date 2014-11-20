module.exports=function(mysql,io,sessionStore,socketStore,deviceStore){
    var express = require('express');
    var router = express.Router();
    var async = require("async");
    var request = require("request");

    router.post('/login', function(req, res){
        mysql.queryExecute('select * from user where ?',{id:req.body.id},function(result,status){
            if(!status.error&&!status.empty){
                req.session.login=true;
                req.session.user={};
                req.session.user.idx=result[0].idx;
                req.session.user.id=result[0].id;
                req.session.user.name=result[0].name;
                req.session.user.type=result[0].type;
                //res.send({result:true,user:req.session.user});
                
                // passport.js 에 복사되있음
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
                            res.send({result:true,user:req.session.user});
                        });
                    }
                    else{
                        res.send({result:false});
                    }
                });
            }
            else{
                res.send({result:false});
            }
        });
    });
    router.post('/loginCheck', function(req, res) {
        console.log(req.session);
        if(req.session&&req.session.login){
            res.send({result:true});
        }
        else{
            res.send({result:false});
        }
    });
    router.post('/gcmUpdate', function(req, res) {
        req.session.gcmid=req.body.gcmid;
        res.send({result:true});
    });

    router.all('*',function(req, res, next) {
        if(req.session.login) next();
        else res.send({result:false});
    });

    router.post('/set/updateDeviceStore', function(req, res) {
        // passport.js 에 복사되있음
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
                    res.send({result:true});
                });
            }
            else{
                res.send({result:false});
            }
        });
    });

    router.post('/get/main', function(req, res) {
        async.parallel({
            // 프로필 정보 가져오기
            profile:function(callback){
                async.parallel({
                    src:function(callback){
                         if(req.session.user.type==1){
                            request({
                                uri: "https://www.googleapis.com/plus/v1/people/"+req.session.user.id+"?fields=image&key=AIzaSyDDB7v2pOf_wVtgt-8vFWaEMBzt6x4bqho"
                            }, function(error, response, body) {
                                callback(null,(JSON.parse(body)).image.url.replace("?sz=50","?sz=150"));
                            });
                        }
                        else{
                            callback(null,"http://graph.facebook.com/"+req.session.user.id+"/picture?type=square&height=150&width=150");
                        }
                    },
                    alertCnt:function(callback){
                        mysql.queryExecute("select count(*) as cnt from log_alert where ? and confirm_date is null",{user_idx:req.session.user.idx},function(result,status){
                            callback(null,result[0].cnt);
                        });
                    }
                },
                function(err,result){
                    callback(null,result);
                });
            },
            // 디바이스 정보 가져오기
            device:function(callback){
                async.parallel({
                    master:function(callback){
                        mysql.queryExecute("select * from view_device where ?",{idx:req.session.user.idx},function(result,status){
                            callback(null,result);
                        });
                    },
                    sub:function(callback){
                        mysql.queryExecute("select * from view_device_sub where ?",{idx:req.session.user.idx},function(result,status){
                            callback(null,result);
                        });
                    }
                },
                function(err,result){
                    callback(null,result);
                });
            },
            // 로그 정보 가져오기
            log:function(callback){
                mysql.queryExecute('select t1.master_idx,count(*) as cnt from log_device t1 left join view_device t2 on t1.master_idx=t2.master_idx where ? group by t1.master_idx;select t1.sub_idx,count(*) as cnt from log_device_sub t1 left join view_device_sub t2 on t1.sub_idx=t2.sub_idx where ? group by t1.sub_idx;',[{'t2.idx':req.session.user.idx},{'t2.idx':req.session.user.idx}],function(result,status){
                    callback(null,{master:result[0],sub:result[1]});
                });
            }
        },
        function(err,result){
            res.send(result);
        });
    });
    router.post('/set/alert', function(req, res) {
        console.log(req.body);
        mysql.queryExecute("update log_alert set ?,confirm_date=now() where ? and ?",[{confirm_ip:req.connection.remoteAddress},{user_idx:req.session.user.idx},{hash:req.body.hash}],function(result,status){
            if(!status.error) res.send({result:true});
            else res.send({result:false});
        });
    });
    router.post('/get/menu', function(req, res) {
        mysql.queryExecute("select * from view_device where ?",{idx:req.session.user.idx},function(result,status){
            if(!status.error) res.send({result:true,data:result});
            else res.send({result:false});
        });
    });
    router.post('/get/master', function(req, res) {
        console.log(req.body);
        async.parallel({
            device:function(callback){
                async.parallel({
                    master:function(callback){
                        mysql.queryExecute("select * from view_device where ? and ?",[{idx:req.session.user.idx},{master_idx:req.body.master_idx}],function(result,status){
                            callback(null,result);
                        });
                    },
                    sub:function(callback){
                        mysql.queryExecute("select * from view_device_sub where ? and ?",[{idx:req.session.user.idx},{master_idx:req.body.master_idx}],function(result,status){
                            callback(null,result);
                        });
                    }
                },
                function(err,result){
                    callback(null,result);
                });
            },
            alert:function(callback){
                mysql.queryExecute('select * from log_alert where ? and ? and confirm_date is null',[{user_idx:req.session.user.idx},{master_idx:req.body.master_idx}],function(result,status){
                    callback(null,result);
                });
            },
            log:function(callback){
                mysql.queryExecute('select t1.master_idx,count(*) as cnt from log_device t1 left join view_device t2 on t1.master_idx=t2.master_idx where ? and ? group by t1.master_idx;select t1.sub_idx,count(*) as cnt from log_device_sub t1 left join view_device_sub t2 on t1.sub_idx=t2.sub_idx where ? and ? group by t1.sub_idx;',[{'t2.idx':req.session.user.idx},{'t2.master_idx':req.body.master_idx},{'t2.idx':req.session.user.idx},{'t2.master_idx':req.body.master_idx}],function(result,status){
                    callback(null,{master:result[0],sub:result[1]});
                });
            }
        },
        function(err,result){
            res.send(result);
        });
    });
    router.post('/set/confirmAlert', function(req, res) {
        console.log(req.body);
        mysql.queryExecute('update log_alert set ?,confirm_date=now() where ? and ?',[{confirm_ip:req.connection.remoteAddress},{user_idx:req.session.user.idx},{idx:req.body.idx}],function(result,status){
            if(!status.error) res.send({result:true});
            else res.send({result:false});
        });
    });
    router.post('/set/status', function(req, res) {
        console.log(req.body);
        if(deviceStore[req.body.hash].userList.indexOf(req.sessionID)>=0){
            console.log(deviceStore[req.body.hash].socket);
            io.sockets.to(deviceStore[req.body.hash].socket).emit('setStatus',{
                'hash' : req.body.hash,
                'status' : req.body.status,
                'value' : -1
            });
            res.send({result:true});
        }
        else res.send({result:false});
    });
    return router;
}




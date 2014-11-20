module.exports=function(mysql,sio,sessionStore,socketStore,deviceStore){
    var async = require("async");
    var gcm = require('node-gcm');
    var md5 = require('MD5');
    var server_access_key = 'AIzaSyDE9vdbkrpyE4pDC4IqOP3F7Xj1DLntCVY';
    var sender = new gcm.Sender(server_access_key);

    //socketStore=[]; // socket.id로 device hash 찾기
    //deviceStore=[]; // device hash로 socket.id 및 user session List 찾기
    sio.on('connection',function(err,socket,session){
        socket.on('deviceStatus',function(data){
            // save Store
            if(!socketStore[socket.id]) socketStore[socket.id]={}; // 생성
            socketStore[socket.id].master=data.hash;
            socketStore[socket.id].subList=[]; // 서브 리스트 초기화
            data.subList.forEach(function(index){
                socketStore[socket.id].subList.push(index.hash);
            });

            if(!deviceStore[data.hash]){
                deviceStore[data.hash]={};
                deviceStore[data.hash].userList=[];
            }
            deviceStore[data.hash].master=data.hash;
            deviceStore[data.hash].socket=socket.id;

            data.subList.forEach(function(index){
                if(!deviceStore[index.hash]){
                    deviceStore[index.hash]={};
                    deviceStore[index.hash].userList=[];
                }
                deviceStore[index.hash].master=data.hash;
                deviceStore[index.hash].socket=socket.id;
            });



            /*
                // example
                {
                    id : '1391480671142034', // 등록 안되있으면 null로
                    hash : 'c4ca4238a0b923820dcc509a6f75849b',
                    status : 1, // 없으면 null로
                    value : 3, // 없으면 null로
                    subList:[  // 없으면 빈 array로
                        {
                            hash : '1779cf3aa50c413afc7e05adb7e1b0de',
                            status : 1, // 없으면 null로
                            value : 3, // 없으면 null로
                            type : 1, // 필수 (서브 디바이스 타입임)
                        },
                        {
                            hash : '1123aabcd1231123aabcd1231123aabc',
                            status : 1, // 없으면 null로
                            value : 3, // 없으면 null로
                            type : 1, // (서브 디바이스 타입임)
                        }
                    ]
                }
            */

            async.waterfall([
                // get user_idx and master_idx
                function(callback){
                    mysql.queryExecute("select idx,user_idx from user_device where ?",{hash:data.hash},function(result,status){
                        if(!status.error&&!status.empty){
                            if(result[0].user_idx==null) callback(null,data.idx,result[0].idx,false);
                            else callback(null,data.idx,result[0].idx,true);                            
                        } 
                        else{
                            console.log("[socket.js] => 마스터 디바이스 정보 가져오기 에러 (등록 될꺼임)");
                            callback(null,data.idx,null,false);
                        }
                    });

                },
                // update or insert master device
                function(user_idx,master_idx,isExistUserIdx, callback){
                    if(master_idx!=null){
                        // 마스터 디바이스 이미 등록되있음

                        // 요거 요청하고 지나가게 되있음
                        if(user_idx!=null&&isExistUserIdx==false){
                            console.log("마스터 디바이스 이미 등록되있음");
                            alertMessageProc2(user_idx,master_idx,null,{
                                subHash: null,
                                title:'기기 등록 알림',
                                message:'[메인 기기 '+master_idx+']가 등록되었습니다.',
                                flag:1,
                                isPush:true
                            },socket,function(result){
                                if(result) console.log("[socket.js] => 메인 기기 등록 알림 전송1");
                                else console.log("[socket.js] => 메인 기기 등록 알림 전송1 실패");
                            });
                        }


                        mysql.queryExecute("update user_device set ?,connect_date=now() where ?",[{user_idx:user_idx,status:data.status,value:data.value,connect_ip:socket.handshake.address,raw_data:JSON.stringify(data)},{idx:master_idx}],function(result,status){
                            if(!status.error) callback(null,user_idx,master_idx);
                            else{
                                console.log("[socket.js] => 마스터 디바이스 업데이트 에러");
                                callback(null,user_idx,null);
                            }
                        });
                    }
                    else{
                        // 마스터 디바이스 등록 안되있음 
                        mysql.queryExecute("insert into user_device set ?,register_date=now(),connect_date=now()",{user_idx:user_idx,hash:data.hash,status:data.status,value:data.value,register_ip:socket.handshake.address,connect_ip:socket.handshake.address,raw_data:JSON.stringify(data)},function(result,status){
                            if(!status.error){
                                mysql.queryExecute("select idx,user_idx from user_device where ?",{hash:data.hash},function(result,status){
                                    if(!status.error&&!status.empty){

                                        // 요거 요청하고 지나가게 되있음
                                        if(result[0].user_idx!=null){
                                            console.log("마스터 디바이스 등록안되있음");
                                            alertMessageProc2(result[0].user_idx,result[0].idx,null,{
                                                subHash: null,
                                                title:'기기 등록 알림',
                                                message:'[메인 기기 '+result[0].idx+']가 등록되었습니다.',
                                                flag:1,
                                                isPush:true
                                            },socket,function(result){
                                                if(result) console.log("[socket.js] => 메인 기기 등록 알림 전송2");
                                                else console.log("[socket.js] => 메인 기기 등록 알림 전송2 실패");
                                            });
                                        }


                                        callback(null,result[0].user_idx,result[0].idx);
                                    }
                                    else{
                                        console.log("[socket.js] => 마스터 디바이스 정보 가져오기 에러 2");
                                        callback(null,user_idx,null);
                                    }
                                });
                            }
                            else{
                                console.log("[socket.js] => 마스터 디바이스 쓰기 에러");
                                callback(null,user_idx,null);
                            }
                        });
                    }
                },
                // insert log master device
                function(user_idx, master_idx, callback){
                    if(master_idx!=null){
                        mysql.queryExecute("insert into log_device set ?,update_time=now()",{master_idx:master_idx,status:data.status,value:data.value,connect_ip:socket.handshake.address,raw_data:JSON.stringify(data)},function(result,status){
                            if(!status.error) callback(null,user_idx,master_idx);
                            else{
                                console.log("[socket.js] => 마스터 디바이스 로그 쓰기 에러");
                                callback(null,user_idx,null);
                            }
                        });
                    }
                    else callback(null,user_idx,null);
                },                
                // update or insert sub device
                function(user_idx,master_idx, callback){
                    if(master_idx!=null){
                        async.each(data.subList,function(index,callback){
                            mysql.queryExecute("select idx from user_device_sub where ?",{hash:index.hash},function(result,status){
                                // 서브 디바이스 이미 등록 되있음
                                if(!status.error&&!status.empty){
                                    mysql.queryExecute("update user_device_sub set ?,connect_date=now() where ?",[{master_idx:master_idx,device_type:index.type,status:index.status,value:index.value,raw_data:JSON.stringify(data)},{idx:result[0].idx}],function(result,status){
                                        if(!status.error) callback();
                                        else{
                                            console.log("[socket.js] => 서브 디바이스 업데이트 에러");
                                            callback();
                                        }
                                    });
                                }
                                // 서브 디바이스 등록 안되있음
                                else if(!status.error){
                                    mysql.queryExecute("insert into user_device_sub set ?,register_date=now(),connect_date=now()",{master_idx:master_idx,hash:index.hash,device_type:index.type,status:index.status,value:index.value,raw_data:JSON.stringify(data)},function(result,status){
                                        if(!status.error){


                                            // 요청하고 지나가게 되있음
                                            mysql.queryExecute("select * from user_device_sub",{master_idx:master_idx,hash:index.hash},function(result,status){
                                                if(!status.error&&!status.empty){
                                                    alertMessageProc2(user_idx,master_idx,result[0].idx,{
                                                        subHash: null,
                                                        title:'기기 등록 알림',
                                                        message:'[서브 기기 '+result[0].idx+']가 등록되었습니다.',
                                                        flag:1,
                                                        isPush:true
                                                    },socket,function(result){
                                                        if(result) console.log("[socket.js] => 서브 기기 등록 알림 전송1");
                                                        else console.log("[socket.js] => 서브 기기 등록 알림 전송1 실패");
                                                    });
                                                }
                                            });


                                            callback();
                                        }
                                        else{
                                            console.log("[socket.js] => 서브 디바이스 쓰기 에러");
                                            callback();
                                        }
                                    });
                                }
                                else{
                                    console.log("[socket.js] => 서브 디바이스 정보 가져오기 에러");
                                    callback();
                                }
                            });
                        },function(err){
                            callback(null);
                        });
                    }
                    else callback(null);
                },
                // insert log sub device
                function(callback){
                    async.each(data.subList,function(index,callback){
                        mysql.queryExecute("select idx from user_device_sub where ?",{hash:index.hash},function(result,status){
                            if(!status.error&&!status.empty){
                                mysql.queryExecute("insert into log_device_sub set ?,update_time=now()",{sub_idx:result[0].idx,status:index.status,value:index.value,connect_ip:socket.handshake.address,raw_data:JSON.stringify(index)},function(result,status){
                                    if(!status.error) callback();
                                    else{
                                        console.log("[socket.js] => 서브 디바이스 로그 쓰기 에러");
                                        callback();
                                    }
                                });
                            }
                            else{
                                console.log("[socket.js] => 서브 디바이스 정보 가져오기 에러");
                                callback();
                            }
                        });
                    },function(err){
                        callback(null);
                    });
                },                
            ], function (err, result) {
                console.log("[socket.js] => 업데이트 : "+data.hash);
            });
        });
       

        socket.on('alertMessage',function(data){
            alertMessageProc(data,socket,function(result){
                if(result) console.log("[socket.js] => alertMessage success!!");
                else console.log("[socket.js] => alertMessage fail!!");
            });
        });
    });


    function alertMessageProc(data,socket,callback){
        if(socketStore[socket.id]||deviceStore[socketStore[socket.id].master]){
            // socketStore[socket.id].master // master hash
            // socketStore[socket.id].master.subList // sub hash array

            // waterfall 방식으로 나중에 수정하기
            mysql.queryExecute("select idx,user_idx from user_device where ?;select idx from user_device_sub where ?;",[{hash:socketStore[socket.id].master},{hash:data.subHash}],function(result,status){
                if(!status.error&&!status.empty&&result[0][0].user_idx!=null){
                    var hash=md5(result[0][0].idx+(new Date()).getTime());
                    mysql.queryExecute("insert into log_alert set ?,register_date=now()",{hash:hash,user_idx:result[0][0].user_idx,master_idx:result[0][0].idx,sub_idx:(result[1].length==0?null:result[1][0].idx),title:data.title,message:data.message,flag:data.flag,register_ip:socket.handshake.address,raw_data:JSON.stringify(data)},function(result,status){
                        if(!status.error){
                            console.log("[socket.js] => 알람 : "+data.title+"//"+data.message);
                            if(data.isPush){
                                data.hash=hash;
                                deviceStore[socketStore[socket.id].master].userList.forEach(function(index){
                                    var sessionTmp=JSON.parse(sessionStore.sessions[index]);
                                    console.log(sessionTmp.gcmid);
                                    if(sessionTmp||sessionTmp.gcmid){
                                        sender.send(new gcm.Message({
                                            //collapseKey: 'PhoneGapDemo',
                                            delayWhileIdle: true,
                                            timeToLive: 3,
                                            data:data
                                        }),[sessionTmp.gcmid], 4, function (err, result) {
                                            console.log(result);
                                            console.log("[socket.js] => 푸쉬 : "+data.title+"//"+data.message);
                                            callback(true);
                                        });
                                    }
                                });
                            }
                            else callback(true);
                        }
                        else{
                            callback(false);
                            console.log("[socket.js] => alert 로그 디비 입력 에러");
                        }
                    });
                }
                else callback(false);
            });
        }
        else{
            callback(false);
            console.log("[socket.js] => 디바이스 정보 찾기 실패");
        }
    }
    function alertMessageProc2(user_idx,master_idx,sub_idx,data,socket,callback){
        console.log("alertMessageProc2");
        console.log(user_idx);
        var hash=md5(master_idx+(new Date()).getTime());
        mysql.queryExecute("insert into log_alert set ?,register_date=now()",{hash:hash,user_idx:user_idx,master_idx:master_idx,sub_idx:(sub_idx==null?null:sub_idx),title:data.title,message:data.message,flag:data.flag,register_ip:socket.handshake.address,raw_data:JSON.stringify(data)},function(result,status){
            if(!status.error){
                console.log("[socket.js] => 알람2 : "+data.title+"//"+data.message);
                if(data.isPush){
                    for(var index in sessionStore.sessions){
                        var sessionTmp=JSON.parse(sessionStore.sessions[index]);
                        if(sessionTmp&&sessionTmp.user&&sessionTmp.user.idx==user_idx&&sessionTmp.gcmid){
                            data.hash=hash;
                            sender.send(new gcm.Message({
                                //collapseKey: 'PhoneGapDemo',
                                delayWhileIdle: true,
                                timeToLive: 3,
                                data:data
                            }),[sessionTmp.gcmid], 4, function (err, result) {
                                console.log(result);
                                console.log("[socket.js] => 푸쉬 : "+data.title+"//"+data.message);
                            });
                        }                                    
                    }
                }
                callback(true);
            }
            else{
                callback(false);
                console.log("[socket.js] => alert 로그 디비 입력 에러2");
            }
        });
    }
}




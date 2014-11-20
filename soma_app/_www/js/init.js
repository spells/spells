var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        // mobile
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("resume", this.onResume, false);
    },
    onResume:function(){
        app.loginInit(function(result){
            if(!result) $.mobile.changePage('#login');
            navigator.splashscreen.hide();
        });
    },
    onDeviceReady: function() {
        app.gcmInit();
        app.gcmUpdate();
        app.loginInit(function(result){
            if(result){
                $.mobile.changePage('#main',{
                    transition:'pop'
                });
            }
            else $.mobile.changePage('#login');
            navigator.splashscreen.hide();
        });
    },
    loginInit:function(callback){
        $.post("http://172.16.101.231/ajax/loginCheck",{},function(data){
            if(data.result) callback(true);
            else{
                if(window.localStorage.id){
                    $.post("http://172.16.101.231/ajax/login",{id:window.localStorage.id},function(data){
                        if(data.result){
                           for(var index in data.user){
                                window.localStorage.setItem(index,data.user[index]);
                            }
                            //window.localStorage.id=data.user.id;
                            //console.log(JSON.stringify(window.localStorage));
                            app.gcmUpdate();
                            callback(true);
                        }
                        else callback(false);
                    },"json");
                }
                else callback(false);
            }
        },"json");
    },
    gcmInit:function(){
        if(device.platform.toUpperCase() == 'ANDROID'){
            window.plugins.pushNotification.register(function(result){
                //successHandler
                console.log('result:'+result);
            },function(err){
                //errorHandler
                console.log('error:'+err);
            },{
                "senderID" : "873949101826",
                "ecb" : "app.onNotificationGCM"
            });
        }
    },
    gcmUpdate:function(gcmid){
        if(window.localStorage.gcmid){
            $.post("http://172.16.101.231/ajax/gcmUpdate",{gcmid:window.localStorage.gcmid},function(data){
            },"json");
        }
    },
    onNotificationGCM:function(e){
        var self=this;
        switch (e.event) {
            case 'registered': // 안드로이드 디바이스의 registerID를 획득하는 event 중 registerd 일 경우 호출된다.
                if(!window.localStorage.gcmid||window.localStorage.gcmid!=e.regid){
                    window.localStorage.gcmid=e.regid;
                    console.log("-------------------------------------------------------------------------");
                    console.log(e.regid);
                    app.gcmUpdate();
                }
                break;
            case 'message': // 안드로이드 디바이스에 푸시 메세지가 오면 호출된다.
                {
                    if (e.foreground){ // 푸시 메세지가 왔을 때 앱이 실행되고 있을 경우
                        //var soundfile = e.soundname || e.payload.sound;
                        //var my_media = new Media("/android_asset/www/" + soundfile);
                        //my_media.play();
                    } else { // 푸시 메세지가 왔을 때 앱이 백그라운드로 실행되거나 실행되지 않을 경우
                        if (e.coldstart) { // 푸시 메세지가 왔을 때 푸시를 선택하여 앱이 열렸을 경우
                            console.log("알림 왔을 때 앱이 열리고 난 다음에 실행 될때");
                        } else { // 푸시 메세지가 왔을 때 앱이 백그라운드로 사용되고 있을 경우
                            console.log("앱이 백그라운드로 실행될 때");
                        }
                    }
                    console.log(JSON.stringify(e.payload));
                    navigator.notification.alert(e.payload.message,function(){
                        $.post("http://172.16.101.231/ajax/set/alert",{hash:e.payload.hash},function(data){
                        },"json");
                    },e.payload.title);
                }
                break;
            case 'error':
                console.log('error:' + e.msg);
                break;
            case 'default':
                console.log('알수 없는 이벤트');
                break;
        }
    }
};

app.initialize();

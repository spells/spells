var app = {
    initialize: function() {
        this.serverURL="http://172.16.100.170";
        //this.serverURL="http://172.16.101.231";
        this.bindEvents();
        this.loadMenuList();
    },
    bindEvents: function() {
        // mobile
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("resume", this.onResume, false);
    },
    onResume:function(){
        console.log("==> onResume");
        app.loginInit();
    },
    onDeviceReady: function() {
        console.log("==> onDeviceReady");
        app.gcmInit();
        app.loginInit();
    },
    loginInit:function(){
        if(document.location.href.indexOf("index.html")<0){
            app.loginCheck(function(result){
                if(!result){
                    app.loginRetry(function(result){
                        if(result) document.location.href="main.html";
                        else document.location.href="index.html";
                    });
                }
            });
        }
        else{
            app.loginCheck(function(result){
                if(result) document.location.href="main.html";
                else{
                    app.loginRetry(function(result){
                        if(result) document.location.href="main.html";
                    });
                }
            });
        }
    },
    loginCheck:function(callback){
        jQuery.post(app.serverURL+"/ajax/loginCheck",{},function(data){
            if(data.result) callback(true);
            else callback(false);
        },"json");
    },
    loginRetry:function(callback){
        if(window.localStorage.id){
            jQuery.post(app.serverURL+"/ajax/login",{id:window.localStorage.id},function(data){
                if(data.result){
                   for(var index in data.user){
                        window.localStorage.setItem(index,data.user[index]);
                    }
                    app.gcmUpdate();
                    callback(true);
                }
                else callback(false);
            },"json");
        }
        else callback(false);
    },
    loginProc:function(type){
        var ref = window.open(app.serverURL+"/auth/"+type,'_blank','location=no');
        ref.addEventListener('loadstop',function(event){
            if(event.url.indexOf(app.serverURL+"/auth/result")>=0){
                ref.executeScript({
                    code:"document.body.innerHTML"
                },function(result){
                    var auth=JSON.parse(result[0]);
                    if(auth.result){
                        for(var index in auth.user){
                            window.localStorage.setItem(index,auth.user[index]);
                        }
                        app.gcmUpdate();
                        document.location.href="main.html";
                    }
                    else{
                        navigator.notification.alert("login fail!!");
                    }
                    ref.close();
                });
            }                    
        });
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
            jQuery.post(app.serverURL+"/ajax/gcmUpdate",{gcmid:window.localStorage.gcmid},function(data){
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
                    if(e.payload.updateDeviceStore){
                        jQuery.post(app.serverURL+"/ajax/set/updateDeviceStore",{},function(data){
                        },"json");
                    }
                    navigator.notification.alert(e.payload.message,function(){
                        jQuery.post(app.serverURL+"/ajax/set/alert",{hash:e.payload.hash},function(data){
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
    },
    loadMenuList:function(e){
        jQuery(document).ready(function($){
            var tmpSource=
                '<ul>'+
                    '<li>'+
                        '<a '+(document.location.href.indexOf("main.html")>=0?'class="active-menu" ':'')+'href="main.html">'+
                            '<i class="fa fa-home"></i>'+
                            'Home'+
                            '<i class="fa fa-circle"></i>'+
                        '</a>'+
                    '</li>'+
                    '<li>'+
                        '<a '+(document.location.href.indexOf("register.html")>=0?'class="active-menu" ':'')+'href="register.html">'+
                            '<i class="fa fa-cube"></i>'+
                            'Register Device'+
                            '<i class="fa fa-circle"></i>'+
                        '</a>'+
                    '</li>'+
                    '<li>'+
                        '<a '+(document.location.href.indexOf("buy.html")>=0?'class="active-menu" ':'')+'href="buy.html">'+
                            '<i class="fa fa-shopping-cart"></i>'+
                            'Buy Device'+
                            '<i class="fa fa-circle"></i>'+
                        '</a>'+
                    '</li>'+
                '</ul>';
            $(".all-elements .navigation").append(tmpSource);
            $.post(app.serverURL+"/ajax/get/menu",{},function(data){
                if(data.result){
                    tmpSource=
                        '<li>'+
                            '<a class="show-sub-menu" href="#">'+
                                '<i class="fa fa-cubes"></i>'+
                                'Device'+
                                '<i class="fa fa-plus'+(document.location.href.indexOf("device.html")>=0?' rotate-submenu-icon':'')+'"></i>'+
                            '</a>'+
                            '<ul class="sub-menu'+(document.location.href.indexOf("device.html")>=0?' show-submenu-item':'')+'">'+
                            '</ul>'+
                        '</li>';
                    $(".navigation ul li:nth-child(2)").after(tmpSource);
                    data.data.forEach(function(index){
                        if(index.master_name=="")index.master_name="[메인"+index.master_idx+"]";
                        tmpSource=
                           '<li>'+
                                '<a '+(document.location.href.indexOf("device.html?master_idx="+index.master_idx)>=0?'class="active-menu" ':'')+'href="device.html?master_idx='+index.master_idx+'">'+
                                    '<i class="fa fa-angle-right"></i>'+index.master_name+
                                    '<i class="fa fa-circle"></i>'+
                                '</a>'+
                            '</li>';
                        $(".navigation ul li:nth-child(3) .sub-menu").append(tmpSource);
                    });
                    $('.show-sub-menu').click(function(){
                        $(this).parent().find('ul').slideToggle(200);
                        $(this).find('.fa-plus').toggleClass('rotate-submenu-icon');
                        return false;
                    });
                }
            });
        });
    }
};

app.initialize();




 

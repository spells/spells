/*===============================================
// main page
===============================================*/
mainViewDevice=function(master_idx){
    $("#device").data("master_idx",master_idx);
    $.mobile.changePage('#device',{
        transition:'pop'
    });
}

/*===============================================
// register page
===============================================*/
var tmpInterval;
registerDisplayStart=function(){
    $("#register .register_btn").attr("disabled",true);
    var intervalTime=199;
    //var dataBinary="XXX"+Number(window.localStorage.idx).toString(2);
    var dataBinary="XXX"+$("#testtest").val();
    var eleDisplay=$("#register .register_display div");
    var tmpIndex=0;
    var tmpStr=$("#bit").val();
    var start = +new Date();
    tmpInterval=setInterval(function(){
        var end =  +new Date();
        var diff = end - start;
        console.log(dataBinary[tmpIndex]+" : "+diff);

        // up : white, down : balck;
        if(dataBinary[tmpIndex]=="0"){
            eleDisplay.css("background-color","white");
            setTimeout(function(){
                eleDisplay.css("background-color","black");
            },intervalTime*0.15);
        }
        else if(dataBinary[tmpIndex]=="1"){
            eleDisplay.css("background-color","white");
            setTimeout(function(){
                eleDisplay.css("background-color","black");
            },intervalTime*0.85);
        }
        else{
            eleDisplay.css("background-color","white");
            setTimeout(function(){
                eleDisplay.css("background-color","black");
            },intervalTime*0.5);
        }
        tmpIndex++;
        if(tmpIndex==dataBinary.length)tmpIndex=0;
    },intervalTime);
}
registerDisplayStop=function(){
    clearInterval(tmpInterval);
    $("#register .register_btn").removeAttr("disabled");
}

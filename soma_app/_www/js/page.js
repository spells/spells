$(document).ready(function(){

	$(document).on('pagebeforeshow','#main',function(event,data){
		$.post("http://172.16.101.231/ajax/get/main",{},function(data){
            $("#main .profile .profile_image img").attr("src",data.profile.src);
            $("#main .profile .profile_text .profile_device").text(data.device.master.length+data.device.sub.length);
            $("#main .profile .profile_text .profile_alert").text(data.profile.alertCnt);
            $("#main .device_list ul").empty();
            data.device.master.forEach(function(index){
                if(index.master_name=="")index.master_name="[메인"+index.master_idx+"]";
                if(index.master_comment=="")index.master_comment="[장치에 대한 설명을 적어주세요.]";
                var tmpSource=
                '<li>'+
                	'<div class="ui-grid-a">'+
                		'<div class="ui-block-a" style="width:20%;">'+index.master_name+'</div>'+
                		'<div class="ui-block-b" style="width:80%;">'+
                			'<p>'+index.master_comment+'</p>'+
                			'<p>서브 기기 3기 등록됨</p><p>미확인 기록 : '+index.unconfirmed_cnt+'건</p>'+
                			'<button onClick="mainViewDevice('+index.master_idx+')">자세히 보기</button>'+
                		'</div>'+
                	'</div>'+
                '</li>';
                $("#main .device_list ul").append(tmpSource);
            });
        },"json");
	});

	$(document).on('pagebeforeshow','#device',function(event,data){
		if($(event.target).data("master_idx")){

		}
		else $.mobile.changePage('#main');
	});

	$(document).on('pagebeforehide','#register',function(event){
		registerDisplayStop();
    });

});

$(document).ready(function(){
    var socket = io();
    socket.emit('GCMRagisterID',{gcmid:"testtest"});

    /*
    $.post("/ajax/getUserInfo",function(data){
        $('#page_profile .profile_device_count').text(data.master_cnt+data.sub_cnt);
        $('#page_profile .profile_device_master_count').text(data.master_cnt);
        $('#page_profile .profile_device_sub_count').text(data.sub_cnt);
    });

    $.post("/ajax/getDeviceInfo",function(data){




        $.post("/ajax/getDeviceSubInfo",function(dataSub){
            console.log(dataSub);
            //$("#page_profile .device_list li").remove();
            for(var index in data){
                var appendSource='<li class="toogle_wrap_blog radius8"><div class="trigger_blog activeb"><a href="#">'+(index+1)+'. '+data[index].name+'</a></div><div class="toggle_container_blog"><ul class="listing_detailed" >';
                for(var indexSub in dataSub){
                    if(dataSub[indexSub].master_idx==data[index].master_idx){
                        console.log(dataSub[indexSub]);
                        appendSource+='<li><a href="#">'+dataSub[indexSub].device_hash+'</a></li>';
                    }
                }
                appendSource+='</ul></div></li>';
                console.log(appendSource);
                $("#page_profile .device_list").append(appendSource);
            }
            
        });
        $("#page_profile .device_list").append()



                                            <li class="toogle_wrap_blog radius8">
                                                <div class="trigger_blog activeb">
                                                    <a href="#">blog categories</a>
                                                </div>
                                                <div class="toggle_container_blog">
                                                    <ul class="listing_detailed">
                                                        <li><a href="#">webdesign work</a></li>
                                                        <li><a href="#">painted illustrations</a></li>
                                                        <li><a href="#">programming and javascript</a></li>
                                                    </ul>
                                                </div>
                                            </li>
        console.log(data);
        
    });
    */
});
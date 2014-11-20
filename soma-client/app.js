var socket = require('socket.io-client')('http://172.16.100.170');
socket.on('connect', function(){
    console.log('connect!!');
    setTimeout(function(){
    	socket.emit('deviceStatus',{
	        idx : 6, // null 가능
	        hash : '10000000000000000000000000000001',
	        status : 1123123, // null 가능
	        value : 23, // null 가능
	        subList:[ // 없을경우 빈 array로
	        	{
	                hash : '10000000000000000000000000000002',
	                status : 21, // null 가능
	                value : 23, // null 가능
	                type : 1, // 이건 저번에 보내중 자료 참조
	            },
	            {
	                hash : '10000000000000000000000000000003',
	                status : null,
	                value : 23,
	                type : 1,
	            },
	            {
	            	hash : '10000000000000000000000000000004',
	                status : 21,
	                value : null,
	                type : 1,
	            }
	        ]
	    });
    },100);
    socket.on('result', function(data){
    	console.log(data);
    });

    socket.on('setStatus',function(data){
    	console.log(data);
    });
    /*
    setTimeout(function(){
    	socket.emit('alertMessage',{
    		subHash: null, // 서브 기기의 알람이면 서브 기기 hash 기입, 아니면 null (아닐경우는 메인 기기 알람으로 간주됨 (소켓 연결된거에서 메인 해쉬 구하기때문에 기입 할필요 없음))
    		title:'온도이상 ',
	        message:'현재 온도 55도',
	        flag:3, // var colorArr=["blue","green","yellow","red"];
	        isPush:true // 클라이언트한테 push할지 안할지 여부
	    });
    },1000);
	*/

/*

	function rnd_snd() {
		return (Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1);
	}
	function rnd(mean, stdev) {
		return Math.round(rnd_snd()*stdev+mean);
	}
	setInterval(function(){
    	socket.emit('deviceStatus',{
	        id : '112291381890212419310',
	        hash : '900000000d4c2f636f067f89cc14862c',
	        status : 1123123,
	        value : 23,
	        subList:[
	        	{
	                hash : '900100000d4c2f636f067f89cc148621',
	                status : Math.round(Math.random()*9)+1,
	                value : Math.round(Math.random()*89)+1,
	                type : 1,
	            },
	            {
	                hash : '900200000d4c2f636f067f89cc148622',
	                status : Math.round(Math.random()*9)+1,
	                value : 30+rnd(100,10)/10,
	                type : 2,
	            },
	            {
	                hash : '900300000d4c2f636f067f89cc148623',
	                status : Math.round(Math.random()*9)+1,
	                value : rnd(1000,100)/10,
	                type : 3,
	            }
	        ]
	    });
	},60000);

*/




	


    /*
    socket.on('diviceControl', function(data){
    	console.log(data);
    });
    socket.on('disconnect', function(){
        console.log('disconnect!!');
    });
	*/
});
/*
socket.on('connect', function(){
    console.log('connect!!');
    socket.emit('diviceConnect', { did: 'test0001' });
    socket.on('diviceControl', function(data){
    	console.log(data);
    });
    socket.on('disconnect', function(){
        console.log('disconnect!!');
    });
});
console.log("app start");
*/
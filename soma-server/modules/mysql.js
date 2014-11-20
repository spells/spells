var mysql=require('mysql');
module.exports=function(){
	var pool=mysql.createPool({
//		host	: 'spells.kr',
//		host	: '172.16.100.170',
		host	: '127.0.0.1',
		port	: '3306',
		user	: 'spells',
		password: 'tmvpf123!@#',
		database: 'spells',
		multipleStatements: true,
		debug	: true
	});
	pool.queryExecute=function(query,data,callback){
		pool.getConnection(function(err, connection) {
			connection.query(query,data,function(err, rows, fields, test) {
				if(err==null){
					if(rows.length==0) callback([],{error:false,empty:true});
					else callback(rows,{error:false,empty:false});
				}
				else{
					console.log(err);
					callback([],{error:true,empty:false});
				}
				connection.release();
			});
		});
	}
	return pool;
};
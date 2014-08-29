var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var pool  = mysql.createPool({
	connectionLimit : 10,
	host     : 'localhost',
	user     : 'soma',
	password : 'soma',
	database : 'soma',
	multipleStatements : true
});

// 총 질문 갯수 카운트
var question_count=-1;
pool.query('SELECT count(*) as count from question_list', function(err, rows, fields) {
	if (err) throw err;
	question_count=rows[0].count;
});

// 인덱스 페이지
router.get('/', function(req, res) {
	res.render('index');
});

// 페스트 페이지
router.get('/test', function(req, res) {
	// 카운터 없을경우 초기화 세팅
	if(!req.session.count) req.session.count=1;
	// 20개 초과일경우 결과 페이지로 이동
	if(req.session.count>20) res.redirect('/result');
	else{
		// 지문중 선택된 카운터순으로 하위 70%에서만 선택
		var question_1=Math.floor((Math.random()*question_count*0.7)+1);
		var question_2=Math.floor((Math.random()*question_count*0.7)+1);
		while(question_1==question_2) question_2=Math.floor((Math.random()*question_count*0.7)+1);
		console.log(req.session);
		pool.query('select idx,text from question_list order by count,idx limit ?,1;select idx,text from question_list order by count,idx limit ?,1;',[question_1,question_2],function(err, rows, fields) {
			console.log(rows);
			if (err) throw err;
			else res.render('test',{question_data:rows,question_count:req.session.count});
		});
	}
});

// 예시 선택 ajax 처리
router.all('/select', function(req, res) {
	pool.query('INSERT INTO `response_data` value (NULL,?,?,?,?,?);',[req.sessionID,req.session.count,req.body.select,req.body.not_select,req.body.select],function(err, rows, fields) {
		if (err) throw err;
		pool.query('update question_list set count=count+1 where idx=? or idx=?;',[req.body.select,req.body.not_select],function(err, rows, fields) {
			if (err) throw err;
			req.session.count++;
			res.send(true);
		});
	});
});

// 결과 페이지
router.get('/result', function(req, res) {
	pool.query('select count(distinct session) as tester_count from response_data;select t1.count,t2.text from (select selected as idx,count(*) as count from response_data group by selected order by count desc limit 1) as t1 left join question_list as t2 on t1.idx=t2.idx;',function(err, rows, fields) {
		if (err) throw err;
		console.log(rows);
		res.render('result',{tester_count:rows[0][0].tester_count,most_question:rows[1][0].text,most_question_count:rows[1][0].count});
	});
});



module.exports = router;

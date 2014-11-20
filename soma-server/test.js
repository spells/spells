var http = require('http');
var request = require("request");
var cheerio = require("cheerio");
var server = http.createServer(function (req,res) {
	request({
	    uri: "http://www.ck.ac.kr/univ-life/today-menu-student",
	}, function(error, response, body) {
	    $=cheerio.load(body);
	    var result=[];

	    $(".restaurant").each(function(index){
	    	if(index!=0){
	    		result.push({
	    			location: $(".restaurant").eq(index).text(),
	    			menu: $(".restaurant").eq(index).next().text()
	    		});
	    	}
	    });
	    res.writeHead(200, {"Content-Type": "text/plain"});
	    res.end(JSON.stringify(result));
	});
});
server.listen(8000);
console.log("Server running at http://127.0.0.1:8000/");
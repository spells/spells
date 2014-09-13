module.exports = function (app, riccardo) {

  // API에 오류가 있으면 오류를 응답하도록
  var apiHandler = function (req, res) {
    return function (err, result) {
      
      // 캐시 금지
      res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.header('Pragma', 'no-cache');
      res.header('Expires', 0);

      if (err) {
        // 거짓 오류로 응답
        res.status(500);
        res.json({
          status: 500,
          message: '오류가 발생했습니다. An error occurred.'
        });
      } else {
        res.json(result);
      }
    };
  };
  riccardo.set('apiHandler', apiHandler);

  var fs = require('fs');
  var express = require('express');
  var router = express.Router();

  fs.readdirSync(__dirname).forEach(function (file) {
    if (file == 'index.js' || file == '.DS_Store') return;
    var name = file.substr(0, file.indexOf('.'));
    var controller = riccardo.$(require('./' + name))(router);
  });

  // API 버전 1
  app.use('/api/1/', router);
};

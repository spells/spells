module.exports = function (riccardo, development) {
  var logger = {
    log: function (category, body) {
      if (!body) {
        body = category;
        category = null;
      }
      body = JSON.stringify(body);
      if (development) {
        console.log(category + ': ' + body);
      }
      if (!development) {
        // 프로덕션에서 특별한 로깅 방법을 사용하지 않습니다.
        console.log(category + ': ' + body);
      }
    }
  };
  riccardo.set('logger', logger);
  logger.log('info', 'logger를 사용할 수 있습니다.');
};
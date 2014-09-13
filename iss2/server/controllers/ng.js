var UglifyJS = require("uglify-js");

module.exports = function (router) {
  router.get('/', function (req, res) {
    res.render('root.jade');
  });

  var accessControl = UglifyJS.minify('controllers/accessControl.js').code;
  router.get('/js/accessControl.js', function (req, res) {
    res.header('Content-Type', 'application/javascript');
    res.send(accessControl);
  });
  
  router.get('/login', function (req, res) {
    if (req.user) {
      res.render('error.jade',
        {
          message: '로그인 작업을 수행하려면 먼저 로그아웃을 해야 합니다.'
        }
      );
    } else {
      res.render('login.jade', {csrfToken: req.csrfToken()});
    }
  });
};

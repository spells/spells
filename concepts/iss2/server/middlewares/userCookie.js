module.exports = function (app) {
  app.use(function (req, res, next) {
    if (req.user && req.user.userRole) {
      req.session.userRole = req.user.userRole;
    } else {
      req.session.userRole = 0;
    }
    next();
  });
};

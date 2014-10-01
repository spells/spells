module.exports = function (app, riccardo) {
  var accessControl = require('../controllers/accessControl');
  var levelAdmin = accessControl.accessLevels.admin;
  var roleGuest = accessControl.userRoles.guset;

  riccardo.set('userRoles', accessControl.userRoles);
  riccardo.set('accessLevels', accessControl.accessLevels);
  var ensureAuthorized = function (accessLevel) {
    if (!accessLevel) {
      accessLevel = levelAdmin;
    }
    return function (req, res, next) { 
      var role = roleGuest;
      if (req.user && req.user.userRole) {
        role = req.user.userRole;
      }

      if (accessLevel & role) {
        next();
      } else {
        res.send(403);
      }
    };
  };
  riccardo.set('ensureAuthorized', ensureAuthorized);
};
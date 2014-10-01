module.exports = function (ensureAuthorized, accessLevels, router, apiHandler, spellsMiddleware) {
  router.get('/status', ensureAuthorized(accessLevels.spells), function (req, res) {
    spellsMiddleware.getLength(function (err, length) {
      spellsMiddleware.getRecent(function (err, recent) {
        spellsMiddleware.getMode(function (err, mode) {
          var body = {
            length: length,
            recent: recent,
            mode: mode
          };
          apiHandler(req, res)(null, body);
        });
      });
    });
  });
  router.get('/toggle', ensureAuthorized(accessLevels.spells), function (req, res) {
    spellsMiddleware.toggleMode();
    apiHandler(req, res)(null, {});
  });
};

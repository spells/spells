module.exports = function (app, riccardo, config, $) {
  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy($(function (username, password, done, userRoles) {
    if (username != 'spells') {
      return done(false);
    }
    if (password != config.password) {
      return done(false);
    }
    var sessionUser = {
      userRole: userRoles.spells
    };
    return done(null, sessionUser);
  })));

  passport.serializeUser(function (sessionUser, done) {
    done(null, sessionUser);
  });

  passport.deserializeUser(function (sessionUser, done) {
    done(null, sessionUser);
  });

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  app.post('/login',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: false
    })
  );
};

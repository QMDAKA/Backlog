let passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = {
  http: {
    customMiddleware: function(app) {
      app.use(passport.initialize());
      app.use(passport.session());
    }
  }
};

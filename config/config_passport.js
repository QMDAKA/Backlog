let passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const express = require('express')
module.exports = {
  http: {
    customMiddleware: function(app) {
      const path = require('path');
      let pathFile = path.join(__dirname, '..', 'views', 'Frontlog', 'dist')
      app.use(passport.initialize());
      app.use(passport.session());
      app.engine('.html', require('ejs').renderFile)
      app.use(express.static(pathFile))// set the static files location for the static html
    }
  }
};

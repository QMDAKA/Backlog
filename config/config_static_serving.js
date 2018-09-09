const express = require('express')
module.exports = {
  http: {
    customMiddleware: function(app) {
      const path = require('path');
      let pathFile = path.join(__dirname, '..', 'views', 'Frontlog', 'dist')
      app.engine('.html', require('ejs').renderFile)
      app.use(express.static(pathFile))// set the static files location for the static html
    }
  }
};

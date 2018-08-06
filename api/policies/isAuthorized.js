const keys = require('../../config/keys')
const jwt = require('jsonwebtoken')
module.exports = function (req, res, next) {
  let token;
  if (req.headers && req.headers.authorization) {
    let parts = req.headers.authorization.split(' ');
    if (parts.length === 2) {
      let scheme = parts[0],
        credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return res.json(401, {err: 'Format is Authorization: Bearer [token]'});
    }
  } else if (req.param('token')) {
    token = req.param('token');
    // We delete the token from param to not mess with blueprints
  } else {
    return res.json(401, {err: 'No Authorization header was found'});
  }
  jwt.verify(token, keys.secret, (err, token) => {
    if(err) {
      return res.json(401, {err: 'Invalid Token Or Token Expired!'});
    } else {
      console.log(token)
      req.token = token;
      next();
    }
  })
};

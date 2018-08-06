const jwt = require('jsonwebtoken');
const keys = require('../../config/keys')

// Issue Token
exports.signToken = (user, res) => {
  jwt.sign({userId: user.id}, keys.secret, {expiresIn:'180 days'}, (err, token) => {
    if(err){
      res.sendStatus(500);
    } else {
      res.json({token});
    }
  });
}

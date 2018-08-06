let passport = require('passport');
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
module.exports = {
  login: function (req,res) {
    res.view()
  },
  authenticate :async (req,res) =>{
    passport.authenticate('google',{scope:['https://www.googleapis.com/auth/userinfo.profile']})(req,res);
  },
  authcallback: async (req,res) =>{
    passport.authenticate('google', { failureRedirect: '/auth/login', scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read'] }, function(err, user) {
      req.logIn(user, function(err) {
        if (err) {
          console.log(err);
          res.view('500');
          return;
        }
        jwt.sign({userId: user.id}, keys.secret, {expiresIn:'180 days'}, (err, token) => {
          if(err){
            res.sendStatus(500);
          } else {
            console.log(token)
            res.redirect(keys.frontendHost+'/blog-home?token='+token);
          }
        });
        return;
      });
    })(req, res);
  },
  logout: function (req,res) {
    req.logout();
    res.send('logout');
  },
  verify:  async (req,res) =>{
    return res.json(200, {id: req.token.userId});
  },
  welcome: function (req,res) {
    return res.json(200,{'message':'hello'})
  }
}

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../../config/keys');

passport.serializeUser((user,done)=>{
  done(null,user.id)
})
passport.deserializeUser((id,done)=>{
  User.findById(id).then((user)=>{
    done(null,user)
  })
})

passport.use(
  new GoogleStrategy({
    // options for google strategy
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/authcallback'
  }, async (accessToken, refreshToken, profile, done) => {
    // check if user already exists in our own db
    // passport callback function
    console.log('passport callback function fired:');
    console.log(profile);
    try {
      let currentUser = await User.findOne({socialId:profile.id});
      if(currentUser){
        console.log(currentUser);
        done(null, currentUser);
      }else {
        let newuser = await User.create({
          socialId: profile.id,
          username: profile.displayName,
          thumbnail: profile.photos[0].value
        });
        done(null,newuser);
      }
    }catch (e){
      console.log(e);
    }
  })
);
